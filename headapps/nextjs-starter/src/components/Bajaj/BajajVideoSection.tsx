import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TextField, ImageField, Text, Image as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Title: TextField;
  VideoUrl: TextField;
  BackgroundImage: ImageField;
}

type BajajVideoSectionProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const FallbackComponent = (props: BajajVideoSectionProps): JSX.Element => (
  <div className={`component bajaj-video-section ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Bajaj Video Section</span>
    </div>
  </div>
);

export const Default = (props: BajajVideoSectionProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const [playing, setPlaying] = useState(false);

  if (!props.fields) return <FallbackComponent {...props} />;

  const videoUrl = String(
    props.fields.VideoUrl?.value ?? 'https://www.youtube.com/embed/YfPj7RqHVN8?autoplay=1'
  );

  return (
    <div
      className={`component bajaj-video-section ${props.params?.styles}`}
      id={id ? id : undefined}
    >
      <section className="relative w-full h-[400px] md:h-[700px] lg:h-[980px] overflow-hidden">
        {props.fields.BackgroundImage?.value?.src ? (
          <JssImage
            field={props.fields.BackgroundImage}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] to-[#1e2b56]" />
        )}
        <div className="absolute inset-0 bg-black/65" />

        <AnimatePresence>
          {!playing ? (
            <motion.div
              key="play"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-6"
            >
              <motion.button
                onClick={() => setPlaying(true)}
                className="size-16 md:size-20 rounded-full border-2 border-white flex items-center justify-center hover:bg-white/20 transition-colors group cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Play video"
              >
                <Play
                  size={32}
                  className="text-white ml-1 group-hover:scale-110 transition-transform"
                  fill="white"
                />
              </motion.button>
              <p className="text-white/70 text-base md:text-xl tracking-wide">
                {props.fields.Title ? <Text field={props.fields.Title} /> : 'Watch Our Story'}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="video"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black"
            >
              <iframe
                className="w-full h-full md:w-[85%] md:h-[85%] lg:w-[80%] lg:h-[80%] rounded-lg"
                src={videoUrl}
                title="Bajaj Auto Video"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
              <button
                onClick={() => setPlaying(false)}
                className="absolute top-4 right-4 md:top-8 md:right-8 text-white bg-black/60 rounded-full size-10 flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
                aria-label="Close video"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

