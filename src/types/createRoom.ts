export interface CreateRoomFormProps {
    handleCreateRoom: (
      mapId: string,
      attackers: string,
      defenders: string,
      creatorId: number
    ) => void;
  }
  
 export interface MapData {
    id: number;
    uuid: string;
    displayName: string;
    displayIcon: string;
    splash: string;
  }