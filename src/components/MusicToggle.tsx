import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const MusicToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element with a royalty-free lullaby/soft music
    // Using a placeholder - you can replace with your own music URL
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    // Hide tooltip after 3 seconds
    const timer = setTimeout(() => setShowTooltip(false), 3000);
    
    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Note: Audio won't play without a valid source
        // Replace the src with your actual music file
        audioRef.current.play().catch(() => {
          // Audio autoplay was prevented
        });
      }
      setIsPlaying(!isPlaying);
    }
    setShowTooltip(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="fixed bottom-6 left-6 z-50"
    >
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap"
          >
            <div className="px-3 py-1.5 rounded-lg bg-card shadow-soft border border-border/50 text-sm text-foreground font-sans">
              Play music
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`w-12 h-12 rounded-full shadow-card flex items-center justify-center transition-all duration-300 ${
          isPlaying 
            ? "gradient-accent text-primary-foreground" 
            : "bg-card text-muted-foreground hover:text-foreground border border-border/50"
        }`}
        aria-label={isPlaying ? "Mute music" : "Play music"}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
        
        {/* Sound waves animation */}
        {isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-full h-full rounded-full border border-primary-foreground/30"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.5 + i * 0.3, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )}
      </motion.button>
    </motion.div>
  );
};

export default MusicToggle;
