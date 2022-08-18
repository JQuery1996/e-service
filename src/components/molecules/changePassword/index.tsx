import { Button, Grid } from "@mui/material";
import { EInput } from "components/atoms";
import { FC } from "react";
// import { useTranslation } from "react-i18next";

export interface EditPasswordProps {}

export const EditPassword: FC<EditPasswordProps> = ({ ...props }) => {
  //Hooks
  // const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid item sm={6} xs={12}>
        <EInput label="كلمة السر القديمة" placeholder="كلمة السر القديمة" />
      </Grid>
      <Grid item sm={6} xs={12}>
        <EInput label="كلمة السر الجديدة" placeholder="كلمة السر الجديدة" />
      </Grid>

      <Grid item xs={12}>
        <Button>تغيير كلمة السر</Button>
      </Grid>
    </Grid>
  );
};
