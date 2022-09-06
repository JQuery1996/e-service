import { IField, IRequest, ENUM_INPUT_TYPE_MAPPER } from "core/types";
import i18n from "i18n";

import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    InputLabel,
    Radio,
    RadioGroup,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { Validator } from "utils/validation";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export function buildFormFields({
    serviceFields,
    serviceRequest,
    setServiceRequest,
}: {
    serviceFields: IField[];
    serviceRequest: IRequest;
    setServiceRequest: Dispatch<SetStateAction<IRequest>>;
}) {
    const VARIANT = "outlined";
    const TEXTAREAVARIANT = "filled";
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
                        value:
                            currentChangedField.Type ===
                            ENUM_INPUT_TYPE_MAPPER.MULTIPLE_SELECT
                                ? typeof e.target.value === "string"
                                    ? e.target.value.split(",")
                                    : e.target.value
                                : e.target.value,
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
                    <TextField
                        fullWidth
                        type="number"
                        label={Field.Name_L2}
                        value={FieldValue}
                        onChange={(e) => handleChange(e, Field)}
                        required={Field.Required}
                        error={Validator.nonEmptyStringValidation(FieldValue)}
                        helperText={
                            Validator.nonEmptyStringValidation(FieldValue)
                                ? ""
                                : i18n.t("field_is_required")
                        }
                        variant={VARIANT}
                    />
                );
            case ENUM_INPUT_TYPE_MAPPER.TEXT_FIELD: // case for #Text Field
                return (
                    <TextField
                        fullWidth
                        label={Field.Name_L2}
                        value={FieldValue}
                        onChange={(e) => handleChange(e, Field)}
                        required={Field.Required}
                        error={!Validator.nonEmptyStringValidation(FieldValue)}
                        helperText={
                            Validator.nonEmptyStringValidation(FieldValue)
                                ? ""
                                : i18n.t("field_is_required")
                        }
                        variant={VARIANT}
                    />
                );
            case ENUM_INPUT_TYPE_MAPPER.TEXT_AREA: // case for #TextArea
                return (
                    <TextField
                        value={FieldValue}
                        onChange={(e) => handleChange(e, Field)}
                        multiline
                        maxRows={3}
                        variant={TEXTAREAVARIANT}
                        error={!Validator.nonEmptyStringValidation(FieldValue)}
                        helperText={
                            Validator.nonEmptyStringValidation(FieldValue)
                                ? ""
                                : i18n.t("field_is_required")
                        }
                    />
                );
            case ENUM_INPUT_TYPE_MAPPER.RADIO_BUTTON: // case for #RadioButton
                return (
                    <FormControl>
                        <FormLabel
                            id={`controlled-radio-buttons-group-${Field.Name_L1}`}
                            color="primary"
                            sx={{ color: "primary.main", fontWeight: "bold" }}
                            error={
                                !Validator.nonEmptyStringValidation(FieldValue)
                            }
                        >
                            {Field.Name_L2}
                        </FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby={`controlled-radio-buttons-group-${Field.Name_L1}`}
                            name={`controlled-radio-buttons-group-${Field.Name_L1}`}
                            value={FieldValue}
                            onChange={(e) => handleChange(e, Field)}
                        >
                            {Field.Options?.map((Option) => (
                                <FormControlLabel
                                    key={Option.Id}
                                    value={Option.Id}
                                    control={<Radio />}
                                    label={Option.Value_L2}
                                />
                            ))}
                        </RadioGroup>
                        {!Validator.nonEmptyStringValidation(FieldValue) && (
                            <FormHelperText sx={{ color: "error.main" }}>
                                {i18n.t("field_is_required")}
                            </FormHelperText>
                        )}
                    </FormControl>
                );
            case ENUM_INPUT_TYPE_MAPPER.SINGLE_SELECT: // case for #Select
                return (
                    <FormControl fullWidth>
                        <InputLabel
                            id={`controlled-select-label-${Field.Name_L1}`}
                        >
                            {Field.Name_L2}
                        </InputLabel>
                        <Select
                            labelId={`controlled-select-label-${Field.Name_L1}`}
                            id={`controlled-select-${Field.Name_L1}`}
                            label={Field.Name_L2}
                            value={FieldValue}
                            onChange={(e) => handleChange(e, Field)}
                        ></Select>
                    </FormControl>
                );
            case ENUM_INPUT_TYPE_MAPPER.MULTIPLE_SELECT: // case for multiple Select
                return (
                    <FormControl fullWidth>
                        <InputLabel
                            id={`controlled-multiple-select-label-${Field.Name_L1}`}
                        >
                            {Field.Name_L2}
                        </InputLabel>
                        <Select
                            labelId={`controlled-multiple-select-label-${Field.Name_L1}`}
                            id={`controlled-multiple-select-${Field.Name_L1}`}
                            label={Field.Name_L2}
                            value={FieldValue}
                            onChange={(e) => handleChange(e, Field)}
                            multiple
                            renderValue={(selected) => selected.join(", ")}
                            MenuProps={MenuProps}
                        ></Select>
                    </FormControl>
                );
            default:
                return null;
        }
    }
    return (
        <>
            {serviceFields.map((serviceField, index) => (
                <Grid
                    key={index}
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                    sx={{ mx: 2 }}
                >
                    {buildInput(serviceField)}
                </Grid>
            ))}
        </>
    );
}
