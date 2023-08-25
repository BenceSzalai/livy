import { HtmlPrettyFormatter } from '@livy/html-pretty-formatter';
import { LineFormatter } from '@livy/line-formatter';
import { AbstractLevelBubbleHandler, } from '@livy/util/handlers/abstract-level-bubble-handler';
import { ProcessableHandlerMixin } from '@livy/util/handlers/processable-handler-mixin';
import { replaceTokens, stripTags } from '@livy/util/helpers';
import { createTransport, } from 'nodemailer';
/**
 * Dispenses log records via email
 */
export class MailHandler extends ProcessableHandlerMixin(AbstractLevelBubbleHandler) {
    mailer;
    subject;
    to;
    from;
    template;
    _htmlFormatter;
    _plainTextFormatter;
    constructor({ subject, to, from, level = 'warning', htmlFormatter, plainTextFormatter, template = { html: '%logs%', text: '%logs%' }, transport = {
        sendmail: true,
    }, ...options }) {
        super({ ...options, level });
        if (typeof subject !== 'string') {
            throw new TypeError('Subject must be a string');
        }
        if (typeof to !== 'string' && !Array.isArray(to)) {
            throw new TypeError('Receiver must be a string or an array');
        }
        if (typeof from !== 'string') {
            throw new TypeError('Sender must be a string');
        }
        this.subject = subject;
        this.to = (Array.isArray(to) ? to : [to]).join(', ');
        this.from = from;
        this._htmlFormatter = htmlFormatter;
        this._plainTextFormatter = plainTextFormatter;
        if (typeof template.html !== 'string' &&
            typeof template.text !== 'string') {
            throw new TypeError('Either a HTML or a plain text template must be provided');
        }
        this.template = this.supplementTemplates(template);
        this.mailer = createTransport(transport);
    }
    /**
     * Supplement possibly missing template properties
     *
     * @param templates The templates as provided by the user
     */
    supplementTemplates(templates) {
        return {
            text: 'text' in templates ? templates.text : stripTags(templates.html),
            html: 'html' in templates ? templates.html : templates.text,
        };
    }
    /**
     * Get the default HTML formatter
     */
    get defaultHtmlFormatter() {
        return new HtmlPrettyFormatter();
    }
    /**
     * Get the formatter for the HTML part of mails
     */
    get htmlFormatter() {
        if (this._htmlFormatter === undefined) {
            this._htmlFormatter = this.defaultHtmlFormatter;
        }
        return this._htmlFormatter;
    }
    /**
     * Set the formatter for the HTML part of mails
     *
     * @param formatter The formatter to use
     */
    set htmlFormatter(formatter) {
        this._htmlFormatter = formatter;
    }
    /**
     * Get the default plain text formatter
     */
    get defaultPlainTextFormatter() {
        return new LineFormatter();
    }
    /**
     * Get the formatter for the plain text part of mails
     */
    get plainTextFormatter() {
        if (this._plainTextFormatter === undefined) {
            this._plainTextFormatter = this.defaultPlainTextFormatter;
        }
        return this._plainTextFormatter;
    }
    /**
     * Set the formatter for the plain text part of mails
     *
     * @param formatter The formatter to use
     */
    set plainTextFormatter(formatter) {
        this._plainTextFormatter = formatter;
    }
    /**
     * Get the subject of an email
     *
     * @param record        The log record for the mail to send
     * @param tokenReplacer The token replacer to use on the subject
     */
    getSubject(record, tokenReplacer) {
        return tokenReplacer(this.subject);
    }
    /**
     * Actually send the email via `sendmail`
     *
     * @param subject  The subject to use for the mail
     * @param textLogs The logs to send, in plain text format
     * @param htmlLogs The logs to send, in HTML format
     */
    send(subject, textLogs, htmlLogs) {
        const text = this.createTokenReplacer({
            logs: textLogs,
        })(this.template.text);
        // Only use HTML template if HTML logs are present
        const html = this.template.html
            ? this.createTokenReplacer({
                logs: htmlLogs,
            })(this.template.html)
            : undefined;
        return new Promise((resolve, reject) => {
            this.mailer.sendMail({
                from: this.from,
                to: this.to,
                subject,
                html,
                text,
            }, error => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    }
    /**
     * @inheritdoc
     */
    async handle(record) {
        if (!this.isHandling(record.level)) {
            return;
        }
        const subjectTokenReplacer = this.createTokenReplacer(record);
        const subject = this.getSubject(record, subjectTokenReplacer);
        await this.send(subject, this.plainTextFormatter.format(record), this.template.html ? this.htmlFormatter.format(record) : undefined);
        return !this.bubble;
    }
    /**
     * @inheritdoc
     */
    async handleBatch(records) {
        records = records.filter(record => this.isHandling(record.level));
        if (records.length === 0) {
            return;
        }
        else if (records.length === 1) {
            await this.handle(records[0]);
            return;
        }
        const latestRecord = records[records.length - 1];
        const tokenReplacer = this.createTokenReplacer(latestRecord);
        const subject = `${this.getSubject(latestRecord, tokenReplacer)} + ${records.length - 1} other${records.length === 2 ? '' : 's'}`;
        this.send(subject, this.plainTextFormatter.formatBatch(records), this.template.html ? this.htmlFormatter.formatBatch(records) : undefined);
    }
    /**
     * Create a token replacer function
     *
     * @param values The key-value pairs to replace
     */
    createTokenReplacer(values) {
        return (template) => replaceTokens(template, values);
    }
}
