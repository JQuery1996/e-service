export interface IRequest {
    serviceId: number;
    mobileNumber?: string;
    StatusId?: number;
    userId: number;
    email: string;
    notes: {
        Note: "string";
        IsAdminNote: boolean;
        AdminName: string;
    }[];
    documentsId: number[];
    additionalService: {
        Id: number;
        Name_L1: string | null;
        Name_L2: string | null;
        Name_L3: string | null;
    }[];
    Fields: {
        title_L1: string | null;
        title_L2: string | null;
        title_L3: string | null;
        value: any;
    }[];
}
