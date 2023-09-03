import type { ClosableHandlerInterface, LogRecord } from '@livy/contracts';
import { AbstractLevelBubbleHandler, AbstractLevelBubbleHandlerOptions } from '@livy/util/handlers/abstract-level-bubble-handler';
import { Socket, SocketOptions } from 'socket.io-client';
export interface SocketIoHandlerOptions extends AbstractLevelBubbleHandlerOptions {
    /**
     * Socket.IO client connection options
     */
    connection: Partial<SocketOptions>;
}
declare const SocketIoHandler_base: typeof AbstractLevelBubbleHandler & (new (...args: any[]) => {
    _processors: Set<import("@livy/contracts").ProcessorInterfaceOrFunction>;
    readonly processors: Set<import("@livy/contracts").ProcessorInterfaceOrFunction>;
    processRecord(record: LogRecord): LogRecord;
    resetProcessors(): void;
    reset(): void;
});
/**
 * Sends log records to a Socket.IO server
 *
 * @see https://socket.io
 */
export declare class SocketIoHandler extends SocketIoHandler_base implements ClosableHandlerInterface {
    protected connection: Promise<Socket> | undefined;
    protected url: string;
    protected connectionOptions: Partial<SocketOptions>;
    constructor(url: string, { connection, ...options }?: Partial<SocketIoHandlerOptions>);
    /**
     * Connect to the Socket.IO server
     */
    connect(): Promise<void>;
    /**
     * Get a connection to the Socket.IO server
     */
    protected makeConnection(): Promise<Socket<import("@socket.io/component-emitter").DefaultEventsMap, import("@socket.io/component-emitter").DefaultEventsMap>>;
    /**
     * @inheritdoc
     */
    close(): void;
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
