import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TextField, Text } from '@sitecore-jss/sitecore-jss-nextjs';

// SVG path from AI-Sitecore source (svg-wbr6eapcb8)
const connectorPath =
  'M 37 154 C 162 62 290 76 344 100 C 398 124 379 62 485 33 C 591 4 581 112 667 88 C 753 64 809 7 933 7';

const steps = [
  {
    num: 1,
    title: 'Submit Details',
    desc: 'Enter your bike details to start the bike exchange process instantly.',
  },
  {
    num: 2,
    title: 'Get Estimated Price',
    desc: "Receive an instant bike exchange value based on your motorcycle's condition.",
  },
  {
    num: 3,
    title: 'Vehicle Inspection',
    desc: 'Visit selected Bajaj dealership to confirm your final bike exchange price.',
  },
  {
    num: 4,
    title: 'Upgrade to Bajaj Vehicle',
    desc: 'Exchange your old bike for a new Bajaj motorcycle and ride home with confidence.',
  },
];

interface Fields {
  Title: TextField;
  Description: TextField;
}

type BajajExchangeStepsProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const FallbackComponent = (props: BajajExchangeStepsProps): JSX.Element => (
  <div className={`component bajaj-exchange-steps ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Bajaj Exchange Steps</span>
    </div>
  </div>
);

export const Default = (props: BajajExchangeStepsProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (!props.fields) return <FallbackComponent {...props} />;

  return (
    <div
      className={`component bajaj-exchange-steps ${props.params?.styles}`}
      id={id ? id : undefined}
    >
      <section ref={ref} className="bg-[#1e2b56] w-full py-14 md:py-20 px-6 md:px-12">
        <div className="max-w-[1824px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={visible ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-12"
          >
            <h2
              className="text-white tracking-[0.37px]"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 48px)',
                lineHeight: '40px',
                fontWeight: 500,
              }}
            >
              {props.fields.Title ? (
                <Text field={props.fields.Title} />
              ) : (
                'Exchange Your Old Vehicle'
              )}
            </h2>
            <p
              className="text-white/80 tracking-[-0.44px] mt-4 max-w-[823px] mx-auto"
              style={{ fontSize: 'clamp(1rem, 1.8vw, 24px)', lineHeight: '28px' }}
            >
              {props.fields.Description ? (
                <Text field={props.fields.Description} />
              ) : (
                'Exchange your two-wheeler effortlessly in just four simple steps'
              )}
            </p>
          </motion.div>

          {/* Cards + dashed connector */}
          <div className="relative">
            {/* Animated dashed SVG connector (desktop only) */}
            <div
              className="hidden lg:block absolute z-0 top-[90px] left-1/2 -translate-x-1/2"
              style={{ width: 'min(970px, 68%)' }}
            >
              <svg
                className="w-full"
                viewBox="0 0 970 154"
                fill="none"
                style={{ transform: 'rotate(-2.05deg)' }}
              >
                <motion.path
                  d={connectorPath}
                  stroke="white"
                  strokeWidth="4"
                  strokeDasharray="16 16"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={visible ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 2, ease: 'easeInOut', delay: 0.3 }}
                />
              </svg>
            </div>

            {/* Step cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-[40px] xl:gap-[80px] 2xl:gap-[132px] relative z-10 justify-items-center">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ y: 40, opacity: 0 }}
                  animate={visible ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="bg-white rounded-[4px] p-6 w-full max-w-[252px] min-h-[264px] shadow-md cursor-default flex flex-col gap-2"
                >
                  <div className="bg-[#016bd0] size-12 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white text-2xl font-semibold leading-8">{step.num}</span>
                  </div>
                  <h3 className="text-black text-xl font-semibold leading-7">{step.title}</h3>
                  <p className="text-[#1e2b56] text-base leading-6">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
