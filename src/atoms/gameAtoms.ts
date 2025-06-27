import { atom } from "jotai";
import type { DraftRoom } from "../types/draft.interface";

export const draftRoomAtom = atom<DraftRoom | null>(null);