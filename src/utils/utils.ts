export const ConvertJsonTableToArray = (str: string | undefined): Array<string> => {
    if (!str) {
        return []
    }
    
    return JSON.parse(str)
}