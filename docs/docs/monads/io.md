---
title: IO<Operation>
sidebar_label: IO
sidebar_position: 3
---

The `IO` monad is for isolating side effects in your program. This monad is **lazy** and will not be evaluated until the `compute` method is called.

## IO constructor

You can create an `IO` by calling the `of` constructor

```ts title="Examples"
const fetch = IO.of(fetch('http://localhost:8080/api/users')) // IO(Promise<Users>)

const aNumber = IO.of(3) // IO(3)
```

## Methods
The `IO` monad exposes several methods for value manipulation

### .map(fn)

```ts title="Signature"
IO<T>.map<R>(fn: (input: T) => R): IO<R>
```

```ts title="Examples"
const ioValue = IO.of(5);
const newValue = ioValue.map(x => x * 2); // IO(10)

const ioString = IO.of("hello");
const upperCaseValue = ioString.map(str => str.toUpperCase()); // IO("HELLO")
```

### .flatMap(fn)
```ts title="Signature"
IO<T>.flatMap<R>(fn: (input: T) => IO<R>): IO<R>
```

Transforms the value inside the `IO` into another `IO` and flattens the result.

```ts title="Examples"
const ioValue = IO.of(5);
const newValue = ioValue.flatMap(x => IO.of(x * 2)); // IO(10)

const ioString = IO.of("hello");
const upperCaseValue = ioString.flatMap(str => IO.of(str.toUpperCase())); // IO("HELLO")
```

### .compute()

```ts title="Signature"
IO<T>.compute(): T
```
Computes and returns the value inside the `IO`.

```ts title="Examples"
const ioValue = IO.of(5);
console.log(ioValue.compute()); // 5

const ioString = IO.of("hello");
console.log(ioString.compute()); // "hello"
```

### .toMaybe()

```ts title="Signature"
IO<T>.toMaybe(): maybe<T>
```

Converts the `IO` to a `maybe`.

```ts title="Examples"
const ioValue = IO.of(5);
const maybeValue = ioValue.toMaybe(); // Some(5)

const ioNull = IO.of(null);
const maybeNull = ioNull.toMaybe(); // None

```