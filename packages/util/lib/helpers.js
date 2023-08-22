/**
 * Sanitize function, removes special regex characters from a string.
 * -> Creates a literal part of a RegExp
 * So you can do this without worrying about special chars:
 *
 * @example
 * new RegExp(sanitizeRegex(anyString))
 */
export function sanitizeRegex(value) {
    return value.replaceAll(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
}
/**
 * Replace %tokens% in a template
 *
 * @param template The template to handle
 * @param values   Values to replace in the template when wrapped in % characters
 *
 * @example
 * replaceTokens('Hello %name%!', {
 *   name: 'World'
 * })
 * // 'Hello World!'
 *
 * @example
 * replaceTokens('%unknown-token%', {}) // '%unknown-token%'
 */
export function replaceTokens(template, values) {
    const patternRegex = new RegExp(`%(${Object.keys(values).map(sanitizeRegex).join('|')})%`, 'g');
    return template.replaceAll(patternRegex, (_, token) => values[token]);
}
/**
 * Remove HTML tags from a string
 *
 * @param value The string to sanitize
 *
 * @example
 * stripTags('Hello <strong>World</strong>!') // 'Hello World!'
 */
export function stripTags(value) {
    return value.replaceAll(/(<([^>]+)>)/gi, '');
}
/**
 * Escape HTML entities in a string
 *
 * @param value The string to sanitize
 *
 * @example
 * escapeHtmlEntities('foo & bar') // 'foo &amp; bar'
 */
export function escapeHtmlEntities(value) {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;');
}
export function omit(object, ...properties) {
    const copy = { ...object };
    for (const property of properties) {
        delete copy[property];
    }
    return copy;
}
/**
 * Check whether a value is empty (i.e. null, undefined, empty string, empty array, empty plain object)
 *
 * @param value The value to check
 */
export function isEmpty(value) {
    if (value == null) {
        return true;
    }
    if (typeof value === 'string') {
        return value.length === 0;
    }
    if (Array.isArray(value)) {
        return value.length === 0;
    }
    if (typeof value === 'object') {
        const prototype = Object.getPrototypeOf(value);
        return ((prototype === Object.prototype || prototype === null) &&
            Object.keys(value).length === 0);
    }
    return false;
}
/**
 * Capitalize the first letter of a string
 *
 * @param value The string to capitalize
 *
 * @example
 * capitalizeFirstLetter('hello world') // 'Hello world'
 * capitalizeFirstLetter('Hello world') // 'Hello world'
 * capitalizeFirstLetter('...') // '...'
 */
export function capitalizeFirstLetter(value) {
    if (value.length === 0) {
        return value;
    }
    return value[0].toUpperCase() + value.slice(1);
}
/**
 * Check whether a value is a primitive
 *
 * @param value The value to type-check
 */
export function isPrimitive(value) {
    return (value === null ||
        ['undefined', 'string', 'number', 'boolean', 'symbol', 'bigint'].includes(typeof value));
}
/**
 * Get an obvious type name for a value
 *
 * @param value The value to type-check
 */
export function getObviousTypeName(value) {
    if (value === null) {
        return 'null';
    }
    else if (Array.isArray(value)) {
        return 'array';
    }
    else {
        return typeof value;
    }
}
/**
 * Check whether a value is promise-like
 *
 * @param value The value to check
 */
export function isPromiseLike(value) {
    return value != null && typeof value.then === 'function';
}
/**
 * Check whether a value is a Promise
 *
 * @param value The value to check
 */
export function isPromise(value) {
    return isPromiseLike(value) && typeof value.catch === 'function';
}
