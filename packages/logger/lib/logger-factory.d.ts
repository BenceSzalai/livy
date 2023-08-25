import type { HandlerInterface, SyncHandlerInterface } from '@livy/contracts';
import { LoggerOptions } from './abstract-logger.js';
import { AsyncLogger } from './async-logger.js';
import { MixedLogger } from './mixed-logger.js';
import { SyncLogger } from './sync-logger.js';
type AsyncLoggerFactoryOptions = LoggerOptions<HandlerInterface> & {
    mode: 'async';
};
type SyncLoggerFactoryOptions = LoggerOptions<SyncHandlerInterface> & {
    mode: 'sync';
};
type MixedLoggerFactoryOptions = LoggerOptions<HandlerInterface> & {
    mode: 'mixed';
};
export type LoggerFactoryOptions = AsyncLoggerFactoryOptions | SyncLoggerFactoryOptions | MixedLoggerFactoryOptions;
/**
 * Create a logger instance
 *
 * @param name    The name of the logger
 * @param options The options for the logger
 */
export declare function createLogger(name: string, { mode, ...options }?: Partial<LoggerFactoryOptions>): AsyncLogger | MixedLogger | SyncLogger;
export { AsyncLogger } from './async-logger.js';
export { MixedLogger } from './mixed-logger.js';
export { SyncLogger } from './sync-logger.js';
