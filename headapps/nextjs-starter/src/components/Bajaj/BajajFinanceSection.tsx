import React, { useRef, useState, useEffect } from 'react';
import { Percent, Calculator, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { TextField, LinkField, Text, Link as JssLink } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Title: TextField;
  Description: TextField;
  CTALink: LinkField;
  OffersTitle: TextField;
  OffersContent: TextField;
  Disclaimer: TextField;
}

type BajajFinanceSectionProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const features = [
  { icon: Percent, title: 'Low Interest Rates', desc: 'Starting from 7.99% per annum' },
  { icon: Calculator, title: 'Flexible Tenure', desc: 'Choose EMI plans from 12 to 60 months' },
  {
    icon: CheckCircle,
    title: 'Quick Approval',
    desc: 'Get instant approval with minimal documentation',
  },
];

const offers = [
  { title: 'Zero Down Payment', desc: 'Available on select models' },
  { title: 'Exchange Bonus', desc: 'Up to ₹15,000 on your old vehicle' },
  { title: 'Corporate Discount', desc: 'Special rates for corporate employees' },
  { title: 'Loyalty Bonus', desc: 'Extra benefits for existing Bajaj customers' },
];

const FallbackComponent = (props: BajajFinanceSectionProps): JSX.Element => (
  <div className={`component bajaj-finance-section ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Bajaj Finance Section</span>
    </div>
  </div>
);

export const Default = (props: BajajFinanceSectionProps): JSX.Element => {
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
      className={`component bajaj-finance-section ${props.params?.styles}`}
      id={id ? id : undefined}
    >
      <section
        ref={ref}
        id="financing"
        className="bg-[#016bd0] w-full py-10 md:py-16 px-6 md:px-12"
      >
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-20 items-center justify-center">
          {/* Left */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={visible ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 max-w-[520px]"
          >
            <h2
              className="text-white tracking-[0.37px]"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 36px)', lineHeight: 1.3 }}
            >
              {props.fields.Title ? <Text field={props.fields.Title} /> : 'Easy Financing Options'}
            </h2>
            <p className="text-white/90 text-lg md:text-xl tracking-[-0.45px] mt-4 max-w-[437px]">
              {props.fields.Description ? (
                <Text field={props.fields.Description} />
              ) : (
                'Get your dream vehicle with flexible EMI plans and attractive interest rates'
              )}
            </p>

            <div className="flex flex-col gap-5 mt-8">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ x: -30, opacity: 0 }}
                  animate={visible ? { x: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-[#1e2b56] rounded-xl size-10 flex items-center justify-center shrink-0">
                    <f.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white text-lg md:text-xl tracking-[-0.45px]">{f.title}</h3>
                    <p className="text-white/80 text-base tracking-[-0.31px]">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block mt-8"
            >
              {props.fields.CTALink ? (
                <JssLink
                  field={props.fields.CTALink}
                  className="bg-white text-[#016bd0] text-base px-6 py-3 rounded-[10px] hover:bg-gray-100 transition-colors font-medium cursor-pointer"
                />
              ) : (
                <button className="bg-white text-[#016bd0] text-base px-6 py-3 rounded-[10px] hover:bg-gray-100 transition-colors font-medium cursor-pointer">
                  Calculate EMI
                </button>
              )}
            </motion.div>
          </motion.div>

          {/* Right — Offers Card */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={visible ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-auto bg-white rounded-lg p-6 md:p-8 shadow-2xl max-w-[584px]"
          >
            <h3 className="text-[#1e2b56] text-xl md:text-2xl tracking-[0.07px] font-semibold">
              {props.fields.OffersTitle ? (
                <Text field={props.fields.OffersTitle} />
              ) : (
                'Special Offers'
              )}
            </h3>

            <div className="flex flex-col gap-4 mt-6">
              {offers.map((offer, i) => (
                <motion.div
                  key={offer.title}
                  initial={{ x: 20, opacity: 0 }}
                  animate={visible ? { x: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  className="border-l-4 border-[#016bd0] pl-5 py-2 hover:bg-blue-50/50 transition-colors rounded-r"
                >
                  <h4 className="text-[#1e2b56] text-base tracking-[-0.31px] font-medium">
                    {offer.title}
                  </h4>
                  <p className="text-black/70 text-base tracking-[-0.31px]">{offer.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-gray-200 mt-6 pt-4">
              <p className="text-black/60 text-sm tracking-[-0.15px]">
                {props.fields.Disclaimer ? (
                  <Text field={props.fields.Disclaimer} />
                ) : (
                  '*Terms and conditions apply. Offers valid till March 31, 2026'
                )}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
