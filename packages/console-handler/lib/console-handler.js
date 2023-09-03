import { ConsoleFormatter } from '@livy/console-formatter';
import { SeverityMap } from '@livy/contracts';
import * as environment from '@livy/util/environment';
import { AbstractSyncFormattingProcessingHandler } from '@livy/util/handlers/abstract-formatting-processing-handler';
/**
 * Writes log records to the terminal
 */
export class ConsoleHandler extends AbstractSyncFormattingProcessingHandler {
    console;
    constructor({ console, formatter, ...options } = {}) {
        super(options);
        /* c8 ignore start: Environment is hard to test for coverage */
        if (console === undefined) {
            if (environment.isNodeJs) {
                console = global.console;
            }
            else if (environment.isBrowser) {
                console = self.console;
            }
            else if (typeof globalThis === 'object' &&
                typeof globalThis.console === 'object') {
                console = globalThis.console;
            }
            else {
                // eslint-disable-next-line unicorn/prefer-type-error
                throw new Error('Could not find a global console object');
            }
        }
        /* c8 ignore stop */
        this.console = console;
        this.explicitFormatter = formatter;
    }
    /**
     * @inheritdoc
     */
    writeSync(record, formatted) {
        /* eslint-disable unicorn/prefer-switch */
        if (record.severity <= SeverityMap.error) {
            this.console.error('%s', formatted);
        }
        else if (record.severity === SeverityMap.warning) {
            this.console.warn('%s', formatted);
        }
        else if (record.severity === SeverityMap.debug) {
            this.console.debug('%s', formatted);
        }
        else if (record.severity === SeverityMap.info) {
            this.console.info('%s', formatted);
        }
        else {
            this.console.log('%s', formatted);
        }
        /* eslint-enable unicorn/prefer-switch */
    }
    /**
     * @inheritdoc
     */
    getDefaultFormatter() {
        return new ConsoleFormatter();
    }
}
