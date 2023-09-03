import { DateTime } from 'luxon';
import { BaseStrategy } from './base-strategy.js';
import { RotationStrategyInterface } from './rotation-strategy.js';
export interface MaxAgeStrategyOptions {
    /**
     * The strategy name
     */
    strategy: 'max-age';
    /**
     * The duration unit that separates individual log files
     */
    threshold: DurationUnit;
}
export type DurationUnit = 'minute' | 'hour' | 'day' | 'month' | 'year';
/**
 * Separates log files by the datetime attached to log records thus creates
 * a new file every year/month/day/hour/minute
 */
export declare class MaxAgeStrategy extends BaseStrategy<MaxAgeStrategyOptions> implements RotationStrategyInterface {
    private cachedFilename?;
    private durationUnit;
    private dateFormatter;
    constructor(directory: string, filenameTemplate: string, threshold: DurationUnit);
    /**
     * Get a regular expression matching log file names
     */
    protected getFilenameRegex(): RegExp;
    /**
     * Get the date format for a unit
     *
     * @param unit The unit to get the date format for
     */
    private getDateFormatter;
    /**
     * Get the name of the current file
     */
    getCurrentFilename(): string;
    /**
     * Get the current date set to a unit-relative starting point
     */
    protected getStartOfDurationUnit(): DateTime;
    /**
     * @inheritdoc
     */
    shouldRotate(): boolean;
    /**
     * @inheritdoc
     */
    protected compareFilenames(a: string, b: string): number;
    /**
     * @inheritdoc
     */
    rotate(maxFiles: number): void;
}
