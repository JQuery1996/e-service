import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
  Divider
} from "@mui/material";
import { Box} from "@mui/system";
import { StartRate } from "components/atoms";
import { FC } from "react";
import { useNavigate } from "react-router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useTranslation } from "react-i18next";

export interface ServiceCardProps {
  rate?: string;
  price?: string;
  time?: string;
}

export const ServiceCard: FC<ServiceCardProps> = ({ rate, price, time }) => {
  //Hooks
  const navigation = useNavigate();
  const { t } = useTranslation();

  const onClickCard = () => {
    navigation("/service/5");
  };
  return (
    <Card>
      <CardActionArea onClick={onClickCard}>
        <LazyLoadImage
          height="140"
          src="https://picsum.photos/300"
          alt="green iguana"
          effect="opacity"
          style={{
            display: "block",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "100%",
            objectFit: "cover",
          }}
        />

        <CardContent sx={{ py: 1 }}>
          <Stack
            direction="row"
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <Typography variant="subtitle1" sx={{mb:2}} fontWeight="bold">اسم الخدمة</Typography>
              <Typography variant="subtitle2" className="gray-color" sx={{mb:1}}>الفئة</Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              {rate && <StartRate rate="4.8" />}
              {time && (
                <Box>
                  <Typography variant="subtitle1" color="primary">
                    {" "}
                    قيد التنفيذ
                  </Typography>
                  <Typography variant="subtitle1"> {time}</Typography>
                </Box>
              )}
            </Stack>           
          </Stack>
            <Box>
              {/* {price && <Chip label={price} color="primary" />} */}
              <Divider />
              <div className="service-price-conteiner">
                <Typography className="gray-color" variant="subtitle2">{t("price")}</Typography>
                <Typography className="bule-color" fontWeight="bold" variant="subtitle2">{price}</Typography>
              </div>
            </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
