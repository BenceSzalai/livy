import { hostname } from 'node:os';
/**
 * Injects the running machine's hostname into record.extra
 */
export function HostnameProcessor(record) {
    record.extra.hostname = hostname();
    return record;
}
