export interface FilterContextType {
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
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
export type Option = "All" |"Rifle" | "Pistol" | "SMG" | "Heavy" | "Knive" | "Gloves";
