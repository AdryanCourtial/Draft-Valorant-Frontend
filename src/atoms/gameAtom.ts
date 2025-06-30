import { atom } from "jotai";
import type { Room } from "drafter-valorant-types";

export const draftRoomAtom = atom< Room | null>(null);