import { IAdditionalService, IRequest } from "core/types";
import { Dispatch, SetStateAction } from "react";
import { Grid, Checkbox, FormControlLabel, Typography } from "@mui/material";
import {
    BookmarkBorder as BookmarkBorderIcon,
    Bookmark as BookmarkIcon,
} from "@mui/icons-material";

const ariaLabel = { inputProps: { "aria-label": "Checkbox demo" } };

export function buildFormAdditionalServices({
    additionalServices,
    serviceRequest,
    setServiceRequest,
}: {
    additionalServices: IAdditionalService[];
    serviceRequest: IRequest;
    setServiceRequest: Dispatch<SetStateAction<IRequest>>;
}) {
    console.log(serviceRequest);
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
                            <Typography
                                variant="body1"
                                sx={{ fontWeight: "bold" }}
                            >
                                {additionalService.Name_L2}
                            </Typography>
                        }
                        style={{ fontWeight: "bold" }}
                    />
                </Grid>
            ))}
        </>
    );
}
