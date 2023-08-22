import type { LogLevel } from '@livy/contracts'
import { LineFormatter, LineFormatterOptions } from '@livy/line-formatter'
import { isEmpty } from '@livy/util/helpers'
import chalk, { ForegroundColorName, ModifierName, supportsColor } from 'chalk'
import { DateTime } from 'luxon'

import { emphasize } from 'emphasize'
import chalkTemplate from 'chalk-template'

export type ColorString =
  | `${ForegroundColorName}.${ModifierName}`
  | ForegroundColorName

export interface AnsiLineFormatterOptions extends LineFormatterOptions {
  /**
   * Whether records should be highlighted with ANSI escape sequences
   * If not provided (or set to `undefined`), color support is going
   * to be automatically detected
   */
  decorated: boolean | undefined

  /**
   * The colors to use for each log level.
   * The missing levels will use their default colors.
   */
  levelColors: Partial<Record<LogLevel, ColorString>>
}

/**
 * Formats log records as single lines with terminal highlighting
 */
export class AnsiLineFormatter extends LineFormatter {
  /**
   * Whether records should be highlighted with ANSI escape sequences
   */
  public decorated: boolean | undefined

  /**
   * The colors to use for each log level.
   * The missing levels will use their default colors.
   */
  public levelColors: Partial<Record<LogLevel, ColorString>>

  public constructor({
    decorated,
    levelColors = {},
    ...options
  }: Partial<AnsiLineFormatterOptions> = {}) {
    super(options)
    this.decorated = decorated
    this.levelColors = levelColors
  }

  /**
   * @inheritdoc
   */
  protected formatDatetime(datetime: DateTime) {
    const timestamp = super.formatDatetime(datetime)

    if (this.shouldDecorate()) {
      return chalk.dim(timestamp)
    } else {
      return timestamp
    }
  }

  /**
   * @inheritdoc
   */
  protected formatLevel(level: LogLevel) {
    const formatted = super.formatLevel(level)

    if (!this.shouldDecorate()) {
      return formatted
    } else {
      let color: string
      switch (level) {
        case 'emergency':
          color = this.levelColors.emergency ?? 'red'
          break

        case 'alert':
          color = this.levelColors.alert ?? 'red'
          break

        case 'critical':
          color = this.levelColors.critical ?? 'red'
          break

        case 'error':
          color = this.levelColors.error ?? 'red'
          break

        case 'warning':
          color = this.levelColors.warning ?? 'yellow'
          break

        case 'notice':
          color = this.levelColors.notice ?? 'blue'
          break

        case 'info':
          color = this.levelColors.info ?? 'blue'
          break

        case 'debug':
          color = this.levelColors.debug ?? 'blue.dim'
          break

        /* c8 ignore next 2: This should never happen, but is included for type safety */
        default:
          return formatted
      }

      return chalkTemplate`{${color} ${formatted}}`
    }
  }

  /**
   * @inheritdoc
   */
  protected formatData(object: any, ignoreEmpty: boolean) {
    if (isEmpty(object) && ignoreEmpty) {
      return ''
    }

    const stringified = super.formatData(object)

    if (this.shouldDecorate()) {
      return emphasize.highlight('json', stringified).value
    } else {
      return stringified
    }
  }

  /**
   * Check whether the formatter should use ANSI codes to decorate log records
   */
  public shouldDecorate() {
    return Boolean(
      this.decorated !== undefined
        ? this.decorated
        : supportsColor
        ? supportsColor.hasBasic
        : false,
    )
  }
}
