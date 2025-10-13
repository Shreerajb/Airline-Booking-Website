import React from "react";
import { Carousel } from "react-bootstrap";
const Herocarousel: React.FC = () => {
  const slides: {
    url: string;
    caption: string;
  }[] = [
    { url: "/Images/akasa_air_aircraft (1).jpg", caption: "Aircraft 1" },
    { url: "/Images/akasa3.jpg", caption: "Aircraft 2" },
    {url: "/Images/akasaair.jpg", caption: "Aircraft 3"}
  ];
  return (
    <Carousel
      id="carouselExampleIndicators"
      className="carousel slide"  
      data-bs-ride="carousel"

    >
     {slides.map((slide, index) => (
        <Carousel.Item
          className={`carousel-item ${index === 0 ? "active" : ""}`}
        >
          <img src={slide.url} className="d-block w-100" style={{ height:"400px", objectFit: "cover"}} alt="..." />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
export default Herocarousel;
