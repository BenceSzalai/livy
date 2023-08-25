import { ValidatableSet } from './validatable-set.js';
type GatedSetValidator<T> = (item: unknown) => asserts item is T;
export declare class GatedSet<T> extends ValidatableSet<T> {
    private validator;
    constructor(validator: GatedSetValidator<T>, iterable?: Iterable<T>);
    /**
     * @inheritdoc
     */
    add(value: T): this;
}
export {};
