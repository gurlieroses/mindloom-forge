import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ExamplesShowcase from "@/components/ExamplesShowcase";
import CTASection from "@/components/CTASection";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <ExamplesShowcase />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
