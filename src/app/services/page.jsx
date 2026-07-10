import React from 'react';
import { FaHome, FaBuilding, FaSearch, FaShieldAlt, FaWrench, FaHandshake } from 'react-icons/fa';

const services = [
  {
    id: 1,
    icon: <FaHome className="text-blue-600 text-2xl" />,
    title: "Property Renting",
    desc: "Find verified apartments, villas, studios, and houses that fit your budget and lifestyle.",
  },
  {
    id: 2,
    icon: <FaBuilding className="text-blue-600 text-2xl" />,
    title: "Property Management",
    desc: "Professional management solutions for property owners, including tenant handling and maintenance.",
  },
  {
    id: 3,
    icon: <FaSearch className="text-blue-600 text-2xl" />,
    title: "Property Search",
    desc: "Advanced search tools to help you quickly discover your ideal rental property.",
  },
  {
    id: 4,
    icon: <FaShieldAlt className="text-blue-600 text-2xl" />,
    title: "Secure Booking",
    desc: "Book properties confidently with secure payments and verified listings.",
  },
  {
    id: 5,
    icon: <FaWrench className="text-blue-600 text-2xl" />,
    title: "Maintenance Support",
    desc: "Fast maintenance assistance for tenants and property owners whenever needed.",
  },
  {
    id: 6,
    icon: <FaHandshake className="text-blue-600 text-2xl" />,
    title: "Owner & Tenant Support",
    desc: "Dedicated customer support to make renting and property management hassle-free.",
  },
];

const ServicesPage = () => {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Our Services</h2>
        <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
          We provide complete rental property solutions for both owners and tenants with trusted services and professional support.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-300"
          >
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
              {service.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesPage;