/**
 * Check whether a value implements the ResettableInterface
 *
 * @param value The value to check
 */
export function isResettableInterface(value) {
    return (typeof value === 'object' &&
        value !== null &&
        typeof value.reset === 'function');
}
