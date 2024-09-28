import {Option} from "../../src/functional/option";
import {afterEach} from "@jest/globals";

describe('Option Monad', () => {
    describe('Option constructors', () => {
        it.each([null, undefined])('should yield a None when `fromNullable` is called with %s', (value: null | undefined) => {
            const result = Option.fromNullable(value)

            expect(result).toEqual(Option.None())
        })

        it.each([
            1,
            "Hello World!",
            () => {console.log('')},
            {name: "Option Monad", description: "Holds an optional value"},
            [1, "Hello", {isObject: true, name: "Just an object"}, () => 1],
            [null, null, null, null]
        ])('should yield a Some when `fromNullable` is called with any non nullable value `%s`', (value) => {
            const result = Option.fromNullable(value)
            const expected = Option.Some(value)

            expect(result).toEqual(expected)
        })
    })

    describe('Map operation', () => {
        it.each([
            [1, (x:number) => x + 1, Option.Some(2)],
            ["Hello world!", (s: string) => s.toUpperCase(), Option.Some("HELLO WORLD!")],
            [[1,2,3,4], (arr: number[]) => arr.map(x => x % 2 == 0), Option.Some([false, true, false, true])],
            [{name: "An object"}, (obj: {name: string}) => obj.name, Option.Some("An object")]
        ])('should apply a transformation to the option when the value is Some', (initial, transformation, final) => {
            // @ts-ignore
            const result = Option.Some(initial).map(transformation)

            expect(result).toEqual(final)
        })

        it.each([
            [(x:number) => x + 1],
            [(s: string) => s.toUpperCase()],
            [(arr: number[]) => arr.map(x => x % 2 == 0)],
            [(obj: {name: string}) => obj.name]
        ])('should not have any effect when Option is None', (transformation) => {
            // @ts-ignore
            const result = Option.None().map(transformation)

            expect(result).toEqual(Option.None())
        })
    })

    describe('Flatmap operation', () => {
       it.each([
           [1, (x: number) => Option.Some(x + 1), Option.Some(2)],
           ["Hello world!", (s: string) => Option.Some(s.toUpperCase()), Option.Some("HELLO WORLD!")],
           [[1,2,3,4], (arr: number[]) => Option.Some(arr.map(x => x % 2 == 0)), Option.Some([false, true, false, true])],
           [{name: "An object"}, (obj: {name: string}) => Option.Some(obj.name), Option.Some("An object")],
           ["Hey", () => Option.None(), Option.None()]
       ])('should flatmap a transformation that yields another option for initial value "%s" and transformation: "%s"', (initial, transformation, final) => {
           // @ts-ignore
           const result = Option.Some(initial).flatMap(transformation)

           expect(result).toEqual(final)
       })

        it.each([
            [(x: number) => Option.Some(x + 1)],
            [(s: string) => Option.Some(s.toUpperCase())],
            [(arr: number[]) => Option.Some(arr.map(x => x % 2 == 0))],
            [(obj: {name: string}) => Option.Some(obj.name)]
        ])('should ignore the transformation if option does not hold any value', (transformation) => {
            // @ts-ignore
            const result = Option.None().flatMap(transformation)

            expect(result).toEqual(Option.None())
        })
    })

    describe('Filter operation', () => {
        it.each([
            [1, (x: number) => x % 2 === 0, Option.None()],
            [1, () => true, Option.Some(1)],
            [[null, null, undefined, null, undefined], (x: (null | undefined)[]) => x.reduce((prev, curr) => prev && (curr == null), true), Option.Some([null, null, undefined, null, undefined])],
            ["Hello world!", (s: string) => s.length > 10, Option.Some("Hello world!")],
            [[], () => false, Option.None()]
        ])('should return a Some if the filter predicate is true and a None otherwise. Initial value "%s" and transformation "%s"', (initial, predicate, final) => {
            // @ts-ignore
            const result = Option.Some(initial).filter(predicate)

            expect(result).toEqual(final)
        })

        it('should return a None when the initial option does not hold any value', () => {
            const result = Option.None().filter(() => true)

            expect(result).toEqual(Option.None())
        })
    })

    describe('IsPresent and isEmpty operation', () => {
        it.each([
            Option.Some(1), Option.Some([null, undefined]), Option.Some({name: "An object"}), Option.Some("Hello world!")
        ])('should return true for "%s"', (option) => {
            expect(option.isPresent()).toEqual(true)
            expect(option.isEmpty()).toEqual(false)
        })

        it('should return false for None', () => {
            expect(Option.None().isEmpty()).toEqual(true)
            expect(Option.None().isPresent()).toEqual(false)
        })
    })

    describe('Match operator', () => {
        it.each([
            [Option.Some(1), {Some: (x: number) => x + 1, None: 0}, 2],
            [Option.Some(1), {Some: true, None: true}, true],
            [Option.None(), {Some: () => true, None: false}, false],
            [Option.Some([null, null, undefined]), {Some: (arr: (null | undefined)[]) => arr.map(elem => elem == null), None: false}, [true, true, true]],
        ])('should apply the some branch when option holds value and the none branch otherwise', (option, matcher, final) => {
            // @ts-ignore
            const result = option.match(matcher)

            expect(result).toEqual(final)
        })
    })

    describe('Tap operator', () => {
        afterEach(() => {
            jest.clearAllMocks()
        })

        it.each([
            [Option.Some(1), (x: number) => console.log(x)]
        ])('it should execute the tap function when option has a value and then return the option unchanged.', (option, operation) => {
            const spy = jest.spyOn(console, 'log')
            const result = option.tap(operation)

            expect(result).toEqual(option)
            expect(spy).toHaveBeenCalledTimes(1)
        })

        it.each([
            [Option.None(), () => console.log('Something')]
        ])('it should not execute the tap operation when option does not hold any value', (option, operation) => {
            const spy = jest.spyOn(console, 'log')
            const result = option.tap(operation)

            expect(result).toEqual(option)
            expect(spy).not.toHaveBeenCalled()
        })
    })

    describe('GetWithDefault operator', () => {
        it.each([
            [Option.Some(1), 1],
            [Option.Some("Hello world!"), "Hello world!"],
            [Option.Some([1,2,3]), [1,2,3]],
            [Option.Some([null, null, undefined]), [null, null, undefined]],
            [Option.Some({name: "Object name"}), {name: "Object name"}]
        ])('should return the value when option holds any value', (option, final) => {
            const result = option.getWithDefault(-1)

            expect(result).toEqual(final)
        })

        it.each([
            0, [1,2,3], "Hello world!", {name: "An object name"}, null, undefined
        ])('should return the default value when option does not hold any value', (defaultValue) => {
            const result = Option.None().getWithDefault(defaultValue)

            expect(result).toEqual(defaultValue)
        })
    })

    describe('Get operator', () => {
        it.each([
            1, "Hello world!", [1,2,3], {name: "An object"}
        ])('should get the value inside the option', (optionValue) => {
            const result = Option.Some(optionValue).get()

            expect(result).toEqual(optionValue)
        })
    })
})