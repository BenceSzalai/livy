import { AbstractLogger } from './abstract-logger.js';
/**
 * An asynchrous logger implementation
 */
export class AsyncLogger extends AbstractLogger {
    /**
     * @inheritdoc
     */
    withName(name) {
        return new AsyncLogger(name, {
            handlers: this._handlers,
            processors: this._processors,
            timezone: this._timezone,
        });
    }
    /**
     * @inheritdoc
     */
    async runHandlers(record) {
        for (const handler of this._handlers) {
            const result = await handler.handle({ ...record });
            if (result === true) {
                break;
            }
        }
    }
}
