import { Either } from "./either"

export interface Maybe<T> {
    /**
     * Transforms the value inside the Maybe in case of Some and does nothing otherwise.
     * @param fn Transformation function to apply to the value.
     * @returns A new Maybe containing the transformed value.
     */
    map<R>(fn: (input: T) => R): Maybe<R>

    /**
     * Transforms the value inside the Maybe into another Maybe and flattens the result.
     * @param fn Transformation function that returns an Maybe.
     * @returns The result of the transformation function.
     */
    flatMap<R>(fn: (input: T) => Maybe<R>): Maybe<R>

    /**
     * Filters the value inside the Maybe based on a predicate function.
     * @param predicate Function to test the value.
     * @returns The same Maybe if the predicate is true, otherwise None.
     */
    filter(predicate: (input: T) => boolean): Maybe<T>

    /**
     * Checks if the Maybe contains a value.
     * @returns True if the Maybe is Some, otherwise false.
     */
    isPresent(): this is Some<T>

    /**
     * Checks if the Maybe is empty.
     * @returns True if the Maybe is None, otherwise false.
     */
    isEmpty(): this is None

    /**
     * Matches the Maybe to a function based on its state (Some or None).
     * @param matcher Object containing where functions for Some and None.
     * @returns The result of the matcher.
     */
    match<S, N>(matcher: { Some: (input: T) => S; None: N }): S | N
    match<S, N>(matcher: { Some: S; None: N }): S | N

    /**
     * Applies a function to the value inside the Maybe if it is Some, does nothing otherwise.
     * @param fn Function to apply to the value.
     * @returns The same Maybe.
     */
    ifPresent(fn: (input: T) => any): Maybe<T>

    /**
     * Returns the value inside the Maybe if it is Some, otherwise returns the default value.
     * @param defaultValue Value to return if the Maybe is None.
     * @returns The value inside the Maybe or the default value.
     */
    getWithDefault<R>(defaultValue: R): T | R

    /**
     * Converts the Maybe to an Either
     * @param error Value to be contained in the Either in case Maybe is None.
     * @returns An Either containing the value inside Maybe if is Some, otherwise an error.
     */
    toEither<E>(error: E): Either<T, E>
}

interface Unwrap<T> {
    unwrap(): T
}

class Some<T> implements Maybe<T>, Unwrap<T> {
    private constructor(private readonly value: T) {}

    static of<R>(value: R): Some<R> {
        return new Some(value)
    }

    map<R>(fn: (input: T) => R): Maybe<R> {
        return new Some(fn(this.value))
    }

    flatMap<R>(fn: (input: T) => Maybe<R>): Maybe<R> {
        return fn(this.value)
    }

    filter(predicate: (input: T) => boolean): Maybe<T> {
        if (predicate(this.value)) {
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

    match<S, N>(matcher: { Some: S; None: N }): S | N
    match<S, N>(matcher: { Some: (input: T) => S; None: N }): S | N {
        if (typeof matcher.Some === "function") {
            return matcher.Some(this.value)
        }

        return matcher.Some
    }

    ifPresent(fn: (input: T) => any): Maybe<T> {
        fn(this.value)

        return this
    }

    getWithDefault<R>(_: R): T | R {
        return this.value
    }

    toEither<E>(_: E): Either<T, E> {
        return Either.Ok(this.value)
    }

    unwrap(): T {
        return this.value
    }
}

class None implements Maybe<never> {
    map<R>(_: (_: never) => R): Maybe<never> {
        return this
    }

    flatMap<R>(_: (_: never) => Maybe<R>): Maybe<never> {
        return this
    }

    filter(_: (_: never) => boolean): Maybe<never> {
        return this
    }

    isPresent(): this is Some<never> {
        return false
    }

    isEmpty(): this is None {
        return true
    }

    match<S, N>(matcher: { Some: S; None: N }): S | N
    match<S, N>(matcher: { Some: (input: never) => S; None: N }): S | N {
        return matcher.None
    }

    ifPresent(_: (_: never) => any): Maybe<never> {
        return this
    }

    getWithDefault<R>(defaultValue: R): R {
        return defaultValue
    }

    toEither<E>(error: E): Either<never, E> {
        return Either.Error(error)
    }
}

export class __Maybe {
    static fromNullable<T>(value: T | null | undefined): Maybe<NonNullable<T>> {
        if (value === null || value === undefined) {
            return new None()
        }

        return Some.of(value as NonNullable<T>)
    }

    static Some<T>(value: NonNullable<T>): Some<T> {
        return Some.of(value)
    }

    static None(): None {
        return new None()
    }
}

export const Maybe = __Maybe
