import Image from "next/image"; // Import Image component from Next.js
import Header from "./components/Header"; // Import Header component
import Hero from "./components/Hero"; // Import Hero component
import LowerHero from "./components/lower-hero";

export default function Home() { // Define the Home functional component
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Main container with grid layout */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Main content area with flexbox layout */}
        
        <Header /> {/* Render the Header component */}
        <Hero />
        <LowerHero/>
      </main>
    </div>
  );
}