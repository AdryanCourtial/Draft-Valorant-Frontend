import type { Agent, AgentRole, Room } from 'drafter-valorant-types';
import { atom } from 'jotai';

export const draftRoomAtom = atom< Room | null>(null);

export const listAgentsAtom = atom<Agent[]>([]);

export const listRolesAtom = atom<AgentRole[]>([]);

export const agentHoveredAtom = atom<Agent | null>(null);

export const roomObject = atom<Room>();

export const timerAtom = atom<number>();

export const listAgentsAlreadyPickedAtom = atom<number[]>([])

export const togglePopinChooseSideAtom = atom<boolean>(true)

