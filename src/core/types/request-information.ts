export interface IRequestInformation {
    Id: number;
    Service: {
        Id: number;
        Name_L1: string | null;
        Name_L2: string | null;
        Name_L3: string | null;
    };
    mobileNumber: string | null;
    email: string | null;
    status: {
        Id: number;
        Name_L1: string | null;
        Name_L2: string | null;
        Name_L3: string | null;
    };
    CreationDate: Date;
}
