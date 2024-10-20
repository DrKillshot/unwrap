# Pattern Matching

Pattern matching is a powerful feature in many programming languages that allows developers to check a value against a pattern and deconstruct data structures in a concise and readable way. It simplifies complex conditional logic, making code more expressive and easier to maintain. By matching data directly to specific cases or shapes, it enables clear and efficient handling of different scenarios.

## Data type constructor

We start by creating a disjoint union object

```ts
import { Data, Empty } from "@unnullable/unwrap";

const data = Data({
    Success: (id: number, username: string) => {id, username},
    Failure: (error: string) => error,
    Pending: Empty
});
```

The `data` variable is now responsible to create one of this cases. We can do this as follows

```ts
const success = data.Success(1, "john.doe");
// or
const failure = data.Failure("There's been a network issue.");
// or
const pending = data.Pending;
```

## Matching

### Exhaustiveness

Each of the above variables exposes a `.match` method which will **exhaustively** check for all possible cases

```ts
success.match({
    Success: ({id, username}) => console.log(`The request was successful. Result with id ${id} and username ${username}`),
    Pending: () => console.log("The request is still pending")
}) // This will not compile, since we're missing a cases!
```

To make the above snippet compile we need to add the `Failure` case

```ts
success.match({
    Success: ({id, username}) => console.log(`The request was successful. Result with id ${id} and username ${username}`),
    Failure: (error: string) => console.log(`The request has failed with: ${error}`),
    Pending: () => console.log("The request is still pending")
}) // This will now compile and console log the success branch.
```

### Default branch

There will be special situations where checking all branches is not ideal, so we introduced the default branch `_`:

```ts
success.match({
    Success: ({id, username}) => console.log(`The request was successful. Result with id ${id} and username ${username}`),
    _: () => console.log("This is the default branch")
}) // Compiles and logs the success branch
```

or


```ts
success.match({
    Failure: (error: string) => console.log(`The request has failed with: ${error}`),
    _: () => console.log("This is the default branch")
}) // Compiles and logs the default branch
```