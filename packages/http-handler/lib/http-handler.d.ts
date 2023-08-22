import type { LogRecord } from '@livy/contracts';
import { AbstractLevelBubbleHandler, AbstractLevelBubbleHandlerOptions } from '@livy/util/handlers/abstract-level-bubble-handler';
import { Options as GotOptions } from 'got';
type MaybeArray<T> = T | T[];
type Created<T, U extends any[] = []> = (...args: U) => T;
type Creatable<T, U extends any[] = []> = T | Created<T, U>;
interface HttpHandlerOptions<AllowBatchRequests extends boolean> extends AbstractLevelBubbleHandlerOptions {
    /**
     * Whether batch handling should send all pending records as an array in one request
     */
    allowBatchRequests: AllowBatchRequests;
    /**
     * Options to pass to each `got` call
     */
    requestOptions: Partial<Creatable<GotOptions, AllowBatchRequests extends true ? [MaybeArray<LogRecord>] : [LogRecord]>>;
    /**
     * Whether HTTP requests in batch handling must be executed sequentially instead of in parallel
     * Has no effect if `allowBatchRequests` is enabled
     */
    sequential: boolean;
}
type HttpHandlerUrl<AllowBatchRequests extends boolean> = Creatable<'string' | GotOptions, AllowBatchRequests extends true ? [MaybeArray<LogRecord>] : [LogRecord]>;
declare const HttpHandler_base: typeof AbstractLevelBubbleHandler & (new (...args: any[]) => {
    _processors: Set<import("@livy/contracts").ProcessorInterfaceOrFunction>;
    readonly processors: Set<import("@livy/contracts").ProcessorInterfaceOrFunction>;
    processRecord(record: LogRecord): LogRecord;
    resetProcessors(): void;
    reset(): void;
});
/**
 * Sends log records to an HTTP endpoint
 */
export declare class HttpHandler<AllowBatchRequests extends boolean> extends HttpHandler_base {
    private url;
    private requestOptions;
    private sequential;
    private allowBatchRequests;
    /**
     *
     * @param url     The URL to send the records to, or a callback which generates the URL from records
     * @param options
     */
    constructor(url: HttpHandlerUrl<AllowBatchRequests>, { requestOptions, sequential, allowBatchRequests, ...options }?: Partial<HttpHandlerOptions<AllowBatchRequests>>);
    handle(record: LogRecord): Promise<boolean | undefined>;
    /**
     * @inheritdoc
     */
    handleBatch(records: LogRecord[]): Promise<void>;
}
export {};
