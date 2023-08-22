import { Mixin } from '../mixin.js';
import { isSyncHandlerInterface } from './is-sync-handler-interface.js';
/**
 * Mixin which implements the `SyncHandlerInterface` by making the
 * `handle`/`handleBatchSync` method mirroring the `handle`/`handleBatch` method
 */
export const MirrorSyncHandlerMixin = Mixin(BaseClass => {
    return class MirrorSyncHandlerMixin extends BaseClass {
        constructor(...args) {
            super(...args);
            if (!isSyncHandlerInterface(this)) {
                throw new Error('Cannot use MirrorSyncHandlerMixin on an async handler');
            }
        }
        /**
         * @inheritdoc
         */
        handle(record) {
            return Promise.resolve(this.handleSync(record));
        }
        /**
         * @inheritdoc
         */
        handleBatch(records) {
            return Promise.resolve(this.handleBatchSync(records));
        }
    };
});
