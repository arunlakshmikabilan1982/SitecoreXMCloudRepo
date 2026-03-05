import React, { useState } from 'react';
import { User, Phone, MapPin, Calendar, Bike, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageField, TextField, Image as JssImage, Text } from '@sitecore-jss/sitecore-jss-nextjs';

const models = [
  'Pulsar N160',
  'Pulsar NS200',
  'Dominar 400',
  'Chetak Electric',
  'Platina 110',
  'CT 125X',
  'KTM Duke 200',
  'KTM RC 390',
];

interface Fields {
  BackgroundImage: ImageField;
  Title: TextField;
  FormTitle: TextField;
  Disclaimer: TextField;
}

type BajajTestDriveFormProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const FallbackComponent = (props: BajajTestDriveFormProps): JSX.Element => (
  <div className={`component bajaj-test-drive-form ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Bajaj Test Drive Form</span>
    </div>
  </div>
);

export const Default = (props: BajajTestDriveFormProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    model: '',
    dealer: '',
    date: '',
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
    if (!formData.dealer.trim()) errs.dealer = 'Dealer location is required';
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
      className={`component bajaj-test-drive-form ${props.params?.styles}`}
      id={id ? id : undefined}
    >
      <section
        id="book-test-drive"
        className="relative w-full overflow-hidden"
        style={{ minHeight: '700px' }}
      >
        {/* Background */}
        <div className="absolute inset-0">
          <JssImage
            field={props.fields.BackgroundImage}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'blur(3px)' }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Left image panel (desktop) */}
        <div className="absolute inset-y-0 left-0 w-[72%] hidden lg:block">
          <JssImage field={props.fields.BackgroundImage} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/46" />
        </div>
        <div className="absolute inset-y-0 right-0 w-[28%] bg-black/20 hidden lg:block" />

        <div className="relative z-10 max-w-[1920px] mx-auto px-6 md:px-12 py-12 md:py-16 flex flex-col lg:flex-row items-center lg:items-start gap-10">
          {/* Left Title */}
          <div className="flex-1 flex items-center">
            <motion.h2
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-white font-bold"
              style={{
                fontSize: 'clamp(3rem, 12vw, 164px)',
                lineHeight: 1,
                letterSpacing: '0.37px',
              }}
            >
              {props.fields.Title ? (
                <Text field={props.fields.Title} />
              ) : (
                <>
                  Book a<br />
                  Test Drive
                </>
              )}
            </motion.h2>
          </div>

          {/* Form Card */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white rounded-lg p-6 md:p-8 shadow-2xl w-full max-w-[584px]"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center gap-4 py-12"
                >
                  <CheckCircle size={64} className="text-green-500" />
                  <h3 className="text-[#0f172b] text-xl md:text-2xl text-center font-semibold">
                    Test Drive Booked!
                  </h3>
                  <p className="text-[#62748e] text-center max-w-[360px]">
                    Thank you, {formData.name}! Our team will contact you shortly to confirm your
                    test drive.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phone: '', model: '', dealer: '', date: '' });
                    }}
                    className="mt-4 bg-[#016bd0] text-white px-6 py-2.5 rounded hover:bg-[#0155a8] transition-colors cursor-pointer"
                  >
                    Book Another
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" exit={{ opacity: 0 }}>
                  <h3 className="text-[#0f172b] text-lg md:text-[22px] tracking-[0.07px] text-center font-medium">
                    {props.fields.FormTitle ? (
                      <Text field={props.fields.FormTitle} />
                    ) : (
                      'Provide your details to book a free test drive'
                    )}
                  </h3>

                  <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#314158] text-sm font-medium tracking-[-0.15px]">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User
                          size={18}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#90a1b9]"
                        />
                        <input
                          type="text"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          className={`w-full border rounded-[10px] pl-10 pr-4 py-3 text-base text-black placeholder:text-black/40 outline-none transition-colors ${
                            errors.name
                              ? 'border-red-400 bg-red-50/50'
                              : 'border-[#cad5e2] focus:border-[#016bd0]'
                          }`}
                        />
                      </div>
                      {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#314158] text-sm font-medium tracking-[-0.15px]">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone
                          size={18}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#90a1b9]"
                        />
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          className={`w-full border rounded-[10px] pl-10 pr-4 py-3 text-base text-black placeholder:text-black/40 outline-none transition-colors ${
                            errors.phone
                              ? 'border-red-400 bg-red-50/50'
                              : 'border-[#cad5e2] focus:border-[#016bd0]'
                          }`}
                        />
                      </div>
                      {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}
                    </div>

                    {/* Model */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#314158] text-sm font-medium tracking-[-0.15px]">
                        Select Model *
                      </label>
                      <div className="relative">
                        <Bike
                          size={18}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#90a1b9]"
                        />
                        <select
                          value={formData.model}
                          onChange={(e) => handleChange('model', e.target.value)}
                          className={`w-full border rounded-[10px] pl-10 pr-4 py-3 text-base outline-none transition-colors appearance-none bg-white ${
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
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#90a1b9"
                            strokeWidth="2"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </div>
                      </div>
                      {errors.model && <span className="text-red-500 text-xs">{errors.model}</span>}
                    </div>

                    {/* Dealer */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#314158] text-sm font-medium tracking-[-0.15px]">
                        Dealer *
                      </label>
                      <div className="relative">
                        <MapPin
                          size={18}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#90a1b9]"
                        />
                        <input
                          type="text"
                          placeholder="Enter your city, area or nearest dealership"
                          value={formData.dealer}
                          onChange={(e) => handleChange('dealer', e.target.value)}
                          className={`w-full border rounded-[10px] pl-10 pr-4 py-3 text-base text-black placeholder:text-black/40 outline-none transition-colors ${
                            errors.dealer
                              ? 'border-red-400 bg-red-50/50'
                              : 'border-[#cad5e2] focus:border-[#016bd0]'
                          }`}
                        />
                      </div>
                      {errors.dealer && (
                        <span className="text-red-500 text-xs">{errors.dealer}</span>
                      )}
                    </div>

                    {/* Date */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#314158] text-sm font-medium tracking-[-0.15px]">
                        Preferred Date *
                      </label>
                      <div className="relative">
                        <Calendar
                          size={18}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#90a1b9]"
                        />
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => handleChange('date', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className={`w-full border rounded-[10px] pl-10 pr-4 py-3 text-base text-black outline-none transition-colors ${
                            errors.date
                              ? 'border-red-400 bg-red-50/50'
                              : 'border-[#cad5e2] focus:border-[#016bd0]'
                          }`}
                        />
                      </div>
                      {errors.date && <span className="text-red-500 text-xs">{errors.date}</span>}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: submitting ? 1 : 1.02 }}
                      whileTap={{ scale: submitting ? 1 : 0.98 }}
                      className="bg-[#016bd0] text-white text-base py-3 rounded hover:bg-[#0155a8] transition-colors disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Book Test Drive'
                      )}
                    </motion.button>

                    <p className="text-[#62748e] text-sm text-center tracking-[-0.15px]">
                      {props.fields.Disclaimer ? (
                        <Text field={props.fields.Disclaimer} />
                      ) : (
                        'By submitting, you agree to our Terms & Conditions'
                      )}
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
