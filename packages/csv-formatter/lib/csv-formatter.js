import { AbstractBatchFormatter } from '@livy/util/formatters/abstract-batch-formatter';
import { sanitizeRegex } from '@livy/util/helpers';
/**
 * Formats log records as CSV lines
 */
export class CsvFormatter extends AbstractBatchFormatter {
    generateFields;
    delimiter;
    enclosure;
    batchDelimiter;
    constructor({ generateFields = record => [
        record.datetime.toISO() ?? '',
        record.level,
        record.message,
        JSON.stringify(record.context),
        JSON.stringify(record.extra),
    ], delimiter = ',', enclosure = '"', eol = '\r\n', } = {}) {
        super();
        this.generateFields = generateFields;
        this.delimiter = delimiter;
        this.enclosure = enclosure;
        this.batchDelimiter = eol;
    }
    /**
     * @inheritdoc
     */
    format(record) {
        return String(this.generateFields(record)
            .map(field => {
            const hasEnclosure = field.includes(this.enclosure);
            const hasDelimiter = field.includes(this.delimiter);
            const hasLineBreak = field.includes('\n');
            if (hasDelimiter || hasEnclosure || hasLineBreak) {
                return (this.enclosure +
                    field.replaceAll(new RegExp(sanitizeRegex(this.enclosure), 'g'), match => `${this.enclosure}${match}${this.enclosure}`) +
                    this.enclosure);
            }
            else {
                return field;
            }
        })
            .join(this.delimiter));
    }
}
