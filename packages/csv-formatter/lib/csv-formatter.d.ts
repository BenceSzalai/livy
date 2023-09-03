import type { LogRecord } from '@livy/contracts';
import { AbstractBatchFormatter } from '@livy/util/formatters/abstract-batch-formatter';
export type FieldGenerator = (record: LogRecord) => string[];
export interface CsvFormatterOptions {
    /**
     * The delimiter to separate columns
     */
    delimiter: string;
    /**
     * The string to enclose fields
     */
    enclosure: string;
    /**
     * The line terminator string
     */
    eol: string;
    /**
     * A callback mapping a log record to a number of columns
     */
    generateFields: FieldGenerator;
}
/**
 * Formats log records as CSV lines
 */
export declare class CsvFormatter extends AbstractBatchFormatter {
    private generateFields;
    private delimiter;
    private enclosure;
    protected batchDelimiter: string;
    constructor({ generateFields, delimiter, enclosure, eol, }?: Partial<CsvFormatterOptions>);
    /**
     * @inheritdoc
     */
    format(record: LogRecord): string;
}
