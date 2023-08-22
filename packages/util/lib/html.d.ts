declare const HTMLRawMarker: unique symbol;
/**
 * Represents a chunk of stringifiable HTML
 */
export interface HTMLChunk {
    [HTMLRawMarker]: true;
    toString(): string;
}
/**
 * A template tag for escaping embedded pieces of HTML
 *
 * @example
 * HTML`<p>Markup is ${'<em>awesome</em>'}!</p>`.toString()
 * // '<p>Markup is &lt;em&gt;awesome&lt;/em&gt;!</p>'
 *
 * @example
 * HTML`<p>Markup is ${HTML`<em>awesome</em>`}!</p>`.toString()
 * // '<p>Markup is <em>awesome</em>!</p>'
 *
 * @example
 * HTML`<p>Markup is ${HTML('<em>awesome</em>')}!</p>`.toString()
 * // '<p>Markup is <em>awesome</em>!</p>'
 */
export declare function HTML(string: string): HTMLChunk;
export declare function HTML(strings: TemplateStringsArray, ...keys: any[]): HTMLChunk;
export {};
