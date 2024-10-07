import {IO} from "../../src/functional/io";
import {Maybe} from "../../src/functional/maybe";

describe('IO monad', () => {
    describe('Compute operator', () => {
        it.each([
            [1,2,3], 10, "Hello world!"
        ])('should compute the io operation "%s" when compute() is called', (value) => {
            const result = IO.of(value)

            expect(result.unwrap()).toEqual(value)
        })
    })

    describe('Map operator', () => {
        it.each([
            [1, (x:number) => x + 1, 2],
            ["Hello world!", (s: string) => s.toUpperCase(), "HELLO WORLD!"],
            [[1,2,3,4], (arr: number[]) => arr.map(x => x % 2 == 0), [false, true, false, true]],
            [{name: "An object"}, (obj: {name: string}) => obj.name, "An object"]
        ])('should apply the map transformation "%s" the IO container when compute is called', (value, transformation, final) => {
            // @ts-ignore
            const result = IO.of(value).map(transformation)

            expect(result.unwrap()).toEqual(final)
        })
    })

    describe('Flatmap operator', () => {
        it.each([
            [1, (x:number) => IO.of(x + 1), 2],
            ["Hello world!", (s: string) => IO.of(s.toUpperCase()), "HELLO WORLD!"],
            [[1,2,3,4], (arr: number[]) => IO.of(arr.map(x => x % 2 == 0)), [false, true, false, true]],
            [{name: "An object"}, (obj: {name: string}) => IO.of(obj.name), "An object"]
        ])('should apply flatmap transformation "%s" the IO container when compute is called', (value, transformation, final) => {
            // @ts-ignore
            const result = IO.of(value).flatMap(transformation)

            expect(result.unwrap()).toEqual(final)
        })
    })

    describe('ToOption operator', () => {
        it.each([
            1, "Hello world!", [1,2,3], [null, undefined], {name: "An object"}
        ])('should compute the IO and convert it to a Some holding the computed value', (value) => {
            const result = IO.of(value)

            const expected = Maybe.Some(value)
            expect(result.toMaybe()).toEqual(expected)
        })

        it.each([
            null, undefined
        ])('should compute the IO and convert it to a None', (value) => {
            const result = IO.of(value)

            const expected = Maybe.None()
            expect(result.toMaybe()).toEqual(expected)
        })
    })
})