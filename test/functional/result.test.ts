import {Either} from "../../src/functional/either";
import {Maybe} from "../../src/functional/maybe";

describe('Either monad', () => {
    describe('Either constructors', () => {
        it.each([
            1, [1,2,3], "Hello world!", {name: "Object name"}
        ])('should create an Ok container when fromNullable is called "%s', (value) => {
            const result = Either.fromNullable(value, "Error case")

            const expected = Either.Ok(value)
            expect(result).toEqual(expected)
        })

        it.each([
            null, undefined
        ])('should create an Error container when fromNullable is called with "%s"', (nullable) => {
            const error = "Error case"
            const result = Either.fromNullable(nullable, error)

            const expected = Either.Error(error)
            expect(result).toEqual(expected)
        })
    })

    describe('Map operator', () => {
        it.each([
            [1, (x:number) => x + 1, Either.Ok(2)],
            ["Hello world!", (s: string) => s.toUpperCase(), Either.Ok("HELLO WORLD!")],
            [[1,2,3,4], (arr: number[]) => arr.map(x => x % 2 == 0), Either.Ok([false, true, false, true])],
            [{name: "An object"}, (obj: {name: string}) => obj.name, Either.Ok("An object")]
        ])('should map "%s" the when Either is of type Ok', (input, transformation, final) => {
            // @ts-ignore
            const result = Either.Ok(input).map(transformation)

            expect(result).toEqual(final)
        })

        it.each([
            [1, (x:number) => x + 1],
            ["Hello world!", (s: string) => s.toUpperCase()],
            [[1,2,3,4], (arr: number[]) => arr.map(x => x % 2 == 0)],
            [{name: "An object"}, (obj: {name: string}) => obj.name]
        ])('should not map "%s" if Either is of type Error', (input, transformation) => {
            // @ts-ignore
            const result = Either.Error(input).map(transformation)

            const expected = Either.Error(input)
            expect(result).toEqual(expected)
        })
    })

    describe('MapError operator', () => {
        it.each([
            [1, (x:number) => x + 1, Either.Error(2)],
            ["Hello world!", (s: string) => s.toUpperCase(), Either.Error("HELLO WORLD!")],
            [[1,2,3,4], (arr: number[]) => arr.map(x => x % 2 == 0), Either.Error([false, true, false, true])],
            [{name: "An object"}, (obj: {name: string}) => obj.name, Either.Error("An object")]
        ])('should map "%s" the when Either is of type Error', (input, transformation, final) => {
            // @ts-ignore
            const result = Either.Error(input).mapError(transformation)

            expect(result).toEqual(final)
        })

        it.each([
            [1, (x:number) => x + 1],
            ["Hello world!", (s: string) => s.toUpperCase()],
            [[1,2,3,4], (arr: number[]) => arr.map(x => x % 2 == 0)],
            [{name: "An object"}, (obj: {name: string}) => obj.name]
        ])('should not map "%s" if Either is of type Ok', (input, transformation) => {
            // @ts-ignore
            const result = Either.Ok(input).mapError(transformation)

            const expected = Either.Ok(input)
            expect(result).toEqual(expected)
        })
    })

    describe('Flatmap operator', () => {
       it.each([
           [1, (x: number) => Either.Ok(x + 1), Either.Ok(2)],
           ["Hello world!", (s: string) => Either.Ok(s.toUpperCase()), Either.Ok("HELLO WORLD!")],
           [[1,2,3,4], (arr: number[]) => Either.Ok(arr.map(x => x % 2 == 0)), Either.Ok([false, true, false, true])],
           [{name: "An object"}, (obj: {name: string}) => Either.Ok(obj.name), Either.Ok("An object")],

           [1, (x: number) => Either.Error(x + 1), Either.Error(2)],
           ["Hello world!", (s: string) => Either.Error(s.toUpperCase()), Either.Error("HELLO WORLD!")],
           [[1,2,3,4], (arr: number[]) => Either.Error(arr.map(x => x % 2 == 0)), Either.Error([false, true, false, true])],
           [{name: "An object"}, (obj: {name: string}) => Either.Error(obj.name), Either.Error("An object")],
       ])('it should flatten the transformation "%s"', (input, transformation, final) => {
           // @ts-ignore
           const resultOk = Either.Ok(input).flatMap(transformation)

           expect(resultOk).toEqual(final)
       })

        it.each([
            [1, (x: number) => Either.Error(x + 1)],
            ["Hello world!", (s: string) => Either.Error(s.toUpperCase())],
            [[1,2,3,4], (arr: number[]) => Either.Error(arr.map(x => x % 2 == 0))],
            [{name: "An object"}, (obj: {name: string}) => Either.Error(obj.name)],
        ])('it should not apply the transformation "%s" when Either type is Error', (input, transformation) => {
            // @ts-ignore
            const resultOk = Either.Error(input).flatMap(transformation)

            const expected = Either.Error(input)
            expect(resultOk).toEqual(expected)
        })
    })

    describe('Swap operator', () => {
        it.each([
            [Either.Ok(1), Either.Error(1)],
            [Either.Ok("Hello world!"), Either.Error("Hello world!")],
            [Either.Ok([1,2,3]), Either.Error([1,2,3])],
            [Either.Ok({name: "An object"}), Either.Error({name: "An object"})],
        ])('it should swap an Ok type to a Error type', (result, swap) => {
            const swapped = result.swap()

            expect(swapped).toEqual(swap)
        })

        it.each([
            [Either.Error(1), Either.Ok(1)],
            [Either.Error("Hello world!"), Either.Ok("Hello world!")],
            [Either.Error([1,2,3]), Either.Ok([1,2,3])],
            [Either.Error({name: "An object"}), Either.Ok({name: "An object"})],
        ])('it should swap an Error type to an Ok type', (result, swap) => {
            const swapped = result.swap()

            expect(swapped).toEqual(swap)
        })
    })

    describe('IsOk and IsError operator', () => {
        it.each([
            [Either.Ok(1), true],
            [Either.Ok("Hello world!"), true],
            [Either.Ok([1,2,3]), true],
            [Either.Ok({name: "An object"}), true],

            [Either.Error(1), false],
            [Either.Error("Hello world!"), false],
            [Either.Error([1,2,3]), false],
            [Either.Error({name: "An object"}), false],
        ])('should return true when isOk is called and Either is of type Ok and false otherwise', (result, expected) => {
            expect(result.isOk()).toBe(expected)
        })

        it.each([
            [Either.Ok(1), false],
            [Either.Ok("Hello world!"), false],
            [Either.Ok([1,2,3]), false],
            [Either.Ok({name: "An object"}), false],

            [Either.Error(1), true],
            [Either.Error("Hello world!"), true],
            [Either.Error([1,2,3]), true],
            [Either.Error({name: "An object"}), true],
        ])('should return true when isError is called and Either is of type Error and false otherwise', (result, expected) => {
            expect(result.isError()).toBe(expected)
        })
    })

    describe('Recover operator', () => {
        it.each([
            Either.Ok(1), Either.Ok([1,2,3]), Either.Ok("Hello world!"), Either.Ok({name: "An object"})
        ])('should not recover when the Either type is Ok', (result) => {
            const recoverValue = "Recovered Value"
            const recovered = result.recover(recoverValue)

            expect(recovered).toEqual(result)
        })

        it.each([
            Either.Error(1), Either.Error([1,2,3]), Either.Error("Hello world!"), Either.Error({name: "An object"})
        ])('should not recover when the Either type is Ok', (result) => {
            const recoverValue = "Recovered Value"
            const recovered = result.recover(recoverValue)

            const expected = Either.Ok(recoverValue)
            expect(recovered).toEqual(expected)
        })
    })

    describe('Tap and tapError operators', () => {
        const ok = Either.Ok(1)
        const error = Either.Error("An error string")
        const operation = (input: number | string) => console.log(input)
        const consoleSpy = jest.spyOn(console, 'log')

        beforeEach(() => {
            jest.clearAllMocks()
        })

        it('should run the tap operation when Either is of type Ok', () => {
            const result = ok.tap(operation)

            expect(result).toEqual(ok)
            expect(consoleSpy).toHaveBeenCalledTimes(1)
        })

        it('should nto run the tap operation when Either is of type Error', () => {
            const result = error.tap(operation)

            expect(result).toEqual(error)
            expect(consoleSpy).toHaveBeenCalledTimes(0)
        })

        it('should run the tapError operation when Either is of type Error', () => {
            const result = error.tapError(operation)

            expect(result).toEqual(error)
            expect(consoleSpy).toHaveBeenCalledTimes(1)
        })

        it('should not run the tapError operation when Either is of type Ok', () => {
            const result = ok.tapError(operation)

            expect(result).toEqual(ok)
            expect(consoleSpy).toHaveBeenCalledTimes(0)
        })
    })

    describe('Where operator', () => {
        it.each([
            [Either.Ok(1), {Ok: (x: number) => x + 1, Error: 0}, 2],
            [Either.Ok(1), {Ok: true, Error: false}, true],
            [Either.Error("This is an error string"), {Ok: false, Error: (s: string) => s.toUpperCase()}, "THIS IS AN ERROR STRING"],
            [Either.Error([null, null, undefined]), {Ok: false, Error: {message: "There has been an error processing the input."}}, {message: "There has been an error processing the input."}],
        ])('should apply the some branch when maybe holds value and the none branch otherwise', (result, matcher, final) => {
            // @ts-ignore
            const where = result.where(matcher)

            expect(where).toEqual(final)
        })
    })

    describe('To maybe operator', () => {
        it.each([
            Either.Ok(1), Either.Ok([1,2,3]), Either.Ok("Hello world!"), Either.Ok({name: "An object"}), Either.Ok([null, undefined])
        ])('should return an maybe with a value if Either "%s" type is Ok', (result) => {
            const maybe = result.toMaybe()

            const expected = Maybe.Some(result.get())
            expect(maybe).toEqual(expected)
        })

        it.each([
            Either.Error(1), Either.Error([1,2,3]), Either.Error("Hello world!"), Either.Error({name: "An object"}), Either.Error([null, undefined])
        ])('should return an None maybe if Either "%s" type is Error', (result) => {
            const maybe = result.toMaybe()

            expect(maybe).toEqual(Maybe.None())
        })
    })

    describe('Get and getError operators', () => {
        it.each([
            1, [1,2,3], [undefined, null], "Hello world!", {name: "An object"}
        ])('should return the value "%s" on get call if Either is Ok', (value) => {
            const result = Either.Ok(value).get()

            expect(result).toEqual(value)
        })

        it.each([
            1, [1,2,3], [undefined, null], "Hello world!", {name: "An object"}
        ])('should return the value "%s" on get call if Either is Error', (value) => {
            const result = Either.Error(value).getError()

            expect(result).toEqual(value)
        })
    })
})