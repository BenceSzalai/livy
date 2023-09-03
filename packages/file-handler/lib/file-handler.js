import * as fs from 'node:fs';
import { dirname } from 'node:path';
import { EOL } from '@livy/util/environment';
import { AbstractSyncFormattingProcessingHandler } from '@livy/util/handlers/abstract-formatting-processing-handler';
/**
 * Writes log records to a file
 */
export class FileHandler extends AbstractSyncFormattingProcessingHandler {
    fileHandle;
    path;
    append;
    prefix;
    constructor(path, { formatter, prefix = [], append = true, ...options } = {}) {
        super(options);
        this.append = append;
        this.prefix = typeof prefix === 'string' ? [prefix] : prefix;
        this.explicitFormatter = formatter;
        const directory = dirname(path);
        let stat;
        try {
            stat = fs.statSync(directory);
        }
        catch (error) {
            throw new Error(`Provided log path directory "${directory}" does not exist: ${
            /* c8 ignore next: Unfortunately, code coverage somehow does not recognize this line as covered */
            error instanceof Error ? error.message : error}`);
        }
        if (!stat.isDirectory()) {
            throw new Error(`Provided log path parent "${directory}" is not a directory`);
        }
        this.path = path;
    }
    /**
     * @inheritdoc
     */
    close() {
        if (typeof this.fileHandle === 'number') {
            fs.closeSync(this.fileHandle);
            this.fileHandle = undefined;
        }
    }
    /**
     * Get the prefix string to write
     */
    get prefixString() {
        return this.prefix.map(line => `${line}${EOL}`).join('');
    }
    /**
     * Write the formatted record to the file
     */
    async write(_record, formatted) {
        // No handle to the target file exists yet
        if (typeof this.fileHandle !== 'number') {
            const needsPrefix = this.prefix.length > 0 && !fs.existsSync(this.path);
            // Get a handle to the file to write
            this.fileHandle = await new Promise((resolve, reject) => {
                fs.open(this.path, this.append ? 'a' : 'w', (error, handle) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(handle);
                    }
                });
            });
            // Write the prefix to the handle
            if (needsPrefix) {
                await new Promise((resolve, reject) => {
                    fs.write(this.fileHandle, this.prefixString, (error, result) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            resolve(result);
                        }
                    });
                });
            }
        }
        await new Promise((resolve, reject) => {
            fs.write(this.fileHandle, `${formatted}${EOL}`, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    /**
     * Write the formatted record to the file
     */
    writeSync(_record, formatted) {
        if (typeof this.fileHandle !== 'number') {
            const needsPrefix = this.prefix.length > 0 && !fs.existsSync(this.path);
            this.fileHandle = fs.openSync(this.path, this.append ? 'a' : 'w');
            if (needsPrefix) {
                fs.writeSync(this.fileHandle, this.prefixString);
            }
        }
        fs.writeSync(this.fileHandle, `${formatted}${EOL}`);
    }
}
