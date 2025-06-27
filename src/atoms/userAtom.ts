import type { User } from "drafter-valorant-types";
import { atom } from "jotai";

export const userAtom = atom<User | null>(null);
