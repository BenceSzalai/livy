import type { HandlerInterface, LogLevel, LogRecord, ProcessorInterfaceOrFunction, SyncHandlerInterface } from '@livy/contracts';
import { AnyObject } from '@livy/util/types';
import { ValidatableSet } from '@livy/util/validatable-set';
export interface LoggerOptions<HandlerType extends HandlerInterface | SyncHandlerInterface> {
    /**
     * Whether to automatically run the logger's `close` method when the Node.js process exits / the browser page closes
     */
    autoClose: boolean;
    /**
     * Handlers of the logger
     */
    handlers: Iterable<HandlerType>;
    /**
     * Processors of the logger
     */
    processors: Iterable<ProcessorInterfaceOrFunction>;
    /**
     * The time zone the logger should use
     */
    timezone: string;
}
/**
 * A base logger class with all functionalities common to sync, async and mixed loggers
 */
export declare abstract class AbstractLogger<HandlerType extends HandlerInterface | SyncHandlerInterface, HandlerResultType> {
    private _name;
    /**
     * A list of currently unclosed loggers which should be closed on exit
     */
    private static openLoggers;
    /**
     * The handler attached to the program exit event
     */
    private static exitHandler;
    /**
     * Clear registered exit handlers
     * This is mostly useful for unit testing
     */
    static clearExitHandlers(): void;
    /**
     * The handlers attached to the logger
     */
    protected _handlers: ValidatableSet<HandlerType>;
    /**
     * The processors attached to the logger
     */
    protected _processors: Set<ProcessorInterfaceOrFunction>;
    /**
     * Timezone applied to record datetimes
     */
    protected _timezone: string;
    constructor(_name: string, { autoClose, handlers, processors, timezone, }?: Partial<LoggerOptions<HandlerType>>);
    /**
     * Get the logger's channel name
     */
    get name(): string;
    /**
     * Clone the logger with a new name
     *
     * @param name The new instance's logger name
     */
    abstract withName(name: string): AbstractLogger<HandlerType, HandlerResultType>;
    /**
     * Get the logger's timezone
     */
    get timezone(): string;
    /**
     * Set the logger's timezone
     */
    set timezone(value: string);
    /**
     * Get the handlers attached to the logger
     */
    get handlers(): ValidatableSet<HandlerType>;
    /**
     * Get the processors attached to the logger
     */
    get processors(): Set<ProcessorInterfaceOrFunction>;
    /**
     * Close when the program terminates
     */
    private closeOnExit;
    /**
     * Close all registered handlers
     */
    close(): void;
    /**
     * Reset all registered handlers and processors
     */
    reset(): void;
    /**
     * Checks whether the logger has a handler that listens on the given level
     */
    isHandling(level: LogLevel): boolean;
    /**
     * Run registered handlers on a log record
     *
     * @param record The record to provide to the handlers
     */
    protected abstract runHandlers(record: LogRecord, offset?: number): HandlerResultType;
    /**
     * @inheritdoc
     */
    log(level: LogLevel, message: string, context?: AnyObject): HandlerResultType;
    /**
     * @inheritdoc
     */
    emergency(message: string, context?: AnyObject): HandlerResultType;
    /**
     * @inheritdoc
     */
    alert(message: string, context?: AnyObject): HandlerResultType;
    /**
     * @inheritdoc
     */
    critical(message: string, context?: AnyObject): HandlerResultType;
    /**
     * @inheritdoc
     */
    error(message: string, context?: AnyObject): HandlerResultType;
    /**
     * @inheritdoc
     */
    warning(message: string, context?: AnyObject): HandlerResultType;
    /**
     * @inheritdoc
     */
    notice(message: string, context?: AnyObject): HandlerResultType;
    /**
     * @inheritdoc
     */
    info(message: string, context?: AnyObject): HandlerResultType;
    /**
     * @inheritdoc
     */
    debug(message: string, context?: AnyObject): HandlerResultType;
}
