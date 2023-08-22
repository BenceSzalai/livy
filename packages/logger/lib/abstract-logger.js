import { logLevels, SeverityMap } from '@livy/contracts';
import * as environment from '@livy/util/environment';
import { isClosableHandlerInterface } from '@livy/util/handlers/is-closable-handler-interface';
import { getObviousTypeName, isPrimitive } from '@livy/util/helpers';
import { isResettableInterface } from '@livy/util/is-resettable-interface';
import { ValidatableSet } from '@livy/util/validatable-set';
import * as luxon from 'luxon';
/**
 * A base logger class with all functionalities common to sync, async and mixed loggers
 */
export class AbstractLogger {
    _name;
    /**
     * A list of currently unclosed loggers which should be closed on exit
     */
    static openLoggers = [];
    /**
     * The handler attached to the program exit event
     */
    static exitHandler() {
        /* c8 ignore start: Unloading is hard to test */
        for (const logger of AbstractLogger.openLoggers) {
            logger.close();
        }
        /* c8 ignore stop */
    }
    /**
     * Clear registered exit handlers
     * This is mostly useful for unit testing
     */
    static clearExitHandlers() {
        /* c8 ignore start: Unloading is hard to test */
        if (AbstractLogger.openLoggers.length > 0) {
            AbstractLogger.openLoggers.splice(0);
            if (environment.isNodeJs) {
                process.removeListener('exit', AbstractLogger.exitHandler);
            }
            else if (environment.isBrowser) {
                self.removeEventListener('unload', AbstractLogger.exitHandler);
            }
        }
        /* c8 ignore stop */
    }
    /**
     * The handlers attached to the logger
     */
    _handlers;
    /**
     * The processors attached to the logger
     */
    _processors;
    /**
     * Timezone applied to record datetimes
     */
    _timezone;
    constructor(_name, { autoClose = true, handlers = [], processors = [], timezone = typeof luxon.Settings.defaultZone === 'string'
        ? luxon.Settings.defaultZone
        : luxon.Settings.defaultZone.name, } = {}) {
        this._name = _name;
        this._handlers = new ValidatableSet(handlers);
        this._processors = new Set(processors);
        this.timezone = timezone;
        if (autoClose) {
            this.closeOnExit();
        }
    }
    /**
     * Get the logger's channel name
     */
    get name() {
        return this._name;
    }
    /**
     * Get the logger's timezone
     */
    get timezone() {
        return this._timezone;
    }
    /**
     * Set the logger's timezone
     */
    set timezone(value) {
        // This throws an error if the timezone is invalid
        if (!luxon.IANAZone.isValidZone(value)) {
            throw new Error(`Invalid timezone "${value}"`);
        }
        this._timezone = value;
    }
    /**
     * Get the handlers attached to the logger
     */
    get handlers() {
        return this._handlers;
    }
    /**
     * Get the processors attached to the logger
     */
    get processors() {
        return this._processors;
    }
    /**
     * Close when the program terminates
     */
    closeOnExit() {
        if (AbstractLogger.openLoggers.length === 0) {
            /* c8 ignore start: Simulating browser unloading is too hard to test */
            if (environment.isNodeJs) {
                process.on('exit', AbstractLogger.exitHandler);
            }
            else if (environment.isBrowser) {
                self.addEventListener('unload', AbstractLogger.exitHandler);
            }
            /* c8 ignore stop */
        }
        AbstractLogger.openLoggers.push(this);
    }
    /**
     * Close all registered handlers
     */
    close() {
        for (const handler of this._handlers) {
            if (isClosableHandlerInterface(handler)) {
                handler.close();
            }
        }
    }
    /**
     * Reset all registered handlers and processors
     */
    reset() {
        for (const handler of this._handlers) {
            if (isResettableInterface(handler)) {
                handler.reset();
            }
        }
        for (const processor of this._processors) {
            if (isResettableInterface(processor)) {
                processor.reset();
            }
        }
    }
    /**
     * Checks whether the logger has a handler that listens on the given level
     */
    isHandling(level) {
        return (this._handlers.size > 0 &&
            [...this._handlers].some(handler => handler.isHandling(level)));
    }
    /**
     * @inheritdoc
     */
    log(level, message, context = {}) {
        if (!logLevels.includes(level)) {
            throw new Error(`Invalid log level "${level}", use one of: ${logLevels.join(', ')}`);
        }
        if (!isPrimitive(message)) {
            throw new Error(`Log message must be a primitive, ${getObviousTypeName(message)} given`);
        }
        let record = {
            level,
            severity: SeverityMap[level],
            message: String(message),
            context,
            extra: {},
            datetime: luxon.DateTime.local().setZone(this._timezone),
            channel: this._name,
        };
        // Apply global processors
        for (const processor of this._processors) {
            if (typeof processor === 'function') {
                record = processor(record);
            }
            else {
                record = processor.process(record);
            }
        }
        return this.runHandlers(record);
    }
    /**
     * @inheritdoc
     */
    emergency(message, context = {}) {
        return this.log('emergency', message, context);
    }
    /**
     * @inheritdoc
     */
    alert(message, context = {}) {
        return this.log('alert', message, context);
    }
    /**
     * @inheritdoc
     */
    critical(message, context = {}) {
        return this.log('critical', message, context);
    }
    /**
     * @inheritdoc
     */
    error(message, context = {}) {
        return this.log('error', message, context);
    }
    /**
     * @inheritdoc
     */
    warning(message, context = {}) {
        return this.log('warning', message, context);
    }
    /**
     * @inheritdoc
     */
    notice(message, context = {}) {
        return this.log('notice', message, context);
    }
    /**
     * @inheritdoc
     */
    info(message, context = {}) {
        return this.log('info', message, context);
    }
    /**
     * @inheritdoc
     */
    debug(message, context = {}) {
        return this.log('debug', message, context);
    }
}
