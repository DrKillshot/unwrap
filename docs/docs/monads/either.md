---
title: Result<Ok, Error>
sidebar_label: Result
---

The `Result` monad can hold two types of values: an `Ok(value)` value and an `Error(error)` value. The `Result` monad is typically use to **replace exceptions** in the codebase and make each method more explicit and declarative in its result.

## Result constructors

Just like `Option`, the result monad can be instantiated with specific constructors. In this case the `Ok(value)` and `Error(error)` constructor:

```ts title="Examples"
const anOk = Result.Ok(10)
const anError = Result.Error("Something went wrong here!")

// You can also force types in the constructors
const anOk = Result<number>(10)
const anError<string> = Result<string>("Something went wrong here!")
```
## Methods

The `Result` monad exposes several methods for value manipulation

### .map(fn)

```ts title="Signature"
Result<O,E>.map<T>(fn: (input: O) => T): Result<T, E> | Result<O, E>
```

Transforms the error inside the `Result` if it is `Error`, otherwise does nothing.

```ts title="Examples"
const result = Result.Ok(5);
const newResult = result.map(x => x * 2); // Ok(10)

const error = Result.Error(10)
const newError = Result.map(x => x * 2) // Error(10)
```

### .mapError(fn)

```ts title="Signature"
Result<O,E>.map<T>(fn: (input: O) => T): Result<T, E> | Result<O, E>
```

Transforms the value inside the `Result` if it is `Ok`, otherwise does nothing.

```ts title="Examples"
const error = Result.Error("error");
const newError = error.mapError(err => `new ${err}`); // Error("new error")

const ok = Result.Ok("OK!")
const newOk = ok.mapError(err => `new ${err}`) // Ok("OK!")
```

### .flatMap(fn)

```ts title="Signature"
Result<O,E>.flatMap<T>(fn: (input: O) => Result<T, never> | Result<never, T>): Result<T, never> | Result<O, E>
```

Transforms the value inside the `Result` into another `Result` and flattens the result.

```ts title="Examples"
const result = Result.Ok(5);
const newResult = result.flatMap(x => Result.Ok(x * 2)); // Ok(10)
```