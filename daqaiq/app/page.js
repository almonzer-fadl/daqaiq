import Image from "next/image";
import Hero from "./components/Hero/Hero";
import Footer from "./components/footer";
import Servicessection from "./components/servicessection/servicessection";
import Categories from "./components/categories/categories";
import Headertop from "./components/headertop";
import Navbar from "./components/navbar";
import Navlinks from "./components/navlinks";
import styles from './page.module.css'; // Import a CSS module for custom styles

export default function Home() {
  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Headertop />
      <Navbar />
      <Navlinks />
      <main className={`flex-grow ${styles.mainContent}`}>
        <div className={styles.contentContainer}>
          <Hero />
          <Categories />
          <Servicessection />
        </div>
      </main>
      <Footer />
    </div>
  );
}