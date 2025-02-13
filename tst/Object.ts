// /* eslint-disable fp/no-class */
// /* eslint-disable no-implicit-coercion */
import {Test, O} from '../src/index'
import {x} from '../src/Any/x'
import {NonNullable} from '../src/Tuple/_api'

const {checks, check} = Test

// ///////////////////////////////////////////////////////////////////////////////////////
// OBJECT ////////////////////////////////////////////////////////////////////////////////

type O = {
         a : string,
         b : number
         c : {a: 'a'} & {b: 'b'}
         d?: 'string0'
readonly e?: 'string1'
readonly f : 0
         g : O // recursion
         h?: 1
         j : 'a' | undefined
         k : {a: {b: string}} | undefined
}

type O1 = {
         a : string | number
         b : object
         c : {a: 'a'} & {b: 'b'}
         d?: never
readonly e?: 'string1'
readonly f : 0
         g : O1 // recursion
         h : never
         i : {a: string}
         j : 'a' | undefined
         k : {a: {b: string}} | undefined
};

// ---------------------------------------------------------------------------------------
// AT

checks([
    check<O.At<O, 'a'>, string,                 Test.Pass>(),
    check<O.At<O, 'c'>, {a: 'a'} & {b: 'b'},    Test.Pass>(),
    check<O.At<O, 'g'>, O,                      Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// DIFF

type DIFF_O_O1_DEFAULT = {
    i: {a: string}
}

type DIFF_O_O1_LOOSE = {
    b: number
    g: O
    h?: 1 | undefined
    i: {a: string}
}

type DIFF_O_O1_EQUALS = {
    a : string
    b : number
    d?: 'string0' | undefined
    g : O
    h?: 1 | undefined
    i: {a: string}
}

checks([
    check<O.Diff<O, O1, 'default'>, DIFF_O_O1_DEFAULT,  Test.Pass>(),
    check<O.Diff<O, O1, 'loose'>,   DIFF_O_O1_LOOSE,    Test.Pass>(),
    check<O.Diff<O, O1, 'equals'>,  DIFF_O_O1_EQUALS,   Test.Pass>(),
])

// ---------------------------------------------------------------------------------------

type DIFF_O1_O_DEFAULT = {
    i: {a: string}
}

type DIFF_O1_O_LOOSE = {
    b: object
    g: O1
    h: never
    i: {a: string}
}

type DIFF_O1_O_EQUALS = {
    a : string | number
    b : object
    d?: never
    g : O1
    h : never
    i: {a: string}
};

checks([
    check<O.Diff<O1, O, 'default'>, DIFF_O1_O_DEFAULT,  Test.Pass>(),
    check<O.Diff<O1, O, 'loose'>,   DIFF_O1_O_LOOSE,    Test.Pass>(),
    check<O.Diff<O1, O, 'equals'>,  DIFF_O1_O_EQUALS,   Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// EXCLUDE

type EXCLUDE_O_O1_DEFAULT = {}

type EXCLUDE_O_O1_LOOSE = {
    b : number
    g : O;
    h?: 1 | undefined
}

type EXCLUDE_O_O1_EQUALS = {
    a : string
    b : number
    d?: 'string0' | undefined
    g : O
    h?: 1 | undefined
};

checks([
    check<O.Exclude<O, O1, 'default'>,  EXCLUDE_O_O1_DEFAULT,   Test.Pass>(),
    check<O.Exclude<O, O1, 'loose'>,    EXCLUDE_O_O1_LOOSE,     Test.Pass>(),
    check<O.Exclude<O, O1, 'equals'>,   EXCLUDE_O_O1_EQUALS,    Test.Pass>(),
])

// ---------------------------------------------------------------------------------------

type EXCLUDE_O1_O_DEFAULT = {
    i: {a: string}
}

type EXCLUDE_O1_O_LOOSE = {
    b: object
    g: O1
    h: never
    i: {a: string}
}

type EXCLUDE_O1_O_EQUALS = {
    a : string | number
    b : object
    d?: never
    g : O1
    h : never
    i : {a: string}
};

checks([
    check<O.Exclude<O1, O, 'default'>,  EXCLUDE_O1_O_DEFAULT,   Test.Pass>(),
    check<O.Exclude<O1, O, 'loose'>,    EXCLUDE_O1_O_LOOSE,     Test.Pass>(),
    check<O.Exclude<O1, O, 'equals'>,   EXCLUDE_O1_O_EQUALS,    Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// EXCLUDEKEYS

type EXCLUDEKEYS_O_DEFAULT = never

type EXCLUDEKEYS_O_LOOSE = 'b' | 'g' | 'h'

type EXCLUDEKEYS_O_EQUALS = 'a' | 'b' | 'd' | 'g' | 'h';

checks([
    check<O.ExcludeKeys<O, O1, 'default'>,  EXCLUDEKEYS_O_DEFAULT,  Test.Pass>(),
    check<O.ExcludeKeys<O, O1, 'loose'>,    EXCLUDEKEYS_O_LOOSE,    Test.Pass>(),
    check<O.ExcludeKeys<O, O1, 'equals'>,   EXCLUDEKEYS_O_EQUALS,   Test.Pass>(),
])

// ---------------------------------------------------------------------------------------

type EXCLUDEKEYS_O1_DEFAULT = 'i'

type EXCLUDEKEYS_O1_LOOSE = 'b' | 'g' | 'h' | 'i'

type EXCLUDEKEYS_O1_EQUALS = 'a' | 'b' | 'd' | 'g' | 'h' | 'i';

checks([
    check<O.ExcludeKeys<O1, O, 'default'>,  EXCLUDEKEYS_O1_DEFAULT, Test.Pass>(),
    check<O.ExcludeKeys<O1, O, 'loose'>,    EXCLUDEKEYS_O1_LOOSE,   Test.Pass>(),
    check<O.ExcludeKeys<O1, O, 'equals'>,   EXCLUDEKEYS_O1_EQUALS,  Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// FILTER

type FILTER_O_DEFAULT = {
         b : number
         c : {a: 'a'} & {b: 'b'}
         d?: 'string0'
readonly e?: 'string1'
readonly f : 0
         g : O
         h?: 1
         j : 'a' | undefined
         k : {a: {b: string}} | undefined
}

type FILTER_O_LOOSE = {
         a : string
         c : {a: 'a'} & {b: 'b'}
         d?: 'string0'
readonly e?: 'string1'
         g : O
         j : 'a' | undefined
         k : {a: {b: string}} | undefined
}

type FILTER_O_EQUALS = {
         b : number
         c : {a: 'a'} & {b: 'b'}
         d?: 'string0'
readonly e?: 'string1'
readonly f : 0
         g : O
         h?: 1
         j : 'a' | undefined
         k : {a: {b: string}} | undefined
};

type t = O.Filter<O, number | undefined, 'loose'>

checks([
    check<O.Filter<O, string, 'extends'>,           FILTER_O_DEFAULT,   Test.Pass>(),
    check<O.Filter<O, number | undefined, 'loose'>, FILTER_O_LOOSE,     Test.Pass>(),
    check<O.Filter<O, string, 'equals'>,            FILTER_O_EQUALS,    Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// FILTERKEYS

type FILTERKEYS_O_DEFAULT = 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'j' | 'k'

type FILTERKEYS_O_LOOSE = 'a' | 'c' | 'd' | 'e' | 'g' | 'j' | 'k'

type FILTERKEYS_O_EQUALS = 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'j' | 'k';

checks([
    check<O.FilterKeys<O, string, 'extends'>,           FILTERKEYS_O_DEFAULT,   Test.Pass>(),
    check<O.FilterKeys<O, number | undefined, 'loose'>, FILTERKEYS_O_LOOSE,     Test.Pass>(),
    check<O.FilterKeys<O, string, 'equals'>,            FILTERKEYS_O_EQUALS,    Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// HAS

checks([
    check<O.Has<O, 'X', string | number, 'extends'>,            0,      Test.Pass>(),

    check<O.Has<O, 'c', string, 'extends'>,                     0,      Test.Pass>(),
    check<O.Has<O, 'c', {a: 'a'} & {b: 'b'}, 'equals'>,         1,      Test.Pass>(),
    check<O.Has<O, 'c', string | number, 'loose'>,              0,      Test.Pass>(),
    check<O.Has<O, 'c', {a: 'a'} & {b: 'b'} | number, 'loose'>, 1,      Test.Pass>(),

    check<O.Has<O, 'd', string | undefined, 'extends'>,         1,      Test.Pass>(),
    check<O.Has<O, 'd', 'string0' | undefined, 'equals'>,       1,      Test.Pass>(),
    check<O.Has<O, 'd', string | undefined, 'loose'>,           1,      Test.Pass>(),

    check<O.Has<O, 'd', string, 'extends'>,                     0 | 1,  Test.Pass>(),
    check<O.Has<O, 'd', 'string0', 'equals'>,                   0,      Test.Pass>(),
    check<O.Has<O, 'd', string, 'loose'>,                       0 | 1,  Test.Pass>(),

    check<O.Has<O, 'd', undefined, 'extends'>,                  0 | 1,  Test.Pass>(),
    check<O.Has<O, 'd', 'string0', 'equals'>,                   0,      Test.Pass>(),
    check<O.Has<O, 'd', undefined, 'loose'>,                    1,      Test.Pass>(),

    check<O.Has<O1, 'a', string, 'extends'>,                    0 | 1,  Test.Pass>(),
    check<O.Has<O1, 'a', 'xxxx', 'loose'>,                      1,      Test.Pass>(),
    check<O.Has<O1, 'a', 100000, 'loose'>,                      1,      Test.Pass>(),

    check<O.Has<O, 'f', 0 | undefined | 'a', 'extends'>,        1,      Test.Pass>(),
    check<O.Has<O, 'f', 0 | undefined | 'a', 'equals'>,         0,      Test.Pass>(),
    check<O.Has<O, 'f', 0 | undefined | 'a', 'loose'>,          1,      Test.Pass>(),

    check<O.Has<O, 'a' | 'd', string, 'extends'>,               0 | 1,  Test.Pass>(),
    check<O.Has<O, 'a' | 'd', string, 'loose'>,                 1,      Test.Pass>(),

    check<O.Has<O, 'a' | 'd', string | undefined, 'extends'>,   1,      Test.Pass>(),
    check<O.Has<O, 'x' | 'd', string | undefined, 'extends'>,   1,      Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// HASPATH

checks([
    check<O.HasPath<O, ['g', 'g', 'g'], object, 'extends'>,         1,      Test.Pass>(),
    check<O.HasPath<O, ['g', 'g', 'g'], O, 'equals'>,               1,      Test.Pass>(),
    check<O.HasPath<O, ['g', 'g', 'g'], object, 'loose'>,           1,      Test.Pass>(),

    check<O.HasPath<O, ['g', 'g', 'g', 'a'], string, 'extends'>,    1,      Test.Pass>(),
    check<O.HasPath<O, ['g', 'x', 'g'], object, 'extends'>,         0,      Test.Pass>(),

    check<O.HasPath<O, [], any, 'extends'>,                         1,      Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// INCLUDES

checks([
    check<O.Includes<O, 'xxxx', 'extends'>,     0,      Test.Pass>(),
    check<O.Includes<O, 'xxxx', 'equals'>,      0,      Test.Pass>(),
    check<O.Includes<O, 'xxxx', 'loose'>,       1,      Test.Pass>(),

    check<O.Includes<O, string, 'extends'>,     1,      Test.Pass>(),
    check<O.Includes<O, string, 'equals'>,      1,      Test.Pass>(),
    check<O.Includes<O, string, 'loose'>,       1,      Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// INTERSECT

type INTERSECT_O_O1_DEFAULT = O

type INTERSECT_O_O1_LOOSE = {
         a : string;
         c : {a: 'a'} & {b: 'b'};
         d?: 'string0' | undefined;
readonly e?: 'string1' | undefined;
readonly f : 0;
         j : 'a' | undefined
         k : {a: {b: string}} | undefined
}

type INTERSECT_O_O1_EQUALS = {
         c : {a: 'a'} & {b: 'b'};
readonly e?: 'string1' | undefined;
readonly f : 0;
         j : 'a' | undefined
         k : {a: {b: string}} | undefined
};

checks([
    check<O.Intersect<O, O1, 'default'>,    INTERSECT_O_O1_DEFAULT, Test.Pass>(),
    check<O.Intersect<O, O1, 'equals'>,     INTERSECT_O_O1_EQUALS,  Test.Pass>(),
    check<O.Intersect<O, O1, 'loose'>,      INTERSECT_O_O1_LOOSE,   Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// INTERSECTKEYS

type INTERSECTKEYS_O_DEFAULT = keyof O

type INTERSECTKEYS_O_LOOSE = 'a' | 'c' | 'd' | 'e' | 'f' | 'j' | 'k'

type INTERSECTKEYS_O_EQUALS = 'c' | 'e' | 'f' | 'j' | 'k';

checks([
    check<O.IntersectKeys<O, O1, 'default'>,    INTERSECTKEYS_O_DEFAULT,    Test.Pass>(),
    check<O.IntersectKeys<O, O1, 'equals'>,     INTERSECTKEYS_O_EQUALS,     Test.Pass>(),
    check<O.IntersectKeys<O, O1, 'loose'>,      INTERSECTKEYS_O_LOOSE,      Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// KEYS

checks([
    check<O.Keys<O>,    keyof O,    Test.Pass>(),
    check<O.Keys<O1>,   keyof O1,   Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// MERGE

type MERGE_O_O1 = {
         a : string
         b : number
         c : {a: 'a'} & {b: 'b'}
         d?: 'string0' | undefined
readonly e?: 'string1' | undefined
readonly f : 0
         g : O
         h?: 1 | undefined;
         i : {a: string}
         j : 'a' | undefined
         k : {a: {b: string}} | undefined
}

type MERGE_O1_O = {
         a : string | number
         b : object
         c : {a: 'a'} & {b: 'b'}
         d?: undefined
readonly e?: 'string1' | undefined
readonly f : 0
         g : O1
         h : never
         i : {a: string}
         j : 'a' | undefined
         k : {a: {b: string}} | undefined
};

checks([
    check<O.Merge<O, O1>,   MERGE_O_O1, Test.Pass>(),
    check<O.Merge<O1, O>,   MERGE_O1_O, Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// MERGEKEYS

checks([
    check<O.MergeKeys<O, O1>,   keyof O.Merge<O, O1>,   Test.Pass>(),
    check<O.MergeKeys<O1, O>,   keyof O.Merge<O1, O>,   Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// MODIFY

checks([
    check<O.Modify<{a?: string}, {a: x, b: 9}>,     {a: string, b: 9},  Test.Pass>(),
    check<O.Modify<{}, {a: x, b: 9}>,               {a: never, b: 9},   Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// NONNULLABLE

type NONNULLABLE_O_FLAT = {
         a : string
         b : number
         c : {a: 'a'} & {b: 'b'}
         d?: 'string0'
readonly e?: 'string1'
readonly f : 0
         g : O
         h?: 1
         j : 'a'
         k : {a: {b: string}}
}

type NONNULLABLE_O_J_FLAT = {
         a : string
         b : number
         c : {a: 'a'} & {b: 'b'}
         d?: 'string0'
readonly e?: 'string1'
readonly f : 0
         g : O
         h?: 1
         j : 'a'
         k : {a: {b: string}} | undefined
};

checks([
    check<O.NonNullable<O, keyof O, 'flat'>,                    NONNULLABLE_O_FLAT,                 Test.Pass>(),
    check<O.NonNullable<O, 'j', 'flat'>,                        NONNULLABLE_O_J_FLAT,               Test.Pass>(),
    check<O.Path<O.NonNullable<O, 'g', 'deep'>, ['g', 'g']>,    O.NonNullable<O, keyof O, 'deep'>,  Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// NONNULLABLEKEYS

checks([
    check<O.NonNullableKeys<O>, 'a' | 'b' | 'c' | 'f' | 'g',    Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// NULLABLE

type NULLABLE_O_FLAT = {
         a : string | undefined
         b : number | undefined
         c : {a: 'a'} & {b: 'b'} | undefined
         d?: 'string0'
readonly e?: 'string1'
readonly f : 0 | undefined
         g : O | undefined
         h?: 1
         j : 'a' | undefined
         k : {a: {b: string}} | undefined
}

type NULLABLE_O_A_FLAT = {
         a : string | undefined
         b : number
         c : {a: 'a'} & {b: 'b'}
         d?: 'string0'
readonly e?: 'string1'
readonly f : 0
         g : O
         h?: 1
         j : 'a' | undefined
         k : {a: {b: string}} | undefined
};

checks([
    check<O.Nullable<O, keyof O, 'flat'>,                   NULLABLE_O_FLAT,                Test.Pass>(),
    check<O.Nullable<O, 'a', 'flat'>,                       NULLABLE_O_A_FLAT,              Test.Pass>(),
    check<O.Path<O.Nullable<O, 'g', 'deep'>, ['g', 'g']>,   O.Nullable<O, keyof O, 'deep'>, Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// NULLABLEKEYS

checks([
    check<O.NullableKeys<O>,    'd' | 'e' | 'h' | 'j' | 'k',    Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// OMIT

type OMIT_O_DEH = {
    a: string
    b: number
    c: {a: 'a'} & {b: 'b'}
    readonly f: 0
    g: O
    j: 'a' | undefined
    k: {a: {b: string}} | undefined
};

checks([
    check<O.Omit<O, 'd' | 'e' | 'h'>,   OMIT_O_DEH, Test.Pass>(),
    check<O.Omit<O, keyof O>,           {},         Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// OPTIONAL

type OPTIONAL_O_FLAT = {
         a?: string,
         b?: number
         c?: {a: 'a'} & {b: 'b'}
         d?: 'string0'
readonly e?: 'string1'
readonly f?: 0
         g?: O
         h?: 1
         j?: 'a' | undefined
         k?: {a: {b: string}} | undefined
}

type OPTIONAL_O_A_FLAT = {
         a?: string | undefined
         b : number
         c : {a: 'a'} & {b: 'b'}
         d?: 'string0'
readonly e?: 'string1'
readonly f : 0
         g : O
         h?: 1
         j : 'a' | undefined
         k : {a: {b: string}} | undefined
};

checks([
    check<O.Optional<O, keyof O, 'flat'>,                   OPTIONAL_O_FLAT,                Test.Pass>(),
    check<O.Optional<O, 'a', 'flat'>,                       OPTIONAL_O_A_FLAT,              Test.Pass>(),
    check<O.Path<O.Optional<O, 'g', 'deep'>, ['g', 'g']>,   O.Optional<O, keyof O, 'deep'>, Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// OPTIONALKEYS

checks([
    check<O.OptionalKeys<O>,    'd' | 'e' | 'h',    Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// OVERWRITE

// No test needed (same as Merge)

// ---------------------------------------------------------------------------------------
// PATH

checks([
    check<O.Path<O, ['g', 'g', 'g']>,       O['g'], Test.Pass>(),
    check<O.Path<O, ['g', 'g', 'g', 'a']>,  string, Test.Pass>(),
    check<O.Path<O, ['g', 'x', 'g']>,       never,  Test.Pass>(),
    check<O.Path<O, []>,                    O,      Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// PATHS

type PATHS_O = {
    a: {
        a: {}
    }
    b: {
        a: {
            a: {}
        }
        b: {}
    }
};

checks([
    check<O.Paths<PATHS_O>, NonNullable<['a'?, 'a'?] | ['b'?, 'a'?, 'a'?] | ['b'?, 'b'?]>,  Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// PATHVALID

type PATHVALID_O = {
    a: {
        a: {}
    }
    b: {
        a: {
            a: {}
        }
        b: {}
    }
};

checks([
    check<O.PathValid<PATHVALID_O,  ['a', 'a']>,        ['a', 'a'],         Test.Pass>(),
    check<O.PathValid<PATHVALID_O,  ['a', 'x']>,        ['a', never],       Test.Pass>(),
    check<O.PathValid<PATHVALID_O,  ['b', 'a', 'a']>,   ['b', 'a', 'a'],    Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// PICK

type PICK_O_DEF = {
         d?: 'string0'
readonly e?: 'string1'
readonly f : 0
}

checks([
    check<O.Pick<O, 'd' | 'e' | 'f'>,   PICK_O_DEF, Test.Pass>(),
    check<O.Pick<O, keyof O>,           O,          Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// READONLY

type READONLY_O_FLAT = {
readonly a : string,
readonly b : number
readonly c : {a: 'a'} & {b: 'b'}
readonly d?: 'string0'
readonly e?: 'string1'
readonly f : 0
readonly g : O
readonly h?: 1
readonly j : 'a' | undefined
readonly k : {a: {b: string}} | undefined
}

type READONLY_O_A_FLAT = {
readonly a : string,
         b : number
         c : {a: 'a'} & {b: 'b'}
         d?: 'string0'
readonly e?: 'string1'
readonly f : 0
         g : O
         h?: 1
         j : 'a' | undefined
         k : {a: {b: string}} | undefined
};

checks([
    check<O.Readonly<O, keyof O, 'flat'>,                   READONLY_O_FLAT,                Test.Pass>(),
    check<O.Readonly<O, 'a', 'flat'>,                       READONLY_O_A_FLAT,              Test.Pass>(),
    check<O.Path<O.Readonly<O, 'g', 'deep'>, ['g', 'g']>,   O.Readonly<O, keyof O, 'deep'>, Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// READONLYKEYS

checks([
    check<O.ReadonlyKeys<O>,    'e' | 'f',  Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// RECORD

type RECORD_AB_A_OPTR = {
    readonly a?: string
    readonly b?: string
}

type RECORD_AB_A_OPTW = {
    a?: string
    b?: string
}

type RECORD_AB_A_REQR = {
    readonly a: string
    readonly b: string
}

type RECORD_AB_A_REQW = {
    a: string
    b: string
};

checks([
    check<O.Record<'a' | 'b', string, ['?', 'R']>,  RECORD_AB_A_OPTR,   Test.Pass>(),
    check<O.Record<'a' | 'b', string, ['?', 'W']>,  RECORD_AB_A_OPTW,   Test.Pass>(),
    check<O.Record<'a' | 'b', string, ['!', 'R']>,  RECORD_AB_A_REQR,   Test.Pass>(),
    check<O.Record<'a' | 'b', string, ['!', 'W']>,  RECORD_AB_A_REQW,   Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// REPLACE

type REPLACE_STRING_NUMBER = {
    a: number
    b: number
    c: {a: 'a'} & {b: 'b'}
    d?: 'string0' | undefined
    readonly e?: 'string1' | undefined
    readonly f: 0
    g: O
    h?: 1 | undefined
    j: 'a' | undefined
    k: {
        a: {
            b: string
        };
    } | undefined
};

checks([
    check<O.Replace<O, string, number>, REPLACE_STRING_NUMBER,  Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// REQUIRED

type REQUIRED_O_FLAT = {
         a: string,
         b: number
         c: {a: 'a'} & {b: 'b'}
         d: 'string0'
readonly e: 'string1'
readonly f: 0
         g: O
         h: 1
         j: 'a' | undefined
         k: {a: {b: string}} | undefined
}

type REQUIRED_O_D_FLAT = {
         a : string,
         b : number
         c : {a: 'a'} & {b: 'b'}
         d : 'string0'
readonly e?: 'string1'
readonly f : 0
         g : O
         h?: 1
         j : 'a' | undefined
         k : {a: {b: string}} | undefined
};

checks([
    check<O.Required<O, keyof O, 'flat'>,                   REQUIRED_O_FLAT,                Test.Pass>(),
    check<O.Required<O, 'd', 'flat'>,                       REQUIRED_O_D_FLAT,              Test.Pass>(),
    check<O.Path<O.Required<O, 'g', 'deep'>, ['g', 'g']>,   O.Required<O, keyof O, 'deep'>, Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// REQUIREDKEYS

checks([
    check<O.RequiredKeys<O>,    'a' | 'b' | 'c' | 'f' | 'g' | 'j' | 'k',    Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// SELECT

type SELECT_O_DEFAULT = {
         a : string,
}

type SELECT_O_LOOSE = {
         b : number
readonly f : 0
         h?: 1
}

type SELECT_O_EQUALS = {
         a : string,
};

checks([
    check<O.Select<O, string, 'extends'>,           SELECT_O_DEFAULT,   Test.Pass>(),
    check<O.Select<O, number | undefined, 'loose'>, SELECT_O_LOOSE,     Test.Pass>(),
    check<O.Select<O, string, 'equals'>,            SELECT_O_EQUALS,    Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// SELECTKEYS

type SELECTKEYS_O_DEFAULT = 'a'

type SELECTKEYS_O_LOOSE = 'b' | 'f' | 'h'

type SELECTKEYS_O_EQUALS = 'a';

checks([
    check<O.SelectKeys<O, string, 'extends'>,           SELECTKEYS_O_DEFAULT,  Test.Pass>(),
    check<O.SelectKeys<O, number | undefined, 'loose'>, SELECTKEYS_O_LOOSE,    Test.Pass>(),
    check<O.SelectKeys<O, string, 'equals'>,            SELECTKEYS_O_EQUALS,   Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// TUPLEOF

type TUPLEOF_O = {
    '0': 1
    '2': 3
    '3': never
    '5': 5
    '6': 6
}

type TUPLEOF = [1, 3, never, 5, 6];

checks([
    check<O.TupleOf<TUPLEOF_O>,    TUPLEOF,    Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// UNIONOF

type UNIONOF_O = {
    a: 'a'
    b: 'b'
    c: never
    d: 1
}

type UNIONOF = 'a' | 'b' | 1;

checks([
    check<O.UnionOf<UNIONOF_O>, UNIONOF,    Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// UPDATE

type UPDATE_O = {
    a?: 'a'
}

type UPDATE = {
    a?: 'xxxx'
};

checks([
    check<O.Update<UPDATE_O, 'a' | 'b', 'xxxx'>,    UPDATE, Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// WRITABLE

type WRITABLE_O_FLAT = {
    a : string,
    b : number
    c : {a: 'a'} & {b: 'b'}
    d?: 'string0'
    e?: 'string1'
    f : 0
    g : O
    h?: 1
    j : 'a' | undefined
    k : {a: {b: string}} | undefined
}

type WRITABLE_O_E_FLAT = {
    a : string,
    b : number
    c : {a: 'a'} & {b: 'b'}
    d?: 'string0'
    e?: 'string1'
readonly f : 0
    g : O
    h?: 1
    j : 'a' | undefined
    k : {a: {b: string}} | undefined
};

checks([
    check<O.Writable<O, keyof O, 'flat'>,                   WRITABLE_O_FLAT,                Test.Pass>(),
    check<O.Writable<O, 'e', 'flat'>,                       WRITABLE_O_E_FLAT,              Test.Pass>(),
    check<O.Path<O.Writable<O, 'g', 'deep'>, ['g', 'g']>,   O.Writable<O, keyof O, 'deep'>, Test.Pass>(),
])

// ---------------------------------------------------------------------------------------
// WRITABLEKEYS

checks([
    check<O.WritableKeys<O>,    'a' | 'b' | 'c' | 'd' | 'g' | 'h' | 'j' | 'k',  Test.Pass>(),
])
