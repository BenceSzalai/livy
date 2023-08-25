import type { ClosableHandlerInterface, FormatterInterface, LogRecord, ResettableInterface } from '@livy/contracts';
import { AbstractSyncFormattingProcessingHandler } from '@livy/util/handlers/abstract-formatting-processing-handler';
import { AbstractLevelBubbleHandlerOptions } from '@livy/util/handlers/abstract-level-bubble-handler';
import { Promisable } from '@livy/util/types';
export type AutoScroll = 'edge' | 'force' | 'none';
export interface DomHandlerOptions extends AbstractLevelBubbleHandlerOptions {
    /**
     * Scroll behavior when new entries are inserted:
     * - edge: scroll new entry into view if container has previously been scrolled to the edge
     * - force: always scroll new entries into view
     * - none: no automatic scrolling
     */
    autoScroll: AutoScroll;
    /**
     * The formatter to use
     */
    formatter: FormatterInterface;
    /**
     * Whether DOM elements should be added at the beginning of the container instead of the end
     */
    reversed: boolean;
}
/**
 * Writes log records to the browser DOM
 */
export declare class DomHandler extends AbstractSyncFormattingProcessingHandler implements ResettableInterface, ClosableHandlerInterface {
    reversed: boolean;
    autoScroll: AutoScroll;
    private readyHandler?;
    /**
     * The DOM element to attach log entries to
     */
    protected container: Promisable<Element>;
    constructor(container: string | Element, { reversed, autoScroll, formatter, ...options }?: Partial<DomHandlerOptions>);
    /**
     * @inheritdoc
     */
    getDefaultFormatter(): FormatterInterface;
    /**
     * Get a promise that resolves when the DOM is ready
     */
    private watchDomReadyState;
    /**
     * Perform synchronous or asynchrounus writing
     *
     * @param formatted The formatted string to write
     * @param container The container element the formatted entries go to
     */
    private doWrite;
    /**
     * @inheritdoc
     */
    protected write(_record: LogRecord, formatted: string): Promise<void>;
    /**
     * @inheritdoc
     */
    protected writeSync(_record: LogRecord, formatted: string): void;
    /**
     * @inheritdoc
     */
    reset(): void;
    /**
     * @inheritdoc
     */
    close(): void;
}
