'use client';
import { useState, useEffect } from 'react';
import UserRegistration from './ui/user-registration';
import OpenAIAssistant from './ui/openai-assistant';

export default function Home() {
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    // Check if user is already registered
    const userRegistered = localStorage.getItem('userRegistered');
    if (userRegistered === 'true') {
      setIsRegistered(true);
    }
  }, []);

  const handleRegistrationComplete = () => {
    setIsRegistered(true);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="w-full ">
        {!isRegistered ? (
          
            <UserRegistration onRegistrationComplete={handleRegistrationComplete} />
          
        ) : (
          <div className="mx-auto mb-12 max-w-lg text-center p-6 bg-white rounded-lg shadow-lg">
          <h1 className="mb-4 text-5xl font-extrabold leading-none tracking-tight text-blue-600 md:text-6xl lg:text-6xl">
            Cameroon Lawyer
          </h1>
          <p className="mb-6 text-lg font-normal text-gray-600">
            Your trusted AI assistant for legal insights on Cameroon laws and the penal code.
          </p>
          <OpenAIAssistant 
          assistantId="asst_iOR0pHxucvqC1vbiHjHerY3O"
          greeting="I am here to assist you with legal matters in Cameroon. How can I help you today?"
        />
        </div>
        )}
      </div>
      <footer className="mt-auto mb-4 text-sm text-gray-500 text-center">
        &copy; {new Date().getFullYear()} Cameroon Lawyer. All rights reserved.<br></br>
        by <a href="https://nocodesolutions.tech/"><b className="ml-2 text-blue-500 hover:bg-blue-700">Nocode Solutions</b></a>
        
         
      </footer>
    </main>
  );
}