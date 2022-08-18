import { ImageList, ImageListItem, Stack, Typography } from "@mui/material";
import { Image } from "core/types";
import { FC } from "react";
export interface GalleryProps {
  images: Image[];
  title?: string;
}

export const Gallery: FC<GalleryProps> = ({ images, title }) => {
  //Hooks

  return (
    <Stack spacing={1}>
      <Typography variant="h6" color="primary">
        {title}
      </Typography>
      <ImageList sx={{ width: "100%", height: 450 }} cols={3} rowHeight={100}>
        {images.map((item, index) => (
          <ImageListItem key={index}>
            <img
              src={`${item.image}?w=100&h=100&fit=crop&auto=format`}
              srcSet={`${item.image}?w=100&h=100&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title ?? ""}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Stack>
  );
};
