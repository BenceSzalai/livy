/**
 * Note: The very basic line formatter is implemented in the @livy/util package to avoid circular dependencies
 */
import type { LogLevel, LogRecord, SeverityLevel } from '@livy/contracts';
import { DateTime } from 'luxon';
import { Stringified } from '../types.js';
import { AbstractBatchFormatter } from './abstract-batch-formatter.js';
import { IncludedRecordProperties } from './included-record-properties.js';
/**
 * Formats log records as single lines
 */
export interface LineFormatterOptions {
    /**
     * Which log record properties to include in the output
     */
    include: Partial<IncludedRecordProperties>;
    /**
     * Whether to omit empty context objects (only if extra is empty as well)
     */
    ignoreEmptyContext: boolean;
    /**
     * Whether to omit empty extra objects
     */
    ignoreEmptyExtra: boolean;
}
/**
 * Serializes a log entry into a single line
 */
export declare class LineFormatter extends AbstractBatchFormatter {
    /**
     * Which log record properties to include in the output
     */
    include: IncludedRecordProperties;
    /**
     * Whether to omit empty context data (if extra is empty as well)
     */
    ignoreEmptyContext: boolean;
    /**
     * Whether to omit empty extra data
     */
    ignoreEmptyExtra: boolean;
    constructor({ include, ignoreEmptyContext, ignoreEmptyExtra, }?: Partial<LineFormatterOptions>);
    /**
     * @inheritdoc
     */
    format(record: LogRecord): string;
    /**
     * Assemble the formatted parts of a record into a string
     *
     * @param parts The formatted parts to assemble
     */
    protected assembleFormattedRecord({ datetime, channel, level, severity, message, context, extra, }: Stringified<LogRecord>): string;
    /**
     * Format a record's datetime
     *
     * @param datetime The DateTime object to format
     */
    protected formatDatetime(datetime: DateTime): string;
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
     * Format a record's context object
     *
     * @param context     The context to format
     * @param ignoreEmpty Whether to return an empty serialization for an empty context object
     */
    protected formatContext(context: any, ignoreEmpty?: boolean): string;
    /**
     * Format a record's extra object
     *
     * @param context     The extra to format
     * @param ignoreEmpty Whether to return an empty serialization for an empty extra object
     */
    protected formatExtra(extra: any, ignoreEmpty?: boolean): string;
    /**
     * Format a single record property
     *
     * @param data        The data to format
     * @param ignoreEmpty Whether to return an empty serialization for empty data
     */
    protected formatData(data: any, ignoreEmpty?: boolean): string;
}
