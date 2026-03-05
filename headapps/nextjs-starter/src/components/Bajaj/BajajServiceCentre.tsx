import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Phone,
  Clock,
  Search,
  Wrench,
  Shield,
  ChevronDown,
  Navigation,
  Star,
  CheckCircle,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { TextField, ImageField, Text, Image as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';

interface ServiceCentre {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  rating: number;
  hours: string;
  services: string[];
  certified: boolean;
}

const states = [
  'All States',
  'Maharashtra',
  'Karnataka',
  'Tamil Nadu',
  'Delhi NCR',
  'Gujarat',
  'Rajasthan',
  'Uttar Pradesh',
  'West Bengal',
  'Telangana',
  'Kerala',
];

const centres: ServiceCentre[] = [
  {
    id: 1,
    name: 'Bajaj ProBiking Service - Dadar',
    address: 'Senapati Bapat Marg, Dadar West',
    city: 'Mumbai',
    state: 'Maharashtra',
    phone: '+91 22 2430 1234',
    rating: 4.6,
    hours: '8:00 AM - 7:00 PM',
    services: ['General Service', 'Engine Overhaul', 'Body Repair', 'Insurance Claims'],
    certified: true,
  },
  {
    id: 2,
    name: 'Bajaj Authorised Service - Kothrud',
    address: 'Paud Road, Near Kothrud Depot',
    city: 'Pune',
    state: 'Maharashtra',
    phone: '+91 20 2546 7890',
    rating: 4.8,
    hours: '8:30 AM - 7:30 PM',
    services: ['General Service', 'Periodic Maintenance', 'Genuine Spare Parts', 'EV Service'],
    certified: true,
  },
  {
    id: 3,
    name: 'Bajaj Service Hub - Koramangala',
    address: '80 Feet Road, Koramangala 4th Block',
    city: 'Bangalore',
    state: 'Karnataka',
    phone: '+91 80 4150 3456',
    rating: 4.7,
    hours: '8:00 AM - 7:00 PM',
    services: [
      'General Service',
      'Electrical Diagnostics',
      'Performance Tuning',
      'Roadside Assistance',
    ],
    certified: true,
  },
  {
    id: 4,
    name: 'Bajaj Service Centre - Anna Nagar',
    address: '2nd Avenue, Anna Nagar West',
    city: 'Chennai',
    state: 'Tamil Nadu',
    phone: '+91 44 2626 7890',
    rating: 4.4,
    hours: '8:30 AM - 6:30 PM',
    services: ['General Service', 'Oil Change', 'Brake Service', 'Suspension Repair'],
    certified: true,
  },
  {
    id: 5,
    name: 'Bajaj Express Service - Karol Bagh',
    address: 'Ajmal Khan Road, Karol Bagh',
    city: 'New Delhi',
    state: 'Delhi NCR',
    phone: '+91 11 2572 3456',
    rating: 4.5,
    hours: '9:00 AM - 7:00 PM',
    services: ['Express Service', 'General Service', 'Body Repair', 'Warranty Service'],
    certified: true,
  },
  {
    id: 6,
    name: 'Bajaj Service Point - Maninagar',
    address: 'Near Maninagar Railway Station',
    city: 'Ahmedabad',
    state: 'Gujarat',
    phone: '+91 79 2545 1234',
    rating: 4.3,
    hours: '8:00 AM - 7:00 PM',
    services: ['General Service', 'Periodic Maintenance', 'Spare Parts'],
    certified: false,
  },
  {
    id: 7,
    name: 'Bajaj Service Workshop - Vaishali Nagar',
    address: 'Vaishali Nagar, Near Ridhi Sidhi Circle',
    city: 'Jaipur',
    state: 'Rajasthan',
    phone: '+91 141 401 5678',
    rating: 4.2,
    hours: '8:30 AM - 6:30 PM',
    services: ['General Service', 'Oil Change', 'Chain & Sprocket'],
    certified: false,
  },
  {
    id: 8,
    name: 'Bajaj Multi-Brand Service - Gomti Nagar',
    address: 'Vibhuti Khand, Gomti Nagar',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    phone: '+91 522 400 7890',
    rating: 4.0,
    hours: '9:00 AM - 6:00 PM',
    services: ['General Service', 'Engine Service', 'Electrical Repair'],
    certified: false,
  },
  {
    id: 9,
    name: 'Bajaj Service Centre - Salt Lake',
    address: 'Sector V, Salt Lake City',
    city: 'Kolkata',
    state: 'West Bengal',
    phone: '+91 33 4060 1234',
    rating: 4.5,
    hours: '8:30 AM - 7:00 PM',
    services: ['General Service', 'Periodic Maintenance', 'EV Service', 'Warranty Service'],
    certified: true,
  },
  {
    id: 10,
    name: 'Bajaj ProService - Madhapur',
    address: 'Hitech City Road, Madhapur',
    city: 'Hyderabad',
    state: 'Telangana',
    phone: '+91 40 4850 5678',
    rating: 4.7,
    hours: '8:00 AM - 8:00 PM',
    services: [
      'Express Service',
      'General Service',
      'Performance Tuning',
      'Genuine Parts',
      'EV Service',
    ],
    certified: true,
  },
  {
    id: 11,
    name: 'Bajaj Certified Workshop - Edappally',
    address: 'NH 66, Near Lulu Mall',
    city: 'Kochi',
    state: 'Kerala',
    phone: '+91 484 280 3456',
    rating: 4.4,
    hours: '8:30 AM - 6:30 PM',
    services: ['General Service', 'Periodic Maintenance', 'Spare Parts', 'Insurance Claims'],
    certified: true,
  },
  {
    id: 12,
    name: 'Bajaj Service Station - Nagpur',
    address: 'Dharampeth Extension, Near Medical Square',
    city: 'Nagpur',
    state: 'Maharashtra',
    phone: '+91 712 254 7890',
    rating: 4.1,
    hours: '9:00 AM - 6:00 PM',
    services: ['General Service', 'Oil Change', 'Brake Service'],
    certified: false,
  },
];

const serviceTypes = [
  'All Services',
  'General Service',
  'Express Service',
  'EV Service',
  'Engine Overhaul',
  'Body Repair',
  'Performance Tuning',
];

const servicePackages = [
  {
    name: 'Basic Service',
    price: '₹799',
    duration: '1-2 Hours',
    includes: [
      'Engine oil change',
      'Oil filter replacement',
      'Air filter cleaning',
      'Chain lubrication',
      'Basic inspection',
    ],
  },
  {
    name: 'Standard Service',
    price: '₹1,499',
    duration: '2-3 Hours',
    includes: [
      'Everything in Basic',
      'Brake pad inspection',
      'Spark plug check',
      'Coolant top-up',
      'Battery health check',
      'Throttle cable adjustment',
    ],
  },
  {
    name: 'Comprehensive Service',
    price: '₹2,999',
    duration: '4-5 Hours',
    includes: [
      'Everything in Standard',
      'Complete engine tune-up',
      'Suspension check',
      'Electrical diagnostics',
      'Carburetor / FI cleaning',
      'Full body wash & polish',
      'Road test verification',
    ],
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={14}
          className={s <= Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
        />
      ))}
      <span className="text-sm text-gray-600 ml-1">{rating}</span>
    </div>
  );
}

