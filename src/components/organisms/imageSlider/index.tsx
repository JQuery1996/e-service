import { Container } from "@mui/material";
import { Slider } from "../../molecules/slider";
import homeImage from "assets/images/home.png";

export function ImageSlider() {
    return (
        <Container maxWidth="lg" sx={{ p: 4, borderRadius: 3 }}>
            <Slider slides={[homeImage, homeImage, homeImage]} rtl />
        </Container>
    );
}
