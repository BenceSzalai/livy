import { crypto } from './crypto.js';
/**
 * Adds a unique identifier to record.extra
 */
export class UidProcessor {
    length;
    _uid;
    /**
     * @param length The length of the UID (in bytes, the actual UID will be a hex string of double that length)
     */
    constructor(length = 7) {
        this.length = length;
        if (!Number.isInteger(length) || length < 1) {
            throw new Error(`Invalid UID length ${JSON.stringify(length)}: must be a positive integer`);
        }
        this._uid = this.generateUid(length);
    }
    /**
     * @inheritdoc
     */
    process(record) {
        record.extra.uid = this._uid;
        return record;
    }
    /**
     * Get the generated UID
     */
    get uid() {
        return this._uid;
    }
    /**
     * @inheritdoc
     */
    reset() {
        this._uid = this.generateUid(this._uid.length / 2);
    }
    /**
     * Generate a new UID
     *
     * @param length The length of the UID (in bytes)
     */
    generateUid(length) {
        if (typeof crypto === 'object') {
            const bytes = new Uint8Array(length);
            crypto.getRandomValues(bytes);
            return [...bytes].map(byte => byte.toString(16).padStart(2, '0')).join('');
        }
        else {
            /* c8 ignore next 2: Not testing other environments */
            // eslint-disable-next-line unicorn/prefer-type-error
            throw new Error('Cannot create a UID in your environment');
        }
    }
}
