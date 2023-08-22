import { existsSync } from 'node:fs';
import { replaceTokens, sanitizeRegex } from '@livy/util/helpers';
import { DateTime } from 'luxon';
import { BaseStrategy } from './base-strategy.js';
/**
 * Separates log files by the datetime attached to log records thus creates
 * a new file every year/month/day/hour/minute
 */
export class MaxAgeStrategy extends BaseStrategy {
    cachedFilename;
    durationUnit;
    dateFormatter;
    constructor(directory, filenameTemplate, threshold) {
        if (!filenameTemplate.includes('%date%')) {
            throw new Error(`Invalid filename template "${filenameTemplate}", must contain the %date% token.`);
        }
        super(directory, filenameTemplate, threshold);
        this.durationUnit = threshold;
        this.dateFormatter = this.getDateFormatter(threshold);
    }
    /**
     * Get a regular expression matching log file names
     */
    getFilenameRegex() {
        return new RegExp(`^${replaceTokens(sanitizeRegex(this.filenameTemplate), {
            date: '.+?',
        })}$`);
    }
    /**
     * Get the date format for a unit
     *
     * @param unit The unit to get the date format for
     */
    getDateFormatter(unit) {
        return {
            minute: (datetime) => datetime.toFormat('yyyy-MM-dd_HH-mm'),
            hour: (datetime) => datetime.toFormat('yyyy-MM-dd_HH'),
            day: (datetime) => datetime.toFormat('yyyy-MM-dd'),
            month: (datetime) => datetime.toFormat('yyyy-MM'),
            year: (datetime) => datetime.toFormat('yyyy'),
        }[unit];
    }
    /**
     * Get the name of the current file
     */
    getCurrentFilename() {
        const date = this.getStartOfDurationUnit();
        return replaceTokens(this.filenameTemplate, {
            date: this.dateFormatter(date),
        });
    }
    /**
     * Get the current date set to a unit-relative starting point
     */
    getStartOfDurationUnit() {
        return DateTime.local().startOf(this.durationUnit);
    }
    /**
     * @inheritdoc
     */
    shouldRotate() {
        const filename = this.getCurrentFilename();
        if (this.cachedFilename === filename) {
            return false;
        }
        this.cachedFilename = filename;
        // Non-existing file indicates that there may be pre-existing files to rotate
        return !existsSync(filename);
    }
    /**
     * @inheritdoc
     */
    compareFilenames(a, b) {
        return a.localeCompare(b);
    }
    /**
     * @inheritdoc
     */
    rotate(maxFiles) {
        this.deleteSurplusFiles(maxFiles);
    }
}
