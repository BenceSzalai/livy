import { AbstractLevelBubbleHandler } from '@livy/util/handlers/abstract-level-bubble-handler';
import { MirrorSyncHandlerMixin } from '@livy/util/handlers/mirror-sync-handler-mixin';
import { ProcessableHandlerMixin } from '@livy/util/handlers/processable-handler-mixin';
/**
 * Stores log records in an array; great for debugging
 */
export class ArrayHandler extends MirrorSyncHandlerMixin(ProcessableHandlerMixin(AbstractLevelBubbleHandler)) {
    _records = [];
    /**
     * @inheritdoc
     */
    handleSync(record) {
        this._records.push(record);
        return !this.bubble;
    }
    /**
     * @inheritdoc
     */
    handleBatchSync(records) {
        this._records.push(...records);
    }
    /**
     * Get the stored records
     */
    get records() {
        return this._records;
    }
    /**
     * @inheritdoc
     */
    reset() {
        this._records.splice(0);
    }
}
