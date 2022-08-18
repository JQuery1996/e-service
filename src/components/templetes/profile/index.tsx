import { Container, Grid, Stack, Typography } from "@mui/material";
import { EditPassword, EditProfile } from "components/molecules";
import { FC } from "react";
import { useTranslation } from "react-i18next";
export interface ProfileTempleteProps {}

export const ProfileTemplete: FC<ProfileTempleteProps> = () => {
  const { t } = useTranslation();
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <Stack direction={"column"}>
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              sx={{ mb: 2 }}
            >
              {t("my_account")}
            </Typography>
            <EditProfile />
            <EditPassword />
          </Stack>
        </Grid>
        <Grid item md={6} xs={12}>
          {/* <Avatar></Avatar> */}
        </Grid>
      </Grid>
    </Container>
  );
};
