import type { FormatterInterface, LogRecord } from '@livy/contracts';
import { AbstractLevelBubbleHandler, AbstractLevelBubbleHandlerOptions } from '@livy/util/handlers/abstract-level-bubble-handler';
import { AnyObject, RequireAtLeastOne, SetRequired } from '@livy/util/types';
import { Transporter as Nodemailer, Transport as NodemailerTransport } from 'nodemailer';
import JSONTransport from 'nodemailer/lib/json-transport';
import SendmailTransport from 'nodemailer/lib/sendmail-transport';
import SESTransport from 'nodemailer/lib/ses-transport';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import StreamTransport from 'nodemailer/lib/stream-transport';
export type Transport = SMTPTransport.Options | SendmailTransport.Options | StreamTransport.Options | JSONTransport.Options | SESTransport.Options | NodemailerTransport;
type TemplateReplacer = (template: string) => string;
export interface MailTemplate {
    text: string;
    html: string;
}
export interface MailHandlerOptions extends AbstractLevelBubbleHandlerOptions {
    /**
     * The subject of the emails to send
     * All properties of the corresponding log record are available as %tokens%
     */
    subject: string;
    /**
     * One or more receivers of the emails
     */
    to: string | string[];
    /**
     * The sender of the emails to send
     */
    from: string;
    /**
     * The formatter for the HTML part of mails
     */
    htmlFormatter: FormatterInterface;
    /**
     * The formatter for the plain text part of mails
     */
    plainTextFormatter: FormatterInterface;
    /**
     * A template for either HTML or plain text emails or both
     * The %logs% token will be replaced with the logged record(s)
     */
    template: RequireAtLeastOne<MailTemplate>;
    /**
     * Nodemailer transport options (e.g. for using SMTP)
     */
    transport: Transport;
}
type PartialMailHandlerOptions = SetRequired<Partial<MailHandlerOptions>, 'subject' | 'to' | 'from'>;
declare const MailHandler_base: typeof AbstractLevelBubbleHandler & (new (...args: any[]) => {
    _processors: Set<import("@livy/contracts").ProcessorInterfaceOrFunction>;
    readonly processors: Set<import("@livy/contracts").ProcessorInterfaceOrFunction>;
    processRecord(record: LogRecord): LogRecord;
    resetProcessors(): void;
    reset(): void;
});
/**
 * Dispenses log records via email
 */
export declare class MailHandler extends MailHandler_base {
    protected mailer: Nodemailer;
    protected subject: string;
    protected to: string;
    protected from: string;
    protected template: MailTemplate;
    protected _htmlFormatter?: FormatterInterface;
    protected _plainTextFormatter?: FormatterInterface;
    constructor({ subject, to, from, level, htmlFormatter, plainTextFormatter, template, transport, ...options }: PartialMailHandlerOptions);
    /**
     * Supplement possibly missing template properties
     *
     * @param templates The templates as provided by the user
     */
    protected supplementTemplates(templates: RequireAtLeastOne<MailTemplate>): MailTemplate;
    /**
     * Get the default HTML formatter
     */
    protected get defaultHtmlFormatter(): FormatterInterface;
    /**
     * Get the formatter for the HTML part of mails
     */
    get htmlFormatter(): FormatterInterface;
    /**
     * Set the formatter for the HTML part of mails
     *
     * @param formatter The formatter to use
     */
    set htmlFormatter(formatter: FormatterInterface);
    /**
     * Get the default plain text formatter
     */
    protected get defaultPlainTextFormatter(): FormatterInterface;
    /**
     * Get the formatter for the plain text part of mails
     */
    get plainTextFormatter(): FormatterInterface;
    /**
     * Set the formatter for the plain text part of mails
     *
     * @param formatter The formatter to use
     */
    set plainTextFormatter(formatter: FormatterInterface);
    /**
     * Get the subject of an email
     *
     * @param record        The log record for the mail to send
     * @param tokenReplacer The token replacer to use on the subject
     */
    protected getSubject(record: LogRecord, tokenReplacer: TemplateReplacer): string;
    /**
     * Actually send the email via `sendmail`
     *
     * @param subject  The subject to use for the mail
     * @param textLogs The logs to send, in plain text format
     * @param htmlLogs The logs to send, in HTML format
     */
    protected send(subject: string, textLogs: string, htmlLogs?: string): Promise<void>;
    /**
     * @inheritdoc
     */
    handle(record: LogRecord): Promise<boolean | undefined>;
    /**
     * @inheritdoc
     */
    handleBatch(records: LogRecord[]): Promise<void>;
    /**
     * Create a token replacer function
     *
     * @param values The key-value pairs to replace
     */
    protected createTokenReplacer(values: AnyObject): TemplateReplacer;
}
export {};
