import { AbstractLevelBubbleHandler, } from '@livy/util/handlers/abstract-level-bubble-handler';
import { ProcessableHandlerMixin } from '@livy/util/handlers/processable-handler-mixin';
import got from 'got';
/**
 * Sends log records to an HTTP endpoint
 */
export class HttpHandler extends ProcessableHandlerMixin(AbstractLevelBubbleHandler) {
    url;
    requestOptions;
    sequential;
    allowBatchRequests;
    /**
     *
     * @param url     The URL to send the records to, or a callback which generates the URL from records
     * @param options
     */
    constructor(url, { requestOptions = {}, sequential = false, allowBatchRequests = false, ...options } = {}) {
        super(options);
        this.sequential = sequential;
        this.allowBatchRequests = allowBatchRequests;
        if (typeof url === 'function') {
            this.url = url;
        }
        else {
            this.url = () => url;
        }
        if (typeof requestOptions === 'function') {
            this.requestOptions = requestOptions;
        }
        else {
            this.requestOptions = () => requestOptions;
        }
    }
    async handle(record) {
        if (!this.isHandling(record.level)) {
            return;
        }
        // @ts-ignore
        // TypeScript does not recognize the records as correct arguments
        await got(this.url(record), this.requestOptions(record));
        return !this.bubble;
    }
    /**
     * @inheritdoc
     */
    async handleBatch(records) {
        if (this.allowBatchRequests) {
            const filteredRecords = records.filter(record => this.isHandling(record.level));
            // @ts-ignore
            // TypeScript does not recognize the records as correct arguments
            await got(this.url(filteredRecords), this.requestOptions(filteredRecords));
        }
        else if (this.sequential) {
            for (const record of records) {
                await this.handle(record);
            }
        }
        else {
            await Promise.all(records.map(record => this.handle(record)));
        }
    }
}
