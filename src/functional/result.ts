import { Option } from "./option"

export interface Result<O, E> {
    /**
     * Transforms the value inside the Result if it is Ok, otherwise does nothing.
     * @param fn Transformation function to apply to the value.
     * @returns A new Result containing the transformed value or the original Result.
     */
    map<T>(fn: (input: O) => T): Result<T, E> | Result<O, E>

    /**
     * Transforms the error inside the Result if it is Error, otherwise does nothing.
     * @param fn Transformation function to apply to the error.
     * @returns A new Result containing the transformed error or the original Result.
     */
    mapError<T>(fn: (input: E) => T): Result<O, E> | Result<O, T>

    /**
     * Transforms the value inside the Result into another Result and flattens the result.
     * @param fn Transformation function that returns a Result.
     * @returns The result of the transformation function or the original Result.
     */
    flatMap<T>(fn: (input: O) => Result<T, never> | Result<never, T>): Result<T, never> | Result<O,E>

    /**
     * Swaps the Ok and Error values.
     * @returns A new Result with the Ok and Error values swapped.
     */
    swap(): Result<E, O>

    /**
     * Checks if the Result is Ok.
     * @returns True if the Result is Ok, otherwise false.
     */
    isOk(): this is Ok<O>

    /**
     * Checks if the Result is Error.
     * @returns True if the Result is Error, otherwise false.
     */
    isError(): this is Error<E>

    /**
     * Recovers from an Error by providing a default value.
     * @param defaultValue Value to return if the Result is Error.
     * @returns The original Result if it is Ok, otherwise a new Result with the default value.
     */
    recover<T>(defaultValue: T): Result<O, E> | Result<T, E>

    /**
     * Applies a function to the value inside the Result if it is Ok, does nothing otherwise.
     * @param fn Function to apply to the value.
     * @returns The original Result.
     */
    tap(fn: (input: O) => void): Result<O, E>

    /**
     * Applies a function to the error inside the Result if it is Error, does nothing otherwise.
     * @param fn Function to apply to the error.
     * @returns The original Result.
     */
    tapError(fn: (input: E) => void): Result<O, E>

    /**
     * Matches the Result to a function based on its state (Ok or Error).
     * @param matcher Object containing match functions for Ok and Error.
     * @returns The result of the match function.
     */
    match<T,R>(matcher: {Ok: (value: O) => T, Error: (value: E) => R}): T | R
    match<T,R>(matcher: {Ok: T, Error: (value: E) => R}): T | R
    match<T,R>(matcher: {Ok: (value: O) => T, Error: R}): T | R
    match<T,R>(matcher: {Ok: T, Error: R}): T | R

    /**
     * Converts the Result to an Option.
     * @returns An Option containing the value inside the Result if it is Ok, otherwise None.
     */
    toOption(): Option<O>
}

interface UnwrapOk<T> {
    get(): T
}

interface UnwrapError<T> {
    getError(): T
}

class Ok<O> implements Result<O, never>, UnwrapOk<O> {
    private constructor(private readonly value: O) {}

    static of<T>(value: T): Ok<T> {
        return new Ok(value)
    }

    map<T>(fn: (input: O) => T): Result<T, never> {
        return new Ok(fn(this.value))
    }

    mapError<T>(_: (_: never) => T): Result<O, never> {
        return this
    }

    flatMap<T>(fn: (input: O) => Result<T, never>): Result<T, never> {
        return fn(this.value)
    }

    swap(): Result<never, O> {
        return Error.of(this.value)
    }

    isOk(): this is Ok<O> {
        return true
    }

    isError(): this is Error<never> {
        return false
    }

    recover<T>(_: T): Result<O, never> {
        return this
    }

    tap(fn: (input: O) => void): Result<O, never> {
        fn(this.value)

        return this
    }

    tapError(_: (input: never) => void): Result<O, never> {
        return this
    }

    match<T,R>(matcher: {Ok: (value: O) => T, Error: (value: never) => R}): T | R
    match<T,R>(matcher: {Ok: T, Error: (value: never) => R}): T | R
    match<T,R>(matcher: {Ok: (value: O) => T, Error: R}): T | R
    match<T,R>(matcher: {Ok: T, Error: R}): T | R {
        if(typeof matcher.Ok === 'function') {
            return matcher.Ok(this.value)
        }

        return matcher.Ok
    }

    toOption(): Option<O> {
        return Option.fromNullable(this.value)
    }

    get(): O {
        return this.value
    }
}

class Error<E> implements Result<never, E>, UnwrapError<E> {
    private constructor(private readonly value: E) {}

    static of<T>(value: T): Error<T>  {
        return new Error(value)
    }

    map<T>(_: (_: never) => T): Result<never, E> {
        return this
    }

    mapError<T>(fn: (input: E) => T): Result<never, T> {
        return new Error(fn(this.value))
    }

    flatMap<T>(_: (input: never) => Result<T, never>): Result<never, E> {
        return this
    }

    swap(): Result<E, never> {
        return Ok.of(this.value)
    }

    isOk(): this is Ok<never> {
        return false
    }

    isError(): this is Error<E> {
        return true
    }

    recover<T>(defaultValue: T): Result<T, E> {
        return Ok.of(defaultValue)
    }

    tap(_: (input: never) => void): Result<never, E> {
        return this
    }

    tapError(fn: (input: E) => void): Result<never, E> {
        fn(this.value)

        return this
    }

    match<T,R>(matcher: {Ok: (value: never) => T, Error: (value: E) => R}): T | R
    match<T,R>(matcher: {Ok: T, Error: (value: E) => R}): T | R
    match<T,R>(matcher: {Ok: (value: never) => T, Error: R}): T | R
    match<T,R>(matcher: {Ok: T, Error: R}): T | R {
        if(typeof matcher.Error === 'function') {
            return matcher.Error(this.value)
        }

        return matcher.Error
    }

    toOption(): Option<never> {
        return Option.None()
    }

    getError(): E {
        return this.value
    }
}

class __Result {
    static Ok<T>(value: T): Ok<T> {
        return Ok.of(value)
    }

    static Error<T>(value: T): Error<T> {
        return Error.of(value)
    }

    static fromNullable<T, R>(value: T, defaultVal: R): Error<R> | Ok<T> {
        if(value == null) {
            return Error.of(defaultVal)
        }

        return Ok.of(value)
    }
}

export const Result = __Result