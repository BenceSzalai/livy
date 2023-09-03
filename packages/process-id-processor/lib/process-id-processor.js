/**
 * Injects the current process ID into record.extra
 */
export function ProcessIdProcessor(record) {
    record.extra.pid = process.pid;
    return record;
}
