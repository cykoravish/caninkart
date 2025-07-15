import React from 'react'

function PrivatePolicy() {
  return (
    <>
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 bg-white rounded-lg shadow-md animate-fade-in transition-all duration-500 ease-in-out mt-10">
  <h1 className="text-3xl font-bold text-gray-800 mb-1">Privacy Policy</h1>
  <p className="text-sm text-gray-500 mb-6">Effective Date: 02.05.2025</p>

  <p className="text-gray-700 mb-4">
    Welcome to <span className="font-semibold text-orange-600">Caninkart</span>. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
    <a href="https://www.caninkart.com" className="text-blue-600 underline ml-1" target="_blank" rel="noopener noreferrer">www.caninkart.com</a>, and when you interact with our services, products, or support. Please read this policy carefully to understand our practices regarding your personal information.
  </p>

  {/* 1. Info We Collect */}
  <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">1. Information We Collect</h2>
  <h3 className="font-medium text-gray-700">a. Personal Information</h3>
  <ul className="list-disc pl-6 text-gray-700 mb-3">
    <li>Full name</li>
    <li>Shipping and billing addresses</li>
    <li>Email address</li>
    <li>Phone number</li>
    <li>Payment information (processed via third-party gateways)</li>
  </ul>

  <h3 className="font-medium text-gray-700">b. Non-Personal Information</h3>
  <ul className="list-disc pl-6 text-gray-700 mb-4">
    <li>IP address</li>
    <li>Browser type and version</li>
    <li>Device type</li>
    <li>Website usage data (pages viewed, time spent, etc.)</li>
  </ul>
  <p className="text-gray-700 mb-4">
    We use cookies, analytics tools, and server logs to collect this data and improve your experience.
  </p>

  {/* 2. How We Use Info */}
  <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">2. How We Use Your Information</h2>
  <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
    <li>Process and fulfill your orders</li>
    <li>Communicate with you about your account or orders</li>
    <li>Respond to customer service inquiries</li>
    <li>Send promotional emails (with your consent)</li>
    <li>Improve our website and services</li>
    <li>Prevent fraud or misuse</li>
  </ul>

  {/* 3. Sharing Info */}
  <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">3. How We Share Your Information</h2>
  <p className="text-gray-700 mb-4">
    We do not sell or rent your data. We may share your data with:
  </p>
  <ul className="list-disc pl-6 text-gray-700 mb-4">
    <li>Trusted third-party services: payment gateways, delivery partners, IT providers</li>
    <li>Legal authorities when required by law</li>
    <li>Business partners in mergers or acquisitions</li>
  </ul>

  {/* 4. Cookies */}
  <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">4. Cookies and Tracking Technologies</h2>
  <p className="text-gray-700 mb-4">
    Our site uses cookies for analytics and personalization. You may disable cookies in your browser settings, but this may affect site functionality.
  </p>

  {/* 5. Data Security */}
  <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5. Data Security</h2>
  <p className="text-gray-700 mb-4">
    We use industry-standard security to protect your data. However, no method is 100% secure.
  </p>
  </div>


    </>
  )
}

export default PrivatePolicy