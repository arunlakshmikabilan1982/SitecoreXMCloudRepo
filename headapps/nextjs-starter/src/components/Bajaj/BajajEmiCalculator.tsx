import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, FileText, Clock, IndianRupee, ChevronDown, ChevronUp } from 'lucide-react';
import { TextField, LinkField, Text, Link as JssLink } from '@sitecore-jss/sitecore-jss-nextjs';

const partners = [
  { name: 'Bajaj Finance', rate: '7.99%', tenure: '12–60 months', processing: '₹999' },
  { name: 'HDFC Bank', rate: '8.50%', tenure: '12–48 months', processing: '₹1,499' },
  { name: 'ICICI Bank', rate: '8.75%', tenure: '12–48 months', processing: '₹1,299' },
  { name: 'State Bank of India', rate: '9.15%', tenure: '12–60 months', processing: '₹999' },
  { name: 'Axis Bank', rate: '9.25%', tenure: '12–36 months', processing: '₹1,199' },
];

const steps = [
  {
    icon: FileText,
    title: 'Submit Application',
    desc: 'Fill out a simple online form with your basic details and preferred vehicle.',
  },
  {
    icon: Clock,
    title: 'Instant Approval',
    desc: 'Get approval within minutes with minimal documentation required.',
  },
  {
    icon: CheckCircle,
    title: 'Choose Your Plan',
    desc: 'Select EMI tenure and down payment that fits your budget perfectly.',
  },
  {
    icon: IndianRupee,
    title: 'Drive Home',
    desc: 'Complete the process at your nearest dealer and ride home happy.',
  },
];

const faqs = [
  {
    q: 'What documents are required for a vehicle loan?',
    a: 'You need an Aadhaar card, PAN card, latest salary slips (for salaried) or ITR (for self-employed), bank statement of last 3 months, and 2 passport-size photographs.',
  },
  {
    q: 'Can I prepay or foreclose my loan?',
    a: 'Yes, you can prepay or foreclose your loan after 6 months. A nominal foreclosure charge of 2–4% of the outstanding principal may apply depending on the lender.',
  },
  {
    q: 'What is the maximum loan tenure available?',
    a: 'Loan tenure ranges from 12 to 60 months depending on the financing partner and vehicle model. Longer tenures result in lower EMIs.',
  },
  {
    q: 'Is there a zero down payment option?',
    a: 'Yes, zero down payment schemes are available on select models through Bajaj Finance. Eligibility depends on your credit score and income.',
  },
  {
    q: 'How is the interest rate determined?',
    a: 'Interest rates are based on your CIBIL score, income, loan amount, tenure, and the financing partner. Higher credit scores attract lower rates.',
  },
];

interface Fields {
  Title: TextField;
  Description: TextField;
  CTALink: LinkField;
}

type BajajEmiCalculatorProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const FallbackComponent = (props: BajajEmiCalculatorProps): JSX.Element => (
  <div className={`component bajaj-emi-calculator ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Bajaj EMI Calculator</span>
    </div>
  </div>
);

export const Default = (props: BajajEmiCalculatorProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const [loanAmount, setLoanAmount] = useState(150000);
  const [tenure, setTenure] = useState(36);
  const [rate] = useState(7.99);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const monthlyRate = rate / 12 / 100;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1)
  );
  const totalPayable = emi * tenure;
  const totalInterest = totalPayable - loanAmount;

  if (!props.fields) return <FallbackComponent {...props} />;

  return (
    <div
      className={`component bajaj-emi-calculator ${props.params?.styles}`}
      id={id ? id : undefined}
    >
      {/* Hero */}
      <section className="relative bg-[#016bd0] overflow-hidden py-16 md:py-24 px-6 md:px-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white rounded-full blur-[180px] translate-y-1/2 -translate-x-1/3" />
        </div>
        <div className="max-w-[1824px] mx-auto relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/70 text-base tracking-wide mb-2" style={{ fontWeight: 500 }}>
              FINANCING
            </p>
            <h1
              className="text-white tracking-[0.37px]"
              style={{ fontSize: 'clamp(2rem, 5vw, 56px)', lineHeight: 1.15 }}
            >
              {props.fields.Title ? <Text field={props.fields.Title} /> : 'Easy Financing Options'}
            </h1>
            <p
              className="text-white/80 mt-4 max-w-[600px]"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 20px)', lineHeight: 1.6 }}
            >
              {props.fields.Description ? (
                <Text field={props.fields.Description} />
              ) : (
                'Affordable EMI plans, low interest rates, and quick approval to help you ride home your dream Bajaj vehicle today.'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* EMI Calculator */}
      <section className="bg-[#1e2b56] py-12 md:py-20 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-white text-center text-2xl md:text-4xl mb-10"
            style={{ fontWeight: 600 }}
          >
            EMI Calculator
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sliders */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8"
            >
              <div className="mb-8">
                <div className="flex justify-between mb-3">
                  <span className="text-white/70 text-sm">Loan Amount</span>
                  <span className="text-white text-lg" style={{ fontWeight: 600 }}>
                    ₹{loanAmount.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={30000}
                  max={500000}
                  step={5000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-[#016bd0] h-2 rounded-full cursor-pointer"
                />
                <div className="flex justify-between text-white/40 text-xs mt-1">
                  <span>₹30,000</span>
                  <span>₹5,00,000</span>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex justify-between mb-3">
                  <span className="text-white/70 text-sm">Tenure</span>
                  <span className="text-white text-lg" style={{ fontWeight: 600 }}>
                    {tenure} months
                  </span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={60}
                  step={6}
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full accent-[#016bd0] h-2 rounded-full cursor-pointer"
                />
                <div className="flex justify-between text-white/40 text-xs mt-1">
                  <span>12 months</span>
                  <span>60 months</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/70 text-sm">Interest Rate</span>
                  <span className="text-white text-lg" style={{ fontWeight: 600 }}>
                    {rate}% p.a.
                  </span>
                </div>
                <p className="text-white/40 text-xs">Starting rate with Bajaj Finance</p>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 md:p-8 flex flex-col justify-center"
            >
              <div className="text-center mb-6">
                <p className="text-[#1e2b56]/60 text-sm mb-1">Monthly EMI</p>
                <p
                  className="text-[#016bd0]"
                  style={{ fontSize: 'clamp(2rem, 5vw, 48px)', fontWeight: 700 }}
                >
                  ₹{emi.toLocaleString()}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6">
                <div className="text-center">
                  <p className="text-[#1e2b56]/50 text-xs">Principal</p>
                  <p className="text-[#1e2b56] text-lg" style={{ fontWeight: 600 }}>
                    ₹{loanAmount.toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[#1e2b56]/50 text-xs">Interest</p>
                  <p className="text-[#1e2b56] text-lg" style={{ fontWeight: 600 }}>
                    ₹{totalInterest.toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[#1e2b56]/50 text-xs">Total Payable</p>
                  <p className="text-[#1e2b56] text-lg" style={{ fontWeight: 600 }}>
                    ₹{totalPayable.toLocaleString()}
                  </p>
                </div>
              </div>
              {props.fields.CTALink ? (
                <JssLink
                  field={props.fields.CTALink}
                  className="mt-6 bg-[#016bd0] text-white py-3 rounded hover:bg-[#0155a8] transition-colors cursor-pointer w-full text-center block"
                  style={{ fontWeight: 500 }}
                />
              ) : (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-6 bg-[#016bd0] text-white py-3 rounded hover:bg-[#0155a8] transition-colors cursor-pointer w-full"
                  style={{ fontWeight: 500 }}
                >
                  Apply for Financing
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#0f172a] py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="text-white text-center text-2xl md:text-3xl mb-12"
            style={{ fontWeight: 600 }}
          >
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="relative mx-auto mb-4">
                  <div className="bg-[#016bd0] size-16 rounded-full flex items-center justify-center mx-auto">
                    <s.icon size={28} className="text-white" />
                  </div>
                  <span
                    className="absolute -top-2 -right-2 bg-white text-[#016bd0] size-7 rounded-full flex items-center justify-center text-sm"
                    style={{ fontWeight: 700 }}
                  >
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-white text-lg" style={{ fontWeight: 600 }}>
                  {s.title}
                </h3>
                <p className="text-white/60 text-sm mt-2">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Finance Partners */}
      <section className="bg-[#1e2b56] py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="text-white text-center text-2xl md:text-3xl mb-10"
            style={{ fontWeight: 600 }}
          >
            Our Financing Partners
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th
                    className="text-left text-white/60 text-sm py-3 px-4"
                    style={{ fontWeight: 500 }}
                  >
                    Partner
                  </th>
                  <th
                    className="text-left text-white/60 text-sm py-3 px-4"
                    style={{ fontWeight: 500 }}
                  >
                    Interest Rate
                  </th>
                  <th
                    className="text-left text-white/60 text-sm py-3 px-4"
                    style={{ fontWeight: 500 }}
                  >
                    Tenure
                  </th>
                  <th
                    className="text-left text-white/60 text-sm py-3 px-4"
                    style={{ fontWeight: 500 }}
                  >
                    Processing Fee
                  </th>
                </tr>
              </thead>
              <tbody>
                {partners.map((p) => (
                  <tr
                    key={p.name}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="text-white py-4 px-4" style={{ fontWeight: 500 }}>
                      {p.name}
                    </td>
                    <td className="text-[#016bd0] py-4 px-4" style={{ fontWeight: 600 }}>
                      {p.rate}
                    </td>
                    <td className="text-white/70 py-4 px-4">{p.tenure}</td>
                    <td className="text-white/70 py-4 px-4">{p.processing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-[#0f172a] py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-[900px] mx-auto">
          <h2
            className="text-white text-center text-2xl md:text-3xl mb-10"
            style={{ fontWeight: 600 }}
          >
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                >
                  <span className="text-white text-base pr-4" style={{ fontWeight: 500 }}>
                    {faq.q}
                  </span>
                  {openFaq === i ? (
                    <ChevronUp size={20} className="text-[#016bd0] shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-white/40 shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="px-5 pb-5"
                  >
                    <p className="text-white/60 text-sm" style={{ lineHeight: 1.7 }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

