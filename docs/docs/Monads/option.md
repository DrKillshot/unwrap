---
title: Option<Value>
sidebar_label: Option
---

An `Option` is a monad that may or may not hold some value. It is commonly used to represent optional values.

## Option constructors

You can create an option by calling the `Some` and `None` constructors.
```ts title="Examples"
const aNumber = Option.Some(1);
const aNumber = Option.None();
```

You can also enforce their type for the `Some` type

```ts title="Example"
const aNumber = Option.Some<number>(1);
```

You can create an `Option` from a possible `null` or `undefined` type

```ts title="Examples"
Option.fromNullable('Hello world!') // Some('Hello world')
Option.fromNullable(null) // None
Option.fromNullable(undefined) // None
```

## Methods

The `Option` monad exposes several methods for value manipulation

### .map(fn)

```ts title="Signature"
Option<T>.map<R>(fn: (input: T) => R): Option<R>
```
Transforms the value inside the option in case of `Some` and does nothing otherwise.

```ts title="Examples"
const someValue = Option.Some(5);
const newValue = someValue.map(x => x * 2); // Some(10)

const noneValue = Option.None();
const unchangedValue = noneValue.map(x => x * 2); // None
```

### .flatMap(fn)

```ts title="Signature"
Option<T>.flatMap<R>(fn: (input: T) => Option<R>): Option<R>
```

Transforms the value inside the option into another `Option` and flattens the result.

```ts title="Examples"
const some = Option.Some(5);
const newSome = someValue.flatMap(x => Option.Some(x * 2)); // Some(10)

const hello = Option.Some("Hello world!")
const newHello = helloValue.flatMap(s => s.length > 10 ? Option.None() : Option.Some("") ) // None

const none = Option.None();
const unchangedNone = noneValue.flatMap(x => Option.Some(x * 2)); // None
```

### .filter(fn)

```ts title="Signature"
Option<T>.filter(predicate: (input: T) => boolean): Option<T>
```

Filters the value inside the option based on a predicate function.

```ts title="Examples"
const someValue = Option.Some(5);
const filteredValue = someValue.filter(x => x > 3); // Some(5)
const noneFilteredValue = someValue.filter(x => x < 3); // None

const noneValue = Option.None();
const unchangedValue = noneValue.filter(x => x > 3); // None
```

### .isPresent()
```ts title="Signature"
Option<T>.isPresent(): boolean
```

Checks if the `Option` contains a value.

```ts title="Examples"
const someValue = Option.Some(5);
console.log(someValue.isPresent()); // true

const noneValue = Option.None();
console.log(noneValue.isPresent()); // false
```

### .isEmpty()
```ts title="Signature"
Option<T>.isEmpty()
```

Checks if the `Option` is empty.

```ts title="Examples"
const someValue = Option.Some(5);
console.log(someValue.isEmpty()); // false

const noneValue = Option.None();
console.log(noneValue.isEmpty()); // true

```

### .match()

```ts title="Signature"
Option<T>.match<S,N>(matcher: {Some: (input: T) => S, None: N}): S | N
Option<T>.match<S,N>(matcher: {Some: S, None: N}): S | N
```
Matches the Option to a function based on its state (Some or None).

```ts title="Examples"
const someValue = Option.Some(5);
const result = someValue.match({
    Some: x => `Value is ${x}`,
    None: 'No value'
}); // "Value is 5"

const noneValue = Option.None();
const resultNone = noneValue.match({
    Some: x => `Value is ${x}`,
    None: 'No value'
}); // "No value"
```

If you your `Some` operation does not depend on the option value you can do, for example

```ts title="Example"
const someValue = Option.Some(5);
const result = someValue.match({
    Some: true,
    None: false
}); // true
```

### .tap(fn)

```ts title="Signature"
Option<T>.tap(fn: (input: T) => any): Option<T>
```

Applies a function to the value inside the `Option` if it is `Some`, does nothing otherwise.

```ts title="Examples"
const someValue = Option.Some(5);
someValue.tap(x => console.log(x)); // Logs: 5

const noneValue = Option.None();
noneValue.tap(x => console.log(x)); // Does nothing
```

### .getWithDefault(defaultValue)
```ts title="Signature"
Option<T>.getWithDefault<R>(defaultValue: R): T | R
```

Returns the value inside the Option if it is Some, otherwise returns the default value.

```ts title="Examples"
const someValue = Option.Some(5);
console.log(someValue.getWithDefault(10)); // 5

const noneValue = Option.None();
console.log(noneValue.getWithDefault(10)); // 10
```

### .get()
```ts title="Signature"
Option<T>.get()
```

Returns the value inside the `Option` if it is `Some`. 

```ts title="Examples
const option = Option.fromNullable("Hello world!");
const value = option.get();  // does not compile!

if (option.isSome()) {
  const value = option.get(); // Hello world!
}
```