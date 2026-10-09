import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// A local video file inside a slide.
const VideoSlide = ({ src, videoType = "video/mp4" }) => (
  <video className="carousel-media" controls preload="metadata" playsInline>
    <source src={src} type={videoType} />
    Your browser does not support the video tag.
  </video>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

// Image/video carousel for project pages.
// slides: [{ src, caption, type?: "video", videoType? }]
// width: max width in px. The frame keeps a 3:2 ratio; media is letterboxed, not cropped.
export default function MyCarousel({ slides = [], width = 900, autoPlay = false }) {
  const [current, setCurrent] = React.useState(0);
  const caption = slides[current]?.caption;

  return (
    <div className="project-carousel" style={{ maxWidth: `${width}px` }}>
      <Carousel
        showArrows
        showStatus={false}
        showIndicators={false}
        showThumbs={slides.length > 1}
        infiniteLoop
        useKeyboardArrows
        autoPlay={autoPlay}
        thumbWidth={72}
        onChange={setCurrent}
        renderThumbs={() =>
          slides.map((slide, idx) => (
            <div key={idx} className="project-carousel__thumb">
              {slide.type === "video" ? <PlayIcon /> : <img src={slide.src} alt="" />}
            </div>
          ))
        }
      >
        {slides.map((slide, idx) => (
          <div key={idx} className="project-carousel__slide">
            {slide.type === "video" ? (
              <VideoSlide {...slide} />
            ) : (
              <img className="carousel-media" src={slide.src} alt={slide.caption || `Slide ${idx + 1}`} />
            )}
          </div>
        ))}
      </Carousel>
      {(caption || slides.length > 1) && (
        <p className="caption">
          {slides.length > 1 && (
            <span className="project-carousel__count">{current + 1}/{slides.length}</span>
          )}
          {caption}
        </p>
      )}
    </div>
  );
}