import type { LogRecord } from '@livy/contracts';
/**
 * Injects the current process ID into record.extra
 */
export declare function ProcessIdProcessor(record: LogRecord): LogRecord;
