import { renameSync, statSync } from 'node:fs';
import { join } from 'node:path';
import parseFilesize from 'filesize-parser';
import { replaceTokens, sanitizeRegex } from '@livy/util/helpers';
import { BaseStrategy } from './base-strategy.js';
/**
 * Separates log files by the size of the latest log file and thus creates
 * a new file whenever the current file exceeds the size threshold
 */
export class MaxSizeStrategy extends BaseStrategy {
    maxSize;
    filenameWithoutAppendix;
    constructor(directory, filenameTemplate, threshold) {
        if (!filenameTemplate.includes('%appendix%')) {
            throw new Error(`Invalid filename template "${filenameTemplate}", must contain the %appendix% token.`);
        }
        super(directory, filenameTemplate, threshold);
        this.maxSize = parseFilesize(threshold);
        this.filenameWithoutAppendix = this.generateFilename('');
    }
    /**
     * Get a regular expression matching log file names
     */
    getFilenameRegex() {
        return new RegExp(`^${replaceTokens(sanitizeRegex(this.filenameTemplate), {
            appendix: '.*?',
        })}$`);
    }
    /**
     * Generate a filename from the filename template and an appendix
     *
     * @param appendix The appendix to replace in the filename template
     */
    generateFilename(appendix) {
        return replaceTokens(this.filenameTemplate, { appendix });
    }
    /**
     * Get the name of the current file
     */
    getCurrentFilename() {
        return this.filenameWithoutAppendix;
    }
    /**
     * @inheritdoc
     */
    shouldRotate() {
        try {
            return (statSync(join(this.directory, this.filenameWithoutAppendix)).size >=
                this.maxSize);
        }
        catch {
            // No log file exists yet, no need to rotate
            return false;
        }
    }
    /**
     * @inheritdoc
     */
    compareFilenames(a, b) {
        // Filename without appendix should always go last
        if (a === this.filenameWithoutAppendix) {
            return 1;
        }
        else if (b === this.filenameWithoutAppendix) {
            return -1;
        }
        else {
            // Both a and b have appendix, sort descending with natural number comparison
            return -1 * a.localeCompare(b, 'en-US', { numeric: true });
        }
    }
    /**
     * @inheritdoc
     */
    rotate(maxFiles) {
        const files = this.getExistingFiles();
        const previousHighestAppendix = files.length - 1;
        // Increment appendix of all log files by 1
        for (let i = previousHighestAppendix; i >= 1; i--) {
            renameSync(join(this.directory, this.generateFilename(`.${i}`)), join(this.directory, this.generateFilename(`.${i + 1}`)));
        }
        // Add appendix ".1" to current appendix-less file
        renameSync(join(this.directory, this.filenameWithoutAppendix), join(this.directory, this.generateFilename('.1')));
        this.deleteSurplusFiles(maxFiles);
    }
}
