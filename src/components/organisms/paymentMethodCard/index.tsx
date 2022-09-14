import {
    useState,
    forwardRef,
    useEffect,
    Dispatch,
    SetStateAction,
} from "react";
import {
    Card,
    CardActionArea,
    CardMedia,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Slide,
    Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { IResponsePaymentMethod } from "core/types";
import { useLoader } from "utils/hooks/useLoader";
import ReactAxios from "utils/axios";
import { useAppDispatch } from "app/hooks";
import { useTranslation } from "react-i18next";
import { AddCard as AddCardIcon } from "@mui/icons-material";
import { Stack } from "@mui/system";
import { Loader } from "features/loader/Loader";
import { notify } from "utils/toastify-notification";

const PAYMENT_METHOD_LIST_URL = process.env.REACT_APP_GET_PAYMENT_METHOD_LIST!;
const PAYMENT_LOGO_DOWNLOAD_URL = process.env.REACT_APP_DOWNLOAD_PAYMENT_LOGO!;
const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function PaymentMethodCard({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}) {
    const { t } = useTranslation();
    // State for List of all Payment method
    const [paymentMethods, setPaymentMethods] = useState<
        IResponsePaymentMethod[]
    >([]);

    const dispatch = useAppDispatch();
    const { isLoading, setLoadingState } = useLoader();

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleSelectPaymentMethod(payment: IResponsePaymentMethod) {
        notify("success", "تم الدفع بنجاح");
        handleClose();
    }

    useEffect(() => {
        async function getPaymentMethods() {
            try {
                dispatch(setLoadingState(true));
                const responsedPaymentMethodsList = await ReactAxios.get(
                    PAYMENT_METHOD_LIST_URL,
                );
                setPaymentMethods(responsedPaymentMethodsList.data.data);

                dispatch(setLoadingState(false));
            } catch (error) {
                dispatch(setLoadingState(false));
                console.log(error);
            }
        }
        getPaymentMethods();
    }, [dispatch, setLoadingState]);
    return (
        <>
            {isLoading && <Loader />}
            <Dialog
                fullWidth
                maxWidth="md"
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="payment-dialog-description"
                dir="rtl"
            >
                <DialogTitle>
                    <Stack direction="row" spacing={1}>
                        <AddCardIcon color="primary" />
                        <Typography sx={{ fontWeight: "bold" }}>
                            {t("select_payment_method")}
                        </Typography>
                    </Stack>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Grid container spacing={2}>
                        {paymentMethods.map((payment, index) => {
                            return (
                                <Grid
                                    key={index}
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    sx={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        alignContent: "center",
                                        display: "flex",
                                    }}
                                >
                                    <Card
                                        sx={{ bgcolor: "background.default" }}
                                        onClick={() =>
                                            handleSelectPaymentMethod(payment)
                                        }
                                    >
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="194"
                                                image={`${PAYMENT_LOGO_DOWNLOAD_URL}/${payment.logo}`}
                                                alt={
                                                    payment.name_L2 ??
                                                    "payment logo"
                                                }
                                            />
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
}
