# Out of the box types

As discussed in the previous section, we can compose simpler types into more complex ones. So you don't have to create
simple types like `Integer` for every code base, Unwrap gives you some types out of the box.

If you want us to add more please let us know in our [GitHub issues](https://github.com/DrKillshot/unwrap/issues) page.

## Numbers

```ts
import { Brand } from '@unnullable/unwrap'

Brand.Number.Integer // Integer type
Brand.Number.Float // Float type
Brand.Number.Positive // Positive number
Brand.Number.Negative // Negative number
Brand.Number.NonNegative // Number greater or equal to zero
Brand.Number.Digit // Number between 0 and 10
Brand.Number.Between<min, max> // Number between min and max
```

## Strings

```ts
Brand.String.NotEmpty // String with at least one non white space
Brand.String.Between<min, max> // String with length between min and max
```

## Nullable

```ts
Brand.Nullable.NotNullable // Not equal to null or undefined
Brand.Nullable.NotNull // Not equal to null
Brand.Nullable.NotUndefined // Not equal to undefined
```