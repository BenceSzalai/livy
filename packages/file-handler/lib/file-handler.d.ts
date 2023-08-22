import type { ClosableHandlerInterface, FormatterInterface, LogRecord } from '@livy/contracts';
import { AbstractSyncFormattingProcessingHandler } from '@livy/util/handlers/abstract-formatting-processing-handler';
import { AbstractLevelBubbleHandlerOptions } from '@livy/util/handlers/abstract-level-bubble-handler';
export interface FileHandlerOptions extends AbstractLevelBubbleHandlerOptions {
    /**
     * The formatter to use
     */
    formatter: FormatterInterface;
    /**
     * Prepend one or more lines to the file when it's first created
     * This can be useful to prepend header data, like in CSV
     */
    prefix: string | string[];
    /**
     * Write the file in append mode (i.e. don't erase previous contents)
     */
    append: boolean;
}
/**
 * Writes log records to a file
 */
export declare class FileHandler extends AbstractSyncFormattingProcessingHandler implements ClosableHandlerInterface {
    protected fileHandle?: number;
    protected path: string;
    protected append: boolean;
    protected prefix: string[];
    constructor(path: string, { formatter, prefix, append, ...options }?: Partial<FileHandlerOptions>);
    /**
     * @inheritdoc
     */
    close(): void;
    /**
     * Get the prefix string to write
     */
    private get prefixString();
    /**
     * Write the formatted record to the file
     */
    protected write(_record: LogRecord, formatted: string): Promise<void>;
    /**
     * Write the formatted record to the file
     */
    protected writeSync(_record: LogRecord, formatted: string): void;
}
