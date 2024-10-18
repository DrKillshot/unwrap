const Empty = Symbol()
export type Empty = typeof Empty

type AnyFunction = (...args: any) => any
type DataObject = { [key: string]: Empty | AnyFunction }

type DataOutput<Obj extends DataObject> = {
    [Property in keyof Obj]: Obj[Property] extends AnyFunction
    ? ReturnType<Obj[Property]>
    : undefined
}

type MatchObject<Obj extends DataObject> = {
    [Property in keyof Obj]: DataOutput<Obj> extends Empty
    ? () => any
    : (params: DataOutput<Obj>[Property]) => any
}

type MatchObjectWithDefault<Obj extends DataObject> = Partial<MatchObject<Obj>> & {
    _: () => any
}

type CaseMatching<Obj extends DataObject> = 
    | MatchObject<Obj>
    | MatchObjectWithDefault<Obj>

class CaseImpl {
    constructor(private readonly variant: any, private readonly data: any) {}

    match(cases: any) {
        const matcher = cases[this.variant]

        if(matcher) return matcher(this.data)
        else if (cases._) return cases._()
        else throw new Error(`Could not handle case with variant: ${this.variant}`)
    }
}

export interface Case<Obj extends DataObject> {
    match<M extends CaseMatching<Obj>>(cases: M): ReturnType<Exclude<M[keyof M], undefined>>
    variant: keyof Obj
    data: DataOutput<Obj>[keyof Obj]
}

export type Data<Obj extends DataObject> = {
    [Property in keyof Obj]: Obj[Property] extends AnyFunction
    ? (...input: Parameters<Obj[Property]>) => Case<Obj>
    : Case<Obj>
}

export function Data<Obj extends DataObject>(dataObject: Obj): Data<Obj> {
    const data: any = {}

    for(const [variant, builder] of Object.entries(dataObject)) {
        if(typeof builder === "function") 
            data[variant] = (...params: any[]) => new CaseImpl(variant, builder(...params))
        else 
            data[variant] = new CaseImpl(variant, undefined)
    }

    return data
}

/* Use Case
const data = Data({
    Success: (id: number, username: string) => ({id, username}),
    Failure: (error: string) => error,
    Pending: Empty
})

const success = data.Success(10, "john.doe")
const error = data.Failure("There has been a network failure")
const pending = data.Pending

success.match({
    Success: ({id, username}) => console.log(`Payload received. {id: ${id}, username: ${username}}`),
    Failure: (error) => console.log(`There has been an error. Error: ${error}`),
    Pending: () => console.log("The request is still pending, please wait.")
})

error.match({
    Success: ({id, username}) => console.log(`Payload received. {id: ${id}, username: ${username}}`),
    Failure: (error) => console.log(`There has been an error. Error: ${error}`),
    Pending: () => console.log("The request is still pending, please wait.")
})

pending.match({
    Success: ({id, username}) => console.log(`Payload received. {id: ${id}, username: ${username}}`),
    Failure: (error) => console.log(`There has been an error. Error: ${error}`),
    Pending: () => console.log("The request is still pending, please wait.")
})

success.match({
    Pending: () => console.log("The request is still pending, please wait."),
    _: () => console.log("Default case")
})
*/