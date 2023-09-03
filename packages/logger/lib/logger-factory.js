import { AsyncLogger } from './async-logger.js';
import { MixedLogger } from './mixed-logger.js';
import { SyncLogger } from './sync-logger.js';
/**
 * Create a logger instance
 *
 * @param name    The name of the logger
 * @param options The options for the logger
 */
export function createLogger(name, { mode = 'mixed', ...options } = {}) {
    switch (mode) {
        case 'sync':
            return new SyncLogger(name, options);
        case 'async':
            return new AsyncLogger(name, options);
        case 'mixed':
            return new MixedLogger(name, options);
        default:
            throw new Error(`Invalid logging mode "${mode}". Use one of "sync", "async" or "mixed".`);
    }
}
export { AsyncLogger } from './async-logger.js';
export { MixedLogger } from './mixed-logger.js';
export { SyncLogger } from './sync-logger.js';
