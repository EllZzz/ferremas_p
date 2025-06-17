import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

interface CarouselProps {
  slides: Slide[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentIndex
              ? "translate-x-0 z-20"
              : index < currentIndex
              ? "-translate-x-full z-10"
              : "translate-x-full z-10"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-black opacity-50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {slide.title}
            </h2>
            <p className="text-lg md:text-xl mb-6 max-w-md">{slide.description}</p>
            <a
              href={slide.buttonLink}
              className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition-colors text-lg font-medium"
            >
              {slide.buttonText}
            </a>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 !rounded-full -translate-y-1/2 bg-black opacity-30 text-white !p-2 hover:opacity-70 transition-opacity focus:outline-none z-30"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black opacity-30 text-white !p-2 !rounded-full hover:opacity-70 transition-opacity focus:outline-none z-30"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-opacity !p-0 ${
              index === currentIndex
                ? "bg-white opacity-100"
                : "bg-white opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
