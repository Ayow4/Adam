import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-16 px-4 bg-secondary/30 border-t border-border/30">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative element */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/30" />
            <Heart className="w-4 h-4 text-accent fill-accent" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/30" />
          </div>

          {/* Quote
          <p className="text-lg font-serif italic text-foreground/80 mb-4">
            "For this child I prayed, and the Lord has granted me what I asked of Him."
          </p>
          <p className="text-sm text-muted-foreground font-sans mb-8">
            — 1 Samuel 1:27
          </p> */}

          {/* Thank you message */}
          <p className="text-muted-foreground font-sans text-sm">
            With love and gratitude,
          </p>
          <p className="text-lg font-serif font-medium text-foreground mt-1">
            The Family of Matteo Adam
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
