import {
    Paper,
    Container,
    Pagination as MaterialPagination,
    PaginationItem,
} from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import {
    KeyboardDoubleArrowLeft as KeyboardDoubleArrowLeftIcon,
    KeyboardDoubleArrowRight as KeyboardDoubleArrowRightIcon,
} from "@mui/icons-material";

export function Pagination({
    currentPage,
    setCurrentPage,
    totalCount,
}: {
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    totalCount: number;
}) {
    function handleChangePage(event: ChangeEvent<unknown>, value: number) {
        setCurrentPage(value);
    }
    return (
        <Container
            fixed
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                mt: 6,
                bgcolor: "primary",
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    bgcolor: "background.default",
                    p: 2,
                }}
                variant="elevation"
            >
                <MaterialPagination
                    count={Math.ceil(
                        totalCount / +process.env.REACT_APP_PER_PAGE!,
                    )}
                    variant="text"
                    shape="rounded"
                    size="large"
                    color="primary"
                    dir="ltr"
                    page={currentPage}
                    onChange={handleChangePage}
                    renderItem={(item) => (
                        <PaginationItem
                            components={{
                                first: KeyboardDoubleArrowLeftIcon,
                                last: KeyboardDoubleArrowRightIcon,
                            }}
                            {...item}
                        />
                    )}
                    showFirstButton
                    showLastButton
                    style={{ fontWeight: "bold" }}
                />
            </Paper>
        </Container>
    );
}
