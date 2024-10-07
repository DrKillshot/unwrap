import {Maybe} from "../../src/functional/maybe";
import {afterEach, describe} from "@jest/globals";
import {Either} from "../../src/functional/either";

describe('Maybe Monad', () => {
    describe('Maybe constructors', () => {
        it.each([null, undefined])('should yield a None when `fromNullable` is called with %s', (value: null | undefined) => {
            const result = Maybe.fromNullable(value)

            expect(result).toEqual(Maybe.None())
        })

        it.each([
            1,
            "Hello World!",
            () => {console.log('')},
            {name: "Maybe Monad", description: "Holds an Maybeal value"},
            [1, "Hello", {isObject: true, name: "Just an object"}, () => 1],
            [null, null, null, null]
        ])('should yield a Some when `fromNullable` is called with any non nullable value `%s`', (value) => {
            const result = Maybe.fromNullable(value)
            const expected = Maybe.Some(value)

            expect(result).toEqual(expected)
        })
    })

    describe('Map operation', () => {
        it.each([
            [1, (x:number) => x + 1, Maybe.Some(2)],
            ["Hello world!", (s: string) => s.toUpperCase(), Maybe.Some("HELLO WORLD!")],
            [[1,2,3,4], (arr: number[]) => arr.map(x => x % 2 == 0), Maybe.Some([false, true, false, true])],
            [{name: "An object"}, (obj: {name: string}) => obj.name, Maybe.Some("An object")]
        ])('should apply a transformation to the Maybe when the value is Some', (initial, transformation, final) => {
            // @ts-ignore
            const result = Maybe.Some(initial).map(transformation)

            expect(result).toEqual(final)
        })

        it.each([
            [(x:number) => x + 1],
            [(s: string) => s.toUpperCase()],
            [(arr: number[]) => arr.map(x => x % 2 == 0)],
            [(obj: {name: string}) => obj.name]
        ])('should not have any effect when Maybe is None', (transformation) => {
            // @ts-ignore
            const result = Maybe.None().map(transformation)

            expect(result).toEqual(Maybe.None())
        })
    })

    describe('Flatmap operation', () => {
       it.each([
           [1, (x: number) => Maybe.Some(x + 1), Maybe.Some(2)],
           ["Hello world!", (s: string) => Maybe.Some(s.toUpperCase()), Maybe.Some("HELLO WORLD!")],
           [[1,2,3,4], (arr: number[]) => Maybe.Some(arr.map(x => x % 2 == 0)), Maybe.Some([false, true, false, true])],
           [{name: "An object"}, (obj: {name: string}) => Maybe.Some(obj.name), Maybe.Some("An object")],
           ["Hey", () => Maybe.None(), Maybe.None()]
       ])('should flatmap a transformation that yields another Maybe for initial value "%s" and transformation: "%s"', (initial, transformation, final) => {
           // @ts-ignore
           const result = Maybe.Some(initial).flatMap(transformation)

           expect(result).toEqual(final)
       })

        it.each([
            [(x: number) => Maybe.Some(x + 1)],
            [(s: string) => Maybe.Some(s.toUpperCase())],
            [(arr: number[]) => Maybe.Some(arr.map(x => x % 2 == 0))],
            [(obj: {name: string}) => Maybe.Some(obj.name)]
        ])('should ignore the transformation if Maybe does not hold any value', (transformation) => {
            // @ts-ignore
            const result = Maybe.None().flatMap(transformation)

            expect(result).toEqual(Maybe.None())
        })
    })

    describe('Filter operation', () => {
        it.each([
            [1, (x: number) => x % 2 === 0, Maybe.None()],
            [1, () => true, Maybe.Some(1)],
            [[null, null, undefined, null, undefined], (x: (null | undefined)[]) => x.reduce((prev, curr) => prev && (curr == null), true), Maybe.Some([null, null, undefined, null, undefined])],
            ["Hello world!", (s: string) => s.length > 10, Maybe.Some("Hello world!")],
            [[], () => false, Maybe.None()]
        ])('should return a Some if the filter predicate is true and a None otherwise. Initial value "%s" and transformation "%s"', (initial, predicate, final) => {
            // @ts-ignore
            const result = Maybe.Some(initial).filter(predicate)

            expect(result).toEqual(final)
        })

        it('should return a None when the initial Maybe does not hold any value', () => {
            const result = Maybe.None().filter(() => true)

            expect(result).toEqual(Maybe.None())
        })
    })

    describe('IsPresent and isEmpty operation', () => {
        it.each([
            Maybe.Some(1), Maybe.Some([null, undefined]), Maybe.Some({name: "An object"}), Maybe.Some("Hello world!")
        ])('should return true for "%s"', (Maybe) => {
            expect(Maybe.isPresent()).toEqual(true)
            expect(Maybe.isEmpty()).toEqual(false)
        })

        it('should return false for None', () => {
            expect(Maybe.None().isEmpty()).toEqual(true)
            expect(Maybe.None().isPresent()).toEqual(false)
        })
    })

    describe('Where operator', () => {
        it.each([
            [Maybe.Some(1), {Some: (x: number) => x + 1, None: 0}, 2],
            [Maybe.Some(1), {Some: true, None: true}, true],
            [Maybe.None(), {Some: () => true, None: false}, false],
            [Maybe.Some([null, null, undefined]), {Some: (arr: (null | undefined)[]) => arr.map(elem => elem == null), None: false}, [true, true, true]],
        ])('should apply the some branch when Maybe holds value and the none branch otherwise', (Maybe, whereer, final) => {
            // @ts-ignore
            const result = Maybe.where(whereer)

            expect(result).toEqual(final)
        })
    })

    describe('IfPresent operator', () => {
        afterEach(() => {
            jest.clearAllMocks()
        })

        it.each([
            [Maybe.Some(1), (x: number) => console.log(x)]
        ])('it should execute the ifPresent function when Maybe has a value and then return the Maybe unchanged.', (Maybe, operation) => {
            const spy = jest.spyOn(console, 'log')
            const result = Maybe.ifPresent(operation)

            expect(result).toEqual(Maybe)
            expect(spy).toHaveBeenCalledTimes(1)
        })

        it.each([
            [Maybe.None(), () => console.log('Something')]
        ])('it should not execute the ifPresent operation when Maybe does not hold any value', (Maybe, operation) => {
            const spy = jest.spyOn(console, 'log')
            const result = Maybe.ifPresent(operation)

            expect(result).toEqual(Maybe)
            expect(spy).not.toHaveBeenCalled()
        })
    })

    describe('GetWithDefault operator', () => {
        it.each([
            [Maybe.Some(1), 1],
            [Maybe.Some("Hello world!"), "Hello world!"],
            [Maybe.Some([1,2,3]), [1,2,3]],
            [Maybe.Some([null, null, undefined]), [null, null, undefined]],
            [Maybe.Some({name: "Object name"}), {name: "Object name"}]
        ])('should return the value when Maybe holds any value', (Maybe, final) => {
            const result = Maybe.getWithDefault(-1)

            expect(result).toEqual(final)
        })

        it.each([
            0, [1,2,3], "Hello world!", {name: "An object name"}, null, undefined
        ])('should return the default value when Maybe does not hold any value', (defaultValue) => {
            const result = Maybe.None().getWithDefault(defaultValue)

            expect(result).toEqual(defaultValue)
        })
    })

    describe('Unwrap operator', () => {
        it.each([
            1, "Hello world!", [1,2,3], {name: "An object"}
        ])('should get the value inside the Maybe', (MaybeValue) => {
            const result = Maybe.Some(MaybeValue).unwrap()

            expect(result).toEqual(MaybeValue)
        })
    })

    describe('ToEither operator', () => {
        it.each([
            1, "Hello world!", [1,2,3], {name: "An object"}
        ])('should convert to an Ok Either type when Maybe has value', (value) => {
            const result = Maybe.Some(value)

            const expected = Either.Ok(value)
            expect(result.toEither("An error!")).toEqual(expected)
        })

        it("should convert to an Error Either type when Maybe does not hold any value", () => {
            const error = "An error"
            const result = Maybe.None()

            const expected = Either.Error(error)
            expect(result.toEither(error)).toEqual(expected)
        })
    })
})