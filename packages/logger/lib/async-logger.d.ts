import type { AsyncLoggerInterface, HandlerInterface, LogRecord } from '@livy/contracts';
import { AbstractLogger } from './abstract-logger.js';
/**
 * An asynchrous logger implementation
 */
export declare class AsyncLogger extends AbstractLogger<HandlerInterface, Promise<void>> implements AsyncLoggerInterface {
    /**
     * @inheritdoc
     */
    withName(name: string): AsyncLogger;
    /**
     * @inheritdoc
     */
    protected runHandlers(record: LogRecord): Promise<void>;
}
