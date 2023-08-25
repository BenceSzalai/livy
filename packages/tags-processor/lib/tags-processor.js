/**
 * Adds tags to record.extra
 */
export class TagsProcessor {
    tags = [];
    /**
     * @param tags Initial tags to be present
     */
    constructor(tags = []) {
        this.setTags(...tags);
    }
    /**
     * Add tags to the processor
     *
     * @param tags The tags to add
     */
    addTags(...tags) {
        // Create an intermediate Set to remove duplicates
        this.tags = [...new Set([...this.tags, ...tags])];
        return this;
    }
    /**
     * Set the processor's tags
     *
     * @param tags The tags to use
     */
    setTags(...tags) {
        this.tags = tags;
        return this;
    }
    /**
     * @inheritdoc
     */
    process(record) {
        record.extra.tags = this.tags;
        return record;
    }
}
