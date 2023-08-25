/**
 * Check whether a value implements the ClosableHandlerInterface
 *
 * @param value The value to check
 */
export function isClosableHandlerInterface(value) {
    return (typeof value === 'object' &&
        value !== null &&
        typeof value.close === 'function');
}
