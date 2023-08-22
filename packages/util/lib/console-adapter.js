import { Timer } from './timer.js';
/**
 * @inheritdoc
 */
export class ConsoleAdapter {
    counters = {};
    timers = {};
    indentation = 0;
    logger;
    constructor(logger) {
        this.logger = logger;
    }
    get indentationString() {
        return '  '.repeat(this.indentation);
    }
    /**
     * @inheritdoc
     */
    count(label) {
        if (label === undefined) {
            label = 'default';
        }
        this.counters[label] = (this.counters[label] || 0) + 1;
        this.logger.debug(`${this.indentationString}console.count`, {
            label,
            count: this.counters[label],
        });
    }
    /**
     * @inheritdoc
     */
    countReset(label) {
        if (label === undefined) {
            label = 'default';
        }
        delete this.counters[label];
    }
    /**
     * @inheritdoc
     */
    debug(message, ...optionalParameters) {
        this.logger.debug(`${this.indentationString}console.debug`, {
            parameters: [message, ...optionalParameters],
        });
    }
    /**
     * @inheritdoc
     */
    dir(object) {
        this.logger.debug(`${this.indentationString}console.dir`, { dir: object });
    }
    /**
     * @inheritdoc
     */
    dirxml(...data) {
        this.logger.debug(`${this.indentationString}console.dirxml`, {
            objects: data,
        });
    }
    /**
     * @inheritdoc
     */
    error(message, ...optionalParameters) {
        this.logger.error(`${this.indentationString}console.error`, {
            parameters: [message, ...optionalParameters],
        });
    }
    /**
     * @inheritdoc
     */
    group(label) {
        this.logger.debug(`${this.indentationString}console.group`, { label });
        this.indentation++;
    }
    /**
     * The `console.groupCollapsed()` function is an alias for `console.group()`
     */
    groupCollapsed(label) {
        this.logger.debug(`${this.indentationString}console.groupCollapsed`, {
            label,
        });
        this.indentation++;
    }
    /**
     * @inheritdoc
     */
    groupEnd() {
        if (this.indentation > 0) {
            this.indentation--;
        }
        this.logger.debug(`${this.indentationString}console.groupEnd`);
    }
    /**
     * @inheritdoc
     */
    info(message, ...optionalParameters) {
        this.logger.info(`${this.indentationString}console.info`, {
            parameters: [message, ...optionalParameters],
        });
    }
    /**
     * @inheritdoc
     */
    log(message, ...optionalParameters) {
        this.logger.debug(`${this.indentationString}console.log`, {
            parameters: [message, ...optionalParameters],
        });
    }
    /**
     * @inheritdoc
     */
    table(tabularData, properties) {
        try {
            if (Array.isArray(tabularData) && properties !== undefined) {
                const propertiesArray = Array.isArray(properties)
                    ? properties
                    : [properties];
                tabularData = tabularData.map(entry => {
                    return Object.fromEntries(Object.entries(entry).filter(([property]) => propertiesArray.includes(property)));
                });
            }
        }
        catch {
            // Ignore invalid data
        }
        this.logger.debug(`${this.indentationString}console.table`, {
            data: tabularData,
        });
    }
    /**
     * @inheritdoc
     */
    time(label) {
        if (label === undefined) {
            label = 'default';
        }
        this.timers[label] = this.timers[label] || new Timer();
        if (this.timers[label].running()) {
            return;
        }
        this.timers[label].start();
    }
    /**
     * @inheritdoc
     */
    timeEnd(label) {
        if (label === undefined) {
            label = 'default';
        }
        const elapsed = label in this.timers ? this.timers[label].reset() : null;
        this.logger.debug(`${this.indentationString}console.timeEnd`, {
            label,
            elapsed,
        });
        delete this.timers[label];
    }
    /**
     * @inheritdoc
     */
    timeLog(label, ...data) {
        if (label === undefined) {
            label = 'default';
        }
        const elapsed = label in this.timers ? this.timers[label].get() : null;
        this.logger.debug(`${this.indentationString}console.timeLog`, {
            label,
            elapsed,
            data,
        });
    }
    /**
     * @inheritdoc
     */
    trace(...data) {
        this.logger.debug(`${this.indentationString}console.trace`, {
            // eslint-disable-next-line unicorn/error-message
            trace: new Error().stack,
            data,
        });
    }
    /**
     * @inheritdoc
     */
    warn(message, ...optionalParameters) {
        this.logger.warning(`${this.indentationString}console.warn`, {
            parameters: [message, ...optionalParameters],
        });
    }
}
