export interface IField {
    Id: number;
    Name_L1: string | null;
    Name_L2: string | null;
    Name_L3: string | null;
    Required: boolean;
    Sequence: number;
    Type: number;
    Options?: {
        Id: number;
        Value_L1: any;
        Value_L2: any;
        Value_L3: any;
    }[];
}
