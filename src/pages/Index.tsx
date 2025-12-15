import { Helmet } from "react-helmet-async";
import FloatingParticles from "@/components/FloatingParticles";
import HeroSection from "@/components/HeroSection";
import EventDetails from "@/components/EventDetails";
import RSVPSection from "@/components/RSVPSection";
import MusicToggle from "@/components/MusicToggle";
import ShareButton from "@/components/ShareButton";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Matteo Adam's Christening Celebration</title>
        <meta 
          name="description" 
          content="You are cordially invited to celebrate the christening of Matteo Adam. Join us for this special blessing ceremony." 
        />
        <meta property="og:title" content="Matteo Adam's Christening Celebration" />
        <meta property="og:description" content="You are cordially invited to celebrate the christening of Matteo Adam." />
        <meta property="og:type" content="website" />
      </Helmet>

      <main className="relative min-h-screen overflow-x-hidden">
        {/* Background particles */}
        <FloatingParticles />
        
        {/* Main content */}
        <HeroSection />
        <EventDetails />
        {/* <RSVPSection /> */}
        <Footer />

        {/* Floating controls */}
        <MusicToggle />
        <ShareButton />
      </main>
    </>
  );
};

export default Index;
