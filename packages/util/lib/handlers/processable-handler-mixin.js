import { isResettableInterface } from '../is-resettable-interface.js';
import { Mixin } from '../mixin.js';
/**
 * Adds basic processor-handling functionality
 */
const ProcessableHandlerMixin = Mixin(BaseClass => {
    return class ProcessableHandlerMixin extends BaseClass {
        /**
         * @protected This should not be public, but is forced to be due to microsoft/typescript#17744
         */
        _processors = new Set();
        /**
         * @inheritdoc
         */
        get processors() {
            return this._processors;
        }
        /**
         * Processes a record.
         *
         * @protected This should not be public, but is forced to be due to microsoft/typescript#17744
         * @param record
         */
        processRecord(record) {
            if (this._processors.size > 0) {
                for (const processor of this._processors) {
                    if (typeof processor === 'function') {
                        record = processor(record);
                    }
                    else {
                        record = processor.process(record);
                    }
                }
            }
            return record;
        }
        /**
         * Reset processors
         * @protected This should not be public, but is forced to be due to microsoft/typescript#17744
         */
        resetProcessors() {
            for (const processor of this._processors) {
                if (isResettableInterface(processor)) {
                    processor.reset();
                }
            }
        }
        /**
         * @inheritdoc
         */
        reset() {
            this.resetProcessors();
        }
    };
});
export { ProcessableHandlerMixin };
