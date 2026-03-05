import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { TextField, Text } from '@sitecore-jss/sitecore-jss-nextjs';

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return count;
}

interface Fields {
  Title: TextField;
  Subtitle: TextField;
}

type BajajTrustBannerProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const FallbackComponent = (props: BajajTrustBannerProps): JSX.Element => (
  <div className={`component bajaj-trust-banner ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Bajaj Trust Banner</span>
    </div>
  </div>
);

export const Default = (props: BajajTrustBannerProps): JSX.Element => {
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
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const count = useCountUp(100304016, 2500, visible);

  if (!props.fields) return <FallbackComponent {...props} />;

  return (
    <div
      className={`component bajaj-trust-banner ${props.params?.styles}`}
      id={id ? id : undefined}
    >
      <section ref={ref} className="relative bg-[#016bd0] w-full py-10 md:py-16 overflow-hidden">
        <div className="max-w-[1824px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={visible ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="bg-white rounded px-5 md:px-8 py-2 md:py-3 shrink-0"
          >
            <span
              className="text-[#016bd0] tabular-nums"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 80px)', lineHeight: 1 }}
            >
              {count.toLocaleString()}
            </span>
          </motion.div>
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={visible ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white text-center md:text-left"
          >
            <p style={{ fontSize: 'clamp(1.5rem, 3.5vw, 48px)', lineHeight: 1.2 }}>
              {props.fields.Title ? (
                <Text field={props.fields.Title} />
              ) : (
                'Customers have placed their trust in us...'
              )}
            </p>
            <p
              className="italic"
              style={{ fontSize: 'clamp(1rem, 2vw, 28px)', lineHeight: 1.3, marginTop: '4px' }}
            >
              {props.fields.Subtitle ? (
                <Text field={props.fields.Subtitle} />
              ) : (
                'and we have just begun!'
              )}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
