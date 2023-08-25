import type { FormatterInterface, LogRecord } from '@livy/contracts';
import { AbstractSyncFormattingProcessingHandler } from '@livy/util/handlers/abstract-formatting-processing-handler';
import { AbstractLevelBubbleHandlerOptions } from '@livy/util/handlers/abstract-level-bubble-handler';
export interface ConsoleHandlerOptions extends AbstractLevelBubbleHandlerOptions {
    /**
     * The Console object to use
     */
    console: Console;
    /**
     * The formatter to use
     */
    formatter: FormatterInterface;
}
/**
 * Writes log records to the terminal
 */
export declare class ConsoleHandler extends AbstractSyncFormattingProcessingHandler {
    private console;
    constructor({ console, formatter, ...options }?: Partial<ConsoleHandlerOptions>);
    /**
     * @inheritdoc
     */
    protected writeSync(record: LogRecord, formatted: string): void;
    /**
     * @inheritdoc
     */
    getDefaultFormatter(): FormatterInterface;
}
