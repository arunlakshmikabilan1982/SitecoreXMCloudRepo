import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Phone,
  MapPin,
  Calendar,
  Bike,
  CheckCircle,
  Loader2,
  Mail,
  Clock,
  Shield,
  Star,
} from 'lucide-react';
import { TextField, ImageField, Text, Image as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';

const models = [
  'Pulsar N160',
  'Pulsar NS200',
  'Pulsar N250',
  'Dominar 400',
  'Chetak 2901',
  'Chetak 3201',
  'Platina 110',
  'CT 125X',
  'KTM Duke 200',
  'KTM RC 390',
  'KTM Adventure 250',
];

const cities = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Pune',
  'Chennai',
  'Hyderabad',
  'Kolkata',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
];

const testimonials = [
  {
    name: 'Rahul Sharma',
    city: 'Mumbai',
    text: 'Booked a test drive for the Pulsar NS200 online and the experience was seamless. The dealer was well-prepared and the bike exceeded my expectations!',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    city: 'Bangalore',
    text: 'The Chetak Electric test drive convinced me instantly. Smooth, silent, and stylish — I placed my order the very same day.',
    rating: 5,
  },
  {
    name: 'Arun Kumar',
    city: 'Chennai',
    text: 'Great test drive experience at the Bajaj dealership. The staff was knowledgeable and helped me compare different models side by side.',
    rating: 4,
  },
];

interface Fields {
  Title: TextField;
  Description: TextField;
  BackgroundImage: ImageField;
}

type BajajBookTestDrivePageProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const FallbackComponent = (props: BajajBookTestDrivePageProps): JSX.Element => (
  <div className={`component bajaj-book-test-drive-page ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Bajaj Book Test Drive Page</span>
    </div>
  </div>
);

export const Default = (props: BajajBookTestDrivePageProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    model: '',
    city: '',
    dealer: '',
    date: '',
    time: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^[\d+\s-]{10,15}$/.test(formData.phone.trim()))
      errs.phone = 'Enter a valid phone number';
    if (!formData.model) errs.model = 'Please select a model';
    if (!formData.city) errs.city = 'Please select a city';
    if (!formData.date) errs.date = 'Please select a date';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  if (!props.fields) return <FallbackComponent {...props} />;

  return (
    <div
      className={`component bajaj-book-test-drive-page ${props.params?.styles}`}
      id={id ? id : undefined}
    >
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 px-6 md:px-12">
        <div className="absolute inset-0">
          {props.fields.BackgroundImage?.value?.src ? (
            <JssImage field={props.fields.BackgroundImage} className="w-full h-full object-cover" />
          ) : (
            <img
              src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&q=80"
              alt=""
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="max-w-[1824px] mx-auto relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#016bd0] text-base tracking-wide mb-2" style={{ fontWeight: 500 }}>
              TEST DRIVE
            </p>
            <h1
              className="text-white"
              style={{ fontSize: 'clamp(2rem, 5vw, 56px)', lineHeight: 1.15 }}
            >
              {props.fields.Title ? (
                <Text field={props.fields.Title} />
              ) : (
                <>
                  Book a Free
                  <br />
                  Test Drive
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
                'Experience the thrill firsthand. Book a test ride at your nearest Bajaj dealership and feel the difference.'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[#016bd0] py-8 md:py-10 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Shield, text: '100% Free' },
            { icon: Clock, text: '30 Min Session' },
            { icon: MapPin, text: '2,000+ Dealers' },
            { icon: Star, text: 'Expert Guidance' },
          ].map((b) => (
            <div key={b.text} className="flex items-center gap-3 justify-center">
              <b.icon size={20} className="text-white/80" />
              <span className="text-white text-sm md:text-base" style={{ fontWeight: 500 }}>
                {b.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-[#0f172a] py-12 md:py-20 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-16">
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white rounded-lg p-8 md:p-12 text-center"
                >
                  <CheckCircle size={72} className="text-green-500 mx-auto mb-4" />
                  <h2 className="text-[#1e2b56] text-2xl md:text-3xl" style={{ fontWeight: 600 }}>
                    Test Drive Booked!
                  </h2>
                  <p className="text-[#1e2b56]/60 mt-3 max-w-[400px] mx-auto">
                    Thank you, {formData.name}! We&apos;ve received your request. Our dealer team
                    will contact you at {formData.phone} to confirm your test drive.
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4 mt-6 max-w-[350px] mx-auto text-left">
                    <p className="text-[#1e2b56] text-sm" style={{ fontWeight: 500 }}>
                      Booking Summary:
                    </p>
                    <p className="text-[#1e2b56]/70 text-sm mt-1">Model: {formData.model}</p>
                    <p className="text-[#1e2b56]/70 text-sm">City: {formData.city}</p>
                    <p className="text-[#1e2b56]/70 text-sm">Date: {formData.date}</p>
                    {formData.time && (
                      <p className="text-[#1e2b56]/70 text-sm">Time: {formData.time}</p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        model: '',
                        city: '',
                        dealer: '',
                        date: '',
                        time: '',
                      });
                    }}
                    className="mt-6 bg-[#016bd0] text-white px-8 py-3 rounded hover:bg-[#0155a8] transition-colors cursor-pointer"
                    style={{ fontWeight: 500 }}
                  >
                    Book Another
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-lg p-6 md:p-8"
                >
                  <h2
                    className="text-[#1e2b56] text-xl md:text-2xl mb-1"
                    style={{ fontWeight: 600 }}
                  >
                    Fill in Your Details
                  </h2>
                  <p className="text-[#1e2b56]/50 text-sm mb-6">
                    All fields marked with * are required
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[#314158] text-sm" style={{ fontWeight: 500 }}>
                          Full Name *
                        </label>
                        <div className="relative">
                          <User
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#90a1b9]"
                          />
                          <input
                            type="text"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            className={`w-full border rounded-lg pl-10 pr-4 py-3 text-base text-black placeholder:text-black/40 outline-none transition-colors ${
                              errors.name
                                ? 'border-red-400 bg-red-50/50'
                                : 'border-[#cad5e2] focus:border-[#016bd0]'
                            }`}
                          />
                        </div>
                        {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[#314158] text-sm" style={{ fontWeight: 500 }}>
                          Email
                        </label>
                        <div className="relative">
                          <Mail
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#90a1b9]"
                          />
                          <input
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="w-full border border-[#cad5e2] rounded-lg pl-10 pr-4 py-3 text-base text-black placeholder:text-black/40 outline-none focus:border-[#016bd0] transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[#314158] text-sm" style={{ fontWeight: 500 }}>
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#90a1b9]"
                          />
                          <input
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className={`w-full border rounded-lg pl-10 pr-4 py-3 text-base text-black placeholder:text-black/40 outline-none transition-colors ${
                              errors.phone
                                ? 'border-red-400 bg-red-50/50'
                                : 'border-[#cad5e2] focus:border-[#016bd0]'
                            }`}
                          />
                        </div>
                        {errors.phone && (
                          <span className="text-red-500 text-xs">{errors.phone}</span>
                        )}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[#314158] text-sm" style={{ fontWeight: 500 }}>
                          Select Model *
                        </label>
                        <div className="relative">
                          <Bike
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#90a1b9]"
                          />
                          <select
                            value={formData.model}
                            onChange={(e) => handleChange('model', e.target.value)}
                            className={`w-full border rounded-lg pl-10 pr-4 py-3 text-base outline-none transition-colors appearance-none bg-white ${
                              formData.model ? 'text-black' : 'text-black/40'
                            } ${
                              errors.model
                                ? 'border-red-400 bg-red-50/50'
                                : 'border-[#cad5e2] focus:border-[#016bd0]'
                            }`}
                          >
                            <option value="">Choose a model</option>
                            {models.map((m) => (
                              <option key={m} value={m}>
                                {m}
                              </option>
                            ))}
                          </select>
                        </div>
                        {errors.model && (
                          <span className="text-red-500 text-xs">{errors.model}</span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[#314158] text-sm" style={{ fontWeight: 500 }}>
                          City *
                        </label>
                        <div className="relative">
                          <MapPin
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#90a1b9]"
                          />
                          <select
                            value={formData.city}
                            onChange={(e) => handleChange('city', e.target.value)}
                            className={`w-full border rounded-lg pl-10 pr-4 py-3 text-base outline-none transition-colors appearance-none bg-white ${
                              formData.city ? 'text-black' : 'text-black/40'
                            } ${
                              errors.city
                                ? 'border-red-400 bg-red-50/50'
                                : 'border-[#cad5e2] focus:border-[#016bd0]'
                            }`}
                          >
                            <option value="">Select city</option>
                            {cities.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                        </div>
                        {errors.city && <span className="text-red-500 text-xs">{errors.city}</span>}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[#314158] text-sm" style={{ fontWeight: 500 }}>
                          Preferred Dealer
                        </label>
                        <div className="relative">
                          <MapPin
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#90a1b9]"
                          />
                          <input
                            type="text"
                            placeholder="Nearest dealership (optional)"
                            value={formData.dealer}
                            onChange={(e) => handleChange('dealer', e.target.value)}
                            className="w-full border border-[#cad5e2] rounded-lg pl-10 pr-4 py-3 text-base text-black placeholder:text-black/40 outline-none focus:border-[#016bd0] transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[#314158] text-sm" style={{ fontWeight: 500 }}>
                          Preferred Date *
                        </label>
                        <div className="relative">
                          <Calendar
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#90a1b9]"
                          />
                          <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => handleChange('date', e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className={`w-full border rounded-lg pl-10 pr-4 py-3 text-base text-black outline-none transition-colors ${
                              errors.date
                                ? 'border-red-400 bg-red-50/50'
                                : 'border-[#cad5e2] focus:border-[#016bd0]'
                            }`}
                          />
                        </div>
                        {errors.date && <span className="text-red-500 text-xs">{errors.date}</span>}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[#314158] text-sm" style={{ fontWeight: 500 }}>
                          Preferred Time
                        </label>
                        <div className="relative">
                          <Clock
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#90a1b9]"
                          />
                          <select
                            value={formData.time}
                            onChange={(e) => handleChange('time', e.target.value)}
                            className={`w-full border border-[#cad5e2] rounded-lg pl-10 pr-4 py-3 text-base outline-none transition-colors appearance-none bg-white ${
                              formData.time ? 'text-black' : 'text-black/40'
                            }`}
                          >
                            <option value="">Select time (optional)</option>
                            {[
                              '10:00 AM',
                              '11:00 AM',
                              '12:00 PM',
                              '2:00 PM',
                              '3:00 PM',
                              '4:00 PM',
                              '5:00 PM',
                            ].map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: submitting ? 1 : 1.02 }}
                      whileTap={{ scale: submitting ? 1 : 0.98 }}
                      className="bg-[#016bd0] text-white text-base py-3.5 rounded-lg hover:bg-[#0155a8] transition-colors disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer mt-2"
                      style={{ fontWeight: 500 }}
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Booking...
                        </>
                      ) : (
                        'Book My Test Drive'
                      )}
                    </motion.button>

                    <p className="text-[#62748e] text-xs text-center">
                      By submitting, you agree to our Terms &amp; Conditions and Privacy Policy
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-white text-lg mb-4" style={{ fontWeight: 600 }}>
                What to Expect
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  { step: '1', text: 'Choose your preferred model and dealership location' },
                  { step: '2', text: 'Our dealer will call to confirm your appointment' },
                  { step: '3', text: 'Visit the dealership with a valid driving license' },
                  { step: '4', text: 'Enjoy a 30-minute guided test ride experience' },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-3">
                    <div className="bg-[#016bd0] size-7 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-white text-xs" style={{ fontWeight: 600 }}>
                        {s.step}
                      </span>
                    </div>
                    <p className="text-white/70 text-sm" style={{ lineHeight: 1.5 }}>
                      {s.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-white text-lg mb-4" style={{ fontWeight: 600 }}>
                Customer Reviews
              </h3>
              <div className="flex flex-col gap-4">
                {testimonials.map((t) => (
                  <div
                    key={t.name}
                    className="border-b border-white/5 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} size={13} className="text-amber-400" fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-white/60 text-sm italic" style={{ lineHeight: 1.5 }}>
                      &quot;{t.text}&quot;
                    </p>
                    <p className="text-white/40 text-xs mt-2">
                      — {t.name}, {t.city}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
