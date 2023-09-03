import type { LogRecord } from '@livy/contracts';
import { Promisable } from '../types.js';
import { AbstractLevelBubbleHandler } from './abstract-level-bubble-handler.js';
declare const AbstractFormattingProcessingHandler_base: typeof AbstractLevelBubbleHandler & {
    new (...args: any[]): {
        _processors: Set<import("@livy/contracts").ProcessorInterfaceOrFunction>;
        readonly processors: Set<import("@livy/contracts").ProcessorInterfaceOrFunction>;
        processRecord(record: LogRecord): LogRecord;
        resetProcessors(): void;
        reset(): void;
    };
} & {
    new (...args: any[]): {
        explicitFormatter?: import("@livy/contracts").FormatterInterface | undefined;
        getDefaultFormatter(): import("@livy/contracts").FormatterInterface;
        readonly defaultFormatter: import("@livy/contracts").FormatterInterface;
        formatter: import("@livy/contracts").FormatterInterface;
        setFormatter(formatter: import("@livy/contracts").FormatterInterface): void;
        getFormatter(): import("@livy/contracts").FormatterInterface;
    };
};
/**
 * Base Handler class providing the Handler structure, including processors and formatters
 * Classes extending it should (in most cases) only implement `write`
 */
export declare abstract class AbstractFormattingProcessingHandler extends AbstractFormattingProcessingHandler_base {
    /**
     * @inheritdoc
     */
    handle(record: LogRecord): Promise<boolean>;
    /**
     * Write the record down to the log of the implementing handler
     *
     * @param record
     * @param formatted
     */
    protected abstract write(record: LogRecord, formatted: string): Promisable<void>;
}
declare const AbstractSyncFormattingProcessingHandler_base: typeof AbstractLevelBubbleHandler & {
    new (...args: any[]): {
        _processors: Set<import("@livy/contracts").ProcessorInterfaceOrFunction>;
        readonly processors: Set<import("@livy/contracts").ProcessorInterfaceOrFunction>;
        processRecord(record: LogRecord): LogRecord;
        resetProcessors(): void;
        reset(): void;
    };
} & {
    new (...args: any[]): {
        explicitFormatter?: import("@livy/contracts").FormatterInterface | undefined;
        getDefaultFormatter(): import("@livy/contracts").FormatterInterface;
        readonly defaultFormatter: import("@livy/contracts").FormatterInterface;
        formatter: import("@livy/contracts").FormatterInterface;
        setFormatter(formatter: import("@livy/contracts").FormatterInterface): void;
        getFormatter(): import("@livy/contracts").FormatterInterface;
    };
};
/**
 * Base Handler class providing the Handler structure, including processors and formatters
 * Classes extending it should (in most cases) only implement `writeSync` and possibly `write`
 */
export declare abstract class AbstractSyncFormattingProcessingHandler extends AbstractSyncFormattingProcessingHandler_base {
    private doHandle;
    /**
     * @inheritdoc
     */
    handle(record: LogRecord): Promise<boolean>;
    /**
     * @inheritdoc
     */
    handleSync(record: LogRecord): boolean;
    /**
     * Write the record down to the log of the implementing handler
     *
     * @param record
     * @param formatted
     */
    protected write(record: LogRecord, formatted: string): Promise<void>;
    /**
     * Write the record down to the log of the implementing handler
     *
     * @param record
     * @param formatted
     */
    protected abstract writeSync(record: LogRecord, formatted: string): void;
}
export {};
