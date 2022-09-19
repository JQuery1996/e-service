import { Chip, Divider, Grid, Paper } from "@mui/material";
import { IForm, IRequest, ICurrency, IUploadFile } from "core/types";
import { Dispatch, SetStateAction } from "react";
import { buildFormAdditionalServices } from "./formBuilder/build-form-additional-services";
import { buildFormDocuments } from "./formBuilder/build-form-documents";
import { buildFormFields } from "./formBuilder/build-form-fields";
interface IServiceForm {
    serviceForm: IForm;
    currencies: ICurrency[];
    currentCurrency: ICurrency;
    uploadedFiles: IUploadFile[];
    setUploadedFiles: Dispatch<SetStateAction<IUploadFile[]>>;
    serviceRequest: IRequest;
    setServiceRequest: Dispatch<SetStateAction<IRequest>>;
    perferredCurrencyId: number;
}
export function ServiceForm({
    serviceForm,
    currencies,
    currentCurrency,
    uploadedFiles,
    setUploadedFiles,
    serviceRequest,
    setServiceRequest,
    perferredCurrencyId,
}: IServiceForm) {
    return (
        <>
            <Divider textAlign="left" sx={{ mb: 4 }}>
                <Chip
                    label="الحقول"
                    color="primary"
                    sx={{
                        fontWeight: "bold",
                        fontSize: 14,
                        borderRadius: 1,
                    }}
                    component={Paper}
                    elevation={10}
                />
            </Divider>
            <Grid container spacing={2}>
                {buildFormFields({
                    serviceFields: serviceForm.Fields.sort(
                        (F_One, F_Two) => F_One.Sequence - F_Two.Sequence,
                    ),
                    serviceRequest,
                    setServiceRequest,
                })}
            </Grid>

            <Divider textAlign="left" sx={{ mt: 4, mb: 4 }}>
                <Chip
                    label="الخدمات الإضافية"
                    color="primary"
                    sx={{
                        fontWeight: "bold",
                        fontSize: 14,
                        borderRadius: 1,
                    }}
                    component={Paper}
                    elevation={10}
                />
            </Divider>
            <Grid container spacing={2}>
                {buildFormAdditionalServices({
                    additionalServices: serviceForm.AdditionalServices,
                    serviceRequest,
                    setServiceRequest,
                    currencies,
                    perferredCurrencyId,
                    currentCurrency,
                })}
            </Grid>

            <Divider textAlign="center" sx={{ mt: 4, mb: 4 }}>
                <Chip
                    label="المرفقات"
                    color="primary"
                    sx={{
                        fontWeight: "bold",
                        fontSize: 14,
                        borderRadius: 1,
                    }}
                    component={Paper}
                    elevation={10}
                />
            </Divider>
            <Grid container spacing={2}>
                {buildFormDocuments({
                    documents: serviceForm.DocumentTypes,
                    uploadedFiles,
                    setUploadedFiles,
                })}
            </Grid>
        </>
    );
}
