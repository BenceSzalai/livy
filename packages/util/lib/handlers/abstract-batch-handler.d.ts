import type { HandlerInterface, LogLevel, LogRecord } from '@livy/contracts';
/**
 * Base Handler class providing `handleBatch` and `handleBatchSync`
 * by sequentially hanlding records
 *
 * Note that `handleBatchSync` is a no-op as long as no `handleSync`
 * is implemented by classes extending this handler.
 */
export declare abstract class AbstractBatchHandler implements HandlerInterface {
    /**
     * @inheritdoc
     */
    handleBatch(records: LogRecord[]): Promise<void>;
    /**
     * Handles a set of records at once.
     *
     * @param records The records to handle (an array of record arrays)
     */
    handleBatchSync(records: LogRecord[]): void;
    /**
     * @inheritdoc
     */
    abstract isHandling(level: LogLevel): boolean;
    /**
     * @inheritdoc
     */
    abstract handle(record: LogRecord): Promise<boolean | void>;
}
