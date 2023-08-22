import type { LogRecord } from '@livy/contracts';
/**
 * Injects the running machine's hostname into record.extra
 */
export declare function HostnameProcessor(record: LogRecord): LogRecord;
