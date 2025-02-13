import {Equals} from '../Any/Equals'
import {_Greater} from './Greater'
import {IterationOf} from '../Iteration/IterationOf'
import {Iteration} from '../Iteration/Iteration'
import {Nbr} from './_Internal'
import {Or} from '../Boolean/Or'

export type _GreaterEq<N1 extends Iteration, N2 extends Iteration> =
    Or<Equals<N1, N2>, _Greater<N1, N2>>

/** Check if a **number** is greater or equal to another one
 * @param N1 to compare
 * @param N2 to compare to
 * @returns **`true`** or **`false`**
 * @example
 * ```ts
 * import {N} from 'ts-toolbelt'
 *
 * type test0 = N.GreaterEq<'7', '5'> // true
 * type test1 = N.GreaterEq<'5', '5'> // true
 * type test2 = N.GreaterEq<'5', '7'> // false
 * ```
 */
export type GreaterEq<N1 extends Nbr, N2 extends Nbr> =
    _GreaterEq<IterationOf<N1>, IterationOf<N2>>
