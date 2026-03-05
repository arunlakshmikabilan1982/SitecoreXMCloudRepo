import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import {
  ImageField,
  TextField,
  LinkField,
  Image as JssImage,
  Text,
  Link as JssLink,
} from '@sitecore-jss/sitecore-jss-nextjs';

type Article = {
  fields: {
    Tag: TextField;
    Date: TextField;
    Title: TextField;
    Description: TextField;
    Image: ImageField;
    CTALink: LinkField;
  };
};

interface Fields {
  Articles: Article[];
}

type BajajNewsCardProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const defaultArticles = [
  {
    tag: 'Product Launch',
    date: 'February 28, 2026',
    title: 'Bajaj Auto Launches All-New Pulsar N250',
    desc: 'The latest addition to the Pulsar family brings cutting-edge technology and performance to the streets.',
  },
  {
    tag: 'Awards',
    date: 'February 20, 2026',
    title: 'Bajaj Chetak Wins Electric Scooter of the Year',
    desc: 'Recognized for its innovative design, sustainability, and customer satisfaction.',
  },
  {
    tag: 'Corporate',
    date: 'February 15, 2026',
    title: 'Bajaj Expands Service Network to 2000+ Centers',
    desc: 'Commitment to customer service strengthens with nationwide expansion.',
  },
  {
    tag: 'Product Launch',
    date: 'February 20, 2026',
    title: 'Bajaj Auto Unveils Advanced EV',
    desc: 'Recognized for its innovative design, sustainability, and customer satisfaction.',
  },
  {
    tag: 'Awards',
    date: 'February 20, 2026',
    title: 'KTM-Bajaj Partnership Wins Industry Award',
    desc: 'Collaboration recognized for innovation and excellence in design and safety.',
  },
];

const FallbackComponent = (props: BajajNewsCardProps): JSX.Element => (
  <div className={`component bajaj-news-card ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Bajaj News Cards</span>
    </div>
  </div>
);

export const Default = (props: BajajNewsCardProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const hasCMSArticles = props.fields?.Articles?.length > 0;

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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (!props.fields && !hasCMSArticles) return <FallbackComponent {...props} />;

  return (
    <div className={`component bajaj-news-card ${props.params?.styles}`} id={id ? id : undefined}>
      <section
        ref={ref}
        id="news"
        className="py-12 md:py-20 px-6 md:px-12"
        style={{ backgroundImage: 'linear-gradient(-85deg, rgb(17,25,52) 0%, rgb(30,43,86) 73%)' }}
      >
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
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 48px)', lineHeight: 1.2 }}
            >
              News &amp; Media
            </h2>
            <p
              className="text-white/80 tracking-[-0.44px] mt-4 max-w-[823px] mx-auto"
              style={{ fontSize: 'clamp(1rem, 1.8vw, 24px)' }}
            >
              Stay updated with the latest announcements, product launches, and achievements
            </p>
          </motion.div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
            {hasCMSArticles
              ? props.fields.Articles.map((article, i) => (
                  <motion.article
                    key={i}
                    initial={{ y: 40, opacity: 0 }}
                    animate={visible ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col hover:shadow-xl transition-shadow group cursor-pointer"
                  >
                    <div className="relative h-[192px] overflow-hidden">
                      <JssImage
                        field={article.fields.Image}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-4 left-4 bg-[#016bd0] text-white text-xs md:text-sm px-3 py-0.5 rounded-full">
                        <Text field={article.fields.Tag} />
                      </span>
                    </div>
                    <div className="p-5 md:p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-[#016bd0]">
                        <Calendar size={14} />
                        <span className="text-sm tracking-[-0.15px]">
                          <Text field={article.fields.Date} />
                        </span>
                      </div>
                      <h3 className="text-black text-base md:text-lg tracking-[-0.45px] mt-2 font-medium">
                        <Text field={article.fields.Title} />
                      </h3>
                      <p className="text-[#1e2b56]/70 text-sm md:text-base tracking-[-0.31px] mt-2 flex-1">
                        <Text field={article.fields.Description} />
                      </p>
                      <JssLink
                        field={article.fields.CTALink}
                        className="flex items-center gap-2 mt-4 text-[#016bd0] text-sm md:text-base group/btn"
                      />
                    </div>
                  </motion.article>
                ))
              : defaultArticles.map((article, i) => (
                  <motion.article
                    key={i}
                    initial={{ y: 40, opacity: 0 }}
                    animate={visible ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col hover:shadow-xl transition-shadow group cursor-pointer"
                  >
                    <div className="relative h-[192px] overflow-hidden bg-gradient-to-br from-[#1e2b56] to-[#016bd0]">
                      <span className="absolute top-4 left-4 bg-[#016bd0] text-white text-xs px-3 py-0.5 rounded-full">
                        {article.tag}
                      </span>
                    </div>
                    <div className="p-5 md:p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-[#016bd0]">
                        <Calendar size={14} />
                        <span className="text-sm">{article.date}</span>
                      </div>
                      <h3 className="text-black text-base md:text-lg mt-2 font-medium">
                        {article.title}
                      </h3>
                      <p className="text-[#1e2b56]/70 text-sm mt-2 flex-1">{article.desc}</p>
                      <button className="flex items-center gap-2 mt-4 text-[#016bd0] text-sm group/btn">
                        <span>Read More</span>
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-300 group-hover/btn:translate-x-1"
                        />
                      </button>
                    </div>
                  </motion.article>
                ))}
          </div>
        </div>
      </section>
    </div>
  );
};

