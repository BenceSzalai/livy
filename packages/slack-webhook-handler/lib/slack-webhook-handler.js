import { AbstractFormattingProcessingHandler } from '@livy/util/handlers/abstract-formatting-processing-handler';
import got from 'got';
import { SlackRecord } from './slack-record.js';
/**
 * Sends log records to Slack through notifications
 *
 * @see https://api.slack.com/incoming-webhooks
 */
export class SlackWebhookHandler extends AbstractFormattingProcessingHandler {
    /**
     * Slack Webhook token
     * @var string
     */
    _webhookUrl;
    /**
     * Instance of the SlackRecord util class preparing data for Slack API.
     * @var SlackRecord
     */
    _slackRecord;
    /**
     * @param webhookUrl Slack webhook URL to ping
     * @param options    Slack webhook handler options
     */
    constructor(webhookUrl, { bubble, channel, excludedFields = [], formatter, iconEmoji, includeContextAndExtra = false, level = 'critical', useAttachment = true, username, useShortAttachment = false, } = {}) {
        super({ level, bubble });
        this._webhookUrl = webhookUrl;
        this.explicitFormatter = formatter;
        this._slackRecord = new SlackRecord({
            channel,
            username,
            useAttachment,
            userIcon: iconEmoji,
            useShortAttachment,
            includeContextAndExtra,
            excludedFields,
            formatter: this.explicitFormatter,
        });
    }
    /**
     * Get the slack record associated with the handler
     */
    get slackRecord() {
        return this._slackRecord;
    }
    /**
     * Get the handler's webhook URL
     */
    get webhookUrl() {
        return this._webhookUrl;
    }
    /**
     * @inheritdoc
     */
    async write(record) {
        const postData = this._slackRecord.getSlackData(record);
        const postString = JSON.stringify(postData);
        await got(this._webhookUrl, {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
            },
            body: postString,
        });
    }
    /**
     * @inheritdoc
     */
    getDefaultFormatter() {
        return this._slackRecord.defaultFormatter;
    }
    /**
     * @inheritdoc
     */
    setFormatter(formatter) {
        this._slackRecord.formatter = formatter;
    }
    /**
     * @inheritdoc
     */
    getFormatter() {
        return this._slackRecord.formatter;
    }
}
