import { default as SlickSlider } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { Settings } from "react-slick";
import { BackgroundImage } from "components/atoms";

const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <></>,
    prevArrow: <></>,
};

export interface ISlider extends Settings {
    slides: string[];
}

export function Slider({ slides, ...props }: ISlider) {
    return (
        <SlickSlider {...settings} {...props}>
            {slides.map((slide, index) => (
                <BackgroundImage key={index} src={slide} />
            ))}
        </SlickSlider>
    );
}
