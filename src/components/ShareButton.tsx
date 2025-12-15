import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Check, Link, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ShareButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: "Matteo Adam's Christening Celebration",
      text: "You're invited to celebrate the christening of Matteo Adam!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast({
        title: "Link Copied!",
        description: "The invitation link has been copied to your clipboard.",
      });
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.7, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-50"
    >
      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full mb-3 right-0"
          >
            <div className="p-2 rounded-xl bg-card shadow-float border border-border/50 min-w-[180px]">
              <button
                onClick={copyLink}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary/50 transition-colors text-left"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-primary" />
                ) : (
                  <Copy className="w-4 h-4 text-muted-foreground" />
                )}
                <span className="text-sm font-sans text-foreground">
                  {copied ? "Copied!" : "Copy link"}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        onClick={handleShare}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full bg-card shadow-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-300 border border-border/50"
        aria-label="Share invitation"
      >
        <Share2 className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
};

export default ShareButton;
