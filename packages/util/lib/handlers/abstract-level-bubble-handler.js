import { AbstractBatchHandler } from './abstract-batch-handler.js';
import { RespectLevelMixin } from './respect-level-mixin.js';
/**
 * Base Handler class providing basic a `bubble` option and basic `level` support
 */
export class AbstractLevelBubbleHandler extends RespectLevelMixin(AbstractBatchHandler) {
    /**
     * Whether this handler allows bubbling of records
     */
    bubble = true;
    /**
     * @param level  The minimum logging level at which this handler will be triggered
     * @param bubble Whether the messages that are handled can bubble up the stack or not
     */
    constructor({ level = 'debug', bubble = true, } = {}) {
        super();
        this.level = level;
        this.bubble = bubble;
    }
}
