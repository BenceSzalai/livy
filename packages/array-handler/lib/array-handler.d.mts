import type { LogRecord, ResettableInterface, SyncHandlerInterface } from '@livy/contracts';
import { AbstractLevelBubbleHandler } from '@livy/util/handlers/abstract-level-bubble-handler';
declare const ArrayHandler_base: typeof AbstractLevelBubbleHandler & (new (...args: any[]) => {
    _processors: Set<import("@livy/contracts").ProcessorInterfaceOrFunction>;
    readonly processors: Set<import("@livy/contracts").ProcessorInterfaceOrFunction>;
    processRecord(record: LogRecord): LogRecord;
    resetProcessors(): void;
    reset(): void;
}) & (new (...args: any[]) => {
    handle(record: LogRecord): Promise<boolean | void>;
    handleBatch(records: LogRecord[]): Promise<void>;
});
/**
 * Stores log records in an array; great for debugging
 */
export declare class ArrayHandler extends ArrayHandler_base implements SyncHandlerInterface, ResettableInterface {
    private _records;
    /**
     * @inheritdoc
     */
    handleSync(record: LogRecord): boolean;
    /**
     * @inheritdoc
     */
    handleBatchSync(records: LogRecord[]): void;
    /**
     * Get the stored records
     */
    get records(): LogRecord[];
    /**
     * @inheritdoc
     */
    reset(): void;
}
export {};
