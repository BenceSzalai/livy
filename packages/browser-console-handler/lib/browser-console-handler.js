import { SeverityMap } from '@livy/contracts';
import { AbstractLevelBubbleHandler, } from '@livy/util/handlers/abstract-level-bubble-handler';
import { MirrorSyncHandlerMixin } from '@livy/util/handlers/mirror-sync-handler-mixin';
import { ProcessableHandlerMixin } from '@livy/util/handlers/processable-handler-mixin';
import { isEmpty } from '@livy/util/helpers';
/**
 * Writes log records to a browser console
 */
export class BrowserConsoleHandler extends MirrorSyncHandlerMixin(ProcessableHandlerMixin(AbstractLevelBubbleHandler)) {
    useNativeDebug;
    timestamps;
    console;
    constructor({ useNativeDebug = false, timestamps = false, console = self.console, ...options } = {}) {
        super(options);
        this.console = console;
        this.timestamps = timestamps;
        this.useNativeDebug = useNativeDebug;
    }
    /**
     * @inheritdoc
     */
    formatDatetime(datetime) {
        return ['color: #888', datetime.toFormat('HH:mm:ss.SSS')];
    }
    /**
     * @inheritdoc
     */
    formatLevel(level) {
        const formatted = level.toUpperCase();
        let color;
        switch (level) {
            case 'emergency':
                color = 'background-color: #f43a63; padding: 0 0.4em; color: #fff';
                break;
            case 'alert':
                color = 'background-color: #f43a63; padding: 0 0.4em; color: #fff';
                break;
            case 'critical':
                color = 'color: #f43a63';
                break;
            case 'error':
                color = 'color: #f43a63';
                break;
            case 'warning':
                color = 'color: #ffaa2b';
                break;
            case 'notice':
                color = 'color: rgb(60, 161, 224)';
                break;
            case 'info':
                color = 'color: rgb(60, 161, 224)';
                break;
            case 'debug':
            default:
                color = 'color: rgba(60, 161, 224, 0.7)';
                break;
        }
        return [color, formatted];
    }
    /**
     * @inheritdoc
     */
    handleSync(record) {
        if (!this.isHandling(record.level)) {
            return;
        }
        const resetter = 'color: inherit; background-color: inherit';
        const parameters = [record.message];
        const hasExtra = !isEmpty(record.extra);
        if (hasExtra || !isEmpty(record.context)) {
            parameters.push(record.context);
        }
        if (hasExtra) {
            parameters.push(record.extra);
        }
        const formattedTimestamp = this.timestamps
            ? [...this.formatDatetime(record.datetime), resetter]
            : [];
        const formattedLevel = [...this.formatLevel(record.level), resetter];
        let placeholders = ['%c%s'];
        if (this.timestamps) {
            placeholders.push('%c%s');
        }
        placeholders = placeholders.map(placeholder => `${placeholder}%c`);
        if (record.severity <= SeverityMap.error) {
            this.console.error(placeholders.join(' '), ...formattedTimestamp, ...formattedLevel, ...parameters);
        }
        else if (record.severity === SeverityMap.warning) {
            this.console.warn(placeholders.join(' '), ...formattedTimestamp, ...formattedLevel, ...parameters);
        }
        else if (record.severity <= SeverityMap.info) {
            this.console.info(placeholders.join(' '), ...formattedTimestamp, ...formattedLevel, ...parameters);
        }
        else {
            if (this.useNativeDebug) {
                placeholders.pop();
                this.console.debug(placeholders.join(' '), ...formattedTimestamp, ...parameters);
            }
            else {
                this.console.log(placeholders.join(' '), ...formattedTimestamp, ...formattedLevel, ...parameters);
            }
        }
        return !this.bubble;
    }
}
