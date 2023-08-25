/**
 * Check whether a value implements the `ProcessableHandlerInterface`
 *
 * @param value The value to check
 */
export function isProcessableHandlerInterface(value) {
    return (typeof value === 'object' &&
        value !== null &&
        value.processors instanceof Set);
}
