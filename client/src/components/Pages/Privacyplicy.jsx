import { faCookieBite, faShieldAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Privacypolicy({ darkmode }) {
  return (
    <div className={`min-h-screen p-8 ${darkmode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Main Content Area */}
      <div className={`mt-8 md:mt-12 p-6 rounded-lg shadow-lg max-w-[700px] mx-auto leading-relaxed ${
        darkmode ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        {/* Header Section */}
        <header className="text-center mb-6">
          <h1 className={`text-3xl font-bold mb-2 ${darkmode ? 'text-blue-400' : 'text-blue-600'}`}>
            Privacy Policy
          </h1>
          <p className={darkmode ? 'text-gray-300' : 'text-gray-600'}>
            Your trust and our commitment to security matter to us.
          </p>
        </header>

        {/* Information We Collect */}
        <section className={`space-y-6 p-4 rounded-lg mb-4 hover:shadow-lg transition-shadow duration-200 ${
          darkmode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
        }`}>
          <div className="flex items-center gap-4">
            <FontAwesomeIcon 
              icon={faUser} 
              className={`text-xl ${darkmode ? 'text-blue-400' : 'text-blue-600'}`} 
            />
            <div>
              <h2 className={`text-xl font-semibold ${darkmode ? 'text-gray-100' : 'text-gray-800'}`}>
                1. Information We Collect
              </h2>
              <p className={darkmode ? 'text-gray-300' : 'text-gray-600'}>
                We collect the personal information you provide directly, such as name, email, and preferences, to provide better services.
              </p>
            </div>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section className={`space-y-6 p-4 rounded-lg mb-4 hover:shadow-lg transition-shadow duration-200 ${
          darkmode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
        }`}>
          <div className="flex items-center gap-4">
            <FontAwesomeIcon 
              icon={faShieldAlt} 
              className={`text-xl ${darkmode ? 'text-blue-400' : 'text-blue-600'}`} 
            />
            <div>
              <h2 className={`text-xl font-semibold ${darkmode ? 'text-gray-100' : 'text-gray-800'}`}>
                2. How We Use Your Information
              </h2>
              <p className={darkmode ? 'text-gray-300' : 'text-gray-600'}>
                Your data enables personalized alerts, user experience upgrades, and critical service delivery improvements.
              </p>
            </div>
          </div>
        </section>

        {/* Cookies Information */}
        <section className={`space-y-6 p-4 rounded-lg mb-4 hover:shadow-lg transition-shadow duration-200 ${
          darkmode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
        }`}>
          <div className="flex items-center gap-4">
            <FontAwesomeIcon 
              icon={faCookieBite} 
              className={`text-xl ${darkmode ? 'text-blue-400' : 'text-blue-600'}`} 
            />
            <div>
              <h2 className={`text-xl font-semibold ${darkmode ? 'text-gray-100' : 'text-gray-800'}`}>
                3. Cookies
              </h2>
              <p className={darkmode ? 'text-gray-300' : 'text-gray-600'}>
                Cookies are used to tailor your user experience, remember preferences, and provide personalized interactions.
              </p>
            </div>
          </div>
        </section>

        {/* Call-To-Action Section */}
        <section className={`mt-8 p-4 rounded-lg shadow-inner text-center ${
          darkmode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
        } transition duration-200`}>
          <p className={`mb-4 leading-tight ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
            Have concerns? Reach out to our support team to learn more about data management and usage.
          </p>
          <button className={`px-4 py-2 rounded-md transition duration-200 ${
            darkmode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}>
            Contact Support
          </button>
        </section>

        {/* Footer Section */}
        <footer className={`text-sm italic text-center mt-6 ${
          darkmode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Last Updated: {new Date().toLocaleDateString()}
        </footer>
      </div>
    </div>
  );
}

export default Privacypolicy;