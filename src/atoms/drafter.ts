import type { Agent } from 'drafter-valorant-types';
import { atom } from 'jotai';

export const listAgentsAtom = atom<Agent[]>([]);