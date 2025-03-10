import { LogRecord } from '@livy/contracts/lib/log-record'
import { EOL } from '@livy/util/lib/environment'
import { AbstractBatchFormatter } from '@livy/util/lib/formatters/abstract-batch-formatter'
import { IncludedRecordProperties } from '@livy/util/lib/formatters/included-record-properties'

const batchModeNewlines = Symbol('BATCH_MODE_NEWLINES')
type BatchModeNewlines = typeof batchModeNewlines
const batchModeJson = Symbol('BATCH_MODE_JSON')
type BatchModeJson = typeof batchModeJson

type BatchMode = BatchModeNewlines | BatchModeJson

export interface JsonFormatterOptions {
  /**
   * Which log record properties to include in the output
   */
  include: Partial<IncludedRecordProperties>

  /**
   * How to combine multiple records when batch-formatting
   */
  batchMode: BatchMode
}

/**
 * Serializes log records as JSON
 */
export class JsonFormatter extends AbstractBatchFormatter {
  /**
   * Use newline characters to delimit multiple lines when batch-formatting
   */
  public static readonly BATCH_MODE_NEWLINES: BatchModeNewlines =
    batchModeNewlines

  /**
   * Batch-format records as a JSON array
   */
  public static readonly BATCH_MODE_JSON: BatchModeJson = batchModeJson

  /**
   * Which log record properties to include in the output
   */
  public include: IncludedRecordProperties

  /**
   * How to combine multiple records when batch-formatting
   */
  public batchMode: BatchMode

  public constructor({
    include = {},
    batchMode = batchModeNewlines
  }: Partial<JsonFormatterOptions> = {}) {
    super()

    this.include = {
      datetime: true,
      channel: true,
      level: true,
      severity: true,
      message: true,
      context: true,
      extra: true,
      ...include
    }
    this.batchMode = batchMode
  }

  /**
   * @inheritdoc
   */
  public format(record: LogRecord) {
    const recordCopy = { ...record }
    for (const key in this.include) {
      if (this.include[key as keyof IncludedRecordProperties] === false) {
        delete recordCopy[key as keyof IncludedRecordProperties]
      }
    }
    return JSON.stringify(record)
  }

  /**
   * @inheritdoc
   */
  public formatBatch(records: LogRecord[]) {
    if (this.batchMode === batchModeJson) {
      return `[${records.map(record => this.format(record)).join(',')}]`
    } else {
      return records.map(record => this.format(record)).join(EOL)
    }
  }
}
