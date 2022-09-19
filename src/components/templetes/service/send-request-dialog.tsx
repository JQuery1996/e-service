import {
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    List,
    ListItemText,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { IRequest, IService, IForm, ICurrency } from "core/types";
import {
    LocalShipping as LocalShippingIcon,
    LabelImportant as LabelImportantIcon,
} from "@mui/icons-material";
import { serviceRequestValidation } from "utils/service-request-valdiaton";
import ReactAxios from "utils/axios";
import { useAppDispatch } from "app/hooks";
import { Loader } from "features/loader/Loader";
import { useLoader } from "utils/hooks/useLoader";
import { notify } from "utils/toastify-notification";
import i18n from "i18n";
export interface ISendRequestDialog {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    service: IService;
    serviceForm: IForm;
    serviceRequest: IRequest;
    preferredCurrencyId: number;
    currentCurrency: ICurrency;
    setPaymentMethodOpen: Dispatch<SetStateAction<boolean>>;
}

export function SendRequestDialog({
    open,
    setOpen,
    service,
    serviceForm,
    serviceRequest,
    preferredCurrencyId,
    currentCurrency,
    setPaymentMethodOpen,
}: ISendRequestDialog) {
    const { t } = useTranslation();
    const { isLoading, setLoadingState } = useLoader();
    const dispatch = useAppDispatch();
    // this function is for close the dialog
    // here you can put any clean operations u need after close the dialog

    const serviceCost = serviceForm.Charges.find(
        (charge) => charge.CurrencyId === preferredCurrencyId,
    )!.Amount;

    let additionalServicesCosts: {
        additionalServiceId: number;
        amount: number;
    }[] = [];
    for (const additonalService of serviceRequest.additionalService) {
        additionalServicesCosts.push({
            additionalServiceId: additonalService.Id,
            amount: serviceForm.AdditionalServices.find(
                (aS) => aS.Id === additonalService.Id,
            )!.charges.find(
                (aSCharge) => aSCharge.CurrencyId === preferredCurrencyId,
            )!.Amount,
        });
    }
    const totalAdditionalServicesCost = additionalServicesCosts.reduce<number>(
        (prevCost, aS) => prevCost + aS.amount,
        0,
    );
    const totalCost = serviceCost + totalAdditionalServicesCost;

    function handleClose() {
        setOpen(false);
    }

    const isValidRequest = useMemo(
        () => serviceRequestValidation(serviceRequest, serviceForm),
        [serviceForm, serviceRequest],
    );
    async function handleSendRequest() {
        if (!serviceRequestValidation(serviceRequest, serviceForm)) return;
        try {
            dispatch(setLoadingState(true));
            const sendRequest: IRequest = {
                ...serviceRequest,
                Fields: serviceRequest.Fields.map((req) => {
                    if (Array.isArray(req.value))
                        return {
                            ...req,
                            value: req.value.join(","),
                        };
                    return req;
                }),
            };
            const response = await ReactAxios.post(
                process.env.REACT_APP_ADD_REQUEST!,
                sendRequest,
            );
            if (response.data.Code === 400) {
                dispatch(setLoadingState(false));
                handleClose();
                notify("error", i18n.t("add_request_failed"));
                return;
            }
            dispatch(setLoadingState(false));
            handleClose();
            notify("success", i18n.t("add_request_success"));
            setPaymentMethodOpen(true);
        } catch (error) {
            console.log(error);
            dispatch(setLoadingState(false));
            notify("error", i18n.t("add_request_failed"));
        }
    }
    return (
        <>
            {isLoading && <Loader />}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="send-request-dialog-title"
                aria-describedby="send-request-dialog-description"
                fullWidth
                maxWidth="md"
                dir="rtl"
            >
                <DialogTitle id="send-request-dialog-title">
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ fontWeight: "bold" }}
                    >
                        <LocalShippingIcon
                            color="primary"
                            sx={{ fontSize: 25, mt: 0.5 }}
                        />
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            {t("send_request")}
                        </Typography>
                    </Stack>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <DialogContentText
                        id="send-request-dialog-description"
                        component="div"
                    >
                        <List
                            sx={{
                                width: "100%",
                                bgColor: "background.paper",
                            }}
                        >
                            <ListItemText
                                sx={{ mb: 2 }}
                                key={service.Id}
                                primary={
                                    <Stack direction="row" spacing={1}>
                                        <LabelImportantIcon
                                            sx={{ transform: "rotate(180deg)" }}
                                        />
                                        <Typography
                                            variant="body1"
                                            sx={{ fontWeight: "bold" }}
                                            color="secondary"
                                        >
                                            {service.Name_L2}
                                        </Typography>
                                    </Stack>
                                }
                                secondary={
                                    <Typography
                                        variant="subtitle2"
                                        sx={{ ml: 4 }}
                                    >
                                        {t("service_cost")} :{" "}
                                        <Chip
                                            dir="ltr"
                                            label={`${serviceCost} ${currentCurrency.code}`}
                                            color="error"
                                            sx={{ borderRadius: 1 }}
                                            size="small"
                                            component={Paper}
                                            elevation={5}
                                        />
                                    </Typography>
                                }
                            />
                            {serviceRequest.additionalService.length > 0 && (
                                <Divider textAlign="left">
                                    الخدمات الإضافية
                                </Divider>
                            )}
                            <Grid container sx={{ mt: 2 }}>
                                {serviceRequest.additionalService.map(
                                    (additionalService) => (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={12}
                                            md={4}
                                            lg={3}
                                            key={additionalService.Id}
                                        >
                                            <ListItemText
                                                key={additionalService.Id}
                                                sx={{ mb: 4 }}
                                                primary={
                                                    <Stack
                                                        direction="row"
                                                        spacing={1}
                                                    >
                                                        <LabelImportantIcon
                                                            sx={{
                                                                transform:
                                                                    "rotate(180deg)",
                                                            }}
                                                        />
                                                        <Typography
                                                            variant="body1"
                                                            sx={{
                                                                fontWeight:
                                                                    "bold",
                                                            }}
                                                        >
                                                            {
                                                                additionalService.Name_L2
                                                            }
                                                        </Typography>
                                                    </Stack>
                                                }
                                                secondary={
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{ ml: 4 }}
                                                    >
                                                        {t("service_cost")} :{" "}
                                                        <Chip
                                                            dir="ltr"
                                                            label={
                                                                additionalServicesCosts.find(
                                                                    (aS) =>
                                                                        aS.additionalServiceId ===
                                                                        additionalService.Id,
                                                                )?.amount +
                                                                " " +
                                                                currentCurrency.code
                                                            }
                                                            color="error"
                                                            sx={{
                                                                borderRadius: 1,
                                                            }}
                                                            size="small"
                                                            component={Paper}
                                                            elevation={5}
                                                        />
                                                    </Typography>
                                                }
                                            />
                                        </Grid>
                                    ),
                                )}
                            </Grid>
                        </List>
                    </DialogContentText>
                    <Divider textAlign="left">{t("total_cost")}</Divider>
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <LabelImportantIcon
                            sx={{ fontSize: 30, transform: "rotate(180deg)" }}
                            color="primary"
                        />

                        <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", mt: 2 }}
                        >
                            {t("total_cost")} :{" "}
                            <Chip
                                dir="ltr"
                                sx={{ borderRadius: 1 }}
                                color="info"
                                label={totalCost + " " + currentCurrency.code}
                                component={Paper}
                                elevation={5}
                            />
                        </Typography>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button
                        autoFocus
                        onClick={handleClose}
                        color="error"
                        sx={{ borderRadius: 1 }}
                        size="large"
                    >
                        {t("close")}
                    </Button>
                    <Button
                        color="success"
                        size="large"
                        sx={{ borderRadius: 1 }}
                        onClick={handleSendRequest}
                        disabled={!isValidRequest}
                    >
                        {t("apply")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
