import type { HandlerInterface, LogLevel, ResettableInterface, SyncHandlerInterface } from '@livy/contracts';
import { FilterHandler } from '@livy/filter-handler';
export interface LevelFilterHandlerOptions {
    /**
     * The minimum activation level for the wrapped handler
     */
    minLevel: LogLevel;
    /**
     * The maximum activation level for the wrapped handler
     */
    maxLevel: LogLevel;
    /**
     * Whether this handler allows bubbling of records
     */
    bubble: boolean;
}
/**
 * Simple handler wrapper that filters records based on a lower/upper level bound
 */
export declare class LevelFilterHandler extends FilterHandler implements SyncHandlerInterface, ResettableInterface {
    /**
     * Filtered handler
     */
    protected handler: HandlerInterface;
    /**
     * Minimum level for logs that are passed to handler
     */
    protected acceptedLevels: LogLevel[];
    constructor(handler: HandlerInterface, { minLevel, maxLevel, ...options }?: Partial<LevelFilterHandlerOptions>);
    /**
     * Get accepted log levels
     */
    getAcceptedLevels(): ("debug" | "info" | "notice" | "warning" | "error" | "critical" | "alert" | "emergency")[];
    /**
     * @param minLevel Minimum level to accept
     * @param maxLevel Maximum level to accept
     */
    setAcceptedLevels(minLevel?: LogLevel, maxLevel?: LogLevel): void;
    /**
     * @inheritdoc
     */
    isHandling(level: LogLevel): boolean;
}
