import Image from "next/image";
import HeroMain from "./components/HeroMain/HeroMain";
import FooterMain from "./components/FooterMain";
import SliderProduct from './components/SliderProduct';
import { carProducts } from './data/productData';
import HeaderTop from "./components/HeaderTop";
import NavbarMain from "./components/NavbarMain";
import NavLinks from "./components/NavLinks";
import styles from './page.module.css'; // Import a CSS module for custom styles
import { categories } from './data/categories';
import Link from 'next/link';
import SliderCategory from './components/SliderCategory/SliderCategory';
import SectionProductGrid from './components/SectionProductGrid';

export default function Home() {
  return (
    <div className="page-transition min-h-screen flex flex-col">
      <HeaderTop />
      <NavbarMain />
      <NavLinks />
      <main className={`flex-grow ${styles.mainContent}`}>
        <div className={styles.contentContainer}>
          <HeroMain />
          
          {/* Category Slider Component */}
          <SliderCategory />
          
          <SliderProduct categoryData={carProducts.Offers} sectionId="car-products" />
          
          <SliderProduct categoryData={carProducts.SpareParts} sectionId="spare-parts" />
          
           {/* First two rows of products */}
           <SectionProductGrid startRow={0} numRows={2} />
           
          {/* Third Slider */}
          <SliderProduct categoryData={carProducts.Accessories} sectionId="accessories" />
          
          {/* Remaining rows of products */}
          <SectionProductGrid startRow={2} numRows={6} />

          {/* Category Slider Component */}
          <SliderCategory />

          {/* Remaining rows of products */}
          <SectionProductGrid startRow={6} numRows={7} />

          {/* Last Slider */}
          <SliderProduct categoryData={carProducts.Accessories} sectionId="accessories" />

          {/* Remaining rows of products */}
          <SectionProductGrid startRow={7} numRows={38} />
        </div>
      </main>
      <FooterMain />
    </div>
  );
}