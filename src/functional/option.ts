export interface Option<T> {
    /**
     * Transforms the value inside the option in case of Some and does nothing otherwise.
     * @param fn Transformation function to apply to the value.
     * @returns A new Option containing the transformed value.
     */
    map<R>(fn: (input: T) => R): Option<R>

    /**
     * Transforms the value inside the option into another Option and flattens the result.
     * @param fn Transformation function that returns an Option.
     * @returns The result of the transformation function.
     */
    flatMap<R>(fn: (input: T) => Option<R>): Option<R>

    /**
     * Filters the value inside the option based on a predicate function.
     * @param predicate Function to test the value.
     * @returns The same Option if the predicate is true, otherwise None.
     */
    filter(predicate: (input: T) => boolean): Option<T>

    /**
     * Checks if the Option contains a value.
     * @returns True if the Option is Some, otherwise false.
     */
    isPresent(): this is Some<T>

    /**
     * Checks if the Option is empty.
     * @returns True if the Option is None, otherwise false.
     */
    isEmpty(): this is None

    /**
     * Matches the Option to a function based on its state (Some or None).
     * @param matcher Object containing match functions for Some and None.
     * @returns The result of the match function.
     */
    match<S,N>(matcher: {Some: (input: T) => S, None: N}): S | N
    match<S,N>(matcher: {Some: S, None: N}): S | N

    /**
     * Applies a function to the value inside the Option if it is Some, does nothing otherwise.
     * @param fn Function to apply to the value.
     * @returns The same Option.
     */
    tap(fn: (input: T) => any): Option<T>

    /**
     * Returns the value inside the Option if it is Some, otherwise returns the default value.
     * @param defaultValue Value to return if the Option is None.
     * @returns The value inside the Option or the default value.
     */
    getWithDefault<R>(defaultValue: R): T | R
}

interface Unwrap<T> {
    get(): T
}

class Some<T> implements Option<T>, Unwrap<T> {
    private constructor(private readonly value: T) {}

    static of<R>(value: R): Some<R> {
        return new Some(value)
    }

    map<R>(fn: (input: T) => R): Option<R> {
        return new Some(fn(this.value))
    }

    flatMap<R>(fn: (input: T) => Option<R>): Option<R> {
        return fn(this.value)
    }

    filter(predicate: (input: T) => boolean): Option<T> {
        if(predicate(this.value)) {
            return this
        }

        return new None()
    }

    isPresent(): this is Some<T> {
        return true
    }

    isEmpty(): this is None {
        return false
    }

    match<S,N>(matcher: {Some: S, None: N}): S | N
    match<S, N>(matcher: { Some: (input: T) => S; None: N }): S | N {
        if(typeof matcher.Some === 'function') {
            return matcher.Some(this.value)
        }

        return matcher.Some;
    }

    tap(fn: (input: T) => any): Option<T> {
        fn(this.value)

        return this
    }

    getWithDefault<R>(_: R): T | R {
        return this.value
    }

    get(): T {
        return this.value
    }
}

class None implements Option<never> {
    map<R>(_: (_: never) => R): Option<never> {
        return this
    }

    flatMap<R>(_: (_: never) => Option<R>): Option<never> {
        return this
    }

    filter(_: (_: never) => boolean): Option<never> {
        return this
    }

    isPresent(): this is Some<never> {
        return false
    }

    isEmpty(): this is None {
        return true
    }

    match<S,N>(matcher: {Some: S, None: N}): S | N
    match<S, N>(matcher: { Some: (input: never) => S; None: N }): S | N {
        return matcher.None
    }

    tap(_: (_: never) => any): Option<never> {
        return this
    }

    getWithDefault<R>(defaultValue: R): R {
        return defaultValue
    }
}

export class __Option {
    static fromNullable<T>(value: T): Option<T> {
        if(value === null || value === undefined) {
            return new None();
        }

        return Some.of(value)
    }

    static Some<T>(value: NonNullable<T>): Some<NonNullable<T>> {
        return Some.of(value)
    }

    static None(): None {
        return new None()
    }
}

export const Option = __Option