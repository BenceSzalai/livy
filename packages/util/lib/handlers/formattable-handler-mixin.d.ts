import type { FormatterInterface } from '@livy/contracts';
import { Mixin } from '../mixin.js';
/**
 * Adds basic formatter functionality
 */
export declare const FormattableHandlerMixin: Mixin.Wrapper<{
    new (...args: any[]): {
        /**
         * @protected This should not be public, but is forced to be due to microsoft/typescript#17744
         */
        explicitFormatter?: FormatterInterface | undefined;
        /**
         * Get the default formatter
         *
         * This exists to be overridden, because getters/setters of mixins can not
         * be properly overridden due to TS2611
         *
         * @protected This should also not be public, but is forced to be due to microsoft/typescript#17744
         */
        getDefaultFormatter(): FormatterInterface;
        /**
         * @inheritdoc
         */
        readonly defaultFormatter: FormatterInterface;
        /**
         * @inheritdoc
         */
        formatter: FormatterInterface;
        /**
         * Get the formatter
         *
         * This exists to be overridden, because getters/setters of mixins can not
         * be properly overridden due to TS2611
         *
         * @protected This should also not be public, but is forced to be due to microsoft/typescript#17744
         */
        setFormatter(formatter: FormatterInterface): void;
        /**
         * Set the formatter
         *
         * This exists to be overridden, because getters/setters of mixins can not
         * be properly overridden due to TS2611
         *
         * @protected This should also not be public, but is forced to be due to microsoft/typescript#17744
         */
        getFormatter(): FormatterInterface;
    };
}, []>;
