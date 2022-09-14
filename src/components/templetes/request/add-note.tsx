import { Dispatch, SetStateAction, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ReactAxios from "utils/axios";
import { useAppDispatch } from "app/hooks";
import { useLoader } from "utils/hooks/useLoader";
import { useAuth } from "utils/hooks/useAuth";
import { IFullRequestInformation } from "core/types";
import { notify } from "utils/toastify-notification";
import { Loader } from "features/loader/Loader";
const ADD_NOTE_URL = process.env.REACT_APP_ADD_NOTE!;

export function AddNote({
    requestId,
    setRequest,
}: {
    requestId: number;
    setRequest: Dispatch<SetStateAction<IFullRequestInformation | null>>;
}) {
    const [note, setNote] = useState<string>("");
    const dispatch = useAppDispatch();
    const { isLoading, setLoadingState } = useLoader();
    const { authenticatedUser } = useAuth();

    const { t } = useTranslation();

    async function handleAddNewNote() {
        try {
            dispatch(setLoadingState(true));
            const addedNote: any = {
                IsAdmin: authenticatedUser
                    ? authenticatedUser.role === "Admin"
                    : false,
                AdminName:
                    authenticatedUser?.role === "Admin"
                        ? authenticatedUser?.username
                        : "",
                Notes: [
                    {
                        Note: note,
                        IsAdminNote: authenticatedUser?.role === "Admin",
                    },
                ],
            };

            await ReactAxios.post(ADD_NOTE_URL + `/${requestId}`, addedNote);

            setRequest((currentRequest) => ({
                ...currentRequest!,
                Notes: [
                    {
                        Note: note,
                        IsAdminNote: addedNote.IsAdmin,
                        AdminName: addedNote.AdminName,
                        CreationDate: new Date(),
                    },
                    ...currentRequest!.Notes,
                ],
            }));

            setNote("");
            notify("success", t("added_note_success"));
            dispatch(setLoadingState(false));
        } catch (error) {
            dispatch(setLoadingState(false));
            notify("error", t("added_note_failed"));
            console.log(error);
        }
    }
    return (
        <>
            {isLoading && <Loader />}
            <Grid container maxWidth="lg" sx={{ mt: 2 }} spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={9}>
                    <TextField
                        multiline
                        fullWidth
                        label={
                            <Typography color="primary">
                                إضافة ملاحظة
                            </Typography>
                        }
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={2}
                    sx={{
                        justifyContent: { xs: "center", sm: "center" },
                        alignItems: { xs: "center", sm: "center" },
                        alignContent: { xs: "center", sm: "center" },
                        display: { xs: "flex", sm: "flex" },
                    }}
                >
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleAddNewNote}
                        sx={{ borderRadius: 1, height: 55 }}
                        size="large"
                    >
                        {t("send")}
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
