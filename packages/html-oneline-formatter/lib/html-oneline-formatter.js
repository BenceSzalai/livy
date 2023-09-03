import { AbstractBatchFormatter } from '@livy/util/formatters/abstract-batch-formatter';
import { isEmpty, omit } from '@livy/util/helpers';
import { HTML } from '@livy/util/html';
import { toHtml as stringifyHtml } from 'hast-util-to-html';
import { lowlight } from 'lowlight';
import { u } from 'unist-builder';
import { map } from 'unist-util-map';
lowlight.registerLanguage('json', (await import('highlight.js/lib/languages/json')).default);
/**
 * Relevant tokens of the lowlight parser
 */
const LowlightTokenMap = {
    attr: 'data_key',
    string: 'data_value_string',
    number: 'data_value_number',
    literal: 'data_value_literal',
};
/**
 * Formats log records as single-line HTML
 */
export class HtmlOnelineFormatter extends AbstractBatchFormatter {
    /**
     * @inheritdoc
     */
    batchDelimiter = '';
    /**
     * The color theme to use
     */
    theme;
    /**
     * Whether to allow lines to wrap when they're too long
     */
    wrap;
    /**
     * Which log record properties to include in the output
     */
    include;
    constructor({ theme = {}, wrap = false, include = {}, } = {}) {
        super();
        this.theme = theme;
        this.wrap = wrap;
        this.include = {
            datetime: true,
            channel: false,
            level: true,
            severity: false,
            message: true,
            context: true,
            extra: true,
            ...include,
        };
    }
    /**
     * @inheritdoc
     */
    format(record) {
        const message = record.message;
        const formattedExtra = this.formatExtra(record.extra);
        return this.assembleFormattedRecord({
            datetime: this.formatDatetime(record.datetime),
            channel: this.formatChannel(record.channel),
            level: this.formatLevel(record.level),
            severity: this.formatSeverityMap(record.severity),
            message: this.formatMessage(message),
            context: this.formatContext(record.context, formattedExtra.length === 0),
            extra: formattedExtra,
        });
    }
    /**
     * Get the (CSS) color of a certain token
     *
     * @param token The token to get the color for
     */
    getColor(token) {
        if (token === 'background' && !('background' in this.theme)) {
            return 'transparent';
        }
        return this.theme[token] || 'inherit';
    }
    /**
     * Format a record's level
     *
     * @param level The level to format
     */
    formatLevel(level) {
        if (!this.include.level) {
            return '';
        }
        const color = this.getColor(`level_${level}`);
        const text = level.toUpperCase();
        let punctuationPrefix = '[';
        let punctuationSuffix = ']';
        const punctuationColor = this.getColor('punctuation');
        if (punctuationColor !== 'inherit') {
            punctuationPrefix = `<span style="color: ${punctuationColor}">[</span>`;
            punctuationSuffix = `<span style="color: ${punctuationColor}">]</span>`;
        }
        if (color !== 'inherit') {
            return `${punctuationPrefix}<span style="color: ${color}">${text}</span>${punctuationSuffix}`;
        }
        else {
            return punctuationPrefix + text + punctuationSuffix;
        }
    }
    /**
     * Format a record's severity
     *
     * @param severity The severity to format
     */
    formatSeverityMap(severity) {
        if (!this.include.severity) {
            return '';
        }
        const punctuationColor = this.getColor('punctuation');
        if (punctuationColor !== 'inherit') {
            return `<span style="color: ${punctuationColor}"> [${severity}]</span>`;
        }
        else {
            return ` [${severity}]`;
        }
    }
    /**
     * Format a record's channel
     *
     * @param channel The channel to format
     */
    formatChannel(channel) {
        if (!this.include.channel) {
            return '';
        }
        return channel;
    }
    /**
     * Format a record's message
     *
     * @param message The message to format
     */
    formatMessage(message) {
        if (!this.include.message) {
            return '';
        }
        return message;
    }
    /**
     * Get CSS style for a token
     *
     * @param token The context token to handle
     */
    getContextTokenStyle(token) {
        const color = this.getColor(token);
        if (color !== 'inherit') {
            return `color: ${color}`;
        }
        else {
            return undefined;
        }
    }
    /**
     * Serialize the style of a log record as CSS
     */
    stringifyStyles() {
        const style = {
            margin: '0',
            padding: '0.3em 0.8em 0.3em',
            fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
            whiteSpace: this.wrap ? 'pre-wrap' : 'nowrap',
            backgroundColor: this.getColor('background'),
            color: this.getColor('text'),
        };
        return Object.entries(style)
            .filter(([, value]) => typeof value === 'string' && value.length > 0)
            .map(([property, value]) => `${property.replace(/([A-Z])/, (_, letter) => `-${letter.toLowerCase()}`)}: ${value}`)
            .join(';');
    }
    /**
     * Assemble the formatted parts of a record into a string
     *
     * @param parts The formatted parts to assemble
     */
    assembleFormattedRecord({ channel, datetime, level, severity, message, context, extra, }) {
        return `<pre style="${this.stringifyStyles()}">${datetime}${channel} ${level}${severity} ${message}${context}${extra}</pre>`;
    }
    /**
     * Serialize a piece of data
     *
     * @param data The data to serialize
     */
    serializeData(data) {
        const result = JSON.stringify(data);
        return typeof result !== 'string' ? 'undefined' : result;
    }
    /**
     * Format the log record's time
     *
     * @param datetime The DateTime object to format
     */
    formatDatetime(datetime) {
        if (!this.include.datetime) {
            return '';
        }
        const punctuationColor = this.getColor('punctuation');
        const formattedTime = datetime.toFormat('yyyy-MM-dd HH:mm:ss ');
        if (punctuationColor !== 'inherit') {
            return HTML `<span style="color: ${this.getColor('punctuation')}">${formattedTime}</span>`.toString();
        }
        else {
            return formattedTime;
        }
    }
    /**
     * Format a record's context object
     *
     * @param context     The context to format
     * @param ignoreEmpty Whether to return an empty serialization for an empty context object
     */
    formatContext(context, ignoreEmpty = true) {
        if (!this.include.context) {
            return '';
        }
        const formatted = this.formatData(context, ignoreEmpty);
        if (formatted.length === 0 && ignoreEmpty) {
            return '';
        }
        else {
            return ` ${formatted}`;
        }
    }
    /**
     * Format a record's extra object
     *
     * @param context     The extra to format
     * @param ignoreEmpty Whether to return an empty serialization for an empty extra object
     */
    formatExtra(extra, ignoreEmpty = true) {
        if (!this.include.extra) {
            return '';
        }
        const formatted = this.formatData(extra, ignoreEmpty);
        if (formatted.length === 0 && ignoreEmpty) {
            return '';
        }
        else {
            return ` ${formatted}`;
        }
    }
    /**
     * Format a single record property
     *
     * @param data        The data to format
     * @param ignoreEmpty Whether to return an empty serialization for empty data
     */
    formatData(data, ignoreEmpty = true) {
        if (ignoreEmpty && isEmpty(data)) {
            return '';
        }
        else {
            const stringified = this.serializeData(data);
            if (!('data_key' in this.theme) &&
                !('data_value_string' in this.theme) &&
                !('data_value_number' in this.theme) &&
                !('data_value_literal' in this.theme)) {
                return stringified;
            }
            const tree = lowlight.highlight('json', stringified).children;
            const highlightedContextTree = map(u('root', tree), node => {
                if (node &&
                    node.type === 'element' &&
                    typeof node.properties === 'object' &&
                    'className' in node.properties) {
                    return {
                        ...node,
                        properties: {
                            ...omit(node.properties, 'className'),
                            style: node.properties.className
                                .filter((className) => className.startsWith('hljs-'))
                                .map((className) => this.getContextTokenStyle(LowlightTokenMap[className.slice(5)]))
                                .filter(Boolean)
                                .join('; '),
                        },
                    };
                }
                else {
                    return node;
                }
            });
            const formattedJson = stringifyHtml(highlightedContextTree).toString();
            const punctuationColor = this.getColor('punctuation');
            if (punctuationColor !== 'inherit') {
                return `<span style="color: ${punctuationColor}">${formattedJson}</span>`;
            }
            else {
                return formattedJson;
            }
        }
    }
}
