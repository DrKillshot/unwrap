import { Maybe } from "./maybe"

export interface Either<O, E> {
    /**
     * Transforms the value inside the Either if it is Ok, otherwise does nothing.
     * @param fn Transformation function to apply to the value.
     * @returns A new Either containing the transformed value or the original Either.
     */
    map<T>(fn: (input: O) => T): Either<T, E>

    /**
     * Transforms the error inside the Either if it is Error, otherwise does nothing.
     * @param fn Transformation function to apply to the error.
     * @returns A new Either containing the transformed error or the original Either.
     */
    mapError<T>(fn: (input: E) => T): Either<O, T>

    /**
     * Transforms the value inside the Either into another Either and flattens the Either.
     * @param fn Transformation function that returns an Either.
     * @returns The Either of the transformation function or the original Either.
     */
    flatMap<T, R>(fn: (input: O) => Either<T, R>): Either<T, E | R>

    /**
     * Swaps the Ok and Error values.
     * @returns A new Either with the Ok and Error values swapped.
     */
    swap(): Either<E, O>

    /**
     * Checks if the Either is Ok.
     * @returns True if the Either is Ok, otherwise false.
     */
    isOk(): this is Ok<O>

    /**
     * Checks if the Either is Error.
     * @returns True if the Either is Error, otherwise false.
     */
    isError(): this is Error<E>

    /**
     * Recovers from an Error by providing a default value.
     * @param defaultValue Value to return if the Either is Error.
     * @returns The original Either if it is Ok, otherwise a new Either with the default value.
     */
    recover<T>(defaultValue: T): Either<O, E> | Either<T, E>

    /**
     * Applies a function to the value inside the Either if it is Ok, does nothing otherwise.
     * @param fn Function to apply to the value.
     * @returns The original Either.
     */
    ifOk(fn: (input: O) => void): Either<O, E>

    /**
     * Applies a function to the error inside the Either if it is Error, does nothing otherwise.
     * @param fn Function to apply to the error.
     * @returns The original Either.
     */
    ifError(fn: (input: E) => void): Either<O, E>

    /**
     * Matches the Either to a function based on its state (Ok or Error).
     * @param matcher Object containing match functions for Ok and Error.
     * @returns The Either of the match function.
     */
    match<T, R>(matcher: { Ok: (value: O) => T; Error: (value: E) => R }): T | R
    match<T, R>(matcher: { Ok: T; Error: (value: E) => R }): T | R
    match<T, R>(matcher: { Ok: (value: O) => T; Error: R }): T | R
    match<T, R>(matcher: { Ok: T; Error: R }): T | R

    /**
     * Converts the Either to a Maybe.
     * @returns An Maybe containing the value inside the Either if it is Ok, otherwise None.
     */
    toMaybe(): Maybe<O>
}

interface UnwrapOk<T> {
    unwrap(): T
}

interface UnwrapError<T> {
    unwrapError(): T
}

class Ok<O> implements Either<O, never>, UnwrapOk<O> {
    private constructor(private readonly value: O) {}

    static of<T>(value: T): Ok<T> {
        return new Ok(value)
    }

    map<T>(fn: (input: O) => T): Either<T, never> {
        return new Ok(fn(this.value))
    }

    mapError<T>(_: (_: never) => T): Either<O, never> {
        return this
    }

    flatMap<T, R>(fn: (input: O) => Either<T, R>): Either<T, R> {
        return fn(this.value)
    }

    swap(): Either<never, O> {
        return Error.of(this.value)
    }

    isOk(): this is Ok<O> {
        return true
    }

    isError(): this is Error<never> {
        return false
    }

    recover<T>(_: T): Either<O, never> {
        return this
    }

    ifOk(fn: (input: O) => void): Either<O, never> {
        fn(this.value)

        return this
    }

    ifError(_: (input: never) => void): Either<O, never> {
        return this
    }

    match<T, R>(matcher: {
        Ok: (value: O) => T
        Error: (value: never) => R
    }): T | R
    match<T, R>(matcher: { Ok: T; Error: (value: never) => R }): T | R
    match<T, R>(matcher: { Ok: (value: O) => T; Error: R }): T | R
    match<T, R>(matcher: { Ok: T; Error: R }): T | R {
        if (typeof matcher.Ok === "function") {
            return matcher.Ok(this.value)
        }

        return matcher.Ok
    }

    toMaybe(): Maybe<O> {
        return Maybe.fromNullable(this.value)
    }

    unwrap(): O {
        return this.value
    }
}

class Error<E> implements Either<never, E>, UnwrapError<E> {
    private constructor(private readonly value: E) {}

    static of<T>(value: T): Error<T> {
        return new Error(value)
    }

    map<T>(_: (_: never) => T): Either<never, E> {
        return this
    }

    mapError<T>(fn: (input: E) => T): Either<never, T> {
        return new Error(fn(this.value))
    }

    flatMap<T, R>(_: (input: never) => Either<T, R>): Either<never, E> {
        return this
    }

    swap(): Either<E, never> {
        return Ok.of(this.value)
    }

    isOk(): this is Ok<never> {
        return false
    }

    isError(): this is Error<E> {
        return true
    }

    recover<T>(defaultValue: T): Either<T, E> {
        return Ok.of(defaultValue)
    }

    ifOk(_: (input: never) => void): Either<never, E> {
        return this
    }

    ifError(fn: (input: E) => void): Either<never, E> {
        fn(this.value)

        return this
    }

    match<T, R>(matcher: {
        Ok: (value: never) => T
        Error: (value: E) => R
    }): T | R
    match<T, R>(matcher: { Ok: T; Error: (value: E) => R }): T | R
    match<T, R>(matcher: { Ok: (value: never) => T; Error: R }): T | R
    match<T, R>(matcher: { Ok: T; Error: R }): T | R {
        if (typeof matcher.Error === "function") {
            return matcher.Error(this.value)
        }

        return matcher.Error
    }

    toMaybe(): Maybe<never> {
        return Maybe.None()
    }

    unwrapError(): E {
        return this.value
    }
}

class __Either {
    static Ok<T>(value: T): Ok<T> {
        return Ok.of(value)
    }

    static Error<T>(value: T): Error<T> {
        return Error.of(value)
    }

    static fromNullable<T, R>(value: T, defaultVal: R): Error<R> | Ok<T> {
        if (value == null) {
            return Error.of(defaultVal)
        }

        return Ok.of(value)
    }

    static fromThrowable<T>(fn: () => T): Error<unknown> | Ok<T> {
        try {
            return Ok.of(fn())
        } catch (e) {
            return Error.of(e)
        }
    }
}

export const Either = __Either

