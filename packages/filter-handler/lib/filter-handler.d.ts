import type { ClosableHandlerInterface, HandlerInterface, LogLevel, LogRecord, ResettableInterface, SyncHandlerInterface } from '@livy/contracts';
import { AbstractBatchHandler } from '@livy/util/handlers/abstract-batch-handler';
export interface FilterHandlerOptions {
    /**
     * Whether this handler allows bubbling of records
     */
    bubble: boolean;
}
/**
 * A test gating the provided log record
 */
type FilterTest = (record: LogRecord) => boolean;
declare const FilterHandler_base: typeof AbstractBatchHandler & (new (...args: any[]) => {
    _processors: Set<import("@livy/contracts").ProcessorInterfaceOrFunction>;
    readonly processors: Set<import("@livy/contracts").ProcessorInterfaceOrFunction>;
    processRecord(record: LogRecord): LogRecord;
    resetProcessors(): void;
    reset(): void;
});
/**
 * Simple handler wrapper that filters records based test callback
 */
export declare class FilterHandler extends FilterHandler_base implements SyncHandlerInterface, ResettableInterface, ClosableHandlerInterface {
    protected handler: HandlerInterface;
    protected test: FilterTest;
    protected acceptedLevels: LogLevel[];
    /**
     * Whether this handler allows bubbling of records
     */
    bubble: boolean;
    constructor(handler: HandlerInterface, test: FilterTest, { bubble }?: Partial<FilterHandlerOptions>);
    /**
     * @inheritdoc
     */
    isHandling(_level: LogLevel): boolean;
    /**
     * @inheritdoc
     */
    handle(record: LogRecord): Promise<boolean>;
    /**
     * @inheritdoc
     */
    handleSync(record: LogRecord): boolean;
    /**
     * Run multiple handlers
     *
     * @param records The records to handle
     */
    private filterRecords;
    /**
     * @inheritdoc
     */
    handleBatch(records: LogRecord[]): Promise<void>;
    /**
     * @inheritdoc
     */
    handleBatchSync(records: LogRecord[]): void;
    /**
     * @inheritdoc
     */
    close(): void;
    /**
     * @inheritdoc
     */
    reset(): void;
}
export {};
