import { ICategory, ISubCategory } from ".";
import { Image } from "./image";

export interface Service {
    name: string;
    price: number;
    currency: string;
    details: string;
    gallery: Image[];
    category: string;
}

// export interface of the service
export interface IService {
    Id: number;
    Name_L1: string; // english name of the service
    Name_L2: string; // arabic name of the service
    Name_L3: string; // frech name of the service,
    Description_L1: string;
    Description_L2: string;
    Description_L3: string;
    ActivationDate: Date;
    DeactivationDate: Date | null;
    Category: ICategory;
    SubCategory: ISubCategory;
}
