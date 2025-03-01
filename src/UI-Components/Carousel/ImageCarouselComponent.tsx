import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

type ImageCarouselComponentProps = { alt: string; images: string[] };

export const ImageCarouselComponent: React.FC<ImageCarouselComponentProps> = ({
  images,
  alt,
}) => {
  return (
    <>
      <div className="block sm:hidden">
        <Carousel autoPlay={false} indicators height={360}>
          {images.map((image, index) => (
            <Paper
              key={index}
              className="h-full flex items-center justify-center"
            >
              <img
                src={image}
                alt={alt}
                className="h-full max-w-full object-cover"
                loading="lazy"
              />
            </Paper>
          ))}
        </Carousel>
      </div>
      <div className="hidden sm:block">
        <Carousel autoPlay={false} indicators height={200}>
          {images.map((image, index) => (
            <Paper
              key={index}
              className="h-full flex items-center justify-center"
            >
              <img
                src={image}
                alt={alt}
                className="h-full max-w-full object-cover"
                loading="lazy"
              />
            </Paper>
          ))}
        </Carousel>
      </div>
    </>
  );
};
