import { IRequest, IForm } from "core/types";
import { Validator } from "utils/validation";

export function serviceRequestValidation(
    serviceRequest: IRequest,
    serviceForm: IForm,
) {
    if (
        !serviceRequest.email ||
        !serviceRequest.mobileNumber ||
        !serviceRequest.userId ||
        !serviceRequest.StatusId
    )
        return false;
    const requestFields = serviceRequest.Fields;
    const formFields = serviceForm.Fields;

    for (const formField of formFields) {
        if (
            formField.Required &&
            !Validator.required(
                requestFields.find((requestField) => requestField.value),
            )
        )
            return false;
    }
    if (serviceRequest.documentsId.length !== serviceForm.DocumentTypes.length)
        return false;
    return true;
}
