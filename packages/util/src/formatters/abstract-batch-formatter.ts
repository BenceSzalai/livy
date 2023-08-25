import type { FormatterInterface, LogRecord } from '@livy/contracts'
// eslint-disable-next-line local-rules/no-unknown-import
import { EOL } from '@livy/util/environment'

/**
 * Implements the `formatBatch` part of `FormatterInterface`
 * by concatenating individual formats with a newline character
 */
export abstract class AbstractBatchFormatter implements FormatterInterface {
  /**
   * A delimiter to join batch-formatted log records
   */
  protected batchDelimiter = EOL

  /**
   * @inheritdoc
   */
  public abstract format(record: LogRecord): string

  /**
   * @inheritdoc
   */
  public formatBatch(records: LogRecord[]) {
    return records.map(record => this.format(record)).join(this.batchDelimiter)
  }
}
