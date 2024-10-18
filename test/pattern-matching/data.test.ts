import { Data, Empty } from '../../src/index';

describe('Data type', () => {
    it('should pick the correct non empty case', () => {
        const id = 10
        const username = "john.doe"

        const data = Data({
            Success: (id: number, username: string) => ({id, username}),
            Failure: Empty,
        }).Success(id, username)

        const expected = `A successful case was found with id: ${id} and username: ${username}`

        const result = data.match({
            Success: ({id, username}) => `A successful case was found with id: ${id} and username: ${username}`,
            Failure: () => "Failure",
            _: () => "Default"
        })

        expect(result).toEqual(expected)
    })

    it('should pick the correct empty case', () => {
        const data = Data({
            Success: (id: number, username: string) => ({id, username}),
            Failure: Empty
        }).Failure

        const expected = "A failure has taken place"

        const result = data.match({
            Success: ({id, username}) => `A successful case was found with id: ${id} and username: ${username}`,
            Failure: () => expected,
            _: () => "Default"
        })

        expect(result).toEqual(expected)
    })

    it('should pick the default branch', () => {
        const data = Data({
            Success: (id: number, username: string) => ({id, username}),
            Failure: Empty
        }).Failure

        const expected = "The default has been picked."

        const result = data.match({
            Success: ({id, username}) => `A successful case was found with id: ${id} and username: ${username}`,
            _: () => expected
        })

        expect(result).toEqual(expected)
    })
    
    // This should not happen unless the client forcely tries to
    it('should throw if no variation is allowed', () => {
        const data = Data({
            Success: (id: number, username: string) => ({id, username}),
            Failure: Empty
        }).Failure

        expect(() => data.match({
            //@ts-ignore 
            wierdVariation: () => "Wierd variation"
        })).toThrow()
    })
});
