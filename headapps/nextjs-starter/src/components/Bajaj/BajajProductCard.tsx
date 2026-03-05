import React from 'react';
import { motion } from 'motion/react';
import { Star, ArrowRight, Settings, Zap, Fuel } from 'lucide-react';
import { TextField, ImageField, Text, Image as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';

interface Fields {
  Title: TextField;
  Price: TextField;
  Engine: TextField;
  Power: TextField;
  Mileage: TextField;
  Tag: TextField;
  Image: ImageField;
}

type BajajProductCardProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const FallbackComponent = (props: BajajProductCardProps): JSX.Element => (
  <div className={`component bajaj-product-card ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Bajaj Product Card</span>
    </div>
  </div>
);

export const Default = (props: BajajProductCardProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;

  if (!props.fields) return <FallbackComponent {...props} />;

  const price = props.fields.Price?.value ?? '₹1,51,000';
  const engine = props.fields.Engine?.value ?? '199.5cc';
  const power = props.fields.Power?.value ?? '24.5 PS';
  const mileage = props.fields.Mileage?.value ?? '35 kmpl';
  const tag = props.fields.Tag?.value ?? '';

  return (
    <div
      className={`component bajaj-product-card ${props.params?.styles}`}
      id={id ? id : undefined}
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-lg overflow-hidden group hover:shadow-2xl transition-shadow"
      >
        <div className="relative h-[220px] overflow-hidden bg-gray-100">
          {props.fields.Image?.value?.src ? (
            <JssImage
              field={props.fields.Image}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1e2b56] to-[#016bd0]" />
          )}
          {tag && (
            <span className="absolute top-3 left-3 bg-[#016bd0] text-white text-xs px-2.5 py-0.5 rounded-full">
              {tag}
            </span>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-[#1e2b56] text-lg" style={{ fontWeight: 600 }}>
              <Text field={props.fields.Title} />
            </h3>
            <div className="flex items-center gap-1 text-amber-500">
              <Star size={14} fill="currentColor" />
              <span className="text-sm text-[#1e2b56]" style={{ fontWeight: 500 }}>
                4.5
              </span>
            </div>
          </div>
          <p className="text-[#016bd0] text-xl mt-1" style={{ fontWeight: 700 }}>
            {price}
          </p>
          <p className="text-[#1e2b56]/50 text-xs mt-0.5">Ex-showroom price</p>
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-col items-center gap-1">
              <Settings size={16} className="text-[#016bd0]" />
              <span className="text-xs text-[#1e2b56]/70">{engine}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Zap size={16} className="text-[#016bd0]" />
              <span className="text-xs text-[#1e2b56]/70">{power}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Fuel size={16} className="text-[#016bd0]" />
              <span className="text-xs text-[#1e2b56]/70">{mileage}</span>
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
    </div>
  );
};
