import { SeverityMap } from '@livy/contracts';
import { FilterHandler } from '@livy/filter-handler';
import { isSyncHandlerInterface } from '@livy/util/handlers/is-sync-handler-interface';
import { isResettableInterface } from '@livy/util/is-resettable-interface';
/**
 * Buffers all records until an activation condition is reached
 *
 * The advantage of this approach is that you don't get any clutter in your log files.
 * Only incidents which actually trigger an error (or whatever your activation condition is) will be
 * in the logs, but they will contain all records, not only those above the level threshold.
 */
export class RestrainHandler extends FilterHandler {
    buffering = true;
    bufferSize;
    stopBuffering;
    buffer = [];
    /**
     * Whether this handler allows bubbling of records
     */
    bubble = true;
    /**
     * @param handler Wrapped handler
     * @param options Options regarding the restraining
     */
    constructor(handler, { activationStrategy = 'warning', bufferSize = Number.POSITIVE_INFINITY, stopBuffering = false, bubble = true, } = {}) {
        super(handler, typeof activationStrategy === 'function'
            ? activationStrategy
            : (record) => record.severity <= SeverityMap[activationStrategy]);
        this.bufferSize = bufferSize;
        this.bubble = bubble;
        this.stopBuffering = stopBuffering;
    }
    /**
     * Manually activate this logger regardless of the activation strategy
     *
     * @param mode Whether to invoke the contained handler synchronously or asynchronously
     */
    activate(mode) {
        if (this.stopBuffering) {
            this.buffering = false;
        }
        const buffer = this.buffer;
        this.buffer = [];
        if (mode === 'async') {
            return this.handler.handleBatch(buffer);
        }
        else {
            if (isSyncHandlerInterface(this.handler)) {
                return this.handler.handleBatchSync(buffer);
            }
            else {
                throw new Error('Cannot activate asynchronous handler in sync mode');
            }
        }
    }
    /**
     * @inheritdoc
     */
    async handle(record) {
        record = this.processRecord(record);
        if (this.buffering) {
            this.buffer.push(record);
            if (this.buffer.length > this.bufferSize) {
                this.buffer.shift();
            }
            if (this.test(record)) {
                this.activate('async');
            }
        }
        else {
            await this.handler.handle(record);
        }
        return !this.bubble;
    }
    /**
     * @inheritdoc
     */
    handleSync(record) {
        record = this.processRecord(record);
        if (this.buffering) {
            this.buffer.push(record);
            if (this.buffer.length > this.bufferSize) {
                this.buffer.shift();
            }
            if (this.test(record)) {
                this.activate('sync');
            }
        }
        else {
            if (isSyncHandlerInterface(this.handler)) {
                this.handler.handleSync(record);
            }
            else {
                throw new Error('Cannot activate asynchronous handler in sync mode');
            }
        }
        return !this.bubble;
    }
    /**
     * @inheritdoc
     */
    close() {
        if (this.buffer.length > 0) {
            super.close();
        }
    }
    /**
     * Clears the buffer without flushing any messages down to the wrapped handler and re-enables buffering
     */
    reset() {
        this.buffer = [];
        this.buffering = true;
        this.resetProcessors();
        if (isResettableInterface(this.handler)) {
            this.handler.reset();
        }
    }
}
