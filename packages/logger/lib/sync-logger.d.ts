import type { LogRecord, SyncHandlerInterface, SyncLoggerInterface } from '@livy/contracts';
import { AbstractLogger, LoggerOptions } from './abstract-logger.js';
/**
 * A synchrous logger implementation which throws
 * on any attempt to add asynchronous functionality
 */
export declare class SyncLogger extends AbstractLogger<SyncHandlerInterface, void> implements SyncLoggerInterface {
    constructor(name: string, options?: Partial<LoggerOptions<SyncHandlerInterface>>);
    /**
     * @inheritdoc
     */
    withName(name: string): SyncLogger;
    /**
     * @inheritdoc
     */
    protected runHandlers(record: LogRecord): void;
}
