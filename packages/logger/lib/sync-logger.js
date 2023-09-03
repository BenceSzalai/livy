import { GatedSet } from '@livy/util/gated-set';
import { isSyncHandlerInterface } from '@livy/util/handlers/is-sync-handler-interface';
import { AbstractLogger } from './abstract-logger.js';
/**
 * A synchrous logger implementation which throws
 * on any attempt to add asynchronous functionality
 */
export class SyncLogger extends AbstractLogger {
    constructor(name, options) {
        super(name, options);
        this._handlers = new GatedSet(handler => {
            if (!isSyncHandlerInterface(handler)) {
                throw new Error('Invalid asynchronous handler in synchronous logger instance');
            }
        }, [...this._handlers]);
    }
    /**
     * @inheritdoc
     */
    withName(name) {
        return new SyncLogger(name, {
            handlers: this._handlers,
            processors: this._processors,
            timezone: this._timezone,
        });
    }
    /**
     * @inheritdoc
     */
    runHandlers(record) {
        for (const handler of [...this._handlers].reverse()) {
            const result = handler.handleSync({ ...record });
            if (result === true) {
                break;
            }
        }
    }
}
