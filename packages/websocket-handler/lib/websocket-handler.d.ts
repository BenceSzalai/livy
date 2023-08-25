import type { ClosableHandlerInterface, FormatterInterface, LogRecord } from '@livy/contracts';
import { AbstractLevelBubbleHandler, AbstractLevelBubbleHandlerOptions } from '@livy/util/handlers/abstract-level-bubble-handler';
import { Socket, SocketOptions } from 'engine.io-client';
export interface WebSocketHandlerOptions extends AbstractLevelBubbleHandlerOptions {
    /**
     * engine.io client connection options
     */
    connection: Partial<SocketOptions>;
    /**
     * The formatter to use
     */
    formatter: FormatterInterface;
}
declare const WebSocketHandler_base: typeof AbstractLevelBubbleHandler & (new (...args: any[]) => {
    _processors: Set<import("@livy/contracts").ProcessorInterfaceOrFunction>;
    readonly processors: Set<import("@livy/contracts").ProcessorInterfaceOrFunction>;
    processRecord(record: LogRecord): LogRecord;
    resetProcessors(): void;
    reset(): void;
}) & (new (...args: any[]) => {
    explicitFormatter?: FormatterInterface | undefined;
    getDefaultFormatter(): FormatterInterface;
    readonly defaultFormatter: FormatterInterface;
    formatter: FormatterInterface;
    setFormatter(formatter: FormatterInterface): void;
    getFormatter(): FormatterInterface;
});
/**
 * Sends log records to a WebSocket server
 */
export declare class WebSocketHandler extends WebSocketHandler_base implements ClosableHandlerInterface {
    protected connection: Promise<Socket> | undefined;
    protected url: string;
    protected connectionOptions: Partial<SocketOptions>;
    constructor(url: string, { connection, formatter, ...options }?: Partial<WebSocketHandlerOptions>);
    /**
     * Connect to the WebSocket
     */
    connect(): Promise<void>;
    /**
     * Get a connection to the WebSocket
     */
    protected makeConnection(): Promise<Socket>;
    close(): void;
    /**
     * @inheritdoc
     */
    getDefaultFormatter(): FormatterInterface;
    /**
     * @inheritdoc
     */
    handle(record: LogRecord): Promise<boolean | undefined>;
    /**
     * @inheritdoc
     */
    handleBatch(records: LogRecord[]): Promise<void>;
}
export {};
