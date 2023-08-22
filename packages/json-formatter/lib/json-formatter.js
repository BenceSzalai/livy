import { EOL } from '@livy/util/environment';
import { AbstractBatchFormatter } from '@livy/util/formatters/abstract-batch-formatter';
/* eslint-disable @typescript-eslint/no-redeclare */
const BATCH_MODE_NEWLINES = Symbol('BATCH_MODE_NEWLINES');
const BATCH_MODE_JSON = Symbol('BATCH_MODE_JSON');
/**
 * Serializes log records as JSON
 */
export class JsonFormatter extends AbstractBatchFormatter {
    /**
     * Use newline characters to delimit multiple lines when batch-formatting
     */
    static BATCH_MODE_NEWLINES = BATCH_MODE_NEWLINES;
    /**
     * Batch-format records as a JSON array
     */
    static BATCH_MODE_JSON = BATCH_MODE_JSON;
    /**
     * Which log record properties to include in the output
     */
    include;
    /**
     * How to combine multiple records when batch-formatting
     */
    batchMode;
    constructor({ include = {}, batchMode = BATCH_MODE_NEWLINES, } = {}) {
        super();
        this.include = {
            datetime: true,
            channel: true,
            level: true,
            severity: true,
            message: true,
            context: true,
            extra: true,
            ...include,
        };
        this.batchMode = batchMode;
    }
    /**
     * @inheritdoc
     */
    format(record) {
        const recordCopy = { ...record };
        for (const key in this.include) {
            if (this.include[key] === false) {
                delete recordCopy[key];
            }
        }
        return JSON.stringify(record);
    }
    /**
     * @inheritdoc
     */
    formatBatch(records) {
        if (this.batchMode === BATCH_MODE_JSON) {
            return `[${records.map(record => this.format(record)).join(',')}]`;
        }
        else {
            return records.map(record => this.format(record)).join(EOL);
        }
    }
}
