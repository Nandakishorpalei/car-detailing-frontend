import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

type ImageCarouselComponentProps = { alt: string; images: string[] };

export const ImageCarouselComponent: React.FC<ImageCarouselComponentProps> = ({
  images,
  alt,
}) => {
  return (
    <Carousel autoPlay={false}>
      {images.map((image, index) => (
        <Paper key={index}>
          <img src={image} alt={alt} className="h-full" loading="lazy" />
        </Paper>
      ))}
    </Carousel>
  );
};
