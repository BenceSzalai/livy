import type { LogLevel, LogRecord, SyncHandlerInterface } from '@livy/contracts';
import { AbstractBatchHandler } from '@livy/util/handlers/abstract-batch-handler';
declare const NullHandler_base: typeof AbstractBatchHandler & (new (...args: any[]) => {
    level: "debug" | "info" | "notice" | "warning" | "error" | "critical" | "alert" | "emergency";
    isHandling(level: "debug" | "info" | "notice" | "warning" | "error" | "critical" | "alert" | "emergency"): boolean;
});
/**
 * Blackhole
 *
 * Any record it can handle will be thrown away. This can be used
 * to put on top of an existing stack to override it temporarily.
 */
export declare class NullHandler extends NullHandler_base implements SyncHandlerInterface {
    constructor(level?: LogLevel);
    /**
     * @inheritdoc
     */
    handle(record: LogRecord): Promise<boolean>;
    /**
     * @inheritdoc
     */
    handleSync(record: LogRecord): boolean;
}
export {};
