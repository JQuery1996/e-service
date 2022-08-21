import { styled } from "@mui/material/styles";
import { memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export interface BackgroundImageProps {}

export const BackgroundImage = memo(
    styled(LazyLoadImage)<BackgroundImageProps>(() => ({
        backgroundRepeat: "no-repeat, repeat",
        width: "100%",
        height: "300px",
        borderRadius: "10px",
    })),
);
