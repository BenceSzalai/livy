/**
 * Log levels as defined by RFC 5424
 */
export declare const logLevels: readonly ["debug", "info", "notice", "warning", "error", "critical", "alert", "emergency"];
/**
 * Log level severity as defined by RFC 5424
 */
export declare const SeverityMap: {
    readonly debug: 7;
    readonly info: 6;
    readonly notice: 5;
    readonly warning: 4;
    readonly error: 3;
    readonly critical: 2;
    readonly alert: 1;
    readonly emergency: 0;
};
/**
 * Severity level
 */
export type SeverityLevel = (typeof SeverityMap)[keyof typeof SeverityMap];
/**
 * Log level
 */
export type LogLevel = (typeof logLevels)[number];
