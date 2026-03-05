import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Phone,
  Clock,
  Search,
  Navigation,
  Star,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';
import { TextField, ImageField, Text, Image as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';

interface Dealer {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  rating: number;
  hours: string;
  type: string[];
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

const citiesByState: Record<string, string[]> = {
  'All States': [],
  Maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
  Karnataka: ['Bangalore', 'Mysore', 'Hubli'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
  'Delhi NCR': ['New Delhi', 'Gurgaon', 'Noida'],
  Gujarat: ['Ahmedabad', 'Surat', 'Vadodara'],
  Rajasthan: ['Jaipur', 'Jodhpur', 'Udaipur'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi'],
  'West Bengal': ['Kolkata', 'Siliguri', 'Durgapur'],
  Telangana: ['Hyderabad', 'Warangal', 'Nizamabad'],
  Kerala: ['Kochi', 'Thiruvananthapuram', 'Kozhikode'],
};

const dealers: Dealer[] = [
  {
    id: 1,
    name: 'Bajaj Auto - Andheri West',
    address: 'Plot No. 45, SV Road, Andheri West',
    city: 'Mumbai',
    state: 'Maharashtra',
    phone: '+91 22 2634 5678',
    rating: 4.5,
    hours: '9:00 AM - 8:00 PM',
    type: ['Motorcycles', '3 Wheelers'],
  },
  {
    id: 2,
    name: 'Bajaj Premium Hub - Koregaon Park',
    address: 'Lane 7, Koregaon Park, Near Osho Garden',
    city: 'Pune',
    state: 'Maharashtra',
    phone: '+91 20 2615 9012',
    rating: 4.8,
    hours: '9:30 AM - 8:30 PM',
    type: ['Motorcycles', 'Chetak', 'KTM'],
  },
  {
    id: 3,
    name: 'Bajaj Showroom - Indiranagar',
    address: '100 Feet Road, Indiranagar, Near CMH Road',
    city: 'Bangalore',
    state: 'Karnataka',
    phone: '+91 80 2527 3456',
    rating: 4.6,
    hours: '9:00 AM - 8:00 PM',
    type: ['Motorcycles', 'Chetak', 'Husqvarna'],
  },
  {
    id: 4,
    name: 'Bajaj World - T. Nagar',
    address: '23, Usman Road, T. Nagar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    phone: '+91 44 2434 7890',
    rating: 4.3,
    hours: '9:00 AM - 7:30 PM',
    type: ['Motorcycles', '3 Wheelers'],
  },
  {
    id: 5,
    name: 'Bajaj Elite Motors - Connaught Place',
    address: 'Block A, Connaught Place, Inner Circle',
    city: 'New Delhi',
    state: 'Delhi NCR',
    phone: '+91 11 2341 5678',
    rating: 4.7,
    hours: '10:00 AM - 8:00 PM',
    type: ['Motorcycles', 'Chetak', 'KTM', 'Husqvarna'],
  },
  {
    id: 6,
    name: 'Bajaj Authorised - CG Road',
    address: 'CG Road, Near Swastik Cross Roads',
    city: 'Ahmedabad',
    state: 'Gujarat',
    phone: '+91 79 2640 1234',
    rating: 4.4,
    hours: '9:30 AM - 7:30 PM',
    type: ['Motorcycles', '3 Wheelers'],
  },
  {
    id: 7,
    name: 'Bajaj Hub - MI Road',
    address: 'MI Road, Near Panch Batti',
    city: 'Jaipur',
    state: 'Rajasthan',
    phone: '+91 141 237 5678',
    rating: 4.2,
    hours: '9:00 AM - 8:00 PM',
    type: ['Motorcycles'],
  },
  {
    id: 8,
    name: 'Bajaj Motors - Hazratganj',
    address: 'Hazratganj, Near GPO',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    phone: '+91 522 222 3456',
    rating: 4.1,
    hours: '9:30 AM - 7:30 PM',
    type: ['Motorcycles', '3 Wheelers'],
  },
  {
    id: 9,
    name: 'Bajaj Plaza - Park Street',
    address: '22, Park Street, Near Flurys',
    city: 'Kolkata',
    state: 'West Bengal',
    phone: '+91 33 2229 6789',
    rating: 4.6,
    hours: '10:00 AM - 8:00 PM',
    type: ['Motorcycles', 'Chetak'],
  },
  {
    id: 10,
    name: 'Bajaj Mega Store - Banjara Hills',
    address: 'Road No. 12, Banjara Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    phone: '+91 40 2335 4567',
    rating: 4.5,
    hours: '9:00 AM - 8:30 PM',
    type: ['Motorcycles', 'Chetak', 'KTM'],
  },
  {
    id: 11,
    name: 'Bajaj Showroom - MG Road',
    address: 'MG Road, Near Panampilly Nagar',
    city: 'Kochi',
    state: 'Kerala',
    phone: '+91 484 237 8901',
    rating: 4.3,
    hours: '9:30 AM - 7:30 PM',
    type: ['Motorcycles', 'Chetak'],
  },
  {
    id: 12,
    name: 'Bajaj Premium - Jubilee Hills',
    address: 'Road No. 36, Jubilee Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    phone: '+91 40 2360 1234',
    rating: 4.9,
    hours: '10:00 AM - 9:00 PM',
    type: ['Motorcycles', 'KTM', 'Husqvarna', 'Chetak'],
  },
];

const vehicleTypes = ['All', 'Motorcycles', 'Chetak', 'KTM', 'Husqvarna', '3 Wheelers'];

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

type BajajDealerLocatorProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const FallbackComponent = (props: BajajDealerLocatorProps): JSX.Element => (
  <div className={`component bajaj-dealer-locator ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Bajaj Dealer Locator</span>
    </div>
  </div>
);

export const Default = (props: BajajDealerLocatorProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [expandedDealer, setExpandedDealer] = useState<number | null>(null);

  const availableCities = selectedState === 'All States' ? [] : citiesByState[selectedState] || [];

  const filteredDealers = useMemo(() => {
    return dealers.filter((d) => {
      const matchesSearch =
        !searchQuery ||
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesState = selectedState === 'All States' || d.state === selectedState;
      const matchesCity = !selectedCity || d.city === selectedCity;
      const matchesType = selectedType === 'All' || d.type.includes(selectedType);
      return matchesSearch && matchesState && matchesCity && matchesType;
    });
  }, [searchQuery, selectedState, selectedCity, selectedType]);

  if (!props.fields) return <FallbackComponent {...props} />;

  return (
    <div
      className={`component bajaj-dealer-locator ${props.params?.styles}`}
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
            src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&q=80"
            alt="Bajaj Dealer Showroom"
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
              {props.fields.Title ? <Text field={props.fields.Title} /> : 'Find a Dealer Near You'}
            </h1>
            <p
              className="text-white/80 mt-3 max-w-[600px]"
              style={{ fontSize: 'clamp(1rem, 2vw, 20px)' }}
            >
              {props.fields.Description ? (
                <Text field={props.fields.Description} />
              ) : (
                'Locate your nearest Bajaj Auto authorized dealership for sales, test drives, and genuine accessories'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="bg-[#1e2b56] py-8 px-6 md:px-12">
        <div className="max-w-[1824px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative lg:col-span-2">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by dealer name, city, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-lg bg-white text-gray-800 placeholder:text-gray-400 outline-none"
                style={{ fontSize: '15px' }}
              />
            </div>
            <div className="relative">
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedCity('');
                }}
                className="w-full py-3 px-4 pr-10 rounded-lg bg-white text-gray-800 appearance-none outline-none cursor-pointer"
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
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={availableCities.length === 0}
                className="w-full py-3 px-4 pr-10 rounded-lg bg-white text-gray-800 appearance-none outline-none cursor-pointer disabled:opacity-50"
                style={{ fontSize: '15px' }}
              >
                <option value="">All Cities</option>
                {availableCities.map((c) => (
                  <option key={c} value={c}>
                    {c}
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
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full py-3 px-4 pr-10 rounded-lg bg-white text-gray-800 appearance-none outline-none cursor-pointer"
                style={{ fontSize: '15px' }}
              >
                {vehicleTypes.map((t) => (
                  <option key={t} value={t}>
                    {t === 'All' ? 'All Vehicle Types' : t}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-10 md:py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-[1824px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-600" style={{ fontSize: '16px' }}>
              Showing{' '}
              <span className="text-[#1e2b56]" style={{ fontWeight: 600 }}>
                {filteredDealers.length}
              </span>{' '}
              dealer{filteredDealers.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="w-full h-[300px] md:h-[400px] bg-[#e8ecf4] rounded-xl mb-10 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: 'radial-gradient(circle, #1e2b56 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }}
              />
            </div>
            <div className="text-center relative z-10">
              <MapPin size={48} className="text-[#1e2b56] mx-auto mb-3" />
              <p className="text-[#1e2b56]" style={{ fontSize: '18px', fontWeight: 600 }}>
                Interactive Map
              </p>
              <p className="text-gray-500 mt-1" style={{ fontSize: '14px' }}>
                {filteredDealers.length} dealers pinned across India
              </p>
            </div>
          </div>

          {/* Dealer Cards */}
          {filteredDealers.length === 0 ? (
            <div className="text-center py-16">
              <MapPin size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500" style={{ fontSize: '18px' }}>
                No dealers found matching your criteria
              </p>
              <p className="text-gray-400 mt-2" style={{ fontSize: '14px' }}>
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDealers.map((dealer, i) => (
                <motion.div
                  key={dealer.id}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3
                        className="text-[#1e2b56] pr-2"
                        style={{ fontSize: '17px', fontWeight: 600 }}
                      >
                        {dealer.name}
                      </h3>
                      <StarRating rating={dealer.rating} />
                    </div>
                    <div className="flex items-start gap-2 text-gray-600 mb-2">
                      <MapPin size={16} className="mt-0.5 shrink-0 text-[#016bd0]" />
                      <p style={{ fontSize: '14px' }}>
                        {dealer.address}, {dealer.city}, {dealer.state}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Phone size={16} className="shrink-0 text-[#016bd0]" />
                      <p style={{ fontSize: '14px' }}>{dealer.phone}</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <Clock size={16} className="shrink-0 text-[#016bd0]" />
                      <p style={{ fontSize: '14px' }}>{dealer.hours}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {dealer.type.map((t) => (
                        <span
                          key={t}
                          className="bg-[#e8ecf4] text-[#1e2b56] text-xs px-3 py-1 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() =>
                        setExpandedDealer(expandedDealer === dealer.id ? null : dealer.id)
                      }
                      className="text-[#016bd0] text-sm flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      {expandedDealer === dealer.id ? 'Hide Details' : 'View Details'}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${
                          expandedDealer === dealer.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {expandedDealer === dealer.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-gray-100"
                      >
                        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                          <div>
                            <p style={{ fontWeight: 500 }} className="text-[#1e2b56]">
                              Services
                            </p>
                            <p>Sales &amp; Booking</p>
                            <p>Test Rides</p>
                            <p>Genuine Accessories</p>
                          </div>
                          <div>
                            <p style={{ fontWeight: 500 }} className="text-[#1e2b56]">
                              Payment Options
                            </p>
                            <p>Cash / Card</p>
                            <p>EMI Available</p>
                            <p>Exchange Accepted</p>
                          </div>
                        </div>
                        <div className="flex gap-3 mt-4">
                          <button className="flex-1 flex items-center justify-center gap-2 bg-[#016bd0] text-white py-2.5 rounded-lg hover:bg-[#0155a8] transition-colors text-sm cursor-pointer">
                            <Navigation size={14} />
                            Get Directions
                          </button>
                          <button className="flex-1 flex items-center justify-center gap-2 border border-[#016bd0] text-[#016bd0] py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-sm cursor-pointer">
                            <ExternalLink size={14} />
                            Visit Website
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

      {/* Why Visit */}
      <section className="py-12 md:py-20 px-6 md:px-12 bg-white">
        <div className="max-w-[1824px] mx-auto text-center">
          <h2
            className="text-[#1e2b56]"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 40px)', lineHeight: 1.2 }}
          >
            Why Visit an Authorized Bajaj Dealer?
          </h2>
          <p
            className="text-gray-600 mt-3 max-w-[700px] mx-auto"
            style={{ fontSize: 'clamp(0.95rem, 1.5vw, 18px)' }}
          >
            Experience the full Bajaj ecosystem at our authorized dealerships
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              {
                icon: '🏍️',
                title: 'Full Vehicle Range',
                desc: 'Explore our complete lineup of motorcycles, scooters, and three-wheelers in person.',
              },
              {
                icon: '🎯',
                title: 'Free Test Rides',
                desc: 'Book and experience a test ride of your favourite Bajaj vehicle before making your decision.',
              },
              {
                icon: '💰',
                title: 'Best Financing',
                desc: 'Get competitive financing options, instant loan approvals, and flexible EMI plans.',
              },
              {
                icon: '✅',
                title: 'Genuine Accessories',
                desc: 'Shop 100% genuine Bajaj accessories and customization options for your vehicle.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-[#1e2b56] mb-2" style={{ fontSize: '18px', fontWeight: 600 }}>
                  {item.title}
                </h3>
                <p className="text-gray-600" style={{ fontSize: '14px' }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

