import type { Room } from "drafter-valorant-types";

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

export const ArrayOfChampRegistered = (room: Room) => {
    return [
        ...room.attackers_side.agents,
        ...room.attackers_side.bans,
        ...room.defenders_side.agents,
        ...room.defenders_side.bans,
    ];
}