import { IDocumentType, IFullRequestInformation } from "core/types";
import {
    Container,
    Card,
    CardHeader,
    Typography,
    Stack,
    Chip,
    CardContent,
    Grid,
    Divider,
    TextField,
    CircularProgress,
} from "@mui/material";
import {
    Label as LabelIcon,
    AccessTime as AccessTimeIcon,
    ChevronLeft as ChevronLeftIcon,
    EmailOutlined as EmailOutlinedIcon,
    LocalPhoneOutlined as LocalPhoneOutlinedIcon,
} from "@mui/icons-material";
import moment from "moment";
import "moment/locale/ar";
import { FileCard, Notes } from "components/atoms";
import { AddNote } from "./add-note";
import { Dispatch, SetStateAction } from "react";

export function RequestTemplate({
    request,
    setRequest,
    documentTypeList,
}: {
    request: IFullRequestInformation;
    setRequest: Dispatch<SetStateAction<IFullRequestInformation | null>>;
    documentTypeList: IDocumentType[];
}) {
    return (
        <Container sx={{ mt: 16 }}>
            <Card>
                <CardHeader
                    title={
                        <Stack direction="row" spacing={1}>
                            <LabelIcon
                                color="primary"
                                fontSize="large"
                                sx={{ transform: "rotate(180deg)" }}
                            />
                            <Typography
                                color="error"
                                variant="h6"
                                sx={{ fontWeight: "bold" }}
                            >
                                طلب
                            </Typography>{" "}
                            <Typography
                                variant="h6"
                                color="primary"
                                sx={{ fontWeight: "bold" }}
                            >
                                {request.service.Name_L2}
                            </Typography>
                        </Stack>
                    }
                    subheader={
                        <Stack direction="row" spacing={1} sx={{ mx: 5 }}>
                            <AccessTimeIcon fontSize="small" />
                            <Typography variant="caption">
                                {moment(request.CreationDate)
                                    .locale("ar")
                                    .format("MMMM Do YYYY - h:mm:ss a")}
                            </Typography>
                        </Stack>
                    }
                    action={
                        <Chip
                            // label={`الخدمة ${request.requestStatus.Name_L2}`}
                            label={
                                <Stack direction="row" spacing={2}>
                                    <CircularProgress
                                        size="1.2rem"
                                        color="inherit"
                                    />
                                    <Typography variant="body2">
                                        الخدمة {request.requestStatus.Name_L2}
                                    </Typography>
                                </Stack>
                            }
                            size="medium"
                            sx={{ borderRadius: 1, fontWeight: "bold" }}
                        />
                    }
                />
                <CardContent>
                    <Divider
                        textAlign="left"
                        sx={{ mt: 2, mb: 2, fontWeight: "bold" }}
                    >
                        تفاصيل الخدمة
                    </Divider>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={4} sx={{ my: 2 }}>
                            <Stack direction="row" spacing={1}>
                                <ChevronLeftIcon />
                                <Typography>اسم الخدمه (العربي) : </Typography>
                                <Typography
                                    sx={{ fontWeight: "bold" }}
                                    color="primary"
                                >
                                    {request.service.Name_L2}
                                </Typography>
                            </Stack>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={4} sx={{ my: 2 }}>
                            <Stack direction="row" spacing={1}>
                                <ChevronLeftIcon />
                                <Typography>اسم الخدمه (الأجنبي) : </Typography>
                                <Typography
                                    sx={{ fontWeight: "bold" }}
                                    color="primary"
                                >
                                    {request.service.Name_L1}
                                </Typography>
                            </Stack>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={4} sx={{ my: 2 }}>
                            <Stack direction="row" spacing={1}>
                                <ChevronLeftIcon />
                                <Typography>اسم الخدمه (الفرنسي) : </Typography>
                                <Typography
                                    sx={{ fontWeight: "bold" }}
                                    color="primary"
                                >
                                    {request.service.Name_L3}
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>

                    <Divider
                        textAlign="left"
                        sx={{ mt: 2, fontWeight: "bold" }}
                    >
                        تفاصيل طالب الخدمة
                    </Divider>
                    <Grid container sx={{ mt: 2 }}>
                        <Grid item xs={12} sm={12} md={6} lg={4} sx={{ my: 2 }}>
                            <Stack direction="row" spacing={1}>
                                <EmailOutlinedIcon color="primary" />
                                <Typography>الإيميل : </Typography>
                                <Typography
                                    sx={{ fontWeight: "bold" }}
                                    color="primary"
                                >
                                    {request.email}
                                </Typography>
                            </Stack>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={4} sx={{ my: 2 }}>
                            <Stack direction="row" spacing={1}>
                                <LocalPhoneOutlinedIcon color="primary" />
                                <Typography>الموبايل : </Typography>
                                <Typography
                                    sx={{ fontWeight: "bold" }}
                                    color="primary"
                                >
                                    {request.mobileNumber}
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>

                    <Divider
                        textAlign="left"
                        sx={{ mt: 2, fontWeight: "bold" }}
                    >
                        معلومات الطلب
                    </Divider>
                    <Grid container sx={{ mt: 2 }} spacing={2}>
                        {request.requestRecord.Fields.map((Field, index) => (
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                lg={4}
                                sx={{ my: 2 }}
                                key={index}
                            >
                                <TextField
                                    fullWidth
                                    label={
                                        <Typography
                                            color="primary"
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            {Field.title_L2}
                                        </Typography>
                                    }
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    defaultValue={Field.value}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    <Divider
                        textAlign="left"
                        sx={{ mt: 2, fontWeight: "bold" }}
                    >
                        الخدمات الإضافية
                    </Divider>
                    <Stack direction="row" spacing={2} sx={{ mt: 4, mx: 2 }}>
                        {request.requestRecord.AdditionalServices.map(
                            (aS, index) => (
                                <Chip
                                    key={index}
                                    label={aS.Name_L2}
                                    color="error"
                                    size="medium"
                                    sx={{
                                        fontWeight: "bold",
                                        borderRadius: 2,
                                        fontSize: 15,
                                    }}
                                />
                            ),
                        )}
                    </Stack>

                    <Divider
                        textAlign="left"
                        sx={{ mt: 2, fontWeight: "bold" }}
                    >
                        الملفات المرفوعة
                    </Divider>
                    <Stack direction="row" spacing={4} sx={{ mt: 4, mx: 2 }}>
                        {request.documents.map((document, index) => (
                            <FileCard
                                key={index}
                                url={document.url}
                                document={
                                    documentTypeList.find(
                                        ({ Id }) =>
                                            Id === document.DocumentType,
                                    )!
                                }
                                creationTimeStamp={document.creationTimeStamp}
                            />
                        ))}
                    </Stack>
                </CardContent>

                <CardContent>
                    <Divider
                        textAlign="left"
                        sx={{ mt: 2, fontWeight: "bold" }}
                    >
                        الملاحظات
                    </Divider>

                    <Notes notes={request.Notes} email={request.email} />
                    <AddNote requestId={request.id} setRequest={setRequest} />
                </CardContent>
            </Card>
        </Container>
    );
}
