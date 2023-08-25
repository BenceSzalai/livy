import type { LogRecord, ProcessorInterfaceOrFunction } from '@livy/contracts';
import { Mixin } from '../mixin.js';
/**
 * Adds basic processor-handling functionality
 */
declare const ProcessableHandlerMixin: Mixin.Wrapper<{
    new (...args: any[]): {
        /**
         * @protected This should not be public, but is forced to be due to microsoft/typescript#17744
         */
        _processors: Set<ProcessorInterfaceOrFunction>;
        /**
         * @inheritdoc
         */
        readonly processors: Set<ProcessorInterfaceOrFunction>;
        /**
         * Processes a record.
         *
         * @protected This should not be public, but is forced to be due to microsoft/typescript#17744
         * @param record
         */
        processRecord(record: LogRecord): LogRecord;
        /**
         * Reset processors
         * @protected This should not be public, but is forced to be due to microsoft/typescript#17744
         */
        resetProcessors(): void;
        /**
         * @inheritdoc
         */
        reset(): void;
    };
}, []>;
export { ProcessableHandlerMixin };
