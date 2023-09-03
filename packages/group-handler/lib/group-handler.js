import { AbstractBatchHandler } from '@livy/util/handlers/abstract-batch-handler';
import { isClosableHandlerInterface } from '@livy/util/handlers/is-closable-handler-interface';
import { isFormattableHandlerInterface } from '@livy/util/handlers/is-formattable-handler-interface';
import { isSyncHandlerInterface } from '@livy/util/handlers/is-sync-handler-interface';
import { ProcessableHandlerMixin } from '@livy/util/handlers/processable-handler-mixin';
import { isResettableInterface } from '@livy/util/is-resettable-interface';
import { ValidatableSet } from '@livy/util/validatable-set';
/**
 * Forwards log records to multiple handlers
 */
export class GroupHandler extends ProcessableHandlerMixin(AbstractBatchHandler) {
    bubble;
    sequential;
    handlers;
    /**
     * @param handlers Array of Handlers.
     * @param bubble   Whether the messages that are handled can bubble up the stack or not
     */
    constructor(handlers, { bubble = true, sequential = false } = {}) {
        super();
        this.handlers = new ValidatableSet(handlers);
        this.sequential = sequential;
        this.bubble = bubble;
    }
    /**
     * @inheritdoc
     */
    isHandling(level) {
        return this.handlers.some(handler => handler.isHandling(level));
    }
    /**
     * @inheritdoc
     */
    async handle(record) {
        record = this.processRecord(record);
        if (this.sequential) {
            for (const handler of this.handlers) {
                await handler.handle(record);
            }
        }
        else {
            await Promise.all(
            // eslint-disable-next-line unicorn/prefer-spread
            Array.from(this.handlers, handler => handler.handle(record)));
        }
        return !this.bubble;
    }
    /**
     * @inheritdoc
     */
    handleSync(record) {
        record = this.processRecord(record);
        for (const handler of this.handlers) {
            if (!isSyncHandlerInterface(handler)) {
                throw new Error('Cannot run asynchronous handler in sync mode');
            }
            handler.handleSync(record);
        }
        return !this.bubble;
    }
    /**
     * @inheritdoc
     */
    async handleBatch(records) {
        if (this.processors.size > 0) {
            records = records.map(record => this.processRecord(record));
        }
        if (this.sequential) {
            for (const handler of this.handlers) {
                await handler.handleBatch(records);
            }
        }
        else {
            await Promise.all(
            // eslint-disable-next-line unicorn/prefer-spread
            Array.from(this.handlers, handler => handler.handleBatch(records)));
        }
    }
    /**
     * @inheritdoc
     */
    handleBatchSync(records) {
        if (this.processors.size > 0) {
            records = records.map(record => this.processRecord(record));
        }
        for (const handler of this.handlers) {
            if (!isSyncHandlerInterface(handler)) {
                throw new Error('Cannot run asynchronous handler in sync mode');
            }
            handler.handleBatchSync(records);
        }
    }
    /**
     * @inheritdoc
     */
    close() {
        for (const handler of this.handlers) {
            if (isClosableHandlerInterface(handler)) {
                handler.close();
            }
        }
    }
    /**
     * @inheritdoc
     */
    set formatter(formatter) {
        for (const handler of this.handlers) {
            if (isFormattableHandlerInterface(handler)) {
                handler.formatter = formatter;
            }
        }
    }
    /**
     * @inheritdoc
     */
    reset() {
        this.resetProcessors();
        for (const handler of this.handlers) {
            if (isResettableInterface(handler)) {
                handler.reset();
            }
        }
    }
}
