import { HtmlPrettyFormatter } from '@livy/html-pretty-formatter';
import { AbstractSyncFormattingProcessingHandler } from '@livy/util/handlers/abstract-formatting-processing-handler';
import { isPromiseLike } from '@livy/util/helpers';
/**
 * Writes log records to the browser DOM
 */
export class DomHandler extends AbstractSyncFormattingProcessingHandler {
    reversed;
    autoScroll;
    readyHandler;
    /**
     * The DOM element to attach log entries to
     */
    container;
    constructor(container, { reversed = false, autoScroll = 'edge', formatter, ...options } = {}) {
        super(options);
        this.autoScroll = autoScroll;
        this.reversed = reversed;
        this.explicitFormatter = formatter;
        if (typeof container === 'string') {
            const possibleContainer = document.querySelector(container);
            if (possibleContainer) {
                this.container = possibleContainer;
            }
            else {
                this.container = this.watchDomReadyState().then(() => {
                    const queriedContainerElement = document.querySelector(container);
                    if (queriedContainerElement === null) {
                        throw new Error(`Could not find DomHandler target element at selector "${container}"`);
                    }
                    this.container = queriedContainerElement;
                    return queriedContainerElement;
                });
            }
        }
        else {
            this.container = container;
        }
    }
    /**
     * @inheritdoc
     */
    getDefaultFormatter() {
        return new HtmlPrettyFormatter();
    }
    /**
     * Get a promise that resolves when the DOM is ready
     */
    watchDomReadyState() {
        if (document.readyState === 'loading') {
            return new Promise(resolve => {
                this.readyHandler = () => {
                    if (document.readyState !== 'loading') {
                        document.removeEventListener('DOMContentLoaded', this.readyHandler);
                        this.readyHandler = undefined;
                        resolve();
                    }
                };
                document.addEventListener('DOMContentLoaded', this.readyHandler);
            });
        }
        else {
            /* c8 ignore next: This ist just a fallback that should usually not occur in practice */
            return Promise.resolve();
        }
    }
    /**
     * Perform synchronous or asynchrounus writing
     *
     * @param formatted The formatted string to write
     * @param container The container element the formatted entries go to
     */
    doWrite(formatted, container) {
        let isAtEdge = false;
        /* c8 ignore start: Scrolling cannot be tested with the JSDOM mock */
        if (this.autoScroll === 'force') {
            isAtEdge = true;
        }
        else if (this.autoScroll === 'edge') {
            isAtEdge = this.reversed
                ? container.scrollTop === 0
                : container.scrollTop ===
                    container.scrollHeight - container.clientHeight;
        }
        /* c8 ignore stop */
        container.insertAdjacentHTML(this.reversed ? 'afterbegin' : 'beforeend', formatted);
        /* c8 ignore start: Scrolling cannot be tested with the JSDOM mock */
        if (isAtEdge) {
            container.scrollTop = this.reversed
                ? 0
                : container.scrollHeight - container.clientHeight;
        }
        /* c8 ignore stop */
    }
    /**
     * @inheritdoc
     */
    async write(_record, formatted) {
        const container = await this.container;
        return this.doWrite(formatted, container);
    }
    /**
     * @inheritdoc
     */
    writeSync(_record, formatted) {
        const container = this.container;
        if (isPromiseLike(container)) {
            throw new Error(`Could not find DomHandler target element`);
        }
        return this.doWrite(formatted, container);
    }
    /**
     * @inheritdoc
     */
    reset() {
        if (this.container instanceof Element) {
            this.container.innerHTML = '';
        }
    }
    /**
     * @inheritdoc
     */
    close() {
        if (this.readyHandler) {
            document.removeEventListener('DOMContentLoaded', this.readyHandler);
            this.readyHandler = undefined;
        }
    }
}
