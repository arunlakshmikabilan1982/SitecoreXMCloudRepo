/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ImageField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BajajLogo } from './BajajLogo';

const navItems = [
  { label: 'Products', path: '/products' },
  { label: 'Financing', path: '/financing' },
  { label: 'About', path: '/about' },
  { label: 'News', path: '/news' },
];

interface Fields {
  Logo: ImageField;
  CTALink: LinkField;
}

type BajajHeaderProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const FallbackComponent = (props: BajajHeaderProps): JSX.Element => (
  <div className={`component bajaj-header ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Bajaj Header</span>
    </div>
  </div>
);

export const Default = (props: BajajHeaderProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [router.pathname]);

  if (props.fields) {
    return (
      <div className={`component bajaj-header w-full block ${props.params?.styles}`} id={id ? id : undefined}>
        <header
          className={`w-full px-6 md:px-12 sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-md shadow-lg py-2' : 'bg-black py-3'
            }`}
        >
          <div className="max-w-[1920px] mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="select-none flex items-center !no-underline hover:!no-underline">
              <BajajLogo className="h-14 md:h-[60px] w-auto text-white" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-10">
              <div className="flex items-center gap-6 lg:gap-8">
                {navItems.map((item) => {
                  const isActive = router.pathname === item.path;
                  return (
                    <Link
                      key={item.label}
                      href={item.path}
                      className={`!no-underline hover:!no-underline text-[15px] font-medium tracking-wide transition-colors relative group ${isActive ? 'text-white' : 'text-white/80 hover:text-white'
                        }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <div className="flex items-center gap-6">
                <Link
                  href={props.fields?.CTALink?.value?.href || "/book-test-drive"}
                  className={`!no-underline hover:!no-underline text-white text-[15px] font-medium px-6 py-2.5 rounded-[8px] transition-colors hover:shadow-lg bg-[#2563eb] hover:bg-[#1d4ed8]`}
                >
                  {props.fields?.CTALink?.value?.text && props.fields.CTALink.value.text !== '/en/'
                    ? props.fields.CTALink.value.text
                    : "Book Test Drive"}
                </Link>
                <button className="text-white hover:text-white/80 transition-colors" aria-label="Cart">
                  <ShoppingCart size={22} strokeWidth={1.5} />
                </button>
                <Link href="/search" className="text-white hover:text-white/80 transition-colors" aria-label="Search">
                  <Search size={22} strokeWidth={1.5} />
                </Link>
              </div>
            </nav>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-white p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Nav */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden"
              >
                <div className="flex flex-col gap-4 pt-4 pb-4">
                  {navItems.map((item, i) => {
                    const isActive = router.pathname === item.path;
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={item.path}
                          className={`!no-underline hover:!no-underline text-base tracking-[-0.3px] transition-colors block ${isActive ? 'text-[#016bd0]' : 'text-white hover:text-[#016bd0]'
                            }`}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                  <Link
                    href={props.fields?.CTALink?.value?.href || "/book-test-drive"}
                    className="!no-underline hover:!no-underline bg-[#2563eb] text-white text-[15px] font-medium px-6 py-2.5 rounded-[8px] text-center hover:bg-[#1d4ed8] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {props.fields?.CTALink?.value?.text && props.fields.CTALink.value.text !== '/en/'
                      ? props.fields.CTALink.value.text
                      : "Book Test Drive"}
                  </Link>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </header>
      </div>
    );
  }

  return <FallbackComponent {...props} />;
};
