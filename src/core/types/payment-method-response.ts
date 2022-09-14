export interface IResponsePaymentMethod {
    // payment method english name
    name_L1: string | null;
    // payment method arabic name
    name_L2: string | null;
    // payment method french name
    name_L3: string | null;
    // payment mehtod logo
    // this will be an image [.png, .jpg, ...etc]
    logo: string | null;
}
