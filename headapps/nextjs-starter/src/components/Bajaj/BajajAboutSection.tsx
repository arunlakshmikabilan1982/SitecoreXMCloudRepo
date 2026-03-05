import React from 'react';
import { motion } from 'motion/react';
import { Globe, Users, Award, TrendingUp, Target, Eye, Heart } from 'lucide-react';
import { TextField, ImageField, Text, Image as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';

const milestones = [
  {
    year: '1945',
    title: 'Foundation',
    desc: 'Bajaj Group founded by Jamnalal Bajaj in Rajasthan, India.',
  },
  {
    year: '1960',
    title: 'First Vehicle',
    desc: 'Bajaj Auto starts manufacturing two and three-wheelers in Pune.',
  },
  {
    year: '1986',
    title: 'IPO',
    desc: 'Bajaj Auto goes public, listed on BSE and NSE stock exchanges.',
  },
  {
    year: '2001',
    title: 'Pulsar Launch',
    desc: 'The iconic Pulsar brand is born, redefining Indian motorcycling.',
  },
  {
    year: '2007',
    title: 'KTM Partnership',
    desc: 'Strategic partnership with KTM AG begins, expanding global reach.',
  },
  {
    year: '2019',
    title: 'Chetak Returns',
    desc: 'Bajaj re-enters scooter market with the all-electric Chetak.',
  },
  {
    year: '2024',
    title: '100M Vehicles',
    desc: 'Bajaj Auto crosses 100 million vehicles sold globally.',
  },
  {
    year: '2026',
    title: 'EV Future',
    desc: 'Expanding electric vehicle portfolio with next-gen technology.',
  },
];

const stats = [
  { icon: Globe, value: '79+', label: 'Countries' },
  { icon: Users, value: '100M+', label: 'Vehicles Sold' },
  { icon: Award, value: '200+', label: 'Awards Won' },
  { icon: TrendingUp, value: '₹45,000 Cr', label: 'Revenue' },
];

const leadership = [
  {
    name: 'Rajiv Bajaj',
    role: 'Managing Director & CEO',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80',
  },
  {
    name: 'Pradeep Shrivastava',
    role: 'Chief Technology Officer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80',
  },
  {
    name: 'Rakesh Sharma',
    role: 'Executive Director',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
  },
];

interface Fields {
  Title: TextField;
  Description: TextField;
  BackgroundImage: ImageField;
}

type BajajAboutSectionProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const FallbackComponent = (props: BajajAboutSectionProps): JSX.Element => (
  <div className={`component bajaj-about-section ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Bajaj About Section</span>
    </div>
  </div>
);

export const Default = (props: BajajAboutSectionProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;

  if (!props.fields) return <FallbackComponent {...props} />;

  return (
    <div
      className={`component bajaj-about-section ${props.params?.styles}`}
      id={id ? id : undefined}
    >
      {/* Hero */}
      <section className="relative bg-[#1e2b56] overflow-hidden py-16 md:py-28 px-6 md:px-12">
        <div className="absolute inset-0 opacity-20">
          {props.fields.BackgroundImage?.value?.src ? (
            <JssImage field={props.fields.BackgroundImage} className="w-full h-full object-cover" />
          ) : (
            <img
              src="https://images.unsplash.com/photo-1708192549094-5d585601e312?w=1080&q=80"
              alt="Bajaj Factory"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="max-w-[1824px] mx-auto relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#016bd0] text-base tracking-wide mb-2" style={{ fontWeight: 500 }}>
              ABOUT US
            </p>
            <h1
              className="text-white"
              style={{ fontSize: 'clamp(2rem, 5vw, 56px)', lineHeight: 1.15 }}
            >
              {props.fields.Title ? (
                <Text field={props.fields.Title} />
              ) : (
                <>
                  Driven by Innovation,
                  <br />
                  Powered by Passion
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
                "For over 8 decades, Bajaj Auto has been at the forefront of India's automotive revolution — manufacturing world-class vehicles that move millions."
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#016bd0] py-10 md:py-14 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <s.icon size={32} className="text-white/70 mx-auto mb-2" />
              <p
                className="text-white"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 40px)', fontWeight: 700 }}
              >
                {s.value}
              </p>
              <p className="text-white/70 text-sm mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="bg-[#0f172a] py-12 md:py-20 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Target,
              title: 'Our Mission',
              desc: "To be the world's favourite two and three-wheeler company, consistently exceeding customer expectations through innovation, technology, and sustainability.",
            },
            {
              icon: Eye,
              title: 'Our Vision',
              desc: 'To lead the global mobility revolution by creating vehicles that are accessible, efficient, and environmentally responsible — making mobility a joyful experience.',
            },
            {
              icon: Heart,
              title: 'Our Values',
              desc: 'Innovation, integrity, customer focus, and a relentless pursuit of excellence guide everything we do. We believe in building lasting relationships with communities.',
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-lg p-8"
            >
              <div className="bg-[#016bd0] size-14 rounded-full flex items-center justify-center mb-5">
                <item.icon size={26} className="text-white" />
              </div>
              <h3 className="text-white text-xl" style={{ fontWeight: 600 }}>
                {item.title}
              </h3>
              <p className="text-white/60 text-base mt-3" style={{ lineHeight: 1.7 }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#1e2b56] py-12 md:py-20 px-6 md:px-12">
        <div className="max-w-[900px] mx-auto">
          <h2
            className="text-white text-center text-2xl md:text-4xl mb-12"
            style={{ fontWeight: 600 }}
          >
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 md:-translate-x-0.5" />
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`relative flex items-start gap-6 mb-8 md:mb-10 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } pl-12 md:pl-0`}
              >
                <div className="absolute left-2.5 md:left-1/2 md:-translate-x-1/2 top-1">
                  <div className="size-4 rounded-full bg-[#016bd0] border-2 border-white/30" />
                </div>
                <div
                  className={`md:w-1/2 ${
                    i % 2 === 0 ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'
                  }`}
                >
                  <span className="text-[#016bd0] text-sm" style={{ fontWeight: 600 }}>
                    {m.year}
                  </span>
                  <h3 className="text-white text-lg mt-1" style={{ fontWeight: 600 }}>
                    {m.title}
                  </h3>
                  <p className="text-white/60 text-sm mt-1" style={{ lineHeight: 1.6 }}>
                    {m.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-[#0f172a] py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="text-white text-center text-2xl md:text-3xl mb-10"
            style={{ fontWeight: 600 }}
          >
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-[900px] mx-auto">
            {leadership.map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="size-32 rounded-full overflow-hidden mx-auto mb-4 border-2 border-[#016bd0]">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-white text-lg" style={{ fontWeight: 600 }}>
                  {person.name}
                </h3>
                <p className="text-white/60 text-sm mt-1">{person.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="bg-[#016bd0] py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-white text-2xl md:text-3xl" style={{ fontWeight: 600 }}>
              Global Presence
            </h2>
            <p className="text-white/80 mt-3 max-w-[500px]" style={{ lineHeight: 1.6 }}>
              Bajaj Auto exports to over 79 countries across Africa, Asia, Latin America, and
              Europe. Our vehicles are trusted by millions worldwide.
            </p>
          </div>
          <div className="flex gap-8">
            {[
              { label: 'Manufacturing Plants', val: '5' },
              { label: 'Dealerships', val: '2,000+' },
              { label: 'Service Centers', val: '2,500+' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-white text-3xl" style={{ fontWeight: 700 }}>
                  {item.val}
                </p>
                <p className="text-white/70 text-xs mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

