import {Result} from "../../src/functional/result";
import {Option} from "../../src/functional/option";

describe('Result monad', () => {
    describe('Result constructors', () => {
        it.each([
            1, [1,2,3], "Hello world!", {name: "Object name"}
        ])('should create an Ok container when fromNullable is called "%s', (value) => {
            const result = Result.fromNullable(value, "Error case")

            const expected = Result.Ok(value)
            expect(result).toEqual(expected)
        })

        it.each([
            null, undefined
        ])('should create an Error container when fromNullable is called with "%s"', (nullable) => {
            // FIXME: Changing Result.Error --> Result.Ok still works for some reason.
            const error = "Error case"
            const result = Result.fromNullable(nullable, error)

            const expected = Result.Error(error)
            expect(result).toEqual(expected)
        })
    })

    describe('Map operator', () => {
        it.each([
            [1, (x:number) => x + 1, Result.Ok(2)],
            ["Hello world!", (s: string) => s.toUpperCase(), Result.Ok("HELLO WORLD!")],
            [[1,2,3,4], (arr: number[]) => arr.map(x => x % 2 == 0), Result.Ok([false, true, false, true])],
            [{name: "An object"}, (obj: {name: string}) => obj.name, Result.Ok("An object")]
        ])('should map "%s" the when Result is of type Ok', (input, transformation, final) => {
            // @ts-ignore
            const result = Result.Ok(input).map(transformation)

            expect(result).toEqual(final)
        })

        it.each([
            [1, (x:number) => x + 1],
            ["Hello world!", (s: string) => s.toUpperCase()],
            [[1,2,3,4], (arr: number[]) => arr.map(x => x % 2 == 0)],
            [{name: "An object"}, (obj: {name: string}) => obj.name]
        ])('should not map "%s" if Result is of type Error', (input, transformation) => {
            // @ts-ignore
            const result = Result.Error(input).map(transformation)

            const expected = Result.Error(input)
            expect(result).toEqual(expected)
        })
    })

    describe('MapError operator', () => {
        it.each([
            [1, (x:number) => x + 1, Result.Error(2)],
            ["Hello world!", (s: string) => s.toUpperCase(), Result.Error("HELLO WORLD!")],
            [[1,2,3,4], (arr: number[]) => arr.map(x => x % 2 == 0), Result.Error([false, true, false, true])],
            [{name: "An object"}, (obj: {name: string}) => obj.name, Result.Error("An object")]
        ])('should map "%s" the when Result is of type Error', (input, transformation, final) => {
            // @ts-ignore
            const result = Result.Error(input).mapError(transformation)

            expect(result).toEqual(final)
        })

        it.each([
            [1, (x:number) => x + 1],
            ["Hello world!", (s: string) => s.toUpperCase()],
            [[1,2,3,4], (arr: number[]) => arr.map(x => x % 2 == 0)],
            [{name: "An object"}, (obj: {name: string}) => obj.name]
        ])('should not map "%s" if Result is of type Ok', (input, transformation) => {
            // @ts-ignore
            const result = Result.Ok(input).mapError(transformation)

            const expected = Result.Ok(input)
            expect(result).toEqual(expected)
        })
    })

    describe('Flatmap operator', () => {
       it.each([
           [1, (x: number) => Result.Ok(x + 1), Result.Ok(2)],
           ["Hello world!", (s: string) => Result.Ok(s.toUpperCase()), Result.Ok("HELLO WORLD!")],
           [[1,2,3,4], (arr: number[]) => Result.Ok(arr.map(x => x % 2 == 0)), Result.Ok([false, true, false, true])],
           [{name: "An object"}, (obj: {name: string}) => Result.Ok(obj.name), Result.Ok("An object")],

           [1, (x: number) => Result.Error(x + 1), Result.Error(2)],
           ["Hello world!", (s: string) => Result.Error(s.toUpperCase()), Result.Error("HELLO WORLD!")],
           [[1,2,3,4], (arr: number[]) => Result.Error(arr.map(x => x % 2 == 0)), Result.Error([false, true, false, true])],
           [{name: "An object"}, (obj: {name: string}) => Result.Error(obj.name), Result.Error("An object")],
       ])('it should flatten the transformation "%s"', (input, transformation, final) => {
           // @ts-ignore
           const resultOk = Result.Ok(input).flatMap(transformation)

           expect(resultOk).toEqual(final)
       })

        it.each([
            [1, (x: number) => Result.Error(x + 1)],
            ["Hello world!", (s: string) => Result.Error(s.toUpperCase())],
            [[1,2,3,4], (arr: number[]) => Result.Error(arr.map(x => x % 2 == 0))],
            [{name: "An object"}, (obj: {name: string}) => Result.Error(obj.name)],
        ])('it should not apply the transformation "%s" when Result type is Error', (input, transformation) => {
            // @ts-ignore
            const resultOk = Result.Error(input).flatMap(transformation)

            const expected = Result.Error(input)
            expect(resultOk).toEqual(expected)
        })
    })

    describe('Swap operator', () => {
        it.each([
            [Result.Ok(1), Result.Error(1)],
            [Result.Ok("Hello world!"), Result.Error("Hello world!")],
            [Result.Ok([1,2,3]), Result.Error([1,2,3])],
            [Result.Ok({name: "An object"}), Result.Error({name: "An object"})],
        ])('it should swap an Ok type to a Error type', (result, swap) => {
            const swapped = result.swap()

            expect(swapped).toEqual(swap)
        })

        it.each([
            [Result.Error(1), Result.Ok(1)],
            [Result.Error("Hello world!"), Result.Ok("Hello world!")],
            [Result.Error([1,2,3]), Result.Ok([1,2,3])],
            [Result.Error({name: "An object"}), Result.Ok({name: "An object"})],
        ])('it should swap an Error type to an Ok type', (result, swap) => {
            const swapped = result.swap()

            expect(swapped).toEqual(swap)
        })
    })

    describe('IsOk and IsError operator', () => {
        it.each([
            [Result.Ok(1), true],
            [Result.Ok("Hello world!"), true],
            [Result.Ok([1,2,3]), true],
            [Result.Ok({name: "An object"}), true],

            [Result.Error(1), false],
            [Result.Error("Hello world!"), false],
            [Result.Error([1,2,3]), false],
            [Result.Error({name: "An object"}), false],
        ])('should return true when isOk is called and Result is of type Ok and false otherwise', (result, expected) => {
            expect(result.isOk()).toBe(expected)
        })

        it.each([
            [Result.Ok(1), false],
            [Result.Ok("Hello world!"), false],
            [Result.Ok([1,2,3]), false],
            [Result.Ok({name: "An object"}), false],

            [Result.Error(1), true],
            [Result.Error("Hello world!"), true],
            [Result.Error([1,2,3]), true],
            [Result.Error({name: "An object"}), true],
        ])('should return true when isError is called and Result is of type Error and false otherwise', (result, expected) => {
            expect(result.isError()).toBe(expected)
        })
    })

    describe('Recover operator', () => {
        it.each([
            Result.Ok(1), Result.Ok([1,2,3]), Result.Ok("Hello world!"), Result.Ok({name: "An object"})
        ])('should not recover when the Result type is Ok', (result) => {
            const recoverValue = "Recovered Value"
            const recovered = result.recover(recoverValue)

            expect(recovered).toEqual(result)
        })

        it.each([
            Result.Error(1), Result.Error([1,2,3]), Result.Error("Hello world!"), Result.Error({name: "An object"})
        ])('should not recover when the Result type is Ok', (result) => {
            const recoverValue = "Recovered Value"
            const recovered = result.recover(recoverValue)

            const expected = Result.Ok(recoverValue)
            expect(recovered).toEqual(expected)
        })
    })

    describe('Tap and tapError operators', () => {
        const ok = Result.Ok(1)
        const error = Result.Error("An error string")
        const operation = (input: number | string) => console.log(input)
        const consoleSpy = jest.spyOn(console, 'log')

        beforeEach(() => {
            jest.clearAllMocks()
        })

        it('should run the tap operation when Result is of type Ok', () => {
            const result = ok.tap(operation)

            expect(result).toEqual(ok)
            expect(consoleSpy).toHaveBeenCalledTimes(1)
        })

        it('should nto run the tap operation when Result is of type Error', () => {
            const result = error.tap(operation)

            expect(result).toEqual(error)
            expect(consoleSpy).toHaveBeenCalledTimes(0)
        })

        it('should run the tapError operation when Result is of type Error', () => {
            const result = error.tapError(operation)

            expect(result).toEqual(error)
            expect(consoleSpy).toHaveBeenCalledTimes(1)
        })

        it('should not run the tapError operation when Result is of type Ok', () => {
            const result = ok.tapError(operation)

            expect(result).toEqual(ok)
            expect(consoleSpy).toHaveBeenCalledTimes(0)
        })
    })

    describe('Match operator', () => {
        it.each([
            [Result.Ok(1), {Ok: (x: number) => x + 1, Error: 0}, 2],
            [Result.Ok(1), {Ok: true, Error: false}, true],
            [Result.Error("This is an error string"), {Ok: false, Error: (s: string) => s.toUpperCase()}, "THIS IS AN ERROR STRING"],
            [Result.Error([null, null, undefined]), {Ok: false, Error: {message: "There has been an error processing the input."}}, {message: "There has been an error processing the input."}],
        ])('should apply the some branch when option holds value and the none branch otherwise', (result, matcher, final) => {
            // @ts-ignore
            const match = result.match(matcher)

            expect(match).toEqual(final)
        })
    })

    describe('To option operator', () => {
        it.each([
            Result.Ok(1), Result.Ok([1,2,3]), Result.Ok("Hello world!"), Result.Ok({name: "An object"}), Result.Ok([null, undefined])
        ])('should return an option with a value if Result "%s" type is Ok', (result) => {
            const option = result.toOption()

            const expected = Option.Some(result.get())
            expect(option).toEqual(expected)
        })

        it.each([
            Result.Error(1), Result.Error([1,2,3]), Result.Error("Hello world!"), Result.Error({name: "An object"}), Result.Error([null, undefined])
        ])('should return an None option if Result "%s" type is Error', (result) => {
            const option = result.toOption()

            expect(option).toEqual(Option.None())
        })
    })

    describe('Get and getError operators', () => {
        it.each([
            1, [1,2,3], [undefined, null], "Hello world!", {name: "An object"}
        ])('should return the value "%s" on get call if Result is Ok', (value) => {
            const result = Result.Ok(value).get()

            expect(result).toEqual(value)
        })

        it.each([
            1, [1,2,3], [undefined, null], "Hello world!", {name: "An object"}
        ])('should return the value "%s" on get call if Result is Error', (value) => {
            const result = Result.Error(value).getError()

            expect(result).toEqual(value)
        })
    })
})