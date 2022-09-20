import { FC, useState, useMemo, useEffect } from "react";
import {
    Container,
    Grid,
    Link,
    Breadcrumbs,
    Stack,
    Typography,
    Divider,
    Card,
    CardHeader,
    CardContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    CardActions,
    Button,
    Paper,
} from "@mui/material";

import {
    IForm,
    IService,
    ICurrency,
    ENUM_INPUT_TYPE_MAPPER,
    IUploadFile,
    IRequest,
} from "core/types";
import { useTranslation } from "react-i18next";

import {
    Home as HomeIcon,
    AddShoppingCart as AddShoppingCardIcon,
    ArrowLeft as ArrowLeftIcon,
    LightbulbOutlined as LightbulbOutlinedIcon,
    ApprovalOutlined as ApprovalOutlinedIcon,
    Send as SendIcon,
} from "@mui/icons-material";

import { Tabs } from "components/atoms";
import { ServiceForm } from "./service-form";
import { SendRequestDialog } from "./send-request-dialog";
import { useAuth } from "utils/hooks/useAuth";
import { PaymentMethodCard } from "components/organisms";

export interface ServiceTempleteProps {
    service: IService;
    serviceForm: IForm | null;
    currencies: ICurrency[];
}

export const ServiceTemplete: FC<ServiceTempleteProps> = ({
    service,
    serviceForm,
    currencies,
}) => {
    const { t } = useTranslation();
    const { authenticatedUser } = useAuth();

    // set the current currency selected by the user.
    const [preferredCurrencyId, setPreferredCurrencyId] = useState<number>(
        currencies[0].id,
    );

    // this state is for open and close send dialog form
    const [sendDialogOpen, setSendDialogOpen] = useState<boolean>(false);

    const [uploadedFiles, setUploadedFiles] = useState<IUploadFile[]>([]);

    const [paymentDialogOpen, setPaymentDialogOpen] = useState<boolean>(false);

    const initialRequestForm = {} as IRequest;
    if (serviceForm) {
        // Fields Section
        initialRequestForm.serviceId = service.Id;
        initialRequestForm.StatusId = 1;
        initialRequestForm.userId = authenticatedUser!.Id;
        initialRequestForm.email = authenticatedUser!.email;
        initialRequestForm.Fields = serviceForm.Fields.map(
            ({ Name_L1, Name_L2, Name_L3, Type }) => ({
                title_L1: Name_L1,
                title_L2: Name_L2,
                title_L3: Name_L3,
                value:
                    ENUM_INPUT_TYPE_MAPPER.MULTIPLE_SELECT === Type ? [] : "",
            }),
        );
        // Additional Services Section
        initialRequestForm.additionalService = [];
        initialRequestForm.documentsId = [];
        initialRequestForm.notes = [];
    }
    const [serviceRequest, setServiceRequest] =
        useState<IRequest>(initialRequestForm);

    useEffect(() => {
        setServiceRequest((currentServiceRequest) => ({
            ...currentServiceRequest,
            documentsId: uploadedFiles.map((uploadedFile) => uploadedFile.Id),
        }));
    }, [setServiceRequest, uploadedFiles]);
    const currentCurrency = useMemo(() => {
        return currencies.find(
            (currency) => currency.id === preferredCurrencyId,
        ) as ICurrency;
    }, [currencies, preferredCurrencyId]);

    const breadcrumbs = [
        <Link
            key="key_1"
            underline="hover"
            sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: 14,
            }}
            color="primary"
            href="#"
        >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {service.Category.Name_L2}
        </Link>,
        <Link
            key="key_2"
            underline="hover"
            sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: 14,
            }}
            color="secondary"
            href="#"
        >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {service.SubCategory.Name_L2}
        </Link>,
    ];
    const hasFormCondition = useMemo(
        () =>
            serviceForm && serviceForm.Fields && serviceForm.Fields.length > 0,
        [serviceForm],
    );

    return (
        <>
            <Container maxWidth="xl">
                <Grid
                    container
                    className="service-details-container"
                    sx={{ mt: 16 }}
                >
                    <Grid item xs={12}>
                        <Breadcrumbs
                            separator="›"
                            aria-label="breadcrumb"
                            className="breadcrumbs"
                        >
                            {breadcrumbs}
                        </Breadcrumbs>
                    </Grid>
                    <Grid item md={9} xs={11} sm={11} sx={{ mt: 2 }}>
                        <Stack spacing={3} direction="column">
                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                                alignContent="center"
                            >
                                <AddShoppingCardIcon color="primary" />
                                <Divider
                                    orientation="vertical"
                                    flexItem
                                    color="primary"
                                />

                                <Stack direction="column" spacing={1}>
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                        alignContent="center"
                                    >
                                        <ArrowLeftIcon />
                                        <Typography variant="h4">
                                            {service.Name_L2}
                                        </Typography>
                                    </Stack>

                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                        alignContent="center"
                                    >
                                        <ArrowLeftIcon />
                                        <Typography variant="subtitle2">
                                            {service.Name_L1}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>

                        <Stack direction="column" spacing={4} sx={{ mt: 4 }}>
                            <Tabs
                                listOfTabs={[
                                    {
                                        icon: <LightbulbOutlinedIcon />,
                                        label: "تفاصيل الخدمة",
                                        element: (
                                            <Typography>
                                                {service.Description_L2}
                                            </Typography>
                                        ),
                                    },
                                ]}
                            />
                        </Stack>
                    </Grid>
                </Grid>

                {serviceForm && serviceForm.Fields.length > 0 && (
                    <Card elevation={24} sx={{ mt: 4 }}>
                        <CardHeader
                            avatar={
                                <ApprovalOutlinedIcon
                                    color="primary"
                                    sx={{ fontWeight: "bold" }}
                                />
                            }
                            title={
                                <Typography
                                    variant="h5"
                                    color="primary"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    {t("add_request")}
                                </Typography>
                            }
                            titleTypographyProps={{
                                fontWeight: "bold",
                                variant: "body1",
                            }}
                            subheader={
                                <Stack direction="row" spacing={0.5}>
                                    <Typography
                                        variant="caption"
                                        color="primary"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        {service.Name_L2}
                                    </Typography>
                                    <Chip
                                        dir="ltr"
                                        label={
                                            serviceForm.Charges.find(
                                                (charge) =>
                                                    charge.CurrencyId ===
                                                    preferredCurrencyId,
                                            )?.Amount +
                                            " " +
                                            currentCurrency.code
                                        }
                                        color="warning"
                                        variant="filled"
                                        size="small"
                                        sx={{ borderRadius: 1 }}
                                        component={Paper}
                                        elevation={5}
                                    />
                                </Stack>
                            }
                            action={
                                <FormControl
                                    fullWidth
                                    sx={{
                                        minWidth: { sm: 100, md: 150, lg: 200 },
                                    }}
                                >
                                    <InputLabel
                                        id="demo-simple-select-label"
                                        color="primary"
                                    >
                                        العملة
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="select-currency-id"
                                        value={preferredCurrencyId}
                                        onChange={(e) =>
                                            setPreferredCurrencyId(
                                                +e.target.value,
                                            )
                                        }
                                        label="العملة"
                                        size="small"
                                    >
                                        {currencies.map((currency) => (
                                            <MenuItem
                                                dir="rtl"
                                                key={currency.id}
                                                value={currency.id}
                                            >
                                                {currency.name_L2}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            }
                        />
                        <CardContent>
                            {serviceForm && (
                                <ServiceForm
                                    serviceForm={serviceForm}
                                    currencies={currencies}
                                    currentCurrency={currentCurrency}
                                    uploadedFiles={uploadedFiles}
                                    setUploadedFiles={setUploadedFiles}
                                    serviceRequest={serviceRequest}
                                    setServiceRequest={setServiceRequest}
                                    perferredCurrencyId={preferredCurrencyId}
                                />
                            )}
                        </CardContent>
                        <Divider sx={{ my: 2 }} />
                        <CardActions sx={{ justifyContent: "center" }}>
                            <Button
                                variant="contained"
                                color="success"
                                startIcon={<SendIcon />}
                                sx={{ borderRadius: 1 }}
                                size="large"
                                onClick={() => setSendDialogOpen(true)}
                                component={Paper}
                                elevation={24}
                            >
                                {t("submit_form")}
                            </Button>
                        </CardActions>
                    </Card>
                )}
            </Container>

            {hasFormCondition && (
                <>
                    <SendRequestDialog
                        open={sendDialogOpen}
                        setOpen={setSendDialogOpen}
                        service={service}
                        serviceForm={serviceForm!}
                        serviceRequest={serviceRequest}
                        preferredCurrencyId={preferredCurrencyId}
                        currentCurrency={currentCurrency}
                        setPaymentMethodOpen={setPaymentDialogOpen}
                    />
                    <PaymentMethodCard
                        open={paymentDialogOpen}
                        setOpen={setPaymentDialogOpen}
                    />
                </>
            )}
        </>
    );
};
