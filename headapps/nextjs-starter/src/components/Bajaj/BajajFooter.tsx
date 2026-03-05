import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Twitter, Youtube, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TextField, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';

interface Fields {
  BrandName: TextField;
  BrandDescription: TextField;
  Copyright: TextField;
}

type BajajFooterProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const footerLinks: Record<string, { label: string; to: string }[]> = {
  Products: [
    { label: 'Motorcycles', to: '/products' },
    { label: 'Chetak Electric', to: '/products' },
    { label: '3 Wheelers', to: '/products' },
    { label: 'KTM', to: '/products' },
    { label: 'Compare Models', to: '/products' },
  ],
  Services: [
    { label: 'Book Test Drive', to: '/book-test-drive' },
    { label: 'Dealer Locator', to: '/dealer-locator' },
    { label: 'Service Centres', to: '/service-centres' },
    { label: 'Financing', to: '/financing' },
    { label: 'Exchange', to: '/' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'News & Media', to: '/news' },
    { label: 'Careers', to: '/about' },
    { label: 'Contact Us', to: '/about' },
    { label: 'Investor Relations', to: '/about' },
  ],
};

const socialIcons = [
  { icon: Facebook, label: 'Facebook' },
  { icon: Instagram, label: 'Instagram' },
  { icon: Twitter, label: 'Twitter' },
  { icon: Youtube, label: 'YouTube' },
];

const FallbackComponent = (props: BajajFooterProps): JSX.Element => (
  <div className={`component bajaj-footer ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Bajaj Footer</span>
    </div>
  </div>
);

export const Default = (props: BajajFooterProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!props.fields) return <FallbackComponent {...props} />;

  return (
    <div className={`component bajaj-footer ${props.params?.styles}`} id={id ? id : undefined}>
      <footer className="bg-[#0f172a] w-full px-6 md:px-12 pt-12 pb-8">
        <div className="max-w-[1824px] mx-auto">
          {/* Top Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Brand Column */}
            <div>
              <Link href="/" className="inline-block">
                <span className="text-white text-2xl font-bold">
                  {props.fields.BrandName ? <Text field={props.fields.BrandName} /> : 'Bajaj Auto'}
                </span>
              </Link>
              <p className="text-[#90a1b9] text-sm md:text-base tracking-[-0.31px] mt-4 max-w-[220px]">
                {props.fields.BrandDescription ? (
                  <Text field={props.fields.BrandDescription} />
                ) : (
                  "India's leading automobile manufacturer committed to innovation and customer satisfaction."
                )}
              </p>
              <div className="flex gap-3 mt-5">
                {socialIcons.map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    className="bg-white/10 rounded-xl size-9 flex items-center justify-center hover:bg-[#016bd0] transition-colors"
                  >
                    <s.icon size={16} className="text-white" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-white text-base md:text-lg tracking-[-0.44px] font-medium">
                  {title}
                </h3>
                <ul className="flex flex-col gap-2.5 mt-4">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.to}
                        className="text-[#90a1b9] text-sm md:text-base tracking-[-0.31px] hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#90a1b9] text-sm tracking-[-0.15px]">
              {props.fields.Copyright ? (
                <Text field={props.fields.Copyright} />
              ) : (
                '© 2026 Bajaj Auto Limited. All rights reserved.'
              )}
            </p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[#90a1b9] text-sm tracking-[-0.15px] hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 bg-[#016bd0] text-white size-12 rounded-full flex items-center justify-center shadow-lg hover:bg-[#0155a8] transition-colors cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
