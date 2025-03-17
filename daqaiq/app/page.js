import Image from "next/image";
import Hero from "./components/Hero/Hero";
import Footer from "./components/footer";
import ProductSlider from './components/ProductSlider';
import { carProducts } from './data/productData';
import Headertop from "./components/headertop";
import Navbar from "./components/navbar";
import Navlinks from "./components/navlinks";
import styles from './page.module.css'; // Import a CSS module for custom styles
import { categories } from './data/categories';
import Link from 'next/link';
import CategorySlider from './components/CategorySlider/CategorySlider';
import ProductGridSection from './components/ProductGridSection';

export default function Home() {
  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Headertop />
      <Navbar />
      <Navlinks />
      <main className={`flex-grow ${styles.mainContent}`}>
        <div className={styles.contentContainer}>
          <Hero />
          
          {/* Category Slider Component */}
          <CategorySlider />
          
          <ProductSlider categoryData={carProducts.Offers} sectionId="car-products" />
          
          
          <ProductSlider categoryData={carProducts.SpareParts} sectionId="spare-parts" />
          
           {/* First two rows of products */}
           <ProductGridSection startRow={0} numRows={2} />
           
          {/* Third Slider */}
          <ProductSlider categoryData={carProducts.Accessories} sectionId="accessories" />
          
          {/* Remaining rows of products */}
          <ProductGridSection startRow={2} numRows={6} />

          {/* Category Slider Component */}
          <CategorySlider />

          {/* Remaining rows of products */}
          <ProductGridSection startRow={2} numRows={7} />

          {/* Last Slider */}
          <ProductSlider categoryData={carProducts.Accessories} sectionId="accessories" />

          {/* Remaining rows of products */}
          <ProductGridSection startRow={2} numRows={38} />
        </div>
      </main>
      <Footer />
    </div>
  );
}