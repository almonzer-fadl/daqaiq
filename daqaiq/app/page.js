import Image from "next/image"; // Import Image component from Next.js
import Header from "./components/Header"; // Import Header component
import Hero from "./components/Hero"; // Import Hero component
import LowerHero from "./components/lower-hero";
import Footer from "./components/footer";

export default function Home() { // Define the Home functional component
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main container with flex layout */}
      <Header /> {/* Render the Header component */}
      <main className="flex-grow">
        {/* Main content area with flex-grow to fill the remaining space */}
        <Hero />
        <LowerHero />
      </main>
      <Footer /> {/* Render the Footer component */}
    </div>
  );
}