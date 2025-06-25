import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Phone, MapPin, Facebook, Youtube, Instagram, Twitter } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaPaw } from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status) setStatus('');
  };

 const validateForm = () => {
  const { name, contact, email, message } = formData;

  if (!name.trim() || !contact.trim() || !email.trim() || !message.trim()) {
    setStatus("Please fill in all fields.");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  if (!phoneRegex.test(contact)) {
    setStatus("Please enter a valid 10-digit contact number.");
    return false;
  }

  if (!emailRegex.test(email)) {
    setStatus("Please enter a valid email address.");
    return false;
  }

  return true;
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('Sending...');
    setIsSubmitting(true);

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND}/api/cnt/contact`, formData);

      setStatus("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: '', contact: '', email: '', message: '' });
    } catch (error) {
      setStatus('Something went wrong. Please try again later.');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white py-10 px-4 md:px-6 max-w-screen-2xl mx-auto mt-16">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-orange-500 flex justify-center items-center gap-2 text-lg font-semibold"><FaPaw /> CONTACT</p>
        <h2 className="text-3xl font-bold text-gray-800 mt-2">Contact Us</h2>
      </div>

      {/* Form and Contact Info */}
      <div className="grid lg:grid-cols-2 gap-8 mb-10">
        {/* Contact Form */}
        <div className="bg-gray-200 p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-xl mb-6 text-gray-800">Do You Have Any Questions?</h3>
            {status && (
              <div className={`text-right  ${
                status.includes('success') || status.includes('sent') 
                  ? ' text-green-700  ' 
                  : status.includes('Sending') 
                  ? ' text-blue-700  '
                  : ' text-red-700  '
              }`}>
                {status}
              </div>
            )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nameee *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full p-3 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact *</label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Your Contact Number"
                  className="w-full p-3 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="w-full p-3 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help you..."
                rows="5"
                className="w-full p-3 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-vertical"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#BC5E38] text-white px-8 py-3 rounded-md hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isSubmitting ? 'SENDING...' : 'SEND '}
              </button>
            </div>

            
          </form>
        </div>

        {/* Get in Touch Info */}
        <div className="bg-gray-200 p-6 lg:p-8 rounded-lg shadow-md">
          <h3 className="font-semibold text-xl mb-6 text-gray-800">Get In Touch</h3>

          {/* Email */}
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-[#FDDF82] p-3 rounded-full text-gray-800 flex-shrink-0">
              <Mail size={20} />
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-1">Email:</p>
              <a href="mailto:support@caninkart.com" className="text-gray-600 hover:text-orange-600 transition-colors break-all">
                support@caninkart.com
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-[#FDDF82] p-3 rounded-full text-gray-800 flex-shrink-0">
              <Phone size={20} />
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-1">Phone:</p>
              <a href="tel:+919520957250" className="text-gray-600 hover:text-orange-600 transition-colors">
                +91 95209 57250
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-4 mb-8">
            <div className="bg-[#FDDF82] p-3 rounded-full text-gray-800 flex-shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-1">Address:</p>
              <p className="text-gray-600 leading-relaxed">
                305-307, Selaqui Industrial Area, Central Hope Town, <br/> Dehradun, Uttarakhand 248011
              </p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="mt-4 flex justify-start gap-4 flex-wrap text-xl">
                 {[
                   {
                     icon: <FaFacebookF />,
                     label: "Facebook",
                     link: "https://www.facebook.com/caninkart/",
                   },
                   {
                     icon: <FaInstagram />,
                     label: "Instagram",
                     link: "https://www.instagram.com/caninkart",
                   },
                   // { icon: <FaYoutube />, label: "YouTube" },
                   // { icon: <FaXTwitter />, label: "X (Twitter)" },
                 ].map((item, idx) => {
                   const content = (
                     <div
                       aria-label={item.label}
                       className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FDDF82] 
                   transition-transform duration-300 ease-in-out cursor-pointer 
                   hover:scale-110 hover:rotate-12"
                     >
                       {item.icon}
                     </div>
                   );
         
                   return item.link ? (
                     <a
                       key={idx}
                       href={item.link}
                       target="_blank"
                       rel="noopener noreferrer"
                       aria-label={item.label}
                     >
                       {content}
                     </a>
                   ) : (
                     <div key={idx}>{content}</div>
                   );
                 })}
               </div>
         


        </div>
      </div>

      {/* Google Map */}
      <div className="rounded-lg overflow-hidden shadow-md">
        <iframe
          title="Caninkart Location"
          className="w-full h-96"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2253.6925906285287!2d77.84555487656849!3d30.36279733911734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f2a2e2e655f57%3A0x62e42546e486b76a!2s305-307%2C%20Selaqui%20Industrial%20Area%2C%20Central%20Hope%20Town%2C%20Dehradun%2C%20Uttarakhand%20248011!5e0!3m2!1sen!2sin!4v1750755881465!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
          style={{ border: 0 }}
        />
      </div>
    </div>
  );
};

export default ContactUs;
