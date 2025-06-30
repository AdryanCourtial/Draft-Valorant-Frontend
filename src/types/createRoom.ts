export interface CreateRoomFormProps {
    handleCreateRoom: (
      mapId: string,
      attackers: string,
      defenders: string,
      creatorId: number
    ) => void;
  }
  
 export interface MapData {
    uuid: string;
    displayName: string;
    displayIcon: string;
    splash: string;
  }