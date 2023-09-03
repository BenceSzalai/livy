import { escapeHtmlEntities } from './helpers.js';
const HTMLRawMarker = Symbol('HTML raw marker');
/**
 * HTMLMask('...') masks a string as an HTML chunk so it will not be escaped
 * You don't need to call this function manually, use HTML() instead.
 */
function HTMLMask(value) {
    return {
        [HTMLRawMarker]: true,
        toString() {
            return value;
        },
    };
}
export function HTML(...args) {
    if (typeof args[0] === 'string') {
        return HTMLMask(args[0]);
    }
    else {
        const [strings, ...keys] = args;
        return HTMLMask(strings.slice(1).reduce((carry, string, index) => {
            const data = keys[index];
            // eslint-disable-next-line unicorn/prefer-spread
            return carry.concat(typeof data === 'object' && data !== null && HTMLRawMarker in data
                ? String(data)
                : escapeHtmlEntities(String(data)), string);
        }, strings[0]));
    }
}
