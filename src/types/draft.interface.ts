// types/draft.interface.ts

export interface DraftRoom {
  roomId: string;        
  pseudo: string;       
  isPrivate: boolean;    
  players?: string[];   
  createdAt?: string;     
}
