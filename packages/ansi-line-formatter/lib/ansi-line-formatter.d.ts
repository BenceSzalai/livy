import type { LogLevel } from '@livy/contracts';
import { LineFormatter, LineFormatterOptions } from '@livy/line-formatter';
import { ForegroundColorName, ModifierName } from 'chalk';
import { DateTime } from 'luxon';
export type ColorString = `${ForegroundColorName}.${ModifierName}` | ForegroundColorName;
export interface AnsiLineFormatterOptions extends LineFormatterOptions {
    /**
     * Whether records should be highlighted with ANSI escape sequences
     * If not provided (or set to `undefined`), color support is going
     * to be automatically detected
     */
    decorated: boolean | undefined;
    /**
     * The colors to use for each log level.
     * The missing levels will use their default colors.
     */
    levelColors: Partial<Record<LogLevel, ColorString>>;
}
/**
 * Formats log records as single lines with terminal highlighting
 */
export declare class AnsiLineFormatter extends LineFormatter {
    /**
     * Whether records should be highlighted with ANSI escape sequences
     */
    decorated: boolean | undefined;
    /**
     * The colors to use for each log level.
     * The missing levels will use their default colors.
     */
    levelColors: Partial<Record<LogLevel, ColorString>>;
    constructor({ decorated, levelColors, ...options }?: Partial<AnsiLineFormatterOptions>);
    /**
     * @inheritdoc
     */
    protected formatDatetime(datetime: DateTime): string;
    /**
     * @inheritdoc
     */
    protected formatLevel(level: LogLevel): string;
    /**
     * @inheritdoc
     */
    protected formatData(object: any, ignoreEmpty: boolean): string;
    /**
     * Check whether the formatter should use ANSI codes to decorate log records
     */
    shouldDecorate(): boolean;
}
