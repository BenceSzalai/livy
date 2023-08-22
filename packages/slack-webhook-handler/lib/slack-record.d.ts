import type { FormatterInterface, LogLevel, LogRecord } from '@livy/contracts';
import { LineFormatter } from '@livy/line-formatter';
import { AnyObject } from '@livy/util/types';
export interface AttachmentField {
    title: string;
    value: string;
    short: boolean;
}
export interface SlackRecordOptions {
    channel: string;
    username: string;
    useAttachment: boolean;
    userIcon: string | undefined;
    useShortAttachment: boolean;
    includeContextAndExtra: boolean;
    excludedFields: string[];
    formatter: FormatterInterface | undefined;
}
declare const SlackRecord_base: {
    new (): {};
} & (new (...args: any[]) => {
    explicitFormatter?: FormatterInterface | undefined;
    getDefaultFormatter(): FormatterInterface;
    readonly defaultFormatter: FormatterInterface;
    formatter: FormatterInterface;
    setFormatter(formatter: FormatterInterface): void;
    getFormatter(): FormatterInterface;
});
/**
 * Slack record utility helping to log to Slack webhooks or API.
 *
 * @see https://api.slack.com/incoming-webhooks
 * @see https://api.slack.com/docs/message-attachments
 */
export declare class SlackRecord extends SlackRecord_base {
    protected static readonly COLOR_DANGER = "danger";
    protected static readonly COLOR_WARNING = "warning";
    protected static readonly COLOR_GOOD = "good";
    protected static readonly COLOR_DEFAULT = "#e3e4e6";
    /**
     * Slack channel (encoded ID or name)
     */
    private channel?;
    /**
     * Name of a bot
     */
    private username?;
    /**
     * User icon e.g. 'ghost', 'http://example.com/user.png'
     */
    private userIcon;
    /**
     * Whether the message should be added to Slack as attachment (plain text otherwise)
     */
    private useAttachment;
    /**
     * Whether the the context/extra messages added to Slack as attachments are in short style
     */
    private useShortAttachment;
    /**
     * Whether the attachment should include context and extra data
     */
    private includeContextAndExtra;
    /**
     * Dot separated list of fields to exclude from slack message. E.g. ['context.field1', 'extra.field2']
     */
    private excludedFields;
    constructor({ channel, username, useAttachment, userIcon, useShortAttachment, includeContextAndExtra, excludedFields, formatter, }?: Partial<SlackRecordOptions>);
    /**
     * Get required data in format that Slack is expecting
     *
     * @param record The log record to get data for
     */
    getSlackData(record: LogRecord): AnyObject<any>;
    /**
     * Get a Slack message attachment color associated with the provided level
     *
     * @param level The log level to get the color for
     */
    getAttachmentColor(level: LogLevel): "danger" | "warning" | "good" | "#e3e4e6";
    /**
     * Stringify an array of key/value pairs to be used in attachment fields
     *
     * @param fields
     */
    stringify(fields: AnyObject | any[]): string;
    /**
     * @inheritdoc
     */
    getDefaultFormatter(): LineFormatter;
    /**
     * Generate an attachment field
     *
     * @param title The title of the attachment
     * @param value The value to render
     */
    private generateAttachmentField;
    /**
     * Generate a collection of attachment fields
     *
     * @param data A (partial) log record log record to generate fields for
     */
    private generateAttachmentFields;
    /**
     * Get a copy of record with fields excluded according to `this.excludedFields`
     *
     * @param record The record to reduce
     */
    private removeExcludedFields;
}
export {};
