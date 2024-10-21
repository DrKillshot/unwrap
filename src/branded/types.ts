declare const __brand: unique symbol
type Brand<B> = { readonly [__brand]: B 
}

export type Type<B, T> = T & Brand<B>

type Predicate<T> = (input: T) => boolean
type StringFunction<T> = (input: T) => string

export function Create<T extends Type<any, any>>(): (param: Omit<T, symbol>) => T {
    return (param) => {
        return param as T
    }
}

export function Define<T extends {[__brand]: string}>(
    predicate: Predicate<Omit<T, symbol>>,
    error: StringFunction<Omit<T, symbol>> | string
) {
    return (param: Omit<T, symbol>) => {
        if(!predicate(param)) {
            throw new Error(typeof error === "function" ? error(param) : error)
        }
        
        return param as T
    }
}

// TODO: Implement combine function
export function Combine() {}