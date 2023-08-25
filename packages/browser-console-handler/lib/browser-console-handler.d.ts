import type { LogLevel, LogRecord, SyncHandlerInterface } from '@livy/contracts';
import { AbstractLevelBubbleHandler, AbstractLevelBubbleHandlerOptions } from '@livy/util/handlers/abstract-level-bubble-handler';
import type { DateTime } from 'luxon';
export interface BrowserConsoleHandlerOptions extends AbstractLevelBubbleHandlerOptions {
    /**
     * Whether to use the browser's built-in console.debug() for the "debug" level,
     * which is only visible in the dev tools when explicitly configured so
     */
    useNativeDebug: boolean;
    /**
     * Whether to include timestamps in the output
     */
    timestamps: boolean;
    /**
     * The Console object to use
     */
    console: Console;
}
declare const BrowserConsoleHandler_base: typeof AbstractLevelBubbleHandler & (new (...args: any[]) => {
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
 * Writes log records to a browser console
 */
export declare class BrowserConsoleHandler extends BrowserConsoleHandler_base implements SyncHandlerInterface {
    private useNativeDebug;
    private timestamps;
    private console;
    constructor({ useNativeDebug, timestamps, console, ...options }?: Partial<BrowserConsoleHandlerOptions>);
    /**
     * @inheritdoc
     */
    protected formatDatetime(datetime: DateTime): string[];
    /**
     * @inheritdoc
     */
    protected formatLevel(level: LogLevel): string[];
    /**
     * @inheritdoc
     */
    handleSync(record: LogRecord): boolean | undefined;
}
export {};
