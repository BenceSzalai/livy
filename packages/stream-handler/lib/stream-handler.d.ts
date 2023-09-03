/// <reference types="node" />
import type { FormatterInterface, LogRecord } from '@livy/contracts';
import { AbstractFormattingProcessingHandler } from '@livy/util/handlers/abstract-formatting-processing-handler';
import { AbstractLevelBubbleHandlerOptions } from '@livy/util/handlers/abstract-level-bubble-handler';
import * as stream from 'node:stream';
export interface StreamHandlerOptions extends AbstractLevelBubbleHandlerOptions {
    /**
     * The formatter to use
     */
    formatter: FormatterInterface;
}
/**
 * Writes log records to a Node.js stream
 */
export declare class StreamHandler extends AbstractFormattingProcessingHandler {
    protected stream: stream.Writable;
    constructor(stream: stream.Writable, { formatter, ...options }?: Partial<StreamHandlerOptions>);
    /**
     * @inheritdoc
     */
    protected write(_record: LogRecord, formatted: string): Promise<void>;
}
