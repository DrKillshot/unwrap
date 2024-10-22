declare const __brand: unique symbol
type Brand<B> = { readonly [__brand]: B 
}
type Predicate<T> = (input: T) => boolean
type StringFunction<T> = (input: T) => string
type BrandConstructor<T extends {[__brand]: string}> = (param: Omit<T, symbol>) => T

export namespace Brand {
    export type Type<B, T> = T & Brand<B>

    export function create<T extends Type<any, any>>(): (param: Omit<T, symbol>) => T {
        return (param) => {
            return param as T
        }
    }

    export function define<T extends {[__brand]: string}>(
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

    export function combine<T extends string, R>(...constructors: BrandConstructor<Type<any, R>>[]): (param: R) => Type<T, R> {
        return (param) => {
            for(const constructor of constructors) {
                constructor(param as any)
            }
    
            return param as Type<T, R>
        }
    }
}