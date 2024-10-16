---
title: Either<Ok, Error>
sidebar_label: Either
sidebar_position: 2
---

The `Either` container can hold two types of values: an `Ok(value)` value and an `Error(error)` value. The `Either` container is typically use to **replace exceptions** in the codebase and make each method more explicit and declarative in its `Either`.

## Either constructors

Just like `Maybe`, the `Either` container can be instantiated with specific constructors. In this case the `Ok(value)` and `Error(error)` constructor:

```ts title="Examples"
const anOk = Either.Ok(10)
const anError = Either.Error("Something went wrong here!")

// You can also force types in the constructors
const anOk = Either<number>(10)
const anError<string> = Either<string>("Something went wrong here!")
```
## Methods

The `Either` container exposes several methods for value manipulation

### .map(fn)

```ts title="Signature"
Either<O,E>.map<T>(fn: (input: O) => T): Either<T, E> | Either<O, E>
```

Transforms the error inside the `Either` if it is `Ok`, otherwise does nothing.

```ts title="Examples"
const Either = Either.Ok(10);
const newEither = Either.map(x => x * 2); // Ok(20)

const error = Either.Error(10)
const newError = Either.map(x => x * 2) // Error(10)
```

### .mapError(fn)

```ts title="Signature"
Either<O,E>.map<T>(fn: (input: O) => T): Either<O, T>
```

Transforms the value inside the `Either` if it is `Ok`, otherwise does nothing.

```ts title="Examples"
const error = Either.Error("error");
const newError = error.mapError(err => `new ${err}`); // Error("new error")

const ok = Either.Ok("OK!")
const newOk = ok.mapError(err => `new ${err}`) // Ok("OK!")
```

### .flatMap(fn)

```ts title="Signature"
Either<O,E>.flatMap<T, R>(fn: (input: O) => Either<T, R>): Either<T, E | R>
```

Transforms the value inside the `Either` into another `Either` and flattens the result. If the `Either` is `Error`, the original type is returned unchanged.

```ts title="Examples"
const okValue = Either.Ok(5);
const flatMappedValue = okValue.flatMap(x => Either.Ok(x + 10)); // Ok(15)

const errorValue = Either.Error("Something went wrong");
const flatMappedError = errorValue.flatMap(x => Either.Ok(x + 10)); // Error("Something went wrong")
```

### .swap()

```ts title="Signature"
Either<O,E>.swap()
```

Swaps the `Ok` and `Error` values. If the `Either` is `Ok`, it becomes `Error`, and if it is `Error`, it becomes `Ok`.

```ts title="Examples"
const okValue = Either.Ok(5);
const swappedValue = okValue.swap(); // Error(5)

const errorValue = Either.Error("Something went wrong");
const swappedError = errorValue.swap(); // Ok("Something went wrong")
```

### .isOk()

```ts title="Signature"
Either<O, E>.isOk(): this is Ok<O>
```

Checks if the `Either` is `Ok`. Returns true if it is, otherwise returns false.

```ts
const okValue = Either.Ok(5);
console.log(okValue.isOk()); // true

const errorValue = Either.Error("Something went wrong");
console.log(errorValue.isOk()); // false
```

### .isError()

```ts title="Signature"
Either<O,E>.isError(): this is Error<E>
```

Checks if the `Either` is `Error`. Returns true if it is, otherwise returns false.

```ts title="Examples"
const okValue = Either.Ok(5);
console.log(okValue.isError()); // false

const errorValue = Either.Error("Something went wrong");
console.log(errorValue.isError()); // true
```

### .recover(defaultValue)

```ts title="Signature"
Either<E,O>.recover<T>(defaultValue: T): Either<O, E> | Either<T, E>
```

Recovers from an `Error` by providing a default value. If the `Either` is `Error`, it returns a new `Either` with the default value as `Ok`. If it is `Ok`, the original `Either` is returned unchanged.

```ts title="Examples"
const okValue = Either.Ok(5);
const recoveredOk = okValue.recover(10); // Ok(5)

const errorValue = Either.Error("Something went wrong");
const recoveredError = errorValue.recover(10); // Ok(10)
```
### .ifOk(fn)

