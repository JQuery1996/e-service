import { ICharge } from "./charge";
export interface IAdditionalService {
    Id: number;
    Name_L1: string | null;
    Name_L2: string | null;
    Name_L3: string | null;
    charges: ICharge[];
}
