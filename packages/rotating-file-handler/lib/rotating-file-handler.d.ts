import type { ClosableHandlerInterface, FormatterInterface, LogRecord } from '@livy/contracts';
import { AbstractSyncFormattingProcessingHandler } from '@livy/util/handlers/abstract-formatting-processing-handler';
import { AbstractLevelBubbleHandlerOptions } from '@livy/util/handlers/abstract-level-bubble-handler';
import { MaxAgeStrategyOptions } from './max-age-strategy.js';
import { MaxSizeStrategyOptions } from './max-size-strategy.js';
interface BaseRotatingFileHandlerOptions extends AbstractLevelBubbleHandlerOptions {
    /**
     * The formatter to use
     */
    formatter: FormatterInterface;
    /**
     * Number of log files to keep at maximum
     */
    maxFiles: number;
}
export type RotatingFileHandlerOptions = BaseRotatingFileHandlerOptions & (MaxAgeStrategyOptions | MaxSizeStrategyOptions);
declare const RotatingFileHandler_base: typeof AbstractSyncFormattingProcessingHandler & (new (...args: any[]) => {
    explicitFormatter?: FormatterInterface | undefined;
    getDefaultFormatter(): FormatterInterface;
    readonly defaultFormatter: FormatterInterface;
    formatter: FormatterInterface;
    setFormatter(formatter: FormatterInterface): void;
    getFormatter(): FormatterInterface;
});
/**
 * Stores log records to files that are rotated by datetime or file size
 * and only a limited number of files is kept.
 */
export declare class RotatingFileHandler extends RotatingFileHandler_base implements ClosableHandlerInterface {
    private fileHandler;
    private directory;
    private maxFiles;
    private rotationStrategyHandler;
    constructor(pathTemplate: string, { maxFiles, strategy, threshold, formatter, ...options }?: Partial<RotatingFileHandlerOptions>);
    /**
     * Update the file handler to use the current filename
     */
    private updateFileHandler;
    /**
     * @inheritdoc
     */
    close(): void;
    /**
     * Rotate if needed
     */
    private rotateIfNeeded;
    /**
     * @inheritdoc
     */
    protected write(record: LogRecord): Promise<void>;
    /**
     * @inheritdoc
     */
    protected writeSync(record: LogRecord): void;
}
export {};
