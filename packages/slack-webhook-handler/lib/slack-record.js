import { SeverityMap } from '@livy/contracts';
import { LineFormatter } from '@livy/line-formatter';
import { FormattableHandlerMixin } from '@livy/util/handlers/formattable-handler-mixin';
import { capitalizeFirstLetter, isEmpty } from '@livy/util/helpers';
const COLOR_DANGER = 'danger';
const COLOR_WARNING = 'warning';
const COLOR_GOOD = 'good';
const COLOR_DEFAULT = '#e3e4e6';
/**
 * Slack record utility helping to log to Slack webhooks or API.
 *
 * @see https://api.slack.com/incoming-webhooks
 * @see https://api.slack.com/docs/message-attachments
 */
export class SlackRecord extends FormattableHandlerMixin(class {
}) {
    static COLOR_DANGER = COLOR_DANGER;
    static COLOR_WARNING = COLOR_WARNING;
    static COLOR_GOOD = COLOR_GOOD;
    static COLOR_DEFAULT = COLOR_DEFAULT;
    /**
     * Slack channel (encoded ID or name)
     */
    channel;
    /**
     * Name of a bot
     */
    username;
    /**
     * User icon e.g. 'ghost', 'http://example.com/user.png'
     */
    userIcon;
    /**
     * Whether the message should be added to Slack as attachment (plain text otherwise)
     */
    useAttachment;
    /**
     * Whether the the context/extra messages added to Slack as attachments are in short style
     */
    useShortAttachment;
    /**
     * Whether the attachment should include context and extra data
     */
    includeContextAndExtra;
    /**
     * Dot separated list of fields to exclude from slack message. E.g. ['context.field1', 'extra.field2']
     */
    excludedFields;
    constructor({ channel, username, useAttachment = true, userIcon, useShortAttachment = false, includeContextAndExtra = false, excludedFields = [], formatter, } = {}) {
        super();
        this.channel = channel;
        this.username = username;
        this.userIcon = (userIcon || '').replaceAll(/^:*(.*[^:]+)?:*$/g, '$1');
        this.useAttachment = useAttachment;
        this.useShortAttachment = useShortAttachment;
        this.includeContextAndExtra = includeContextAndExtra;
        this.excludedFields = excludedFields;
        this.explicitFormatter = formatter;
    }
    /**
     * Get required data in format that Slack is expecting
     *
     * @param record The log record to get data for
     */
    getSlackData(record) {
        const data = {};
        const clearedRecord = this.removeExcludedFields(record);
        if (this.username) {
            data.username = this.username;
        }
        if (this.channel) {
            data.channel = this.channel;
        }
        let message;
        if (!this.useAttachment) {
            message = this.formatter.format(clearedRecord);
        }
        else {
            message = clearedRecord.message;
        }
        if (this.useAttachment) {
            const attachment = {
                fallback: message,
                text: message,
                color: this.getAttachmentColor(clearedRecord.level),
                fields: [],
                mrkdwn_in: ['fields'],
                ts: clearedRecord.datetime.toSeconds(),
            };
            if (this.useShortAttachment) {
                attachment.title = clearedRecord.level;
            }
            else {
                attachment.title = 'Message';
                attachment.fields.push(this.generateAttachmentField('Level', clearedRecord.level));
            }
            if (this.includeContextAndExtra) {
                for (const key of ['context', 'extra']) {
                    if (isEmpty(clearedRecord[key])) {
                        continue;
                    }
                    if (this.useShortAttachment) {
                        attachment.fields.push(this.generateAttachmentField(key, clearedRecord[key]));
                    }
                    else {
                        // Add all extra fields as individual fields in attachment
                        attachment.fields.push(...this.generateAttachmentFields(clearedRecord[key]));
                    }
                }
            }
            data.attachments = [attachment];
        }
        else {
            data.text = message;
        }
        if (this.userIcon) {
            try {
                new URL(this.userIcon);
                data.icon_url = this.userIcon;
            }
            catch {
                data.icon_emoji = `:${this.userIcon}:`;
            }
        }
        return data;
    }
    /**
     * Get a Slack message attachment color associated with the provided level
     *
     * @param level The log level to get the color for
     */
    getAttachmentColor(level) {
        const severity = SeverityMap[level];
        switch (true) {
            case severity <= SeverityMap.error:
                return COLOR_DANGER;
            case severity <= SeverityMap.warning:
                return COLOR_WARNING;
            case severity <= SeverityMap.info:
                return COLOR_GOOD;
            default:
                return COLOR_DEFAULT;
        }
    }
    /**
     * Stringify an array of key/value pairs to be used in attachment fields
     *
     * @param fields
     */
    stringify(fields) {
        const isObject = !Array.isArray(fields);
        const hasNestedData = !Array.isArray(fields) ||
            fields.some(field => typeof field === 'object' && field !== null);
        return isObject || hasNestedData
            ? JSON.stringify(fields, null, 2)
            : JSON.stringify(fields);
    }
    /**
     * @inheritdoc
     */
    getDefaultFormatter() {
        return new LineFormatter({
            include: {
                context: this.includeContextAndExtra,
                extra: this.includeContextAndExtra,
            },
        });
    }
    /**
     * Generate an attachment field
     *
     * @param title The title of the attachment
     * @param value The value to render
     */
    generateAttachmentField(title, value) {
        const stringifiedValue = typeof value === 'string' || typeof value === 'number'
            ? String(value)
            : '```' + this.stringify(value) + '```';
        return {
            title: capitalizeFirstLetter(title),
            value: stringifiedValue,
            short: false,
        };
    }
    /**
     * Generate a collection of attachment fields
     *
     * @param data A (partial) log record log record to generate fields for
     */
    generateAttachmentFields(data) {
        return Object.entries(data).map(([key, value]) => this.generateAttachmentField(key, value));
    }
    /**
     * Get a copy of record with fields excluded according to `this.excludedFields`
     *
     * @param record The record to reduce
     */
    removeExcludedFields(record) {
        const copy = { ...record };
        for (const field of this.excludedFields) {
            const keys = field.split('.');
            let node = copy;
            const lastKey = keys[keys.length - 1];
            for (const key of keys) {
                if (!(key in node)) {
                    break;
                }
                if (lastKey === key) {
                    delete node[key];
                    break;
                }
                node = node[key];
            }
        }
        return copy;
    }
}
