import { LineFormatter } from '../formatters/line-formatter.js';
import { Mixin } from '../mixin.js';
/**
 * Adds basic formatter functionality
 */
export const FormattableHandlerMixin = Mixin(BaseClass => {
    return class FormattableHandlerMixin extends BaseClass {
        /**
         * @protected This should not be public, but is forced to be due to microsoft/typescript#17744
         */
        explicitFormatter;
        /**
         * Get the default formatter
         *
         * This exists to be overridden, because getters/setters of mixins can not
         * be properly overridden due to TS2611
         *
         * @protected This should also not be public, but is forced to be due to microsoft/typescript#17744
         */
        getDefaultFormatter() {
            return new LineFormatter();
        }
        /**
         * @inheritdoc
         */
        get defaultFormatter() {
            return this.getDefaultFormatter();
        }
        /**
         * @inheritdoc
         */
        set formatter(formatter) {
            this.setFormatter(formatter);
        }
        /**
         * @inheritdoc
         */
        get formatter() {
            return this.getFormatter();
        }
        /**
         * Get the formatter
         *
         * This exists to be overridden, because getters/setters of mixins can not
         * be properly overridden due to TS2611
         *
         * @protected This should also not be public, but is forced to be due to microsoft/typescript#17744
         */
        setFormatter(formatter) {
            this.explicitFormatter = formatter;
        }
        /**
         * Set the formatter
         *
         * This exists to be overridden, because getters/setters of mixins can not
         * be properly overridden due to TS2611
         *
         * @protected This should also not be public, but is forced to be due to microsoft/typescript#17744
         */
        getFormatter() {
            // Default formatter is committed as the handler's formatter
            // as soon as the formatter is requested
            if (this.explicitFormatter === undefined) {
                this.explicitFormatter = this.defaultFormatter;
            }
            return this.explicitFormatter;
        }
    };
});
