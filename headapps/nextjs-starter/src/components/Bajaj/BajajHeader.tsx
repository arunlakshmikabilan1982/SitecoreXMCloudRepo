import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ImageField,
  LinkField,
  Image as JssImage,
  Link as JssLink,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
      <div className={`component bajaj-header ${props.params?.styles}`} id={id ? id : undefined}>
        <header
          className={`w-full px-6 md:px-12 sticky top-0 z-50 transition-all duration-300 ${
            scrolled ? 'bg-black/95 backdrop-blur-md shadow-lg py-2' : 'bg-black py-3'
          }`}
        >
          <div className="max-w-[1920px] mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="select-none flex items-center">
              <JssImage field={props.fields.Logo} className="h-8 md:h-10 w-auto" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = router.pathname === item.path;
                return (
                  <Link
                    key={item.label}
                    href={item.path}
                    className={`text-base tracking-[-0.3px] transition-colors relative group ${
                      isActive ? 'text-[#016bd0]' : 'text-white hover:text-[#016bd0]'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-[#016bd0] transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                );
              })}
              <JssLink
                field={props.fields.CTALink}
                className={`text-white text-base px-6 py-2 rounded-[10px] transition-colors hover:shadow-lg hover:shadow-blue-500/25 bg-[#155dfc] hover:bg-[#1248cc]`}
              />
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
                          className={`text-base tracking-[-0.3px] transition-colors block ${
                            isActive ? 'text-[#016bd0]' : 'text-white hover:text-[#016bd0]'
                          }`}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                  <JssLink
                    field={props.fields.CTALink}
                    className="bg-[#155dfc] text-white text-base px-6 py-2.5 rounded-[10px] text-center hover:bg-[#1248cc] transition-colors"
                  />
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

