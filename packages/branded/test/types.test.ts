import { Brand } from "../src";

const Integer = Brand.define<Brand.type<"Integer", number>>(
    n => Number.isInteger(n),
    n => `Expected an integer. Instead got ${n}`
)

const Positive = Brand.define<Brand.type<"Positive", number>>(
    n => n > 0,
    n => `Expected a positive number. Instead got: ${n}`
)

const NotEmpty = Brand.define<Brand.type<"NotEmpty", string>>(
    str => str.trim().length !== 0,
    "Expected a non-empty string."
)

const NotNull = Brand.define<Brand.type<"NotNull", Exclude<any, null>>>(
    obj => obj !== null,
    "Expected a not null element"
)

const NotUndefined = Brand.define<Brand.type<"Defined", Exclude<any, undefined>>>(
    obj => obj !== undefined,
    "Expected a defined element"
)

const Email = Brand.define<Brand.type<"Email", string>>(
    email => email.includes("@") && email.includes(".com"),
    email => `Expected an email. Instead got: ${email}`
)

describe("Branded types", () => {
    describe("Create", () => {
        it('should create a branded type constructor', () => {
            const createMyType = Brand.create<{id: number, name: string}>();

            const input = { id: 1, name: 'Test' };

            const result = createMyType(input);

            expect(result).toEqual(input);
        })     
    })

    describe("Define", () => {
        it.each([
            [
                Integer,
                [-Number.MAX_SAFE_INTEGER, -10, -5, 0, 5, 10, Number.MAX_SAFE_INTEGER]
            ],
            [
                Positive,
                [Number.MIN_VALUE, 10, 100]
            ],
            [
                NotEmpty,
                [' a'.repeat(200_000)]
            ],
            [
                NotNull,
                [1, "A", {name: "An object"}, [1,2,3], [null, undefined], undefined]
            ],
            [
                NotUndefined,
                [1, "A", {name: "An object"}, [1,2,3], [null, undefined], null]
            ],
            [
                Email,
                ["john.doe@example.com"]
            ]
        ])('should create a constructor based on the specified definition', (constructor: any, args: any) => {
            for(const arg of args) {
                expect(constructor(arg)).toEqual(arg)
            }
        })

        it.each([
            [
                Integer,
                [-Number.MIN_VALUE, Number.MIN_VALUE]
            ],
            [
                Positive,
                [-Number.MIN_VALUE, -10, -100]
            ],
            [
                NotEmpty,
                [' '.repeat(200_000)]
            ],
            [
                NotNull,
                [null]
            ],
            [
                NotUndefined,
                [undefined]
            ],
            [
                Email,
                ["john.doeexample.com", "john.doe@examplecom", "john.doeexamplecom"]
            ]
        ])('should create a constructor and throw when definition criteria is not met', (constructor: any, args: any) => {
            for(const arg of args) {
                expect(() => constructor(arg)).toThrow()
            }
        })
    })
    
    describe('Combine', () => {
        const NonNegative = Brand.define<Brand.type<"NonNegative", number>>(
            n => n >= 0,
            n => `Expected a non-negative number. Instead got: ${n}`
        );

        const InternalEmail = Brand.define<Brand.type<"InternalEmail", string>>(
            email => email.includes("my-company.com"),
            email => `Expected an internal email. Instead got: ${email}`
        )

        const URL = Brand.create<Brand.type<"URL", string>>()
        const RelativeURL = Brand.define<Brand.type<"RelativeUrl", string>>(
            url => url[0] === "/",
            url => `Expected a relative url. Instead got: ${url}`
        )
        const AbsoluteURL = Brand.define<Brand.type<"AbsoluteUrl", string>>(
            url => url.includes('http://') || url.includes('https://'),
            url => `Expected a relative url. Instead got: ${url}`
        )

        const PhoneNumber = Brand.define<Brand.type<"PhoneNumber", string>>(
            phone => /^(?:\+?(\d{1,3}))?[-. (]*(\d{1,4})[-. )]*(\d{1,4})[-. ]*(\d{1,4})[-. ]*(\d{1,9})$/.test(phone),
            phone => `Expected a valid phone number. Got: ${phone}`
        )

        const Local = Brand.define<Brand.type<"Local", string>>(
            phone => !phone.includes("+"),
            phone => `Expected a local phone number. Instead got: ${phone}`
        )

        const International = Brand.define<Brand.type<"Local", string>>(
            phone => phone.includes("+"),
            phone => `Expected an international phone number. Instead got: ${phone}`
        )

        const Negative = Brand.define<Brand.type<"Negative", number>>(
            n => n < 0,
            n => `Expected a negative number. Instead got: ${n}`
        )

        const MultipleOfTen = Brand.define<Brand.type<"MultipleOfTen", number>>(
            n => n % 10 === 0,
            n => `Expected a multiple of 10. Instead got: ${n}`
        )

        const LessThanOne = Brand.define<Brand.type<"LessThanOne", number>>(
            n => n < 1,
            n => `Expected a number less than 1. Instead got: ${n}`
        )

        const NonInteger = Brand.define<Brand.type<"NonInteger", number>>(
            n => !Number.isInteger(n),
            n => `Expected a non integer number. Instead got: ${n}`
        )

        it.each([
            [
               [Positive, Integer],
               [1, 10, 100, Number.MAX_SAFE_INTEGER],
            ],
            [
                [NonNegative, Integer],
                [0, 1, Number.MAX_SAFE_INTEGER]
            ],
            [
                [Email, InternalEmail],
                ["john.doe@my-company.com"]
            ],
            [
                [NotNull, NotUndefined],
                [1, {name: "An object"}, [null, undefined], "Hello world!"]
            ],
            [
                [NotEmpty, URL, RelativeURL],
                ["/home", "/settings", "/"]
            ],
            [
                [NotEmpty, URL, AbsoluteURL],
                ["http://www.my-domain.com", "https://www.my-domain.com"]
            ],
            [
                [Local, PhoneNumber],
                ["123-456-7890", "(123) 456-7890", "123.456.7890", "1234567890", "456-7890"]
            ],
            [
                [International, PhoneNumber],
                ["+1 123-456-7890"]
            ],
            [
                [Negative, Integer, MultipleOfTen],
                [-10, -100, -1000, -10000]
            ],
            [
                [Positive, NonInteger, LessThanOne],
                [0.1, 0.5, 0.99, Number.MIN_VALUE, Math.PI - 3]
            ],
        ])('should combine existing branded type to create a new branded type constructor', (constructors: any[], args: any) => {
            for(const arg of args) {
                expect(Brand.combine<"CombinedType", any>(...constructors)(arg))
            }
        })

        it.each([
            [
               [Positive, Integer],
               [Number.MIN_VALUE, -Number.MIN_VALUE, -10, 10.4],
            ],
            [
                [NonNegative, Integer],
                [-Number.MIN_VALUE, 1 + 1e-10]
            ],
            [
                [Email, InternalEmail],
                ["john.doe@my-companycom", "john.doe@other-company.com"]
            ],
            [
                [NotNull, NotUndefined],
                [null, undefined]
            ],
            [
                [NotEmpty, URL, RelativeURL],
                ["", "http://www.my-domain.com", "https://www.my-domain.com"]
            ],
            [
                [NotEmpty, URL, AbsoluteURL],
                ["/", "/home"]
            ],
            [
                [Local, PhoneNumber],
                ["+44 123-456-7890"]
            ],
            [
                [International, PhoneNumber],
                ["123-456-7890"]
            ],
            [
                [Negative, Integer, MultipleOfTen],
                [10, 100, 1000, 10000, 10e20]
            ],
            [
                [Positive, NonInteger, LessThanOne],
                [2, 1 + 10e-10, -Number.MAX_SAFE_INTEGER, -Number.MIN_VALUE]
            ]
        ])('should create a combined constructor and throw when definition criteria is not met', (constructors: any[], args: any) => {
            for(const arg of args) {
                expect(() => Brand.combine<"CombinedType", any>(...constructors)(arg)).toThrow()
            }
        })
    })
})