import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import TrustedBrands from "@/components/TrustedBrands";
import CameraProducts from "@/components/CameraProducts";
import Gallery from "@/components/Gallery";
import Features from "@/components/Features";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Services />
      <TrustedBrands />
      <CameraProducts />
      <Gallery />
      <Features />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
