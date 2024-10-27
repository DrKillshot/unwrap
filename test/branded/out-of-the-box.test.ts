import { Brand } from '../../src'

// NOTE: Some of the types are already being tested in the "types.test.ts"
describe('Out of the box branded types', () => {
    describe('Number', () => {
        describe('Digit', () => {
            it.each([
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9
            ])('should create a digit if the underlying number %s is between 0 and 9', (digit: number) => {
                expect(Brand.Number.Digit(digit)).toEqual(digit)
            })

            it.each([
                10e-10, 9 + 1e-10, 5.5
            ])('should throw when the underlying number (%s) is not a digit', (number: number) => {
                expect(() => Brand.Number.Digit(number)).toThrow()
            })
        })

        describe('Float', () => {
            it.each([
                1e-10, 10e5+10e-10, 5.5
            ])('it should create a float if the underlying number, %s, is indeed a float', (number: number) => {
                expect(Brand.Number.Float(number)).toEqual(number)
            })

            it.each([
                0, 10e10, -10e10
            ])('it should throw when the underlying number, %s, is not a float', (number: number) => {
                expect(() => Brand.Number.Float(number)).toThrow()
            })
        })

        describe('Between', () => {
            it.each([
                [0, 10, [0, 1, 2, 3, 4, 5, 6, 7, 9, 9, 10, 5.5, 2.2, 7.2, 10-1e-10, 1e-10]],
                [-50, 50, [-50, 50, -25, 25, -50+1e-10, 50-1e-10]],
                [-1, 1, [-1+1e-10, 1-1e-10, 0.5]]
            ])("should create a number when the underlying number is between the established min and max constraints", (min: number, max: number, cases: number[]) => {
                for(const testNumber of cases) {
                    expect(Brand.Number.Between(min, max)(testNumber)).toEqual(testNumber)
                }
            })

            it.each([
                [0, 10, [0-1e-10, 10+1e-10]],
                [-50, 50, [-50-1e-10, 50+1e-10]],
                [-1, 1, [-1-1e-10, 1+1e-10]]
            ])("should throw when the underlying number is not between the established min and max constraints", (min: number, max: number, cases: number[]) => {
                for(const testNumber of cases) {
                    expect(() => Brand.Number.Between(min, max)(testNumber)).toThrow()
                }
            })
        })
    })

    describe('String', () => {
        describe('Between', () => {
            it.each([
                [0, 5, ["", "1", "12", "123", "1234", "12345"]],
            ])("should create a string when the underlying string length is between the established min and max constraints", (min: number, max: number, cases: string[]) => {
                for(const testString of cases) {
                    expect(Brand.String.Between(min, max)(testString)).toEqual(testString)
                }
            })

            it.each([
                [1, 5, ["", "123456"]],
            ])("should throw when the underlying string length is not between the established min and max constraints", (min: number, max: number, cases: string[]) => {
                for(const testString of cases) {
                    expect(() => Brand.String.Between(min, max)(testString)).toThrow()
                }
            })

            it.each([
                [-1, 2, ["", "1", "12"]],
                [-2, -1, ["", "1", "12"]],
            ])("should throw if at least of the bounds is negative", (min, max, cases) => {
                for(const testString of cases) {
                    expect(() => Brand.String.Between(min, max)(testString)).toThrow()
                }
            })

            it.each([
                [0, 1+1e-10, ["", "1"]],
                [1e-10, 1, ["", "1"]],
                [1e-10, 1+1e-10, ["", "1"]]
            ])("should throw if at least one of the bounds is not an integer", (min, max, cases) => {
                for(const testString of cases) {
                    expect(() => Brand.String.Between(min, max)(testString)).toThrow()
                }
            })
        })
    })

    describe('Nullable', () => {
        describe('NotNullable', () => {
            it.each(
                [1, "Hello world!", [10, null, undefined, {}], {name: "An object"}]
            )('should create a type if it is not null or undefined', (obj) => {
                expect(Brand.Nullable.NotNullable(obj)).toEqual(obj)
            })

            it.each(
                [null, undefined]
            )('should throw when the type is null or undefined', (obj) => {
                expect(() => Brand.Nullable.NotNullable(obj)).toThrow()
            })
        })
    })
})