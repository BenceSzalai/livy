import { AbstractLevelBubbleHandler } from './abstract-level-bubble-handler.js';
import { FormattableHandlerMixin } from './formattable-handler-mixin.js';
import { ProcessableHandlerMixin } from './processable-handler-mixin.js';
/**
 * Base Handler class providing the Handler structure, including processors and formatters
 * Classes extending it should (in most cases) only implement `write`
 */
export class AbstractFormattingProcessingHandler extends FormattableHandlerMixin(ProcessableHandlerMixin(AbstractLevelBubbleHandler)) {
    /**
     * @inheritdoc
     */
    async handle(record) {
        if (!this.isHandling(record.level)) {
            return false;
        }
        record = this.processRecord(record);
        const formatted = this.formatter.format(record);
        await this.write(record, formatted);
        return !this.bubble;
    }
}
/**
 * Base Handler class providing the Handler structure, including processors and formatters
 * Classes extending it should (in most cases) only implement `writeSync` and possibly `write`
 */
export class AbstractSyncFormattingProcessingHandler extends FormattableHandlerMixin(ProcessableHandlerMixin(AbstractLevelBubbleHandler)) {
    /**
     * Invoke the `write`/`writeSync` method
     *
     * @param record The record to handle
     * @param mode   The mode in which to invoke the write
     */
    doHandle(record, mode) {
        if (!this.isHandling(record.level)) {
            return false;
        }
        record = this.processRecord(record);
        const formatted = this.formatter.format(record);
        if (mode === 'async') {
            return this.write(record, formatted).then(() => !this.bubble);
        }
        else {
            this.writeSync(record, formatted);
            return !this.bubble;
        }
    }
    /**
     * @inheritdoc
     */
    async handle(record) {
        return this.doHandle(record, 'async');
    }
    /**
     * @inheritdoc
     */
    handleSync(record) {
        return this.doHandle(record, 'sync');
    }
    /**
     * Write the record down to the log of the implementing handler
     *
     * @param record
     * @param formatted
     */
    write(record, formatted) {
        return Promise.resolve(this.writeSync(record, formatted));
    }
}
