import { AbstractBatchHandler } from '@livy/util/handlers/abstract-batch-handler';
import { isClosableHandlerInterface } from '@livy/util/handlers/is-closable-handler-interface';
import { isSyncHandlerInterface } from '@livy/util/handlers/is-sync-handler-interface';
import { ProcessableHandlerMixin } from '@livy/util/handlers/processable-handler-mixin';
import { getObviousTypeName } from '@livy/util/helpers';
import { isResettableInterface } from '@livy/util/is-resettable-interface';
/**
 * Simple handler wrapper that filters records based test callback
 */
export class FilterHandler extends ProcessableHandlerMixin(AbstractBatchHandler) {
    handler;
    test;
    acceptedLevels = [];
    /**
     * Whether this handler allows bubbling of records
     */
    bubble = true;
    constructor(handler, test, { bubble = true } = {}) {
        super();
        if (typeof test !== 'function') {
            throw new TypeError(`Filter test must be a function, got ${getObviousTypeName(test)}`);
        }
        this.bubble = bubble;
        this.handler = handler;
        this.test = test;
    }
    /**
     * @inheritdoc
     */
    isHandling(_level) {
        return true;
    }
    /**
     * @inheritdoc
     */
    async handle(record) {
        if (!this.test(record)) {
            return false;
        }
        record = this.processRecord(record);
        await this.handler.handle(record);
        return !this.bubble;
    }
    /**
     * @inheritdoc
     */
    handleSync(record) {
        if (!this.test(record)) {
            return false;
        }
        record = this.processRecord(record);
        if (isSyncHandlerInterface(this.handler)) {
            this.handler.handleSync(record);
        }
        else {
            throw new Error('Cannot activate asynchronous handler in sync mode');
        }
        return !this.bubble;
    }
    /**
     * Run multiple handlers
     *
     * @param records The records to handle
     */
    filterRecords(records) {
        const filtered = [];
        for (const record of records) {
            if (this.test(record)) {
                filtered.push(record);
            }
        }
        return filtered;
    }
    /**
     * @inheritdoc
     */
    async handleBatch(records) {
        await this.handler.handleBatch(this.filterRecords(records));
    }
    /**
     * @inheritdoc
     */
    handleBatchSync(records) {
        if (isSyncHandlerInterface(this.handler)) {
            this.handler.handleBatchSync(this.filterRecords(records));
        }
        else {
            throw new Error('Cannot activate asynchronous handler in sync mode');
        }
    }
    /**
     * @inheritdoc
     */
    close() {
        if (isClosableHandlerInterface(this.handler)) {
            this.handler.close();
        }
    }
    /**
     * @inheritdoc
     */
    reset() {
        this.resetProcessors();
        if (isResettableInterface(this.handler)) {
            this.handler.reset();
        }
    }
}
