import { Footer } from "@/components/dark-mode-footer-with-contact";
import { ServicesSection } from "@/components/enhanced-services-section";
import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar/>
      <HeroSection/>
      <ServicesSection/>
      <Footer/>
    </>
  );
}
