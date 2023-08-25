/**
 * A tiny and simple performance measurement tool for Node.js and the browser, measuring elapsed time in milliseconds
 */
/**
 * The common timer interface
 */
export interface TimerInterface {
    start(): void;
    get(): number | null;
    reset(): number | null;
    running(): boolean;
}
/**
 * An common abstract timer with some base methods
 */
declare abstract class BaseTimer implements TimerInterface {
    protected abstract started: number | bigint | null;
    abstract start(): void | null;
    abstract get(): number | null;
    running(): boolean;
    reset(): number | null;
}
/**
 * A Node.js timer implementation (hrtime based)
 */
export declare class NodeTimer extends BaseTimer {
    protected started: bigint | null;
    start(): void;
    get(): number | null;
}
/**
 * A browser timer implementation (Performance API based)
 */
declare class BrowserTimer extends BaseTimer {
    protected started: number | null;
    start(): void;
    get(): number | null;
}
/**
 * Export the appropriate timer class
 */
export declare const Timer: typeof NodeTimer | typeof BrowserTimer;
export {};
