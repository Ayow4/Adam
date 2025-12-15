import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Send, User, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

const RSVPSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Please fill in all fields",
        description: "Name and email are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "RSVP Received!",
      description: formData.attending 
        ? "We're excited to celebrate with you!" 
        : "We'll miss you, but thank you for letting us know.",
    });
  };

  return (
    <section className="relative py-24 px-4 gradient-hero">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-10 w-24 h-24 rounded-full bg-primary/10 blur-2xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-accent/10 blur-2xl"
          animate={{ scale: [1.3, 1, 1.3], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3 font-sans">
            Kindly Respond
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-semibold text-foreground">
            RSVP
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="p-8 md:p-10 rounded-3xl gradient-card shadow-float border border-border/50">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Name field */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground font-sans flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-12 rounded-xl border-border/50 bg-background/50 focus:border-primary focus:ring-primary/20"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-sans flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-12 rounded-xl border-border/50 bg-background/50 focus:border-primary focus:ring-primary/20"
                    />
                  </div>

                  {/* Attendance toggle */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border/30">
                    <div>
                      <p className="font-medium text-foreground font-sans">Will you attend?</p>
                      <p className="text-sm text-muted-foreground font-sans">
                        {formData.attending ? "Yes, I'll be there!" : "Sorry, I can't make it"}
                      </p>
                    </div>
                    <Switch
                      checked={formData.attending}
                      onCheckedChange={(checked) => setFormData({ ...formData, attending: checked })}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 rounded-xl gradient-accent text-primary-foreground font-sans font-medium text-base shadow-soft hover:shadow-card transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      />
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send RSVP
                      </>
                    )}
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full gradient-accent flex items-center justify-center shadow-glow"
                  >
                    <Check className="w-10 h-10 text-primary-foreground" />
                  </motion.div>
                  <h3 className="text-2xl font-serif font-semibold text-foreground mb-2">
                    Thank You!
                  </h3>
                  <p className="text-muted-foreground font-sans">
                    Your RSVP has been received. We look forward to celebrating with you!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Decorative corners */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-primary/30 rounded-tl-xl" />
          <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-xl" />
          <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-primary/30 rounded-bl-xl" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-primary/30 rounded-br-xl" />
        </motion.div>
      </div>
    </section>
  );
};

export default RSVPSection;
