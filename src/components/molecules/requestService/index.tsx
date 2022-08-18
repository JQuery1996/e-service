import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  RadioGroup,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as bag } from "assets/images/bag.svg";
import useBoolean from "utils/hooks/useBoolean";
import { EDialog } from "../dialog";
import { RequestServiceFrom } from "./Form";
import Radio from "@mui/material/Radio";

export interface RequestServiceProps {
  price: number;
  currency: string;
}

export const RequestService: FC<RequestServiceProps> = ({
  price,
  currency,
}) => {
  //Hooks
  const { t } = useTranslation();
  const { toggle, value: open } = useBoolean();
  const { toggle: togglePayment, value: openPayment } = useBoolean();

  return (
    <>
      <EDialog
        title={t("fill_in_your_details")}
        subtitle={t("sure_complete")}
        open={open}
        onClose={toggle}
        toggle={toggle}
      >
        <RequestServiceFrom />
        <Grid container justifyContent={"end"}>
          <Button
            onClick={() => {
              toggle();
              togglePayment();
            }}
          >
            {t("next")}
          </Button>
        </Grid>
      </EDialog>

      <EDialog
        title={t("choose_payment_method")}
        open={openPayment}
        onClose={togglePayment}
        toggle={togglePayment}
      >
        <FormControl fullWidth>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="credit"
              control={<Radio />}
              label="Credit card"
            />
            <Divider />
            <FormControlLabel
              value="fatora"
              control={<Radio />}
              label="فاتورة"
            />
          </RadioGroup>
        </FormControl>
        <Grid container justifyContent={"end"}>
          <Button onClick={togglePayment}>{t("next")}</Button>
        </Grid>
      </EDialog>

      <Stack spacing={3} direction="row" alignItems="center">
        <Button
          onClick={toggle}
          startIcon={<SvgIcon component={bag} inheritViewBox />}
        >
          {t("request_service")}
        </Button>
        <Typography>/</Typography>
        <Typography>{`${price}${currency}`}</Typography>
      </Stack>
    </>
  );
};
