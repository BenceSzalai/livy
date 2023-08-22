import { getObviousTypeName } from './helpers.js';
import { ValidatableSet } from './validatable-set.js';
export class GatedSet extends ValidatableSet {
    validator;
    constructor(validator, iterable) {
        if (typeof validator !== 'function') {
            throw new TypeError(`The validator must be a function, ${getObviousTypeName(validator)} given`);
        }
        super();
        this.validator = validator;
        if (iterable) {
            for (const value of iterable) {
                this.add(value);
            }
        }
    }
    /**
     * @inheritdoc
     */
    add(value) {
        this.validator(value);
        super.add(value);
        return this;
    }
}
