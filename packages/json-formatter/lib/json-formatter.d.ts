import type { LogRecord } from '@livy/contracts';
import { AbstractBatchFormatter } from '@livy/util/formatters/abstract-batch-formatter';
import { IncludedRecordProperties } from '@livy/util/formatters/included-record-properties';
declare const BATCH_MODE_NEWLINES: unique symbol;
type BATCH_MODE_NEWLINES = typeof BATCH_MODE_NEWLINES;
declare const BATCH_MODE_JSON: unique symbol;
type BATCH_MODE_JSON = typeof BATCH_MODE_JSON;
type BatchMode = BATCH_MODE_NEWLINES | BATCH_MODE_JSON;
export interface JsonFormatterOptions {
    /**
     * Which log record properties to include in the output
     */
    include: Partial<IncludedRecordProperties>;
    /**
     * How to combine multiple records when batch-formatting
     */
    batchMode: BatchMode;
}
/**
 * Serializes log records as JSON
 */
export declare class JsonFormatter extends AbstractBatchFormatter {
    /**
     * Use newline characters to delimit multiple lines when batch-formatting
     */
    static readonly BATCH_MODE_NEWLINES: BATCH_MODE_NEWLINES;
    /**
     * Batch-format records as a JSON array
     */
    static readonly BATCH_MODE_JSON: BATCH_MODE_JSON;
    /**
     * Which log record properties to include in the output
     */
    include: IncludedRecordProperties;
    /**
     * How to combine multiple records when batch-formatting
     */
    batchMode: BatchMode;
    constructor({ include, batchMode, }?: Partial<JsonFormatterOptions>);
    /**
     * @inheritdoc
     */
    format(record: LogRecord): string;
    /**
     * @inheritdoc
     */
    formatBatch(records: LogRecord[]): string;
}
export {};
