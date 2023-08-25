import type { LogLevel, LogRecord, SeverityLevel } from '@livy/contracts';
import { AbstractBatchFormatter } from '@livy/util/formatters/abstract-batch-formatter';
import { IncludedRecordProperties } from '@livy/util/formatters/included-record-properties';
import { Stringified } from '@livy/util/types';
import { DateTime } from 'luxon';
import { HtmlFormatterThemeInterface } from './themes/html-formatter-theme-interface.js';
export interface HtmlOnelineFormatterOptions {
    /**
     * Which log record properties to include in the output
     */
    include: Partial<IncludedRecordProperties>;
    /**
     * The color theme to use
     */
    theme: HtmlFormatterThemeInterface;
    /**
     * Whether to allow lines to wrap when they're too long
     */
    wrap: boolean;
}
/**
 * Formats log records as single-line HTML
 */
export declare class HtmlOnelineFormatter extends AbstractBatchFormatter {
    /**
     * @inheritdoc
     */
    protected batchDelimiter: string;
    /**
     * The color theme to use
     */
    theme: HtmlFormatterThemeInterface;
    /**
     * Whether to allow lines to wrap when they're too long
     */
    wrap: boolean;
    /**
     * Which log record properties to include in the output
     */
    include: IncludedRecordProperties;
    constructor({ theme, wrap, include, }?: Partial<HtmlOnelineFormatterOptions>);
    /**
     * @inheritdoc
     */
    format(record: LogRecord): string;
    /**
     * Get the (CSS) color of a certain token
     *
     * @param token The token to get the color for
     */
    protected getColor(token: keyof HtmlFormatterThemeInterface): string;
    /**
     * Format a record's level
     *
     * @param level The level to format
     */
    protected formatLevel(level: LogLevel): string;
    /**
     * Format a record's severity
     *
     * @param severity The severity to format
     */
    protected formatSeverityMap(severity: SeverityLevel): string;
    /**
     * Format a record's channel
     *
     * @param channel The channel to format
     */
    protected formatChannel(channel: string): string;
    /**
     * Format a record's message
     *
     * @param message The message to format
     */
    protected formatMessage(message: string): string;
    /**
     * Get CSS style for a token
     *
     * @param token The context token to handle
     */
    protected getContextTokenStyle(token: keyof HtmlFormatterThemeInterface): string | undefined;
    /**
     * Serialize the style of a log record as CSS
     */
    protected stringifyStyles(): string;
    /**
     * Assemble the formatted parts of a record into a string
     *
     * @param parts The formatted parts to assemble
     */
    protected assembleFormattedRecord({ channel, datetime, level, severity, message, context, extra, }: Stringified<LogRecord>): string;
    /**
     * Serialize a piece of data
     *
     * @param data The data to serialize
     */
    protected serializeData(data: any): string;
    /**
     * Format the log record's time
     *
     * @param datetime The DateTime object to format
     */
    protected formatDatetime(datetime: DateTime): string;
    /**
     * Format a record's context object
     *
     * @param context     The context to format
     * @param ignoreEmpty Whether to return an empty serialization for an empty context object
     */
    protected formatContext(context?: any, ignoreEmpty?: boolean): string;
    /**
     * Format a record's extra object
     *
     * @param context     The extra to format
     * @param ignoreEmpty Whether to return an empty serialization for an empty extra object
     */
    protected formatExtra(extra?: any, ignoreEmpty?: boolean): string;
    /**
     * Format a single record property
     *
     * @param data        The data to format
     * @param ignoreEmpty Whether to return an empty serialization for empty data
     */
    protected formatData(data: any, ignoreEmpty?: boolean): string;
}
