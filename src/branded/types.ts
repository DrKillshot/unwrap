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
}

/* TODO: Method to create the oposite constructor. Example: 
const Integer = Brand.define<Brand.type<"Integer", number>>(n => Number.isInteger(n), n => `Expected an integer. Instead got ${n}`)
const NonInteger = OpositeMehtod(Integer)
*/