import type { ClosableHandlerInterface, FormatterInterface, HandlerInterface, LogLevel, LogRecord, ResettableInterface, SyncHandlerInterface } from '@livy/contracts';
import { AbstractBatchHandler } from '@livy/util/handlers/abstract-batch-handler';
import { ValidatableSet } from '@livy/util/validatable-set';
export interface GroupHandlerOptions {
    /**
     * Whether this handler allows bubbling of records
     */
    bubble: boolean;
    /**
     * Whether handlers must be executed sequentially instead of in parallel
     * Only has an effect in asynchronous execution
     */
    sequential: boolean;
}
declare const GroupHandler_base: typeof AbstractBatchHandler & (new (...args: any[]) => {
    _processors: Set<import("@livy/contracts").ProcessorInterfaceOrFunction>;
    readonly processors: Set<import("@livy/contracts").ProcessorInterfaceOrFunction>;
    processRecord(record: LogRecord): LogRecord;
    resetProcessors(): void;
    reset(): void;
});
/**
 * Forwards log records to multiple handlers
 */
export declare class GroupHandler extends GroupHandler_base implements ClosableHandlerInterface, SyncHandlerInterface, ResettableInterface {
    bubble: boolean;
    sequential: boolean;
    protected handlers: ValidatableSet<HandlerInterface>;
    /**
     * @param handlers Array of Handlers.
     * @param bubble   Whether the messages that are handled can bubble up the stack or not
     */
    constructor(handlers: Iterable<HandlerInterface>, { bubble, sequential }?: Partial<GroupHandlerOptions>);
    /**
     * @inheritdoc
     */
    isHandling(level: LogLevel): boolean;
    /**
     * @inheritdoc
     */
    handle(record: LogRecord): Promise<boolean>;
    /**
     * @inheritdoc
     */
    handleSync(record: LogRecord): boolean;
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
    set formatter(formatter: FormatterInterface);
    /**
     * @inheritdoc
     */
    reset(): void;
}
export {};
