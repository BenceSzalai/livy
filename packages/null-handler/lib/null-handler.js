import { SeverityMap } from '@livy/contracts';
import { AbstractBatchHandler } from '@livy/util/handlers/abstract-batch-handler';
import { RespectLevelMixin } from '@livy/util/handlers/respect-level-mixin';
/**
 * Blackhole
 *
 * Any record it can handle will be thrown away. This can be used
 * to put on top of an existing stack to override it temporarily.
 */
export class NullHandler extends RespectLevelMixin(AbstractBatchHandler) {
    constructor(level = 'debug') {
        super();
        this.level = level;
    }
    /**
     * @inheritdoc
     */
    async handle(record) {
        return this.handleSync(record);
    }
    /**
     * @inheritdoc
     */
    handleSync(record) {
        return record.severity <= SeverityMap[this.level];
    }
}
