export const ConvertJsonTableToArray = (str: string | undefined): Array<string> => {
    if (!str) {
        return []
    }
    
    return JSON.parse(str)
}

export const GenerateArray = (length: number) => Array.from({ length });

export const FindFirstNullInArray = (array: Array<any>) => {
    return array.findIndex((value) => value === null)
}