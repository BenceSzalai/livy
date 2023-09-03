import type { LogRecord, ProcessorInterface } from '@livy/contracts';
/**
 * Adds tags to record.extra
 */
export declare class TagsProcessor implements ProcessorInterface {
    private tags;
    /**
     * @param tags Initial tags to be present
     */
    constructor(tags?: string[]);
    /**
     * Add tags to the processor
     *
     * @param tags The tags to add
     */
    addTags(...tags: string[]): this;
    /**
     * Set the processor's tags
     *
     * @param tags The tags to use
     */
    setTags(...tags: string[]): this;
    /**
     * @inheritdoc
     */
    process(record: LogRecord): LogRecord;
}
