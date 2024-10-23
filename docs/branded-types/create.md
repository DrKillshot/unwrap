# Create constructor

As discussed in the [previous section](/branded-types/intro.html), a branded type is a way to add a unique label to a primitive type, ensuring that values of different branded types are not interchangeable. 

## .type\<brand, primitive\>

In Unwrap, you create branded type using the `.type` generic. For example,

```ts
import { Brand } from `@unnullable/unwrap`

type UserId = Brand.type<"UserId", string>
type ProductId = Brand.type<"ProductId", string>
```

In the example above the `UserId` and `ProductId` are the brands for the corresponding `string` primitives. You can assign these values by casting:

```ts
const userId = "6" as UserId
const productId = "66" as ProductId
```

Now you can't swap `userId` with `productId` as they represent two different brands even though they have the same underlying primitive.

## .create\<brandedType\>()

Type casting is fine, but you can also use `.create` to create a type constructor:

```ts
const UserId = Brand.create<UserId>()
const ProductId = Brand.create<ProductId>()

const userId = UserId(6)
const productId = ProductId(66)
```

This approach is especially useful when you need to create multiple instances of `UserId` throughout your codebase. 

In the next section, we introduce the `.define` method, which allows you to embed business logic into the created types, adding custom validation or transformation logic.