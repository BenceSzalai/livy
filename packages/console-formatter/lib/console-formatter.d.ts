import { AnsiLineFormatter, AnsiLineFormatterOptions } from '@livy/ansi-line-formatter';
export interface ConsoleFormatterOptions extends AnsiLineFormatterOptions {
    /**
     * Specifies level of nesting.
     * Until this level nested objects are printed in YAML like nested layout.
     * Below this level nested object structures are printed as inline JSON.
     */
    flowLevel: number | undefined;
}
/**
 * Formats log records with highlighting for terminals in a human-readable way
 */
export declare class ConsoleFormatter extends AnsiLineFormatter {
    /**
     * Specifies level of nesting.
     * Until this level nested objects are printed in YAML like nested layout.
     * Below this level nested object structures are printed as inline JSON.
     */
    flowLevel: number | undefined;
    constructor({ flowLevel, ...options }?: Partial<ConsoleFormatterOptions>);
    /**
     * Format a record's context object
     *
     * @param context The context to format
     */
    protected formatContext(context: any, ignoreEmpty: boolean): string;
    /**
     * Format a record's extra object
     *
     * @param context The extra to format
     */
    protected formatExtra(extra: any, ignoreEmpty: boolean): string;
    /**
     * Clone a value but replace any occurrences of `value` in it
     *
     * @param container   The container to strip `value` from
     * @param value       The value to replace
     * @param replacement The string to put in place of undefined
     * @param cache       The internal cache used to avoid cycles
     */
    private cloneAndReplace;
    /**
     * @inheritdoc
     */
    protected formatData(object: any, ignoreEmpty: boolean): string;
    /**
     * Indents a (multiline) string with the given padding
     *
     * @param text The string to be indented
     * @param pad  The padding to be prepended on each line
     * @return string
     */
    protected indent(text: string, pad?: string): string;
}
