"use client";
import "../../Style/Carousel.css";
import "swiper/css"; // Import core Swiper styles
import "swiper/css/autoplay"; // Import autoplay styles
import "swiper/css/navigation"; // Import navigation styles
import "swiper/css/pagination"; // Import pagination styles
import Image from "next/image";
import donut1 from "../../../public/donut1.jpg";
import donut2 from "../../../public/donut2.jpg";
import donut3 from "../../../public/donut33.jpg";
import { register } from "swiper/element/bundle";

register();

export default function SwiperCarousel() {
  return (
    <div id="carousel-container">
      <swiper-container
        slidesPerView={1}
        pagination="true"
        pagination-clickable="true"
        navigation="true"
        space-between="30"
        centered-slides="true"
        autoplay-delay="5000"
        autoplay-disable-on-interaction="false"
        effect="fade" // Use fade effect
        fadeEffect={{ crossFade: true }} // Optional: Enable crossfade
        mousewheel-force-to-axis="true"
      >
        <swiper-slide>
          <Image src={donut1} alt="Slide 1" layout="responsive" />
        </swiper-slide>
        <swiper-slide>
          <Image src={donut2} alt="Slide 2" layout="responsive" />
        </swiper-slide>
        <swiper-slide>
          <Image src={donut3} alt="Slide 3" layout="responsive" />
        </swiper-slide>
      </swiper-container>
    </div>
  );
}
