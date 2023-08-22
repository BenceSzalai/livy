import type { LogRecord } from '@livy/contracts';
import { Mixin } from '../mixin.js';
/**
 * Mixin which implements the `SyncHandlerInterface` by making the
 * `handle`/`handleBatchSync` method mirroring the `handle`/`handleBatch` method
 */
export declare const MirrorSyncHandlerMixin: Mixin.Wrapper<{
    new (...args: any[]): {
        /**
         * @inheritdoc
         */
        handle(record: LogRecord): Promise<boolean | void>;
        /**
         * @inheritdoc
         */
        handleBatch(records: LogRecord[]): Promise<void>;
    };
}, []>;
