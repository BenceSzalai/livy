/**
 * Check whether a value implements the SyncHandlerInterface
 *
 * @param value The value to check
 */
export function isSyncHandlerInterface(value) {
    return (typeof value === 'object' &&
        value !== null &&
        typeof value.handleSync === 'function' &&
        typeof value.handleBatchSync === 'function');
}
