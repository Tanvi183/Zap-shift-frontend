import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";

const Banner = () => {
  const slides = [
    { id: 1, src: bannerImg1, alt: "Banner slide 1" },
    { id: 2, src: bannerImg2, alt: "Banner slide 2" },
    { id: 3, src: bannerImg3, alt: "Banner slide 3" },
  ];

  return (
    <div className="banner-carousel">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        interval={4000}
        swipeable
        emulateTouch
        stopOnHover={false}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="banner-slide">
            <img src={slide.src} alt={slide.alt} className="banner-image" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
