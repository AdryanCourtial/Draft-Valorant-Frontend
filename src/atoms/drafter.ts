import type { Agent, AgentRole, DraftAction, Map, Room, SideTeam } from 'drafter-valorant-types';
import { atom } from 'jotai';

export const draftRoomAtom = atom< Room | null>(null);

export const listAgentsAtom = atom<Agent[]>([]);

export const listRolesAtom = atom<AgentRole[]>([]);

export const listMapsAtom = atom<Map[]>([]);

export const agentHoveredAtom = atom<Agent | null>(null);

export const roomObject = atom<Room>();

export const timerAtom = atom<number>();

export const listAgentsAlreadyPickedAtom = atom<number[]>([])

export const togglePopinChooseSideAtom = atom<boolean>(true)

export const curentSideToPlayAtom = atom<DraftAction>()

export const roleInRoomAtom = atom<SideTeam | "spectate">("spectate")


