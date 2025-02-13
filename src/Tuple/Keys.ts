import {Exclude} from '../Union/Exclude'

/** Get the own keys of a **tuple**
 * @param T
 * @returns **`keyof`**
 * @example
 * ```ts
 * ```
 */
export type Keys<T extends any[]> =
    Exclude<keyof T, keyof any[]>
