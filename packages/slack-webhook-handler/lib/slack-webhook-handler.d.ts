import type { FormatterInterface, LogRecord } from '@livy/contracts';
import { AbstractFormattingProcessingHandler } from '@livy/util/handlers/abstract-formatting-processing-handler';
import { AbstractLevelBubbleHandlerOptions } from '@livy/util/handlers/abstract-level-bubble-handler';
import { SlackRecord } from './slack-record.js';
export interface SlackWebHookHandlerOptions extends AbstractLevelBubbleHandlerOptions {
    /**
     * Slack channel (encoded ID or name)
     */
    channel: string;
    /**
     * Dot separated list of fields to exclude from slack message. E.g. ['context.field1', 'extra.field2']
     */
    excludedFields: string[];
    /**
     * The formatter to use
     */
    formatter: FormatterInterface;
    /**
     * The emoji name to use
     */
    iconEmoji: string;
    /**
     * Whether the attachment should include context and extra data
     */
    includeContextAndExtra: boolean;
    /**
     * Whether the message should be added to Slack as attachment (plain text otherwise)
     */
    useAttachment: boolean;
    /**
     * Name of a bot to deliver the message
     */
    username: string;
    /**
     * Whether the the context/extra messages added to Slack as attachments should be in a short style
     */
    useShortAttachment: boolean;
}
/**
 * Sends log records to Slack through notifications
 *
 * @see https://api.slack.com/incoming-webhooks
 */
export declare class SlackWebhookHandler extends AbstractFormattingProcessingHandler {
    /**
     * Slack Webhook token
     * @var string
     */
    private _webhookUrl;
    /**
     * Instance of the SlackRecord util class preparing data for Slack API.
     * @var SlackRecord
     */
    private _slackRecord;
    /**
     * @param webhookUrl Slack webhook URL to ping
     * @param options    Slack webhook handler options
     */
    constructor(webhookUrl: string, { bubble, channel, excludedFields, formatter, iconEmoji, includeContextAndExtra, level, useAttachment, username, useShortAttachment, }?: Partial<SlackWebHookHandlerOptions>);
    /**
     * Get the slack record associated with the handler
     */
    get slackRecord(): SlackRecord;
    /**
     * Get the handler's webhook URL
     */
    get webhookUrl(): string;
    /**
     * @inheritdoc
     */
    protected write(record: LogRecord): Promise<void>;
    /**
     * @inheritdoc
     */
    getDefaultFormatter(): FormatterInterface;
    /**
     * @inheritdoc
     */
    setFormatter(formatter: FormatterInterface): void;
    /**
     * @inheritdoc
     */
    getFormatter(): FormatterInterface;
}
