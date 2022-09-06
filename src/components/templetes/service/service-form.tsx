import { Chip, Divider, Grid } from "@mui/material";
import { IForm, IRequest, ENUM_INPUT_TYPE_MAPPER } from "core/types";
import { useState } from "react";
import { buildFormAdditionalServices } from "./formBuilder/build-form-additional-services";
import { buildFormDocuments } from "./formBuilder/build-form-documents";
import { buildFormFields } from "./formBuilder/build-form-fields";
interface IServiceForm {
    serviceForm: IForm;
}
export function ServiceForm({ serviceForm }: IServiceForm) {
    const initialRequestForm = {} as IRequest;

    // Fields Section
    initialRequestForm.Fields = serviceForm.Fields.map(
        ({ Name_L1, Name_L2, Name_L3, Type }) => ({
            title_L1: Name_L1,
            title_L2: Name_L2,
            title_L3: Name_L3,
            value: ENUM_INPUT_TYPE_MAPPER.MULTIPLE_SELECT === Type ? [] : "",
        }),
    );
    // Additional Services Section
    initialRequestForm.additionalService = [];
    initialRequestForm.documentsIds = [];
    const [serviceRequest, setServiceRequest] =
        useState<IRequest>(initialRequestForm);

    console.log({ serviceForm });
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
                />
            </Divider>
            <Grid container spacing={2}>
                {buildFormAdditionalServices({
                    additionalServices: serviceForm.AdditionalServices,
                    serviceRequest,
                    setServiceRequest,
                })}
            </Grid>

            <Divider textAlign="left" sx={{ mt: 4, mb: 4 }}>
                <Chip
                    label="المرفقات"
                    color="primary"
                    sx={{
                        fontWeight: "bold",
                        fontSize: 14,
                        borderRadius: 1,
                    }}
                />
            </Divider>
            <Grid container spacing={2}>
                {buildFormDocuments({
                    documents: serviceForm.DocumentTypes,
                    serviceRequest,
                    setServiceRequest,
                })}
            </Grid>
        </>
    );
}
