import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock, Heart, Shirt, X } from "lucide-react";

type Person = { name: string; role: string };

function ListModal({
  open,
  onClose,
  title,
  data,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  data: Person[];
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const filtered = data.filter((p) =>
    p.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="w-full max-w-2xl rounded-2xl bg-background p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4 gap-4">
              <div>
                <h3 className="text-lg md:text-xl font-serif font-semibold">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground">{data.length} total</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search name..."
                  className="px-3 py-2 rounded-full border border-border/50 bg-input text-sm outline-none focus:ring-2 focus:ring-primary/40"
                  aria-label={`Search ${title}`}
                />
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="p-2 rounded-md hover:bg-muted/10 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-2">
              {filtered.length === 0 && (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  No results
                </div>
              )}

              {filtered.map((person) => (
                <div
                  key={person.name}
                  className="p-3 rounded-xl gradient-card border border-border/50 shadow-soft"
                >
                  <p className="text-lg font-serif truncate">{person.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{person.role}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const eventDetails = [
  {
    icon: Calendar,
    label: "Date",
    value: "Sunday, December 21, 2025",
    description: "Mark your calendars",
  },
  {
    icon: Clock,
    label: "Time",
    value: "10:00 AM",
    description: "Ceremony begins promptly",
  },
  {
    icon: MapPin,
    label: "Venue",
    value: "St. Francis of Assisi Parish",
    description: "Near Silanga Elementary School",
  },
  {
    icon: Shirt,
    label: "Dress Code",
    value: "Smart Casual",
    description: "Soft pastels encouraged",
  },
];

const godfather: Person[] = [
  { name: "Tristan Timan", role: "Godfather" },
  { name: "Llyhnro Domalaon", role: "Godfather" },
  { name: "Gibson Pornias", role: "Godfather" },
  { name: "John Albert Valles", role: "Godfather" },
  { name: "Daniel Doculan Jr.", role: "Godfather" },
  { name: "Ezyquiel Brynn Tugado", role: "Godfather" },
  { name: "Julius Ivan Philip Reveche", role: "Godfather" },
  { name: "Carl Lawrenz Reveche", role: "Godfather" },
  { name: "Andrian Arididon", role: "Godfather" },
  { name: "Frisco Llever", role: "Godfather" },
  { name: "Jethro Gabin", role: "Godfather" },
  { name: "Rubenson Lim", role: "Godfather" },
  { name: "Bernie Labrague", role: "Godfather" },
  { name: "Panchito Brigildo", role: "Godfather" },
];

const godmother: Person[] = [
  { name: "Jenerose Domincel", role: "Godmother" },
  { name: "Jocel Arbalate", role: "Godmother" },
  { name: "Mica Lejas", role: "Godmother" },
  { name: "Ma. Jessa Laboc", role: "Godmother" },
  { name: "Lizette Cordero", role: "Godmother" },
  { name: "Liezel Tugado", role: "Godmother" },
  { name: "Rialyn Dacuma", role: "Godmother" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const EventDetails = () => {
  const [openGodfathers, setOpenGodfathers] = useState(false);
  const [openGodmothers, setOpenGodmothers] = useState(false);

  const previewCount = 6;

  return (
    <section className="relative py-12 md:py-24 px-4 bg-secondary/50">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3 font-sans">
            Event Information
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-serif font-semibold text-foreground">
            Join Us in Celebration
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="h-px w-12 md:w-16 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="h-px w-12 md:w-16 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </motion.div>

        {/* Event details grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-16"
        >
          {eventDetails.map((detail) => (
            <motion.div key={detail.label} variants={itemVariants} className="group">
              <div className="relative p-4 md:p-6 rounded-2xl gradient-card shadow-card border border-border/50 hover:shadow-float transition-all duration-300">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <detail.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1 font-sans">
                      {detail.label}
                    </p>
                    <p className="text-lg md:text-xl font-serif font-medium text-foreground mb-1">
                      {detail.value}
                    </p>
                    <p className="text-sm text-muted-foreground font-sans">
                      {detail.description}
                    </p>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-radial from-primary/5 to-transparent rounded-bl-[100px]" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Godparents section */}
        <div className="space-y-8">
          {/* Godfathers preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.12 }}
          >
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 mb-3">
                <Heart className="w-4 h-4 text-accent fill-accent" />
                <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-sans">
                  Godfathers
                </p>
                <Heart className="w-4 h-4 text-accent fill-accent" />
              </div>
            </div>

            {/* Mobile: horizontal preview */}
            <div className="md:hidden">
              <div className="flex gap-4 overflow-x-auto py-2 px-2 snap-x snap-mandatory">
                {godfather.slice(0, previewCount).map((p) => (
                  <div
                    key={p.name}
                    className="snap-center min-w-[220px] flex-shrink-0 px-6 py-4 rounded-2xl gradient-card shadow-soft border border-border/50 hover:shadow-float transition-transform transform hover:-translate-y-1"
                  >
                    <div>
                      <p className="text-lg font-serif">{p.name}</p>
                      <span className="inline-block mt-1 text-xs px-2 py-1 rounded-full bg-secondary/60 text-muted-foreground">
                        {p.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex justify-center">
                <button
                  onClick={() => setOpenGodfathers(true)}
                  className="text-sm px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 transition"
                >
                  See all ({godfather.length})
                </button>
              </div>
            </div>

            {/* Desktop: wrapped grid */}
            <div className="hidden md:flex flex-wrap justify-center gap-6 mt-4">
              {godfather.map((p) => (
                <motion.div
                  key={p.name}
                  whileHover={{ scale: 1.03 }}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl gradient-card shadow-soft border border-border/50 hover:shadow-float transition-transform transform hover:-translate-y-1"
                >
                  <div>
                    <p className="text-xl font-serif">{p.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{p.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Godmothers preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.12 }}
          >
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 mb-3">
                <Heart className="w-4 h-4 text-accent fill-accent" />
                <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-sans">
                  Godmothers
                </p>
                <Heart className="w-4 h-4 text-accent fill-accent" />
              </div>
            </div>

            <div className="md:hidden">
              <div className="flex gap-4 overflow-x-auto py-2 px-2 snap-x snap-mandatory">
                {godmother.slice(0, previewCount).map((p) => (
                  <div
                    key={p.name}
                    className="snap-center min-w-[220px] flex-shrink-0 px-6 py-4 rounded-2xl gradient-card shadow-soft border border-border/50 hover:shadow-float transition-transform transform hover:-translate-y-1"
                  >
                    <div>
                      <p className="text-lg font-serif">{p.name}</p>
                      <span className="inline-block mt-1 text-xs px-2 py-1 rounded-full bg-secondary/60 text-muted-foreground">
                        {p.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex justify-center">
                <button
                  onClick={() => setOpenGodmothers(true)}
                  className="text-sm px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 transition"
                >
                  See all ({godmother.length})
                </button>
              </div>
            </div>

            <div className="hidden md:flex flex-wrap justify-center gap-6 mt-4">
              {godmother.map((p) => (
                <motion.div
                  key={p.name}
                  whileHover={{ scale: 1.03 }}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl gradient-card shadow-soft border border-border/50 hover:shadow-float transition-transform transform hover:-translate-y-1"
                >
                  <div>
                    <p className="text-xl font-serif">{p.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{p.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Modals */}
          <ListModal
            open={openGodfathers}
            onClose={() => setOpenGodfathers(false)}
            title="Godfathers"
            data={godfather}
          />

          <ListModal
            open={openGodmothers}
            onClose={() => setOpenGodmothers(false)}
            title="Godmothers"
            data={godmother}
          />
        </div>
      </div>
    </section>
  );
};

export default EventDetails;