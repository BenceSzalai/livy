import { BaseStrategy } from './base-strategy.js';
import { RotationStrategyInterface } from './rotation-strategy.js';
export interface MaxSizeStrategyOptions {
    /**
     * The strategy name
     */
    strategy: 'max-size';
    /**
     * The file size that separates individual log files
     */
    threshold: number | string;
}
/**
 * Separates log files by the size of the latest log file and thus creates
 * a new file whenever the current file exceeds the size threshold
 */
export declare class MaxSizeStrategy extends BaseStrategy<MaxSizeStrategyOptions> implements RotationStrategyInterface {
    private maxSize;
    private filenameWithoutAppendix;
    constructor(directory: string, filenameTemplate: string, threshold: string | number);
    /**
     * Get a regular expression matching log file names
     */
    protected getFilenameRegex(): RegExp;
    /**
     * Generate a filename from the filename template and an appendix
     *
     * @param appendix The appendix to replace in the filename template
     */
    private generateFilename;
    /**
     * Get the name of the current file
     */
    getCurrentFilename(): string;
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
