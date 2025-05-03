import Image from 'next/image';
import Link from 'next/link';

export default function HeroMain() {
  return (
    <div className="hero min-h-[70vh] bg-base-200 rounded-xl overflow-hidden relative">
      <div className="hero-content flex-col lg:flex-row-reverse gap-8">
        <Image
          src="/hero-car.webp"
          alt="Luxury Car"
          width={600}
          height={400}
          className="rounded-lg shadow-2xl object-cover"
          priority
        />
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Premium Auto Parts</h1>
          <p className="py-6">
            Discover our extensive collection of high-quality auto parts and accessories. 
            From performance upgrades to essential maintenance parts, we've got everything 
            you need for your vehicle.
          </p>
          <div className="flex gap-4">
            <Link 
              href="/products" 
              className="btn btn-primary"
            >
              Browse Products
            </Link>
            <Link 
              href="/contact" 
              className="btn btn-outline"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 