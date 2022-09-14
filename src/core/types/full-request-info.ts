import { INote } from "./note";
export interface IFullRequestInformation {
    id: number;
    service: {
        Id: number;
        Name_L1: string | null;
        Name_L2: string | null;
        Name_L3: string | null;
    };
    userId: number;
    email: string;
    mobileNumber: string;
    requestRecord: {
        Id: number;
        Fields: {
            title_L1: string | null;
            title_L2: string | null;
            title_L3: string | null;
            value: any;
        }[];
        AdditionalServices: {
            Name_L1: string | null;
            Name_L2: string | null;
            Name_L3: string | null;
            AdditionalServiceCharges: any;
        }[];
    };
    CreationDate: Date;
    documents: {
        url: string;
        DocumentType: number;
        creationTimeStamp: Date;
    }[];
    Notes: INote[];
    requestStatus: {
        Id: number;
        Name_L1: string;
        Name_L2: string;
        Name_L3: string;
    };
}
