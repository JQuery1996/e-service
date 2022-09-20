import { IField, IRequest, ENUM_INPUT_TYPE_MAPPER } from "core/types";
import i18n from "i18n";
import dayjs, { Dayjs } from "dayjs";
import {
    Box,
    Chip,
    FormControlLabel,
    Grid,
    Paper,
    Radio,
    SelectChangeEvent,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { Validator } from "utils/validation";
import { EDate, EInput, ERadio, ESelect, ETextarea } from "components/atoms";

import { TaskAlt as TaskAltIcon } from "@mui/icons-material";

export function buildFormFields({
    serviceFields,
    serviceRequest,
    setServiceRequest,
}: {
    serviceFields: IField[];
    serviceRequest: IRequest;
    setServiceRequest: Dispatch<SetStateAction<IRequest>>;
}) {
    function handleChange(
        e:
            | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | SelectChangeEvent,
        currentChangedField: IField,
    ) {
        setServiceRequest((currentRequest) => ({
            ...currentRequest,
            Fields: currentRequest.Fields.map((Field) => {
                if (Field.title_L1 !== currentChangedField.Name_L1)
                    return Field;
                else
                    return {
                        ...Field,
                        // value:
                        //     currentChangedField.Type ===
                        //     ENUM_INPUT_TYPE_MAPPER.MULTIPLE_SELECT
                        //         ? typeof e.target.value === "string"
                        //             ? e.target.value.split(",")
                        //             : e.target.value
                        //         : e.target.value,
                        value: e.target.value,
                    };
            }),
        }));
    }
    function handleChangeDate(newDate: string, currentChangedField: IField) {
        setServiceRequest((currentRequest) => ({
            ...currentRequest,
            Fields: currentRequest.Fields.map((Field) => {
                if (Field.title_L1 !== currentChangedField.Name_L1)
                    return Field;
                else
                    return {
                        ...Field,
                        value: newDate,
                    };
            }),
        }));
    }
    // this function is for building a single input
    function buildInput(Field: IField) {
        const FieldValue = serviceRequest.Fields.find(
            (F) => F.title_L1 === Field.Name_L1,
        )!.value;

        switch (Field.Type) {
            case ENUM_INPUT_TYPE_MAPPER.NUMBER_FIELD: // case for # Number Field
                return (
                    <EInput
                        fullWidth
                        type="number"
                        label={Field.Name_L2 ?? ""}
                        value={FieldValue}
                        onChange={(e) => handleChange(e, Field)}
                        required={Field.Required}
                        error={
                            Field.Required && !Validator.required(FieldValue)
                        }
                        errorMessage={i18n.t("field_is_required")}
                    />
                );
            case ENUM_INPUT_TYPE_MAPPER.TEXT_FIELD: // case for #Text Field
                return (
                    <EInput
                        fullWidth
                        label={Field.Name_L2 ?? ""}
                        value={FieldValue}
                        onChange={(e) => handleChange(e, Field)}
                        required={Field.Required}
                        error={!Validator.nonEmptyStringValidation(FieldValue)}
                        errorMessage={i18n.t("field_is_required")}
                    />
                );
            case ENUM_INPUT_TYPE_MAPPER.TEXT_AREA: // case for #TextArea
                return (
                    <ETextarea
                        value={FieldValue}
                        onChange={(e) => handleChange(e, Field)}
                        label={Field.Name_L2 ?? ""}
                        required={Field.Required}
                        error={
                            Field.Required &&
                            !Validator.nonEmptyStringValidation(FieldValue)
                        }
                        errorMessage={i18n.t("field_is_required")}
                    />
                );
            case ENUM_INPUT_TYPE_MAPPER.RADIO_BUTTON: // case for #RadioButton
                return (
                    <ERadio
                        required={Field.Required}
                        title={Field.Name_L2 ?? ""}
                        error={
                            Field.Required &&
                            !Validator.nonEmptyStringValidation(FieldValue)
                        }
                        errorMessage={i18n.t("field_is_required")}
                        row
                        value={FieldValue}
                        onChange={(e) => handleChange(e, Field)}
                    >
                        {Field.Options?.map((Option) => (
                            <FormControlLabel
                                key={Option.Id}
                                value={Option.Value_L2}
                                control={
                                    <Radio
                                        checkedIcon={<TaskAltIcon />}
                                        size="medium"
                                        color="primary"
                                        sx={{
                                            "& .MuiSvgIcon-root": {
                                                fontSize: 30,
                                            },
                                        }}
                                    />
                                }
                                label={Option.Value_L2}
                            />
                        ))}
                    </ERadio>
                );
            case ENUM_INPUT_TYPE_MAPPER.SINGLE_SELECT: // case for #Select
                return (
                    <ESelect
                        label={Field.Name_L2 ?? ""}
                        required={Field.Required}
                        value={FieldValue}
                        onChange={(e) =>
                            handleChange(e as SelectChangeEvent<string>, Field)
                        }
                        options={
                            Field.Options?.map((o) => ({
                                label: o.Value_L2,
                                value: o.Value_L2,
                            })) ?? []
                        }
                        error={
                            Field.Required &&
                            !Validator.nonEmptyStringValidation(FieldValue)
                        }
                        errorMessage={i18n.t("field_is_required")}
                    />
                );
            case ENUM_INPUT_TYPE_MAPPER.MULTIPLE_SELECT: // case for multiple Select
                return (
                    <ESelect
                        label={Field.Name_L2 ?? ""}
                        required={Field.Required}
                        value={FieldValue}
                        onChange={(e) =>
                            handleChange(e as SelectChangeEvent<string>, Field)
                        }
                        options={
                            Field.Options?.map((o) => ({
                                label: o.Value_L2,
                                value: o.Value_L2,
                            })) ?? []
                        }
                        error={
                            Field.Required && !Validator.required(FieldValue)
                        }
                        errorMessage={i18n.t("field_is_required")}
                        SelectProps={{
                            multiple: true,
                            renderValue: (selected) => (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        maxHeight: 75,
                                        overflowY: "auto",
                                        gap: 0.5,
                                    }}
                                >
                                    {(selected as string[]).map((value) => (
                                        <Chip
                                            key={value}
                                            label={value}
                                            component={Paper}
                                            elevation={10}
                                            sx={{ borderRadius: 1 }}
                                            color="info"
                                        />
                                    ))}
                                </Box>
                            ),
                        }}
                    />
                );
            case ENUM_INPUT_TYPE_MAPPER.DATE_TIME_PICKER:
                return (
                    <EDate
                        label={Field.Name_L2 ?? ""}
                        date={FieldValue}
                        setDate={(newDate) =>
                            handleChangeDate(newDate.toString(), Field)
                        }
                        required={Field.Required}
                        error={
                            Field.Required && !Validator.required(FieldValue)
                        }
                        errorMessage={i18n.t("field_is_required")}
                    />
                );
            default:
                return null;
        }
    }
    return (
        <>
            <Grid item xs={12} sm={12} md={4} lg={4} sx={{ mx: 2 }}>
                <EInput
                    fullWidth
                    label="رقم الهاتف"
                    value={serviceRequest.mobileNumber ?? ""}
                    onChange={(e) =>
                        setServiceRequest((currentServiceRequest) => ({
                            ...currentServiceRequest,
                            mobileNumber: e.target.value,
                        }))
                    }
                    required
                    error={
                        !Validator.nonEmptyStringValidation(
                            serviceRequest.mobileNumber ?? "",
                        )
                    }
                    errorMessage={i18n.t("field_is_required")}
                />
            </Grid>
            {serviceFields.map((serviceField, index) => (
                <Grid
                    key={index}
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                    sx={{ mx: 2, mb: 5 }}
                >
                    {buildInput(serviceField)}
                </Grid>
            ))}
        </>
    );
}
