import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ToolGrid from "./components/ToolGrid";
import BenefitsBar from "./components/BenefitsBar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ToolGrid />
        <BenefitsBar />
      </main>
      <Footer />
    </div>
  );
}
