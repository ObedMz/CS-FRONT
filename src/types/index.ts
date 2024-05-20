export interface FilterContextType {
    filter: string | null;
    setFilter: React.Dispatch<React.SetStateAction<string|null>>;
}
export interface Shape {
    id: number;
    color: string;
    shape: JSX.Element;
    angle: string;
    delay: string;
  }
export enum ResponseMessage {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
}
export interface SteamDTO {
  key: string;
  steamIDs: string[];
}
export type Option = "Primary" | "Secondary" | "knife"| "agent" | "others";
