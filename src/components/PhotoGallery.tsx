import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import baby1 from "@/assets/baby-1.jpg";
import baby2 from "@/assets/baby-2.jpg";
import baby3 from "@/assets/baby-3.jpg";

const photos = [baby1, baby2, baby3];

const PhotoGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Decorative frame */}
      <div className="relative">
        {/* Outer glow */}
        <div className="absolute -inset-4 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-2xl" />
        
        {/* Frame border */}
        <div className="relative p-3 bg-gradient-to-br from-gold-light via-cream to-rose-gold-light rounded-3xl shadow-float">
          <div className="p-2 bg-card rounded-2xl shadow-inner">
            {/* Photo container */}
            <div className="relative aspect-square overflow-hidden rounded-xl bg-cream">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.img
                  key={currentIndex}
                  src={photos[currentIndex]}
                  alt={`Baby Matteo Adam - Photo ${currentIndex + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.4 },
                  }}
                />
              </AnimatePresence>
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:scale-110 transition-all duration-300"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:scale-110 transition-all duration-300"
          aria-label="Next photo"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-6 bg-primary"
                : "bg-primary/30 hover:bg-primary/50"
            }`}
            aria-label={`Go to photo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
