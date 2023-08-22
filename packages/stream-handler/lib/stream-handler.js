import { EOL } from '@livy/util/environment';
import { AbstractFormattingProcessingHandler } from '@livy/util/handlers/abstract-formatting-processing-handler';
/**
 * Writes log records to a Node.js stream
 */
export class StreamHandler extends AbstractFormattingProcessingHandler {
    stream;
    constructor(stream, { formatter, ...options } = {}) {
        super(options);
        this.stream = stream;
        this.explicitFormatter = formatter;
    }
    /**
     * @inheritdoc
     */
    write(_record, formatted) {
        return new Promise((resolve, reject) => {
            this.stream.write(`${formatted}${EOL}`, error => error ? reject(error) : resolve());
        });
    }
}
