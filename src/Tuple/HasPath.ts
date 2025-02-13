import {HasPath as OHasPath} from '../Object/HasPath'
import {Match} from '../Any/_Internal'

/** Check whether **`T`** has nested entries that match **`M`**
 * @param T to be inspected
 * @param Path to be followed
 * @param M to check entry type (?=`any`)
 * @param match to change precision (?=`'default'`)
 * @returns **`true`** or **`false`**
 * @example
 * ```ts
 * ```
 */
export type HasPath<T extends any[], Path extends string[], M extends any = any, match extends Match = 'default'> =
    OHasPath<T, Path, M, match>
