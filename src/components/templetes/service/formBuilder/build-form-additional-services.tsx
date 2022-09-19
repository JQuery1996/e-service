import { IAdditionalService, IRequest, ICurrency } from "core/types";
import { Dispatch, SetStateAction } from "react";
import {
    Grid,
    Checkbox,
    FormControlLabel,
    Typography,
    Chip,
    Paper,
} from "@mui/material";
import {
    BookmarkBorder as BookmarkBorderIcon,
    BookmarkAdd as BookmarkAddIcon,
} from "@mui/icons-material";
import { Stack } from "@mui/system";

const ariaLabel = { inputProps: { "aria-label": "Checkbox demo" } };

export function buildFormAdditionalServices({
    additionalServices,
    serviceRequest,
    setServiceRequest,
    currencies,
    perferredCurrencyId,
    currentCurrency,
}: {
    additionalServices: IAdditionalService[];
    serviceRequest: IRequest;
    setServiceRequest: Dispatch<SetStateAction<IRequest>>;
    currencies: ICurrency[];
    perferredCurrencyId: number;
    currentCurrency: ICurrency;
}) {
    function isChecked(Id: number) {
        return serviceRequest.additionalService.some(
            (additionalService) => additionalService.Id === Id,
        );
    }
    function handleChange(
        e: React.ChangeEvent<HTMLInputElement>,
        checkedAdditonalService: IAdditionalService,
    ) {
        let currentAdditionalServices = serviceRequest.additionalService;
        if (
            serviceRequest.additionalService.some(
                (additionalService) =>
                    additionalService.Id === checkedAdditonalService.Id,
            )
        ) {
            currentAdditionalServices = currentAdditionalServices.filter(
                (S) => S.Id !== checkedAdditonalService.Id,
            );
        } else
            currentAdditionalServices = [
                ...currentAdditionalServices,
                {
                    Id: checkedAdditonalService.Id,
                    Name_L1: checkedAdditonalService.Name_L1,
                    Name_L2: checkedAdditonalService.Name_L2,
                    Name_L3: checkedAdditonalService.Name_L3,
                },
            ];

        setServiceRequest((currentServiceRequest) => ({
            ...currentServiceRequest,
            additionalService: currentAdditionalServices,
        }));
    }
    // here is a list of checkbox fields
    return (
        <>
            {additionalServices.map((additionalService) => (
                <Grid
                    key={additionalService.Id}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                >
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isChecked(additionalService.Id)}
                                onChange={(e) =>
                                    handleChange(e, additionalService)
                                }
                                color="primary"
                                {...ariaLabel}
                                icon={
                                    <BookmarkBorderIcon sx={{ fontSize: 30 }} />
                                }
                                checkedIcon={
                                    <BookmarkAddIcon sx={{ fontSize: 30 }} />
                                }
                                size="medium"
                            />
                        }
                        label={
                            <Stack direction="row" spacing={1}>
                                <Typography
                                    variant="body1"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    {additionalService.Name_L2}
                                </Typography>
                                <Chip
                                    label={
                                        additionalService.charges.find(
                                            (charge) =>
                                                charge.CurrencyId ===
                                                perferredCurrencyId,
                                        )?.Amount +
                                        " " +
                                        currentCurrency.code
                                    }
                                    variant="filled"
                                    sx={{
                                        borderRadius: 1,
                                        fontWeight: "bold",
                                        direction: "rtl",
                                    }}
                                    color="warning"
                                    size="small"
                                    component={Paper}
                                    elevation={5}
                                />
                            </Stack>
                        }
                        style={{ fontWeight: "bold" }}
                    />
                </Grid>
            ))}
        </>
    );
}
