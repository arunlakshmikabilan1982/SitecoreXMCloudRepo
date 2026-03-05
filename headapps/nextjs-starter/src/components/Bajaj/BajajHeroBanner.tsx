import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageField, TextField, LinkField, Image as JssImage, Text, Link as JssLink } from '@sitecore-jss/sitecore-jss-nextjs';

type Slide = {
  fields: {
    Title: TextField;
    Subtitle: TextField;
    CTALink: LinkField;
    BackgroundImage: ImageField;
  };
};

interface Fields {
  Slides: Slide[];
}

type BajajHeroBannerProps = {
  params: { [key: string]: string };
  fields: Fields;
};

// Fallback sample slides for when no CMS data — mirrors the AI-Sitecore data
const defaultSlides = [
  { title: 'Pulsar\nN160', subtitle: 'The Beast Unleashed', cta: 'Book Now' },
  { title: 'Dominar\n400', subtitle: 'Hyper Riding', cta: 'Explore' },
  { title: 'Chetak\nElectric', subtitle: 'Future of Mobility', cta: 'Discover' },
  { title: 'Pulsar\nNS200', subtitle: 'Own The Road', cta: 'Book Now' },
];

const FallbackComponent = (props: BajajHeroBannerProps): JSX.Element => (
  <div className={`component bajaj-hero-banner ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Bajaj Hero Banner</span>
    </div>
  </div>
);
export const Default = (props: BajajHeroBannerProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Check both 'Slides' and 'slides' in case Layout Service lowercase it
  const cmsSlides = props.fields?.Slides || (props.fields as any)?.slides || [];
  const hasCMSSlides = cmsSlides.length > 0;
  const slideCount = hasCMSSlides ? cmsSlides.length : defaultSlides.length;

  useEffect(() => {
    console.log('BajajHeroBanner Render State:', {
      hasCMSSlides,
      slideCount,
      cmsSlides,
      propsFields: props.fields
    });
  }, [hasCMSSlides, slideCount, cmsSlides, props.fields]);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % slideCount);
  }, [slideCount]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + slideCount) % slideCount);
  }, [slideCount]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const textVariants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  if (!props.fields && !hasCMSSlides) return <FallbackComponent {...props} />;

  return (
    <div className={`component bajaj-hero-banner ${props.params?.styles}`} id={id ? id : undefined}>
      <section
        className="relative w-full h-[500px] md:h-[700px] lg:h-[864px] overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Images — crossfade */}
        <AnimatePresence initial={false}>
          <motion.div
            key={`bg-${current}`}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {(() => {
              const slide = hasCMSSlides ? cmsSlides[current] : null;

              // Debug: log the slide object
              console.log(`Current Slide [${current}]:`, slide);

              const bgValue = slide?.fields?.BackgroundImage?.value;
              const bgSrc = bgValue?.src;

              console.log('Resolved bgSrc:', bgSrc);

              if (bgSrc) {
                return (
                  <img
                    src={bgSrc}
                    alt={bgValue?.alt?.toString() || ''}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    style={{ zIndex: 10, border: '5px solid red' }}
                    onLoad={() => console.log('Image loaded successfully:', bgSrc)}
                    onError={(e) => console.error('Image failed to load:', bgSrc, e)}
                  />
                );
              }
              return (
                <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] to-[#1e2b56]" />
              );
            })()}
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(88deg, rgb(0,0,0) 28%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)',
          }}
        />

        {/* Animated Content */}
        <div className="absolute inset-0 flex items-center px-6 md:px-12 lg:px-20 z-[2]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="max-w-[600px]"
            >
              <motion.h1
                className="text-white whitespace-pre-line font-bold"
                style={{ fontSize: 'clamp(3.5rem, 10vw, 128px)', lineHeight: 1 }}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {hasCMSSlides ? (
                  cmsSlides[current].fields?.Title?.value || <Text field={cmsSlides[current].fields?.Title} />
                ) : (
                  defaultSlides[current].title
                )}
              </motion.h1>
              <motion.p
                className="text-white/90 mt-2"
                style={{ fontSize: 'clamp(1.5rem, 4.5vw, 64px)', lineHeight: 1 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                {hasCMSSlides ? (
                  cmsSlides[current].fields?.Subtitle?.value || <Text field={cmsSlides[current].fields?.Subtitle} />
                ) : (
                  defaultSlides[current].subtitle
                )}
              </motion.p>
              <motion.div
                className="inline-block mt-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {hasCMSSlides ? (
                  <JssLink
                    field={cmsSlides[current].fields.CTALink}
                    className="inline-block bg-[#016bd0] text-white px-8 md:px-12 py-3 md:py-4 rounded hover:bg-[#0155a8] transition-colors hover:shadow-lg hover:shadow-blue-600/30"
                    style={{ fontSize: 'clamp(1rem, 2vw, 24px)' }}
                  />
                ) : (
                  <a
                    href="#book-test-drive"
                    className="inline-block bg-[#016bd0] text-white px-8 md:px-12 py-3 md:py-4 rounded hover:bg-[#0155a8] transition-colors hover:shadow-lg hover:shadow-blue-600/30"
                    style={{ fontSize: 'clamp(1rem, 2vw, 24px)' }}
                  >
                    {defaultSlides[current].cta}
                  </a>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide counter */}
        <div className="absolute top-6 right-6 md:top-10 md:right-12 z-[3] text-white/60 text-sm md:text-base tracking-wide">
          <span className="text-white font-semibold">{String(current + 1).padStart(2, '0')}</span> /{' '}
          {String(slideCount).padStart(2, '0')}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-[3]">
          <motion.div
            className="h-full bg-[#016bd0]"
            key={`progress-${current}`}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: isPaused ? 999 : 5, ease: 'linear' }}
          />
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-8 md:bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-3 md:gap-6 z-[3]">
          <button
            onClick={prev}
            className="bg-white/90 backdrop-blur rounded size-10 md:size-12 flex items-center justify-center hover:bg-white transition-colors shadow-md cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="text-gray-700" size={20} />
          </button>

          {Array.from({ length: slideCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${i === current
                ? 'size-6 md:size-8 border-2 border-white bg-white shadow-md'
                : 'size-4 md:size-5 bg-white/50 hover:bg-white/80'
                }`}
            >
              {i === current && (
                <div className="w-full h-full rounded-full flex items-center justify-center">
                  <div className="size-2.5 md:size-3 rounded-full bg-[#1e2b56]" />
                </div>
              )}
            </button>
          ))}

          <button
            onClick={next}
            className="bg-white/90 backdrop-blur rounded size-10 md:size-12 flex items-center justify-center hover:bg-white transition-colors shadow-md cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="text-gray-700" size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};

