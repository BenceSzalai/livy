// eslint-disable-next-line local-rules/no-unknown-import
import { EOL } from '@livy/util/environment';
/**
 * Implements the `formatBatch` part of `FormatterInterface`
 * by concatenating individual formats with a newline character
 */
export class AbstractBatchFormatter {
    /**
     * A delimiter to join batch-formatted log records
     */
    batchDelimiter = EOL;
    /**
     * @inheritdoc
     */
    formatBatch(records) {
        return records.map(record => this.format(record)).join(this.batchDelimiter);
    }
}
