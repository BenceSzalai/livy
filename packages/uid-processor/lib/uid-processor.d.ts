import type { LogRecord, ProcessorInterface, ResettableInterface } from '@livy/contracts';
/**
 * Adds a unique identifier to record.extra
 */
export declare class UidProcessor implements ProcessorInterface, ResettableInterface {
    private length;
    private _uid;
    /**
     * @param length The length of the UID (in bytes, the actual UID will be a hex string of double that length)
     */
    constructor(length?: number);
    /**
     * @inheritdoc
     */
    process(record: LogRecord): LogRecord;
    /**
     * Get the generated UID
     */
    get uid(): string;
    /**
     * @inheritdoc
     */
    reset(): void;
    /**
     * Generate a new UID
     *
     * @param length The length of the UID (in bytes)
     */
    private generateUid;
}
