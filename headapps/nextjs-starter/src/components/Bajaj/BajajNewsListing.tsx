import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight, Search, Tag } from 'lucide-react';
import { TextField, Text } from '@sitecore-jss/sitecore-jss-nextjs';

const allCategories = ['All', 'Product Launch', 'Awards', 'Corporate', 'Events', 'Technology'];

const allArticles = [
  {
    tag: 'Product Launch',
    date: 'February 28, 2026',
    title: 'Bajaj Auto Launches All-New Pulsar N250',
    desc: 'The latest addition to the Pulsar family brings cutting-edge technology, a 249cc engine with 24.5 PS power, LED DRLs, Bluetooth connectivity, and advanced ride modes to the streets.',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80',
    featured: true,
  },
  {
    tag: 'Awards',
    date: 'February 20, 2026',
    title: 'Bajaj Chetak Wins Electric Scooter of the Year',
    desc: 'Recognized for its innovative design, sustainability, and customer satisfaction at the Auto Expo Awards 2026.',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80',
  },
  {
    tag: 'Corporate',
    date: 'February 15, 2026',
    title: 'Bajaj Expands Service Network to 2000+ Centers',
    desc: 'Commitment to customer service strengthens with nationwide expansion of authorized service centers across India.',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80',
  },
  {
    tag: 'Product Launch',
    date: 'February 10, 2026',
    title: 'Bajaj Auto Unveils Advanced EV Platform',
    desc: 'New electric vehicle platform promises 150km range, fast charging, and connected vehicle technology for upcoming models.',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80',
  },
  {
    tag: 'Awards',
    date: 'February 5, 2026',
    title: 'KTM-Bajaj Partnership Wins Industry Award',
    desc: 'Collaboration recognized for innovation and excellence in design, safety, and manufacturing quality.',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80',
  },
  {
    tag: 'Events',
    date: 'January 28, 2026',
    title: 'Bajaj Auto Hosts Annual Dealer Conference 2026',
    desc: 'Over 1,500 dealer partners from 79 countries gathered in Pune for the annual conference showcasing new strategies.',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80',
  },
  {
    tag: 'Technology',
    date: 'January 20, 2026',
    title: 'Bajaj Introduces Connected Vehicle Technology',
    desc: 'New Bluetooth-enabled dashboard with navigation, call alerts, and vehicle diagnostics available across Pulsar range.',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80',
  },
  {
    tag: 'Corporate',
    date: 'January 15, 2026',
    title: 'Bajaj Auto Reports Record Q3 Revenue',
    desc: 'Q3 FY26 revenue reaches ₹12,400 crore, a 18% year-on-year growth driven by strong domestic and export demand.',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80',
  },
  {
    tag: 'Events',
    date: 'January 8, 2026',
    title: 'Pulsar Festival of Speed Returns',
    desc: "India's biggest motorcycle racing festival returns with amateur and pro categories across 8 cities nationwide.",
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80',
  },
  {
    tag: 'Technology',
    date: 'January 2, 2026',
    title: 'Bajaj Partners with NVIDIA for AI-Powered R&D',
    desc: 'Strategic collaboration to leverage AI and machine learning in vehicle design, testing, and manufacturing.',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80',
  },
];

interface Fields {
  Title: TextField;
  Description: TextField;
}

type BajajNewsListingProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const FallbackComponent = (props: BajajNewsListingProps): JSX.Element => (
  <div className={`component bajaj-news-listing ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Bajaj News Listing</span>
    </div>
  </div>
);

export const Default = (props: BajajNewsListingProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = allArticles.filter((a) => {
    const matchCategory = activeCategory === 'All' || a.tag === activeCategory;
    const matchSearch =
      !searchQuery ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const featured = filtered.find((a) => a.featured);
  const rest = filtered.filter((a) => !a.featured);

  if (!props.fields) return <FallbackComponent {...props} />;

  return (
    <div
      className={`component bajaj-news-listing ${props.params?.styles}`}
      id={id ? id : undefined}
    >
      {/* Hero */}
      <section className="bg-[#1e2b56] py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-[1824px] mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#016bd0] text-base tracking-wide mb-2" style={{ fontWeight: 500 }}>
              NEWS &amp; MEDIA
            </p>
            <h1
              className="text-white"
              style={{ fontSize: 'clamp(2rem, 5vw, 56px)', lineHeight: 1.15 }}
            >
              {props.fields.Title ? (
                <Text field={props.fields.Title} />
              ) : (
                <>
                  Latest News &amp;
                  <br />
                  Announcements
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
                'Stay updated with the latest product launches, corporate announcements, events, and technology breakthroughs.'
              )}
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 relative max-w-[500px]"
          >
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-[#016bd0] transition-colors"
            />
          </motion.div>
        </div>
      </section>

      {/* Filters + Content */}
      <section className="bg-[#0f172a] py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-[1824px] mx-auto">
          <div className="flex flex-wrap gap-3 mb-10">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#016bd0] text-white shadow-lg shadow-blue-600/25'
                    : 'bg-white/10 text-white/60 hover:bg-white/15 hover:text-white'
                }`}
                style={{ fontWeight: 500 }}
              >
                <Tag size={13} />
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Article */}
          {featured && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-10 bg-white rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2 group cursor-pointer hover:shadow-2xl transition-shadow"
            >
              <div className="relative h-[280px] lg:h-auto overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-[#016bd0] text-white text-xs px-3 py-1 rounded-full">
                  Featured
                </span>
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="bg-[#016bd0]/10 text-[#016bd0] text-xs px-3 py-1 rounded-full"
                    style={{ fontWeight: 500 }}
                  >
                    {featured.tag}
                  </span>
                  <span className="flex items-center gap-1.5 text-[#1e2b56]/50 text-sm">
                    <Calendar size={13} /> {featured.date}
                  </span>
                </div>
                <h2
                  className="text-[#1e2b56] text-2xl md:text-3xl"
                  style={{ fontWeight: 600, lineHeight: 1.3 }}
                >
                  {featured.title}
                </h2>
                <p className="text-[#1e2b56]/60 text-base mt-3" style={{ lineHeight: 1.7 }}>
                  {featured.desc}
                </p>
                <button
                  className="flex items-center gap-2 mt-5 text-[#016bd0] cursor-pointer group/btn"
                  style={{ fontWeight: 500 }}
                >
                  Read Full Article
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover/btn:translate-x-1"
                  />
                </button>
              </div>
            </motion.div>
          )}

          {/* Articles Grid */}
          {rest.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {rest.map((article, i) => (
                <motion.article
                  key={`${article.title}-${i}`}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow group cursor-pointer"
                >
                  <div className="relative h-[200px] overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 bg-[#016bd0] text-white text-xs px-2.5 py-0.5 rounded-full">
                      {article.tag}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-1.5 text-[#016bd0] text-sm mb-2">
                      <Calendar size={13} />
                      {article.date}
                    </div>
                    <h3
                      className="text-[#1e2b56] text-base md:text-lg"
                      style={{ fontWeight: 600, lineHeight: 1.4 }}
                    >
                      {article.title}
                    </h3>
                    <p
                      className="text-[#1e2b56]/60 text-sm mt-2 flex-1"
                      style={{ lineHeight: 1.6 }}
                    >
                      {article.desc}
                    </p>
                    <button
                      className="flex items-center gap-1.5 mt-4 text-[#016bd0] text-sm cursor-pointer group/btn"
                      style={{ fontWeight: 500 }}
                    >
                      Read More{' '}
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover/btn:translate-x-1"
                      />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/40 text-lg">No articles found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#016bd0] py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-[700px] mx-auto text-center">
          <h2 className="text-white text-2xl md:text-3xl" style={{ fontWeight: 600 }}>
            Subscribe to Our Newsletter
          </h2>
          <p className="text-white/80 mt-3">
            Get the latest news, product launches, and exclusive offers delivered straight to your
            inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-6 max-w-[500px] mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-white/20 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/50 outline-none focus:border-white transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white text-[#016bd0] px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
              style={{ fontWeight: 600 }}
            >
              Subscribe
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};
