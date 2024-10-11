---
title: Maybe<Value>
sidebar_label: Maybe
sidebar_position: 1
---

The `Maybe` monad may or may not hold some value. It is commonly used to represent optional values.

## Maybe constructors

You can create a `Maybe` by calling the `Some` and `None` constructors.
```ts title="Examples"
const aNumber = Maybe.Some(1);
const aNumber = Maybe.None();
```

You can also enforce their type for the `Some` type

```ts title="Example"
const aNumber = Maybe.Some<number>(1);
```

You can create a `Maybe` from a possible `null` or `undefined` type

```ts title="Examples"
Maybe.fromNullable('Hello world!') // Some('Hello world')
Maybe.fromNullable(null) // None
Maybe.fromNullable(undefined) // None
```

## Methods

The `Maybe` monad exposes several methods for value manipulation

### .map(fn)

```ts title="Signature"
Maybe<T>.map<R>(fn: (input: T) => R): Maybe<R>
```
Transforms the value inside the maybe in case of `Some` and does nothing otherwise.

```ts title="Examples"
const someValue = Maybe.Some(5);
const newValue = someValue.map(x => x * 2); // Some(10)

const noneValue = Maybe.None();
const unchangedValue = noneValue.map(x => x * 2); // None
```

### .flatMap(fn)

```ts title="Signature"
Maybe<T>.flatMap<R>(fn: (input: T) => Maybe<R>): Maybe<R>
```

Transforms the value inside the maybe into another `Maybe` and flattens the result.

```ts title="Examples"
const someValue = Maybe.Some(5);
const newSome = someValue.flatMap(x => Maybe.Some(x * 2)); // Some(10)

const helloValue = Maybe.Some("Hello world!")
const newHello = helloValue.flatMap(s => s.length > 10 ? Maybe.None() : Maybe.Some("") ) // None

const noneValue = Maybe.None();
const unchangedNone = noneValue.flatMap(x => Maybe.Some(x * 2)); // None
```

### .filter(fn)

```ts title="Signature"
Maybe<T>.filter(predicate: (input: T) => boolean): Maybe<T>
```

Filters the value inside the maybe based on a predicate function.

```ts title="Examples"
const someValue = Maybe.Some(5);
const filteredValue = someValue.filter(x => x > 3); // Some(5)
const noneFilteredValue = someValue.filter(x => x < 3); // None

const noneValue = Maybe.None();
const unchangedValue = noneValue.filter(x => x > 3); // None
```

### .isPresent()
```ts title="Signature"
Maybe<T>.isPresent(): boolean
```

Checks if the `Maybe` contains a value.

```ts title="Examples"
const someValue = Maybe.Some(5);
console.log(someValue.isPresent()); // true

const noneValue = Maybe.None();
console.log(noneValue.isPresent()); // false
```

### .isEmpty()
```ts title="Signature"
Maybe<T>.isEmpty(): boolean
```

Checks if the `Maybe` is empty.

```ts title="Examples"
const someValue = Maybe.Some(5);
console.log(someValue.isEmpty()); // false

const noneValue = Maybe.None();
console.log(noneValue.isEmpty()); // true

```

### .where()

```ts title="Signature"
Maybe<T>.where<S,N>(matcher: {Some: (input: T) => S, None: N}): S | N
Maybe<T>.where<S,N>(matcher: {Some: S, None: N}): S | N
```
This is Unwrap's pattern matching.

```ts title="Examples"
const someValue = Maybe.Some(5);
const result = someValue.where({
    Some: x => `Value is ${x}`,
    None: 'No value'
}); // "Value is 5"

const noneValue = Maybe.None();
const resultNone = noneValue.where({
    Some: x => `Value is ${x}`,
    None: 'No value'
}); // "No value"
```

If you your `Some` operation does not depend on the maybe value you can do, for example

```ts title="Example"
const someValue = Maybe.Some(5);
const result = someValue.where({
    Some: true,
    None: false
}); // true
```

### .ifPresent(fn)

```ts title="Signature"
Maybe<T>.ifPresent(fn: (input: T) => any): Maybe<T>
```

Applies a function to the value inside the `Maybe` if it is `Some`, does nothing otherwise.

```ts title="Examples"
const someValue = Maybe.Some(5);
someValue.ifPresent(x => console.log(x)); // Logs: 5

const noneValue = Maybe.None();
noneValue.ifPresent(x => console.log(x)); // Does nothing
```

### .getWithDefault(defaultValue)
```ts title="Signature"
Maybe<T>.getWithDefault<R>(defaultValue: R): T | R
```

Returns the value inside the Maybe if it is Some, otherwise returns the default value.

```ts title="Examples"
const someValue = Maybe.Some(5);
console.log(someValue.getWithDefault(10)); // 5

const noneValue = Maybe.None();
console.log(noneValue.getWithDefault(10)); // 10
```

### .unwrap()
```ts title="Signature"
Maybe<T>.unwrap()
```

Returns the value inside the `Maybe` if it is `Some`. 

```ts title="Examples
const maybe = Maybe.fromNullable("Hello world!");
const value = maybe.unwrap();  // does not compile!

if (maybe.isSome()) {
  const value = maybe.unwrap(); // Hello world!
}
```
