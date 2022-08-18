import { Button, Grid, Avatar, IconButton } from "@mui/material";
import { EInput, ETextarea } from "components/atoms";
import { FC } from "react";
// import { useTranslation } from "react-i18next";

export interface EditProfileProps {}

export const EditProfile: FC<EditProfileProps> = ({ ...props }) => {
  //Hooks
  // const { t } = useTranslation();

  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item sm={12} xs={12}>
        {/* <Avatar
          alt="Remy Sharp"
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=25"
        /> */}

      <input accept="image/*" className="test" id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <Avatar src="https://www.w3schools.com/howto/img_avatar.png" className="test" />
        </IconButton>
      </label>
      </Grid>
     
      <Grid item sm={6} xs={12}>
        <EInput label="الاسم الاول" placeholder="ادخل الاسم الاول" />
      </Grid>
      <Grid item sm={6} xs={12}>
        <EInput label="الاسم الاخير" placeholder="ادخل الاسم الاخير" />
      </Grid>
      <Grid item sm={12} xs={12}>
        <EInput label="البريد الإلكتروني" placeholder="البريد الإلكتروني" />
      </Grid>
      <Grid item sm={12} xs={12}>
        <EInput label="رقم الهاتف" placeholder="ادخل رقم الهاتف" />
      </Grid>
      <Grid item xs={12} sm={12}>
        <ETextarea label="العنوان" placeholder="ادخل العنوان" />
      </Grid>
      {/* <Grid item xs={12}>
        <Button>تأكيد الحساب الالكتروني</Button>
      </Grid> */}
    </Grid>
  );
};
