import { AnyObject, Primitive } from './types.js';
/**
 * Sanitize function, removes special regex characters from a string.
 * -> Creates a literal part of a RegExp
 * So you can do this without worrying about special chars:
 *
 * @example
 * new RegExp(sanitizeRegex(anyString))
 */
export declare function sanitizeRegex(value: string): string;
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
export declare function replaceTokens(template: string, values: AnyObject): string;
/**
 * Remove HTML tags from a string
 *
 * @param value The string to sanitize
 *
 * @example
 * stripTags('Hello <strong>World</strong>!') // 'Hello World!'
 */
export declare function stripTags(value: string): string;
/**
 * Escape HTML entities in a string
 *
 * @param value The string to sanitize
 *
 * @example
 * escapeHtmlEntities('foo & bar') // 'foo &amp; bar'
 */
export declare function escapeHtmlEntities(value: string): string;
/**
 * Take an object and return the same object with one or more properties removed from it
 *
 * @param object     The object to reduce
 * @param properties The properties to remove from the object
 *
 * @example
 * omit({ a: 1, b: 2, c: 3 }, 'b', 'c')
 * // { a: 1 }
 */
export declare function omit<T extends AnyObject, U extends Array<keyof T>>(object: T, ...properties: U): Omit<T, U[number]>;
export declare function omit<T extends AnyObject, U extends string[]>(object: T, ...properties: U): T & {
    [key: string]: any;
};
/**
 * Check whether a value is empty (i.e. null, undefined, empty string, empty array, empty plain object)
 *
 * @param value The value to check
 */
export declare function isEmpty(value: unknown): boolean;
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
export declare function capitalizeFirstLetter(value: string): string;
/**
 * Check whether a value is a primitive
 *
 * @param value The value to type-check
 */
export declare function isPrimitive(value: unknown): value is Primitive;
/**
 * Get an obvious type name for a value
 *
 * @param value The value to type-check
 */
export declare function getObviousTypeName(value: unknown): "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "null" | "array";
/**
 * Check whether a value is promise-like
 *
 * @param value The value to check
 */
export declare function isPromiseLike(value: unknown): value is PromiseLike<any>;
/**
 * Check whether a value is a Promise
 *
 * @param value The value to check
 */
export declare function isPromise(value: unknown): value is Promise<any>;
