import type { HandlerInterface, LogLevel, LogRecord, ResettableInterface, SyncHandlerInterface } from '@livy/contracts';
import { FilterHandler } from '@livy/filter-handler';
/**
 * An activation strategy function
 */
export interface ActivationStrategy {
    (record: LogRecord): boolean;
}
export interface RestrainHandlerOptions {
    /**
     * Strategy which determines when this handler takes action
     */
    activationStrategy: LogLevel | ActivationStrategy;
    /**
     * Whether the messages that are handled can bubble up the stack or not
     */
    bubble: boolean;
    /**
     * How many entries should be buffered at most
     * When the buffer exceeds this size, its oldest items are discarded
     */
    bufferSize: number;
    /**
     * Whether the handler should stop buffering after being triggered
     */
    stopBuffering: boolean;
}
/**
 * Buffers all records until an activation condition is reached
 *
 * The advantage of this approach is that you don't get any clutter in your log files.
 * Only incidents which actually trigger an error (or whatever your activation condition is) will be
 * in the logs, but they will contain all records, not only those above the level threshold.
 */
export declare class RestrainHandler extends FilterHandler implements SyncHandlerInterface, ResettableInterface {
    protected buffering: boolean;
    protected bufferSize: number;
    protected stopBuffering: boolean;
    protected buffer: LogRecord[];
    /**
     * Whether this handler allows bubbling of records
     */
    bubble: boolean;
    /**
     * @param handler Wrapped handler
     * @param options Options regarding the restraining
     */
    constructor(handler: HandlerInterface, { activationStrategy, bufferSize, stopBuffering, bubble, }?: Partial<RestrainHandlerOptions>);
    /**
     * Manually activate this logger regardless of the activation strategy
     *
     * @param mode Whether to invoke the contained handler synchronously or asynchronously
     */
    activate(mode: 'sync' | 'async'): void | Promise<void>;
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
    close(): void;
    /**
     * Clears the buffer without flushing any messages down to the wrapped handler and re-enables buffering
     */
    reset(): void;
}
