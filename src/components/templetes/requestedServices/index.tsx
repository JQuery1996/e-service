import {
    Container,
    Grid,
    Typography,
    Stack,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Divider,
    TableBody,
    Chip,
} from "@mui/material";
import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SettingsSuggest as SettingSuggestIcon } from "@mui/icons-material";
import { IRequestInformation } from "core/types";
import { useAppDispatch } from "app/hooks";
import { useLoader } from "utils/hooks/useLoader";
import ReactAxios from "utils/axios";
import moment from "moment";
import "moment/locale/ar";
import { Loader } from "features/loader/Loader";
import { useNavigate } from "react-router";
import { useAuth } from "utils/hooks/useAuth";

export interface ReqestedServicesTempleteProps {}

const REQUEST_LIST_URL = process.env.REACT_APP_GET_REQUEST_LIST!;
export const ReqestedServicesTemplete: FC<
    ReqestedServicesTempleteProps
> = () => {
    const { t } = useTranslation();
    const [requestList, setRequestList] = useState<IRequestInformation[]>([]);
    const dispatch = useAppDispatch();
    const { isLoading, setLoadingState } = useLoader();
    const navigation = useNavigate();
    const { authenticatedUser } = useAuth();

    useEffect(() => {
        async function fetchRequestList() {
            try {
                dispatch(setLoadingState(true));
                const url =
                    authenticatedUser && authenticatedUser.role === "Admin"
                        ? REQUEST_LIST_URL
                        : `${REQUEST_LIST_URL}/${authenticatedUser?.Id}`;
                const responsedRequestList = await ReactAxios.get(url);
                setRequestList(responsedRequestList.data.Data);
                dispatch(setLoadingState(false));
            } catch (error) {
                dispatch(setLoadingState(false));
                console.log(error);
            }
        }
        fetchRequestList();
    }, [authenticatedUser, dispatch, setLoadingState, setRequestList]);

    return isLoading ? (
        <Loader />
    ) : (
        <Container maxWidth="xl" sx={{ mt: 16 }}>
            <Stack
                direction="row"
                sx={{ justifyContent: "flex-start", gap: 1 }}
            >
                <SettingSuggestIcon sx={{ fontSize: 30 }} color="primary" />
                <Typography variant="h6" fontWeight="bold" color="primary">
                    {"الخدمات المطلوبة"}
                </Typography>
            </Stack>
            <Divider sx={{ my: 3 }} />
            <Grid container sx={{ mt: 4 }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 600 }} aria-label="request-table">
                        <TableHead>
                            <TableRow>
                                <TableCell>رقم الطلب</TableCell>
                                <TableCell>اسم الخدمة</TableCell>
                                <TableCell>رقم الموبايل</TableCell>
                                <TableCell>الإيميل</TableCell>
                                <TableCell>حالة الخدمة</TableCell>
                                <TableCell>تاريخ الإنشاء</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {requestList.map((request) => (
                                <TableRow
                                    key={request.Id}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                        cursor: "pointer",
                                    }}
                                    onDoubleClick={() =>
                                        navigation(
                                            `/service/requested/${request.Id}`,
                                        )
                                    }
                                >
                                    <TableCell component="th" scope="row">
                                        {request.Id}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        color="primary"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        {request.Service.Name_L2}
                                    </TableCell>

                                    <TableCell align="left">
                                        {request.mobileNumber}
                                    </TableCell>

                                    <TableCell align="left">
                                        {request.email}
                                    </TableCell>
                                    <TableCell align="left">
                                        <Chip
                                            // color=""
                                            label={request.status.Name_L2}
                                            size="medium"
                                            sx={{
                                                borderRadius: 1,
                                                fontWeight: "bold",
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        dir="rtl"
                                        sx={{ direction: "rtl" }}
                                    >
                                        {moment(request.CreationDate)
                                            .locale("ar")
                                            .format(
                                                "MMMM Do YYYY -  h:mm:ss a",
                                            )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Container>
    );
};
