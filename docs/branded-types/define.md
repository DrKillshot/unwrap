# Define constructor

As we discussed in the [previous section](/branded-types/create.html), branded types and their constructors offer basic type safety. However, they don’t enforce business rules directly within the type system.
To do this, we can use the `.define` method.

As an example, let's consider an integer number. You can define a branded type like this:

```ts
import { Brand } from "@unnullable/unwrap"

const Integer = Brand.type<"Integer", number>
```

Now that we have branded the `number` as an `Integer`, how can we ensure it is actually an integer? This is where the `.define` method comes in:

```ts
// Define a type constructor with validation and custom error message
const Integer = Brand.define<Integer>(
    n => Number.isInteger(n),
    n => `Expected an integer. Instead got: ${n}`
)

Integer(10) // Returns 10 as an Integer type
Integer(10.1) // Throws an error: "Expected an integer. Instead got: 10.1"
```

The `.define` method returns a type constructor just like `.create` where the first callback verifies that the value meets the condition, while the second provides the error message if the condition is not met. 
If your error message does not depend on the underlying value, then you can simply write a string:

```ts
type NotEmpty = Brand.type<"NotEmpty", string>

const NotEmpty = Brand.define<NotEmpty>(
    str => str.trim().length !== 0,
    "Expected a non-empty string."
)
```

As you can see, with the `.define` method you can create a type system that enforces business logic that can be reused throughout your application.

In the next section, we will explore how to compose defined types to create more complex and expressive types, making your code even safer and more maintainable.