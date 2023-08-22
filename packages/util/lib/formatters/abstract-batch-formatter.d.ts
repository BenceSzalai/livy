import type { FormatterInterface, LogRecord } from '@livy/contracts';
/**
 * Implements the `formatBatch` part of `FormatterInterface`
 * by concatenating individual formats with a newline character
 */
export declare abstract class AbstractBatchFormatter implements FormatterInterface {
    /**
     * A delimiter to join batch-formatted log records
     */
    protected batchDelimiter: string;
    /**
     * @inheritdoc
     */
    abstract format(record: LogRecord): string;
    /**
     * @inheritdoc
     */
    formatBatch(records: LogRecord[]): string;
}
