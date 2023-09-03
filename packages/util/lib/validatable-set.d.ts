/**
 * A Set implementation that is validatable by .some() and .every()
 */
export declare class ValidatableSet<T> extends Set<T> {
    /**
     * Determines whether at least one member of the ArraySet satisfies a specified test
     *
     * @param test The callback to test each value against
     */
    some(test: (value: T) => boolean): boolean;
    /**
     * Determines whether all the members of the ArraySet satisfy a specified test
     *
     * @param test The callback to test each value against
     */
    every(test: (value: T) => boolean): boolean;
}
