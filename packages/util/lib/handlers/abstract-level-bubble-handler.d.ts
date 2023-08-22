import type { LogLevel, LogRecord } from '@livy/contracts';
import { AbstractBatchHandler } from './abstract-batch-handler.js';
export interface AbstractLevelBubbleHandlerOptions {
    /**
     * The minimum activation level for this handler
     */
    level: LogLevel;
    /**
     * Whether this handler allows bubbling of records
     */
    bubble: boolean;
}
declare const AbstractLevelBubbleHandler_base: typeof AbstractBatchHandler & {
    new (...args: any[]): {
        level: "debug" | "error" | "info" | "notice" | "warning" | "critical" | "alert" | "emergency";
        isHandling(level: "debug" | "error" | "info" | "notice" | "warning" | "critical" | "alert" | "emergency"): boolean;
    };
};
/**
 * Base Handler class providing basic a `bubble` option and basic `level` support
 */
export declare abstract class AbstractLevelBubbleHandler extends AbstractLevelBubbleHandler_base {
    /**
     * Whether this handler allows bubbling of records
     */
    bubble: boolean;
    /**
     * @param level  The minimum logging level at which this handler will be triggered
     * @param bubble Whether the messages that are handled can bubble up the stack or not
     */
    constructor({ level, bubble, }?: Partial<AbstractLevelBubbleHandlerOptions>);
    /**
     * @inheritdoc
     */
    abstract handle(record: LogRecord): Promise<boolean | void>;
}
export {};
