import type { LogRecord } from '@livy/contracts';
import { AbstractBatchFormatter } from '@livy/util/formatters/abstract-batch-formatter';
/**
 * Formats log records as extensive HTML
 */
export declare class HtmlPrettyFormatter extends AbstractBatchFormatter {
    /**
     * @inheritdoc
     */
    protected batchDelimiter: string;
    /**
     * @inheritdoc
     */
    format(record: LogRecord): string;
    /**
     * Serialize a piece of data
     *
     * @param data The data to serialize
     */
    protected serializeData(data: any): string;
    /**
     * Format a single record property
     *
     * @param data        The data to format
     * @param ignoreEmpty Whether to return an empty serialization for empty data
     */
    protected formatData(data: any, ignoreEmpty?: boolean): string;
}
