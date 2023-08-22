/**
 * A tiny and simple performance measurement tool for Node.js and the browser, measuring elapsed time in milliseconds
 */
import { isNodeJs } from './environment.js';
/**
 * An common abstract timer with some base methods
 */
class BaseTimer {
    running() {
        return this.started !== null;
    }
    reset() {
        const value = this.get();
        this.started = null;
        return value;
    }
}
/**
 * A Node.js timer implementation (hrtime based)
 */
export class NodeTimer extends BaseTimer {
    started = null;
    start() {
        this.started = process.hrtime.bigint();
    }
    get() {
        return this.started !== null
            ? Number(process.hrtime.bigint() - this.started) / 10 ** 6
            : null;
    }
}
/* c8 ignore start: The Performance API is not properly implemented in JSDOM */
/**
 * A browser timer implementation (Performance API based)
 */
class BrowserTimer extends BaseTimer {
    started = null;
    start() {
        this.started = performance.now();
    }
    get() {
        return this.started !== null
            ? Number(performance.now() - this.started) / 10 ** 6
            : null;
    }
}
/* c8 ignore stop */
/**
 * Export the appropriate timer class
 */
export const Timer = isNodeJs ? NodeTimer : BrowserTimer;
