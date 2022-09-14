import { Box, Button } from "@mui/material";
import { INote } from "core/types";
import { Note } from "../note";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

const MINIMUM_NUMBER_OF_NOTES_TO_SHOW = 3;

export function Notes({ notes, email }: { notes: INote[]; email: string }) {
    const { t } = useTranslation();
    const [showMore, setShowMore] = useState<boolean>(true);

    const sortedNotes = useMemo(
        () =>
            notes.sort(
                (aNote, bNote) =>
                    new Date(bNote.CreationDate).getTime() -
                    new Date(aNote.CreationDate).getTime(),
            ),
        [notes],
    );
    const minifiedNotes = sortedNotes.slice(
        0,
        Math.min(sortedNotes.length, MINIMUM_NUMBER_OF_NOTES_TO_SHOW),
    );

    const viewedNotes = useMemo(
        () => (showMore ? minifiedNotes : sortedNotes),
        [minifiedNotes, showMore, sortedNotes],
    );

    return (
        <>
            {viewedNotes.map((note, index) => (
                <Note {...note} email={email} key={index} />
            ))}

            {viewedNotes.length > 0 && (
                <Box
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                        display: "flex",
                    }}
                >
                    {sortedNotes.length > MINIMUM_NUMBER_OF_NOTES_TO_SHOW && (
                        <Button
                            color="error"
                            variant="text"
                            size="large"
                            onClick={(_) =>
                                setShowMore((currentState) => !currentState)
                            }
                            sx={{ borderRadius: 1, fontWeight: "bold" }}
                        >
                            {showMore ? t("show_more") : t("show_less")} ...
                        </Button>
                    )}
                </Box>
            )}
        </>
    );
}
