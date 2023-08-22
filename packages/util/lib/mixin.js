/* eslint-disable no-redeclare */
// Disable no-redeclare because typescript-eslint/typescript-eslint#60
/**
 * @param extender A callback which receives a base class T and returns a class U that extends T.
 *                 May take an arbitrary number of additional arguments for more fine-grained control.
 * @return A function which can be passed a base class and returns a new class extending it
 *
 * @example Basic example
 * const WriteAccess = Mixin(_ => class extends _ {
 *   write(file: string, content: string) {
 *     // Do some write action
 *   }
 * })
 *
 * class User {
 *   constructor(protected name: string) {}
 * }
 *
 * class PrivilegedUser extends WriteAccess(User) {
 *   constructor(name: string, protected role: 'editor' | 'admin') {
 *     super(name) // <- type-hinted!
 *   }
 *
 *   method() {
 *     this.write('/some/file/path', 'some content') // <- type-hinted!
 *   }
 * }
 */
export function Mixin(extender) {
    return (Origin = class {
    }, ...additionalArguments) => extender(Origin, ...additionalArguments);
}
/* eslint-enable no-redeclare */
