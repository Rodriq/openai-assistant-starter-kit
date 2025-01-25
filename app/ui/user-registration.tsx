'use client';

import { useState } from 'react';

// Function to validate Cameroon phone numbers
const validateCameroonPhone = (phone: string) => {
  const phoneRegex = /^(?:\+237|237)?6[5-9][0-9]{7}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Function to format phone numbers
const formatPhoneNumber = (phone: string) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length >= 9) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7, 9)}`;
  }
  return cleaned;
};

// UserRegistration component
export default function UserRegistration({ onRegistrationComplete }: { onRegistrationComplete: () => void }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(false);

  // Validate form fields
  const validateForm = () => {
    const newErrors = { name: '', phone: '' };
    let isValid = true;

    if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
      isValid = false;
    }

    if (!validateCameroonPhone(phone)) {
      newErrors.phone = 'Please enter a valid Cameroon phone number (e.g., 677123456)';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/Users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          'apikey': `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          'Prefer': 'return=representation', // Optional: to return the created record
        },
        body: JSON.stringify({ name, phone: phone.replace(/\s/g, ''), messages: [] }),
      });

      if (response.ok) {
        // Store registration state in localStorage
        localStorage.setItem('userRegistered', 'true');
        localStorage.setItem('userName', name);
        localStorage.setItem('userPhone', phone);

        // Call the callback to show the assistant
        onRegistrationComplete();
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Failed to register. Please try again.');
    } finally {
      setLoading(false); // End loading
    }
  };

  // Handle phone number input changes
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div className="px-4 sm:px-8 py-6">

          {/* Loading Indicator */}
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="loader"></div> {/* You can replace this with your loading animation */}
            <p className="ml-2">Registering...</p>
          </div>
        ) : (
          <><div className="mx-auto mb-12 max-w-lg text-center p-6 bg-white rounded-lg shadow-lg">
                <h1 className="mb-4 text-5xl font-extrabold leading-none tracking-tight text-blue-600 md:text-6xl lg:text-6xl">
                  Cameroon Lawyer
                </h1>
                <p className="mb-6 text-lg font-normal text-gray-600">
                  Your trusted AI assistant for legal insights on Cameroon laws and the penal code.
                </p>
                <i className="mb-6 text-sm font-light text-gray-400">Business, Succession, Penal, Land, and Labour Laws </i>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mt-2 text-center">Please register to continue</p>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-sm sm:text-base`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm sm:text-base">
                +237
              </span>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                className={`w-full pl-14 sm:pl-16 pr-3 sm:pr-4 py-2 sm:py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-sm sm:text-base`}
                placeholder="6XX XX XX XX"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2.5 sm:py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 font-medium text-sm sm:text-base mt-6"
          >
            Get Access
          </button>
        </form>
        </>
        )}
      </div>
    </div>
  );
}