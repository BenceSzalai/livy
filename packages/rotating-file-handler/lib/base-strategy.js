import { existsSync, readdirSync, statSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
/**
 * Common functionality for all `RotatingFileHandler` strategies
 */
export class BaseStrategy {
    directory;
    filenameTemplate;
    threshold;
    constructor(directory, filenameTemplate, threshold) {
        this.directory = directory;
        this.filenameTemplate = filenameTemplate;
        this.threshold = threshold;
        if (!existsSync(directory)) {
            throw new Error(`Directory for rotating log files "${directory}" does not exist`);
        }
    }
    /**
     * Get a list of existing log files, sorted by recency
     */
    getExistingFiles() {
        const regex = this.getFilenameRegex();
        return readdirSync(this.directory)
            .filter(file => regex.test(file) && statSync(join(this.directory, file)).isFile)
            .sort(this.compareFilenames.bind(this));
    }
    /**
     * Delete files that are no longer needed according to `maxFiles`
     *
     * @param maxFiles The number of log files to keep
     */
    deleteSurplusFiles(maxFiles) {
        const files = this.getExistingFiles();
        // If the current file name is *not* among the existing ones, we decrement
        // the number of allowed files since probably there will be
        // a new file created with the next logging entry
        if (!files.includes(this.getCurrentFilename())) {
            maxFiles--;
        }
        let filesToDelete;
        if (maxFiles === 0) {
            filesToDelete = files;
        }
        else {
            filesToDelete = files.slice(0, -maxFiles);
        }
        for (const file of filesToDelete) {
            unlinkSync(join(this.directory, file));
        }
    }
}