interface Fields {
  Title: TextField;
  Description: TextField;
  BackgroundImage: ImageField;
}

type BajajServiceCentreProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const FallbackComponent = (props: BajajServiceCentreProps): JSX.Element => (
  <div className={`component bajaj-service-centre ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Bajaj Service Centre</span>
    </div>
  </div>
);

export const Default = (props: BajajServiceCentreProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedService, setSelectedService] = useState('All Services');
  const [certifiedOnly, setCertifiedOnly] = useState(false);
  const [expandedCentre, setExpandedCentre] = useState<number | null>(null);

  const filteredCentres = useMemo(() => {
    return centres.filter((c) => {
      const matchesSearch =
        !searchQuery ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesState = selectedState === 'All States' || c.state === selectedState;
      const matchesService =
        selectedService === 'All Services' || c.services.includes(selectedService);
      const matchesCertified = !certifiedOnly || c.certified;
      return matchesSearch && matchesState && matchesService && matchesCertified;
    });
  }, [searchQuery, selectedState, selectedService, certifiedOnly]);

  if (!props.fields) return <FallbackComponent {...props} />;

  return (
    <div
      className={`component bajaj-service-centre ${props.params?.styles}`}
      id={id ? id : undefined}
    >
      {/* Hero */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        {props.fields.BackgroundImage?.value?.src ? (
          <JssImage
            field={props.fields.BackgroundImage}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <img
            src="https://images.unsplash.com/photo-1636761358757-0a616eb9e17e?w=1200&q=80"
            alt="Bajaj Service Centre"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-[1824px] mx-auto w-full"
          >
            <h1
              className="text-white"
              style={{ fontSize: 'clamp(2rem, 5vw, 56px)', lineHeight: 1.1 }}
            >
              {props.fields.Title ? <Text field={props.fields.Title} /> : 'Service Centres'}
            </h1>
            <p
              className="text-white/80 mt-3 max-w-[600px]"
              style={{ fontSize: 'clamp(1rem, 2vw, 20px)' }}
            >
              {props.fields.Description ? (
                <Text field={props.fields.Description} />
              ) : (
                'Expert care for your Bajaj vehicle — find an authorized service centre for maintenance, repairs, and genuine spare parts'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-[#1e2b56] py-6 px-6 md:px-12">
        <div className="max-w-[1824px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '2,500+', label: 'Service Centres' },
            { value: '15,000+', label: 'Trained Technicians' },
            { value: '98%', label: 'Customer Satisfaction' },
            { value: '24/7', label: 'Roadside Assistance' },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                className="text-white"
                style={{ fontSize: 'clamp(1.3rem, 2.5vw, 32px)', fontWeight: 700 }}
              >
                {stat.value}
              </p>
              <p className="text-white/70 mt-1" style={{ fontSize: '14px' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-12 md:py-16 px-6 md:px-12 bg-white">
        <div className="max-w-[1824px] mx-auto">
          <div className="text-center mb-10">
            <h2
              className="text-[#1e2b56]"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 40px)', lineHeight: 1.2 }}
            >
              Service Packages
            </h2>
            <p
              className="text-gray-600 mt-3 max-w-[600px] mx-auto"
              style={{ fontSize: 'clamp(0.95rem, 1.5vw, 18px)' }}
            >
              Choose the right service plan for your vehicle
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {servicePackages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-xl border-2 p-6 md:p-8 relative ${
                  i === 1
                    ? 'border-[#016bd0] shadow-lg shadow-blue-100'
                    : 'border-gray-200 hover:border-gray-300'
                } transition-all`}
              >
                {i === 1 && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#016bd0] text-white text-xs px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-[#1e2b56]" style={{ fontSize: '22px', fontWeight: 600 }}>
                  {pkg.name}
                </h3>
                <p className="text-[#016bd0] mt-2" style={{ fontSize: '32px', fontWeight: 700 }}>
                  {pkg.price}
                  <span className="text-gray-400" style={{ fontSize: '14px', fontWeight: 400 }}>
                    {' '}
                    onwards
                  </span>
                </p>
                <div className="flex items-center gap-2 text-gray-500 mt-2 mb-6">
                  <Clock size={14} />
                  <span style={{ fontSize: '14px' }}>{pkg.duration}</span>
                </div>
                <ul className="space-y-3">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                      <span style={{ fontSize: '14px' }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full mt-6 py-3 rounded-lg transition-colors cursor-pointer ${
                    i === 1
                      ? 'bg-[#016bd0] text-white hover:bg-[#0155a8]'
                      : 'border border-[#016bd0] text-[#016bd0] hover:bg-blue-50'
                  }`}
                  style={{ fontSize: '15px', fontWeight: 500 }}
                >
                  Book Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="bg-gray-100 py-8 px-6 md:px-12">
        <div className="max-w-[1824px] mx-auto">
          <h2
            className="text-[#1e2b56] text-center mb-6"
            style={{ fontSize: 'clamp(1.3rem, 2.5vw, 32px)', lineHeight: 1.2 }}
          >
            Find a Service Centre
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative lg:col-span-2">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by name, city, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-lg bg-white text-gray-800 placeholder:text-gray-400 outline-none border border-gray-200"
                style={{ fontSize: '15px' }}
              />
            </div>
            <div className="relative">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full py-3 px-4 pr-10 rounded-lg bg-white text-gray-800 appearance-none outline-none border border-gray-200 cursor-pointer"
                style={{ fontSize: '15px' }}
              >
                {states.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
            <div className="relative">
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full py-3 px-4 pr-10 rounded-lg bg-white text-gray-800 appearance-none outline-none border border-gray-200 cursor-pointer"
                style={{ fontSize: '15px' }}
              >
                {serviceTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
            <button
              onClick={() => setCertifiedOnly(!certifiedOnly)}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg border transition-colors cursor-pointer ${
                certifiedOnly
                  ? 'bg-[#016bd0] text-white border-[#016bd0]'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
              }`}
              style={{ fontSize: '15px' }}
            >
              <Shield size={16} />
              Certified Only
            </button>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-10 md:py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-[1824px] mx-auto">
          <p className="text-gray-600 mb-8" style={{ fontSize: '16px' }}>
            Showing{' '}
            <span className="text-[#1e2b56]" style={{ fontWeight: 600 }}>
              {filteredCentres.length}
            </span>{' '}
            service centre{filteredCentres.length !== 1 ? 's' : ''}
          </p>

          {filteredCentres.length === 0 ? (
            <div className="text-center py-16">
              <Wrench size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500" style={{ fontSize: '18px' }}>
                No service centres found
              </p>
              <p className="text-gray-400 mt-2" style={{ fontSize: '14px' }}>
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCentres.map((centre, i) => (
                <motion.div
                  key={centre.id}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-2 pr-2">
                        <h3
                          className="text-[#1e2b56]"
                          style={{ fontSize: '17px', fontWeight: 600 }}
                        >
                          {centre.name}
                        </h3>
                        {centre.certified && (
                          <Shield
                            size={18}
                            className="text-green-600 fill-green-100 shrink-0 mt-0.5"
                          />
                        )}
                      </div>
                      <StarRating rating={centre.rating} />
                    </div>

                    {centre.certified && (
                      <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs px-2.5 py-1 rounded-full mb-3">
                        <CheckCircle size={12} />
                        Bajaj Certified
                      </span>
                    )}

                    <div className="flex items-start gap-2 text-gray-600 mb-2">
                      <MapPin size={16} className="mt-0.5 shrink-0 text-[#016bd0]" />
                      <p style={{ fontSize: '14px' }}>
                        {centre.address}, {centre.city}, {centre.state}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Phone size={16} className="shrink-0 text-[#016bd0]" />
                      <p style={{ fontSize: '14px' }}>{centre.phone}</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <Clock size={16} className="shrink-0 text-[#016bd0]" />
                      <p style={{ fontSize: '14px' }}>{centre.hours}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {centre.services.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="bg-[#e8ecf4] text-[#1e2b56] text-xs px-3 py-1 rounded-full"
                        >
                          {s}
                        </span>
                      ))}
                      {centre.services.length > 3 && (
                        <span className="text-gray-400 text-xs px-2 py-1">
                          +{centre.services.length - 3} more
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() =>
                        setExpandedCentre(expandedCentre === centre.id ? null : centre.id)
                      }
                      className="text-[#016bd0] text-sm flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      {expandedCentre === centre.id ? 'Hide Details' : 'View Details'}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${
                          expandedCentre === centre.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {expandedCentre === centre.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-gray-100"
                      >
                        <p
                          className="text-[#1e2b56] mb-3"
                          style={{ fontSize: '14px', fontWeight: 500 }}
                        >
                          All Services Available:
                        </p>
                        <ul className="space-y-2 mb-4">
                          {centre.services.map((s) => (
                            <li key={s} className="flex items-center gap-2 text-gray-600 text-sm">
                              <Wrench size={13} className="text-[#016bd0]" />
                              {s}
                            </li>
                          ))}
                        </ul>
                        <div className="flex gap-3">
                          <button className="flex-1 flex items-center justify-center gap-2 bg-[#016bd0] text-white py-2.5 rounded-lg hover:bg-[#0155a8] transition-colors text-sm cursor-pointer">
                            <Calendar size={14} />
                            Book Service
                          </button>
                          <button className="flex-1 flex items-center justify-center gap-2 border border-[#016bd0] text-[#016bd0] py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-sm cursor-pointer">
                            <Navigation size={14} />
                            Get Directions
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Service Tips */}
      <section className="py-12 md:py-20 px-6 md:px-12 bg-white">
        <div className="max-w-[1824px] mx-auto">
          <div className="text-center mb-10">
            <h2
              className="text-[#1e2b56]"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 40px)', lineHeight: 1.2 }}
            >
              Service Reminders &amp; Tips
            </h2>
            <p
              className="text-gray-600 mt-3 max-w-[600px] mx-auto"
              style={{ fontSize: 'clamp(0.95rem, 1.5vw, 18px)' }}
            >
              Keep your Bajaj vehicle in peak condition
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <AlertCircle size={28} className="text-orange-500" />,
                title: 'First Service',
                interval: '500 - 750 km or 1 month',
                desc: 'Critical break-in period service. Includes oil change, tappet adjustment, and overall inspection. Never skip this!',
              },
              {
                icon: <Wrench size={28} className="text-[#016bd0]" />,
                title: 'Second Service',
                interval: '2,500 - 3,000 km or 3 months',
                desc: 'Comprehensive check including oil change, air filter, chain tension, brake adjustment, and carburetor tuning.',
              },
              {
                icon: <Clock size={28} className="text-green-600" />,
                title: 'Regular Service',
                interval: 'Every 5,000 km or 6 months',
                desc: 'Periodic maintenance to keep your vehicle running smoothly. Includes all fluids, filters, and wear components.',
              },
              {
                icon: <Shield size={28} className="text-purple-600" />,
                title: 'Use Genuine Parts',
                interval: 'Always',
                desc: 'Bajaj Genuine Parts are designed and tested specifically for your vehicle, ensuring optimal performance and safety.',
              },
              {
                icon: <Calendar size={28} className="text-red-500" />,
                title: 'Tyre Care',
                interval: 'Check monthly',
                desc: 'Maintain recommended tyre pressure. Check tread depth regularly and replace tyres when worn beyond safety limits.',
              },
              {
                icon: <CheckCircle size={28} className="text-teal-600" />,
                title: 'Battery Maintenance',
                interval: 'Every 3 months',
                desc: 'Check battery terminals, electrolyte levels, and charging voltage. Replace battery every 2-3 years for best performance.',
              },
            ].map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{tip.icon}</div>
                <h3 className="text-[#1e2b56] mb-1" style={{ fontSize: '18px', fontWeight: 600 }}>
                  {tip.title}
                </h3>
                <p className="text-[#016bd0] mb-3" style={{ fontSize: '13px', fontWeight: 500 }}>
                  {tip.interval}
                </p>
                <p className="text-gray-600" style={{ fontSize: '14px', lineHeight: 1.6 }}>
                  {tip.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

