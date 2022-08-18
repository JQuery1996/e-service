import { BackgroundImage } from "components/atoms";
import { FC } from "react";
import homeImage from "assets/images/home.png";
import { SummaryList } from "components/organisms";
import { useTranslation } from "react-i18next";
import { Container } from "@mui/material";
export interface HomeTempleteProps {}

export const HomeTemplete: FC<HomeTempleteProps> = () => {
  const { t } = useTranslation();
  return (
    <>
      <BackgroundImage src={homeImage} />
      <Container maxWidth="xl">
        <SummaryList title={t("suggested_to_you")} />
        <SummaryList title={t("best_cat") } />
        <SummaryList title={t("suggested_to_you")} />
        <SummaryList title={t("best_cat")} />
      </Container>
    </>
  );
};
