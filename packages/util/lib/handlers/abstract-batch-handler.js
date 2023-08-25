import { isSyncHandlerInterface } from './is-sync-handler-interface.js';
/**
 * Base Handler class providing `handleBatch` and `handleBatchSync`
 * by sequentially hanlding records
 *
 * Note that `handleBatchSync` is a no-op as long as no `handleSync`
 * is implemented by classes extending this handler.
 */
export class AbstractBatchHandler {
    /**
     * @inheritdoc
     */
    async handleBatch(records) {
        for (const record of records) {
            await this.handle(record);
        }
    }
    /**
     * Handles a set of records at once.
     *
     * @param records The records to handle (an array of record arrays)
     */
    handleBatchSync(records) {
        if (!isSyncHandlerInterface(this)) {
            throw new Error('Cannot invoke handleBatchSync() on an asynchronous handler');
        }
        for (const record of records) {
            this.handleSync(record);
        }
    }
}
