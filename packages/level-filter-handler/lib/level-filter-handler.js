import { SeverityMap } from '@livy/contracts';
import { FilterHandler } from '@livy/filter-handler';
/**
 * Simple handler wrapper that filters records based on a lower/upper level bound
 */
export class LevelFilterHandler extends FilterHandler {
    /**
     * Filtered handler
     */
    handler;
    /**
     * Minimum level for logs that are passed to handler
     */
    acceptedLevels = [];
    constructor(handler, { minLevel = 'debug', maxLevel = 'emergency', ...options } = {}) {
        super(handler, record => this.isHandling(record.level), options);
        this.handler = handler;
        this.setAcceptedLevels(minLevel, maxLevel);
    }
    /**
     * Get accepted log levels
     */
    getAcceptedLevels() {
        return this.acceptedLevels;
    }
    /**
     * @param minLevel Minimum level to accept
     * @param maxLevel Maximum level to accept
     */
    setAcceptedLevels(minLevel = 'debug', maxLevel = 'emergency') {
        this.acceptedLevels = Object.entries(SeverityMap)
            .filter(([, severity]) => severity <= SeverityMap[minLevel] &&
            severity >= SeverityMap[maxLevel])
            .map(([level]) => level);
    }
    /**
     * @inheritdoc
     */
    isHandling(level) {
        return this.acceptedLevels.includes(level);
    }
}
