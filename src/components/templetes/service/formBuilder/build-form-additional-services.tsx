import { IAdditionalService, IRequest, ICurrency } from "core/types";
import { Dispatch, SetStateAction } from "react";
import {
    Grid,
    Checkbox,
    FormControlLabel,
    Typography,
    Chip,
} from "@mui/material";
import {
    BookmarkBorder as BookmarkBorderIcon,
    Bookmark as BookmarkIcon,
} from "@mui/icons-material";
import { Stack } from "@mui/system";

const ariaLabel = { inputProps: { "aria-label": "Checkbox demo" } };

function getPrice(
    additionalService: IAdditionalService,
    currencies: ICurrency[],
) {
    // this will return amount/name like "10 $"
    // first we need to get the charge name
    const CODE = currencies.find(
        (currency) => currency.id === additionalService.Id,
    )!.code;
    return `${additionalService.charges[0].Amount} ${CODE}`;
}
export function buildFormAdditionalServices({
    additionalServices,
    serviceRequest,
    setServiceRequest,
    currencies,
}: {
    additionalServices: IAdditionalService[];
    serviceRequest: IRequest;
    setServiceRequest: Dispatch<SetStateAction<IRequest>>;
    currencies: ICurrency[];
}) {
    console.log({ additionalServices, serviceRequest });
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
                checkedAdditonalService,
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
                                color="info"
                                {...ariaLabel}
                                icon={
                                    <BookmarkBorderIcon sx={{ fontSize: 30 }} />
                                }
                                checkedIcon={
                                    <BookmarkIcon sx={{ fontSize: 30 }} />
                                }
                                size="medium"
                            />
                        }
                        label={
                            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                                <Typography
                                    variant="body1"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    {additionalService.Name_L2}
                                </Typography>
                                <Chip
                                    label={getPrice(
                                        additionalService,
                                        currencies,
                                    )}
                                    variant="filled"
                                    sx={{
                                        borderRadius: 1,
                                        fontWeight: "bold",
                                        direction: "rtl",
                                    }}
                                    color="secondary"
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
