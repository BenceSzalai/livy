import type { LoggerInterface } from '@livy/contracts';
import { ConsoleAdapterInterface } from './console-adapter-interface.js';
import { TimerInterface } from './timer.js';
import { AnyObject } from './types.js';
/**
 * @inheritdoc
 */
export declare class ConsoleAdapter implements ConsoleAdapterInterface {
    protected counters: AnyObject<number>;
    protected timers: AnyObject<TimerInterface>;
    protected indentation: number;
    protected logger: LoggerInterface;
    constructor(logger: LoggerInterface);
    protected get indentationString(): string;
    /**
     * @inheritdoc
     */
    count(label?: string): void;
    /**
     * @inheritdoc
     */
    countReset(label?: string): void;
    /**
     * @inheritdoc
     */
    debug(message?: any, ...optionalParameters: any[]): void;
    /**
     * @inheritdoc
     */
    dir(object: any): void;
    /**
     * @inheritdoc
     */
    dirxml(...data: any[]): void;
    /**
     * @inheritdoc
     */
    error(message?: any, ...optionalParameters: any[]): void;
    /**
     * @inheritdoc
     */
    group(label?: any): void;
    /**
     * The `console.groupCollapsed()` function is an alias for `console.group()`
     */
    groupCollapsed(label?: any): void;
    /**
     * @inheritdoc
     */
    groupEnd(): void;
    /**
     * @inheritdoc
     */
    info(message?: any, ...optionalParameters: any[]): void;
    /**
     * @inheritdoc
     */
    log(message?: any, ...optionalParameters: any[]): void;
    /**
     * @inheritdoc
     */
    table(tabularData: any, properties?: string | string[]): void;
    /**
     * @inheritdoc
     */
    time(label?: string): void;
    /**
     * @inheritdoc
     */
    timeEnd(label?: string): void;
    /**
     * @inheritdoc
     */
    timeLog(label?: string, ...data: any[]): void;
    /**
     * @inheritdoc
     */
    trace(...data: any[]): void;
    /**
     * @inheritdoc
     */
    warn(message?: any, ...optionalParameters: any[]): void;
}
