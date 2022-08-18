import {
  Grid,
  Stack,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { EInput } from "components/atoms";
import { FC } from "react";
// import { useTranslation } from "react-i18next";
import { FileSelector } from "../fileSelector";

export interface RequestServiceFromProps {}

export const RequestServiceFrom: FC<RequestServiceFromProps> = () => {
  //Hooks
  // const { t } = useTranslation();

  return (
    //TODO Refactor code here
    <>
      <Stack spacing={2} sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={12}>
            <EInput label="الاسم الاول" placeholder="ادخل الاسم الاول" />
          </Grid>
          <Grid item sm={6} xs={12}>
            <EInput label="الاسم الاخير" placeholder="ادخل الاسم الاخير" />
          </Grid>
          <Grid item xs={12}>
            <FileSelector />
          </Grid>
        </Grid>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="ترجمة"
          />
          <FormControlLabel control={<Checkbox />} label="تصديق" />
        </FormGroup>
      </Stack>
    </>
  );
};
