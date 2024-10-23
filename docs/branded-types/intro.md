# Branded types

Branded types provide a way to distinguish between different types that share the same underlying structure. This technique enhances type safety without impacting runtime performance.

In TypeScript, types are typically *structurally typed,* meaning that if two types have the same shape or structure, they are considered interchangeable. However, this can lead to issues when different concepts share the same structure but should not be used interchangeably. Branded types offer a way to create *nominal typing* in TypeScript, where a type is differentiated by a unique **brand** rather than just its structure.

Nominal typing means that types are considered distinct even if they have the same structure, which helps prevent unintended mix-ups. For example, with nominal typing, two types like `UserId` and `ProductId` can both be strings but are not interchangeable due to their unique brands.

## Domain Modelling

Branded types are a powerful tool for domain modeling, allowing developers to represent concepts in a domain with greater precision. Domain modeling is about creating representations of real-world entities and processes in code, and branded types help achieve this by making different concepts distinguishable, even if they share the same underlying type.

Here's an example. Consider the following `User` object

```ts
type User = {
    id: string,
    username: string,
    email: string,
    password: string,
    score: number
}
```

Here are some questions to consider:
    
- Can the id be any type of string? Is " ", "abc" valid? Or is it a UUID or a string with a fixed format (perhaps with a predefined prefix)?
- Can the username have 0 characters? Can it have 1000?
- Should we validate the email? Is it an internal company email or could it be any?
- Does the password have any required minimum number of characters? Does it have a maximum?
- Can the score (whatever this may represent) be a 0.5? 10.5? What about -10?

By using branded types, we can enforce business rules directly in the type system, ensuring that invalid data is caught at compile time rather than at runtime. Here is an overview

```ts
import { Brand } from '@unnullable/unwrap'

type Username = Brand.type<"Username", string> // The "Username" brand is now tied to the string primitive
const Username = Brand.define<Username>(username => username.length > 0 && username.length < 50, "The username cannot exceed 50 characters nor be empty") // Username type constructor

Username("") // Throws an error "The username cannot exceed 50 characters nor be empty"
Username("john.doe") // Create a "john.doe" string branded as "Username"
Username("string-larger-than-50-characters") // Throws an error: "The username cannot exceed 50 characters nor be empty"
```
In the above example, we created a branded type `Username` with a `string` primitive and created a constructor for this type using the `.define` method (check this [page](/branded-types/define.html) for a detailed explanation of the `.define` method).

It's also possible to combine types to construct richer ones.

```ts
import {Brand} from '@unnullable/unwrap'

type NonEmpty = Brand.type<"NonEmpty", string>
const NonEmpty = Brand.define<NonEmpty>(str => str.trim().length !== 0, "The string provided cannot be empty.")

type LessThan50 = Brand.type<"LessThan50", string>
const LessThan50 = Brand.define<LessThan50>(str => str.length < 50, str => `Expected a string with length smaller than 50 characters. Instead got: ${str}`)

const Username = Brand.combine<"Username", string>(NonEmpty, LessThan50)
type Username = typeof Username

Username("") // Throws an error "The username cannot exceed 50 characters nor be empty"
Username("john.doe") // Create a "john.doe" string branded as "Username"
Username("string-larger-than-50-characters") // Throws an error: "The username cannot exceed 50 characters nor be empty"
```

In this case, we create two constructors `NonEmpty` and `LessThan50` that you can you across your codebase along with other types. We then composed this types to create the `Username` constructor using the `.combine` function.

## Primitive Obsession

A common problem that branded types address is illustrated as follows

```ts
async function getReviewsForProduct(productId: string, userId: string) {
  const response = await api.get(`/user/${userId}/products/${productId}/reviews`);
  return response.data;
}

const userId = 'user-123';
const productId = 'product-456';

// BUG: Mistakenly swapped arguments
const reviews = await getReviewsForProduct(userId, productId); 
```

This issue is related to **primitive obsession**, which can be addressed in various ways, including branded types.

```ts
type UserId = Brand.type<"UserId", string>
type ProductId = Brand.type<"ProductId", string>
```

This way, we would not be able to swap `UserId` with `ProductId` at **compile time**:

```ts
async function getReviewsForProduct(productId: ProductId, userId: UserId) {
  // Same as above
}

const userId = 'user-123' as UserId;
const productId = 'product-456' as ProductId;

// Typescript won't compile
const reviews = await getReviewsForProduct(user.id, product.id); 
```

For a simple problem such as above, this solution is perfectly acceptable, and we strongly encourage you not to over-complicate things. As a last note, primitive obsession might not be as big of a deal as some make it out to be, but if you feel that you need to separate types with the same underlying primitive than Unwrap can help you with that.
By using branded types, you prevent accidental swapping of similar-looking arguments, ensuring that function calls are always made with the correct types. This leads to safer, more maintainable code.