import type { HandlerInterface, LogRecord, SyncLoggerInterface } from '@livy/contracts';
import { AbstractLogger } from './abstract-logger.js';
/**
 * A mixed sync/async logger implementation
 *
 * It executes asynchronous handlers but does not await their results nor does it
 * respect their bubbling behavior or handle their errors
 */
export declare class MixedLogger extends AbstractLogger<HandlerInterface, void> implements SyncLoggerInterface {
    /**
     * @inheritdoc
     */
    withName(name: string): MixedLogger;
    /**
     * @inheritdoc
     */
    protected runHandlers(record: LogRecord): void;
}
