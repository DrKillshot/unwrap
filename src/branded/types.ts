declare const __brand: unique symbol
type Brand<B> = { readonly [__brand]: B 
}
type aBrand = {[__brand]: string}
type Predicate<T> = (input: T) => boolean
type StringFunction<T> = (input: T) => string
type BrandConstructor<T extends aBrand> = (param: Omit<T, symbol>) => T

export namespace Brand {
    export type type<B, T> = T & Brand<B>

    export function create<T extends type<any, any>>(): (param: Omit<T, symbol>) => T {
        return (param) => {
            return param as T
        }
    }

    export function define<T extends aBrand>(
        predicate: Predicate<T>,
        error: StringFunction<Omit<T, symbol>> | string
    ): BrandConstructor<T> {
        return (param: Omit<T, symbol>) => {
            if(!predicate(param as any)) {
                throw new Error(typeof error === "function" ? error(param) : error)
            }

            return param as T
        }
    }

    export function combine<T extends string, R>(...constructors: BrandConstructor<type<any, R>>[]): (param: R) => type<T, R> {
        return (param) => {
            for(const constructor of constructors) {
                constructor(param as any)
            }

            return param as type<T, R>
        }
    }

    export namespace Number {
        export type Integer = Brand.type<"Integer", number>
        export const Integer = Brand.define<Integer>(
            n => isInteger(n),
            n => `Expected an integer number. Instead got ${n}`
        )

        export type Float = Brand.type<"Float", number>
        export const Float = Brand.define<Float>(
            n => n % 1 !== 0,
            n => `Expected a float number. Instead got: ${n}`
        )

        export type Positive = Brand.type<"Positive", number>
        export const Positive = Brand.define<Positive>(
            n => n > 0,
            n => `Expected a positive number. Instead got: ${n}`
        )

        export type NonNegative = Brand.type<"NonNegative", number>
        export const NonNegative = Brand.define<NonNegative>(
            n => n >= 0,
            n => `Expected a non negative number. Instead got: ${n}`
        )

        export type Digit = Brand.type<"Digit", number>
        export const Digit = Brand.define<Digit>(
            d => d >= 0 && d <= 10,
            d => `Expected a digit. Instead got: ${d}`
        )

        export type Negative = Brand.type<"Negative", number>
        export const Negative = Brand.define<Negative>(
            n => n < 0,
            n => `Expected a negative number. Instead got: ${n}`
        )
    }

    export namespace String {
        export type NotEmpty = Brand.type<"NotEmpty", string>
        export const NotEmpty = Brand.define<NotEmpty>(
            str => str.trim().length != 0,
            `Expected a non-empty string.`
        )
    }

    export namespace Nullable {
        export type NotNull = Brand.type<"NotNull", Exclude<any, null>>
        export const NotNull = Brand.define<NotNull>(
            obj => obj !== null,
            `Expected a non null object.`
        )

        export type NotUndefined = Brand.type<"NotUndefined", Exclude<any, undefined>>
        export const NotUndefined = Brand.define<NotUndefined>(
            obj => obj !== undefined,
            `Expected an undefined object.`
        )

        export type NotNullable = Brand.type<"NotNullable", Exclude<any, null | undefined>>
        export const NotNullable = Brand.combine<"NotNullable", Exclude<any, null | undefined>>(NotNull, NotUndefined)
    }
}

function isInteger(x: number): boolean {
    return Number.isInteger(x)
}