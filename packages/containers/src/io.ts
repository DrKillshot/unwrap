import {Maybe} from "./maybe";

export interface IO<T> {
    /**
     * Transforms the value inside the IO using the provided function.
     * @param fn Transformation function to apply to the value.
     * @returns A new IO containing the transformed value.
     */
    map<R>(fn: (input: T) => R): IO<R>

    /**
     * Transforms the value inside the IO into another IO and flattens the result.
     * @param fn Transformation function that returns an IO.
     * @returns The result of the transformation function.
     */
    flatMap<R>(fn: (input: T) => IO<R>): IO<R>

    /**
     * Computes and returns the value inside the IO.
     * @returns The computed value.
     */
    unwrap(): T

    /**
     * Converts the IO to a Maybe.
     * @returns An Maybe containing the value inside the IO.
     */
    toMaybe(): Maybe<T>
}

class __IO<T> implements IO<T> {
    private constructor(private effect: () => T) {}

    static of<T>(value: T): IO<T> {
        return new __IO(() => value)
    }

    map<R>(fn: (input: T) => R): IO<R> {
        return new __IO(() => fn(this.effect()))
    }

    flatMap<R>(fn: (input: T) => IO<R>): IO<R> {
        return fn(this.effect())
    }

    unwrap(): T {
        return this.effect()
    }

    toMaybe(): Maybe<T> {
        return Maybe.fromNullable(this.unwrap())
    }
}

export const IO = __IO