```ts title="Signature"
Either<O,E>.ifOk(fn: (input: O) => void): Either<O, E>
```

Applies a function to the value inside the `Either` if it is `Ok`, without changing the `Either`. If it is `Error`, the original `Either` is returned unchanged.

```ts title="Examples"
const okValue = Either.Ok(5);
const tappedValue = okValue.ifOk(console.log); // Logs: 5, returns Ok(5)

const errorValue = Either.Error("Something went wrong");
const tappedError = errorValue.ifOk(console.log); // No log, returns Error("Something went wrong")
```

### .ifError(fn)

```ts title="Signature"
Either<O,E>.ifError(fn: (input: E) => void): Either<O, E>
```

Applies a function to the error inside the `Either` if it is `Error`, without changing the `Either`. If it is `Ok`, the original `Either` is returned unchanged.

```ts title="Examples"
const errorValue = Either.Error("Something went wrong");
const tappedError = errorValue.ifError(console.log); // Logs: Something went wrong, returns Error("Something went wrong")

const okValue = Either.Ok(5);
const tappedOkValue = okValue.ifError(console.log); // No log, returns Ok(5)
```

### .match(matcher)

```ts title="Signature"
Either<E,O>.match<T, R>(matcher: { Ok: (value: O) => T, Error: (value: E) => R }): T | R;
Either<E,O>.match<T, R>(matcher: { Ok: (value: O) => T, Error: R }): T | R;
Either<E,O>.match<T, R>(matcher: { Ok: T, Error: (value: E) => R }): T | R;
Either<E,O>.match<T, R>(matcher: { Ok: T, Error: R }): T | R;
```

Matches the `Either` to a function or value based on its state (`Ok` or `Error`). This allows handling both states of the `Either` in a single call.

```ts title="Examples"
const okValue = Either.Ok(5);
const matchedOk = okValue.match({ Ok: value => value * 2, Error: err => `Error: ${err}` }); // 10

const errorValue = Either.Error("Something went wrong");
const matchedError = errorValue.match({ Ok: value => value * 2, Error: err => `Error: ${err}` }); // "Error: Something went wrong"
```

### .toMaybe()

```ts title="Signature"
Either<O,E>.toMaybe(): Maybe<O>
```

Converts the `Either` to a `Maybe` container. If the `Either` is `Ok`, the `Maybe` contains the value. If it is `Error`, it returns `Maybe.None()`.

```ts title="Examples"
const okValue = Either.Ok(5);
const maybeValue = okValue.toMaybe(); // Some(5)

const errorValue = Either.Error("Something went wrong");
const maybeNone = errorValue.toMaybe(); // None
```

### .unwrap()

```ts title="Signature"
Either<O,E>.unwrap()
```

Returns the value inside the `Either` if the type is `Ok`.

```ts title="Examples"
function fetchUsers(): Either<User, string>

const users = fetchUsers();
const users.unwrap() // Won't compile

if(users.isOk()) {
    users.unwrap() // Returns the User inside the Either
}
```

### .unwrapError()

```ts title="Signature"
Either<O,E>.unwrapError()
```

Returns the value inside the `Either` if the type is `Error`

```ts title="Examples"
function fetchUsers(): Either<User, string>

const users = fetchUsers();
const users.unwrapError() // Won't compile

if(users.isError()) {
    users.unwrapError() // Returns the string inside the Either
}
```

### .fromThrowable(fn)

```ts title="Signature"
Either<O,E>.fromThrowable<T>(fn: () => T): Error<unknown> | Ok<T>
```

Returns an `Ok` type with the value returned by the function and an `Error` if the function throws.

```ts title="Examples"
function divide(a: number, b: number): number {
    if (b === 0) {
        throw "Cannot divide by zero!"
    }else {
        return a/b
    }
}

Either.fromThrowable(() => divide(10, 2)) // Ok<5>

Either.fromThrowable(() => divide(10, 0)) // Error<"Cannot divide by zero!">
```