# Combine constructor

Now that you know how to create branded types and enforce business rules in your type system, we can explore the advantages of combining these types to create even more complex rules.

```ts
import { Brand } from "@unnullable/unwrap"

type NonEmptyStringLessThan30 = Brand.type<"NonEmptyStringLessThan30", string>
const NonEmptyStringLessThan30 = Brand.define<NonEmptyStringLessThan30>(
    str => str.trim() !== 0 && str.length < 30,
    "Expected a non-empty string less than 30 characters."
)
```

You can tell from the above example that if we keep adding more and more logic this type will become increasingly specific and complex. What if there are other strings in your code base that cannot be empty? What if there are string that cannot exceed 30 characters but can be empty?

To address the complexity that arises from adding too many rules to a single type, we introduced the `.combine` method. This method allows you to create more complex types from simpler ones, enhancing reusability and clarity.

```ts
type NotEmpty = Brand.type<"NotEmpty", string>
const NotEmpty = Brand.define<NotEmpty>(
    str => str.trim().length !== 0,
    "Expected a non-empty string."
)

type LessThan30 = Brand.type<"LessThan30", string>
const LessThan30 = Brand.define<LessThan30>(
    str => str.length < 30,
    str => `Expected a string less than 30 characters. Instead got: ${str}`
)

const NonEmptyStringLessThan30 = Brand.combine<"NonEmptyStringLessThan30", string>(NotEmpty, LessThan30)

NonEmptyStringLessThan30("Hello world!") // Returns "Hello world!" as a NonEmptyStringLessThan30 type
NonEmptyStringLessThan30("    ") // Throws error: "Expected a non-empty string."
NonEmptyStringLessThan30("a-more-than-30-character-string") // Throws error: "Expected a string with less than 30 characters. Instead got: ..."
```

Here the `.combine` method returns a type constructor that will require both rules to be met otherwise it will throw. The advantage of the composing the `NotEmpty` and `LessThan30` types is that now they can be used elsewhere in your application and are not tied to the far more complex `NonEmptyStringLessThan30`.

By composing simpler types, you not only simplify your logic but also enhance reusability throughout your application, leading to more maintainable and understandable code.