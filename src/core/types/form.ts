import { IDocumentType, IField, IAdditionalService, ICharge } from ".";

export interface IForm {
    Fields: IField[];
    DocumentTypes: IDocumentType[];
    AdditionalServices: IAdditionalService[];
    Charges: ICharge[];
}
