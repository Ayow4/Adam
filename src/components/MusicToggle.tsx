import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const MusicToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element. Place a file at public/music/lullaby.mp3
    // or change the path below to a valid URL/imported asset.
    const audio = new Audio("/music/lullaby.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audio.addEventListener("error", () => {
      console.warn(
        "MusicToggle: failed to load audio from /music/lullaby.mp3. Add a file at public/music/lullaby.mp3 or update the path."
      );
    });
    audioRef.current = audio;

    // Hide tooltip after 3 seconds
    const timer = setTimeout(() => setShowTooltip(false), 3000);

    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) {
      setShowTooltip(true);
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setShowTooltip(false);
      return;
    }

    // Play returns a promise; update state only on success
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        setShowTooltip(false);
      })
      .catch((err) => {
        console.error("MusicToggle: play() failed", err);
        setShowTooltip(true);
      });
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
