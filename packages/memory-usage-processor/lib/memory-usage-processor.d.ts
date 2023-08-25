import type { LogRecord, ProcessorInterface } from '@livy/contracts';
/**
 * Injects memory usage into record.extra
 */
export declare class MemoryUsageProcessor implements ProcessorInterface {
    protected humanReadable: boolean;
    /**
     * @param humanReadable Whether human-readable memory information should be reported instead of the raw number of bytes
     */
    constructor(humanReadable?: boolean);
    /**
     * Round a number to a particular precision
     *
     * @param value     The number to round
     * @param precision The number of decimals to round to
     */
    protected round(value: number, precision?: number): number;
    /**
     * Convert a number of bytes to a human-readable string
     *
     * @param raw The raw number of bytes
     */
    protected convertToHumanReadable(raw: number): string;
    /**
     * @inheritdoc
     */
    process(record: LogRecord): LogRecord;
}
