import type { Agent, AgentRole } from 'drafter-valorant-types';
import { atom } from 'jotai';

export const listAgentsAtom = atom<Agent[]>([]);

export const listRolesAtom = atom<AgentRole[]>([]);