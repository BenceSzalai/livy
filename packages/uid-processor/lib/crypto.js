import * as environment from '@livy/util/environment';
export const crypto = environment.isNodeJs
    ? (await import('node:crypto'))
    : globalThis.crypto;
