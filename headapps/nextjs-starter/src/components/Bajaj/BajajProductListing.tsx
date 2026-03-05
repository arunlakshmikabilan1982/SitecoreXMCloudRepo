import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, Zap, Shield, Gauge, Fuel, Settings } from 'lucide-react';
import { TextField, LinkField, Text, Link as JssLink } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';

const categories = ['All', 'Motorcycles', 'Electric', '3 Wheelers', 'KTM'];

const allProducts = [
  {
    name: 'Pulsar NS200',
    category: 'Motorcycles',
    price: '₹1,51,000',
    engine: '199.5cc',
    power: '24.5 PS',
    mileage: '35 kmpl',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80',
    tags: ['Best Seller', 'Sport'],
    rating: 4.6,
  },
  {
    name: 'Pulsar N160',
    category: 'Motorcycles',
    price: '₹1,29,000',
    engine: '164.8cc',
    power: '16 PS',
    mileage: '47 kmpl',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80',
    tags: ['Popular'],
    rating: 4.5,
  },
  {
    name: 'Dominar 400',
    category: 'Motorcycles',
    price: '₹2,35,000',
    engine: '373.2cc',
    power: '40 PS',
    mileage: '28 kmpl',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80',
    tags: ['Touring', 'Premium'],
    rating: 4.7,
  },
  {
    name: 'Platina 110',
    category: 'Motorcycles',
    price: '₹72,500',
    engine: '115.4cc',
    power: '8.6 PS',
    mileage: '70 kmpl',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80',
    tags: ['Commuter'],
    rating: 4.3,
  },
  {
    name: 'CT 125X',
    category: 'Motorcycles',
    price: '₹78,000',
    engine: '124.4cc',
    power: '10.9 PS',
    mileage: '65 kmpl',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80',
    tags: ['Commuter'],
    rating: 4.2,
  },
  {
    name: 'Chetak 2901',
    category: 'Electric',
    price: '₹1,17,000',
    engine: 'Electric',
    power: '4.08 kW',
    mileage: '108 km',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80',
    tags: ['Eco', 'Premium'],
    rating: 4.4,
  },
  {
    name: 'Chetak 3201',
    category: 'Electric',
    price: '₹1,30,000',
    engine: 'Electric',
    power: '4.08 kW',
    mileage: '126 km',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80',
    tags: ['Eco', 'New'],
    rating: 4.5,
  },
  {
    name: 'RE Compact 4S',
    category: '3 Wheelers',
    price: '₹2,65,000',
    engine: '236.2cc',
    power: '11 PS',
    mileage: '35 kmpl',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80',
    tags: ['Passenger'],
    rating: 4.1,
  },
  {
    name: 'KTM Duke 200',
    category: 'KTM',
    price: '₹1,96,000',
    engine: '199.5cc',
    power: '25 PS',
    mileage: '32 kmpl',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80',
    tags: ['Sport', 'Premium'],
    rating: 4.7,
  },
  {
    name: 'KTM RC 390',
    category: 'KTM',
    price: '₹3,14,000',
    engine: '373.2cc',
    power: '43 PS',
    mileage: '25 kmpl',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80',
    tags: ['Super Sport'],
    rating: 4.8,
  },
  {
    name: 'KTM Adventure 250',
    category: 'KTM',
    price: '₹2,34,000',
    engine: '248.8cc',
    power: '30 PS',
    mileage: '30 kmpl',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80',
    tags: ['Adventure'],
    rating: 4.6,
  },
];

interface Fields {
  Title: TextField;
  Description: TextField;
  CTALink: LinkField;
}

type BajajProductListingProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const FallbackComponent = (props: BajajProductListingProps): JSX.Element => (
  <div className={`component bajaj-product-listing ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Bajaj Product Listing</span>
    </div>
  </div>
);

export const Default = (props: BajajProductListingProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  if (!props.fields) return <FallbackComponent {...props} />;

  return (
    <div
      className={`component bajaj-product-listing ${props.params?.styles}`}
      id={id ? id : undefined}
    >
      {/* Hero Banner */}
      <section className="relative bg-[#1e2b56] overflow-hidden py-16 md:py-24 px-6 md:px-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#016bd0] rounded-full blur-[200px] -translate-y-1/2 translate-x-1/3" />
        </div>
        <div className="max-w-[1824px] mx-auto relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#016bd0] text-base tracking-wide mb-2" style={{ fontWeight: 500 }}>
              OUR PRODUCTS
            </p>
            <h1
              className="text-white tracking-[0.37px]"
              style={{ fontSize: 'clamp(2rem, 5vw, 56px)', lineHeight: 1.15 }}
            >
              {props.fields.Title ? (
                <Text field={props.fields.Title} />
              ) : (
                <>
                  Explore the Complete
                  <br />
                  Bajaj Range
                </>
              )}
            </h1>
            <p
              className="text-white/70 mt-4 max-w-[600px]"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 20px)', lineHeight: 1.6 }}
            >
              {props.fields.Description ? (
                <Text field={props.fields.Description} />
              ) : (
                'From performance motorcycles to eco-friendly electric scooters and reliable three-wheelers — find the vehicle that matches your lifestyle.'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter + Products */}
      <section className="bg-[#0f172a] py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-[1824px] mx-auto">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm md:text-base transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#016bd0] text-white shadow-lg shadow-blue-600/30'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
                style={{ fontWeight: 500 }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filtered.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white rounded-lg overflow-hidden group hover:shadow-2xl transition-shadow"
              >
                <div className="relative h-[220px] overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#016bd0] text-white text-xs px-2.5 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[#1e2b56] text-lg" style={{ fontWeight: 600 }}>
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={14} fill="currentColor" />
                      <span className="text-sm text-[#1e2b56]" style={{ fontWeight: 500 }}>
                        {product.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-[#016bd0] text-xl mt-1" style={{ fontWeight: 700 }}>
                    {product.price}
                  </p>
                  <p className="text-[#1e2b56]/50 text-xs mt-0.5">Ex-showroom price</p>
                  <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-col items-center gap-1">
                      <Settings size={16} className="text-[#016bd0]" />
                      <span className="text-xs text-[#1e2b56]/70">{product.engine}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Zap size={16} className="text-[#016bd0]" />
                      <span className="text-xs text-[#1e2b56]/70">{product.power}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Fuel size={16} className="text-[#016bd0]" />
                      <span className="text-xs text-[#1e2b56]/70">{product.mileage}</span>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-5">
                    <Link
                      href="/book-test-drive"
                      className="flex-1 bg-[#016bd0] text-white text-sm text-center py-2.5 rounded hover:bg-[#0155a8] transition-colors"
                      style={{ fontWeight: 500 }}
                    >
                      Book Test Drive
                    </Link>
                    <button className="flex items-center gap-1 text-[#016bd0] text-sm px-3 hover:underline cursor-pointer">
                      Details <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compare Banner */}
      <section className="bg-[#016bd0] py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-[1824px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-white text-2xl md:text-3xl" style={{ fontWeight: 600 }}>
              Can&apos;t decide? Compare models side by side
            </h2>
            <p className="text-white/80 mt-2 text-base md:text-lg">
              Use our comparison tool to find the perfect vehicle for your needs.
            </p>
          </div>
          {props.fields.CTALink ? (
            <JssLink
              field={props.fields.CTALink}
              className="bg-white text-[#016bd0] px-8 py-3 rounded hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
              style={{ fontWeight: 600 }}
            />
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#016bd0] px-8 py-3 rounded hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
              style={{ fontWeight: 600 }}
            >
              Compare Now
            </motion.button>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#1e2b56] py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-[1824px] mx-auto">
          <h2
            className="text-white text-center text-2xl md:text-3xl mb-10"
            style={{ fontWeight: 600 }}
          >
            Why Choose Bajaj?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: '5 Year Warranty',
                desc: 'Industry-leading warranty coverage on all models',
              },
              {
                icon: Gauge,
                title: 'Best-in-Class Performance',
                desc: 'Cutting-edge engines with superior power delivery',
              },
              {
                icon: Fuel,
                title: 'Fuel Efficiency',
                desc: 'Segment-best mileage for everyday commuting',
              },
              {
                icon: Zap,
                title: 'Advanced Technology',
                desc: 'Digital displays, ABS, ride modes & connected features',
              },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-lg p-6 text-center hover:bg-white/10 transition-colors"
              >
                <div className="bg-[#016bd0] size-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <f.icon size={24} className="text-white" />
                </div>
                <h3 className="text-white text-lg" style={{ fontWeight: 600 }}>
                  {f.title}
                </h3>
                <p className="text-white/60 text-sm mt-2">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

