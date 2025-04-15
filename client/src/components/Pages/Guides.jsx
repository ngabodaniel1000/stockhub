import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

function Guide({ darkmode }) {
  const [activeSection, setActiveSection] = useState(null);

  const faqData = [
    {
      question: "How do I create an account?",
      answer: "To create an account, click on Navigate on signup button either for admin or manager. Fill in your email, choose a password, and complete the registration process. You'll receive a confirmation email to verify your account."
    },
    {
      question: "How can I reset my password?",
      answer: "If you've forgotten your password, click on the 'Forgot Password' link on the login page. Enter your registered phone number, and you'll receive instructions to reset your password."
    },
    {
      question: "Can i modify my preferred theme or language?",
      answer: "You can change your preferred theme and language in the settings section of your profile. Choose from available themes and languages to customize your experience."
    },
    {
      question: "What type of product can i add in my stock",
      answer: "You can manage stock of all product categories food, clothes, tools and material every goods that can be stored as inventory"
    },
    {
      question: "How do I edit or delete my stockin or stockout information",
      answer: "No you are only allowed to delete stock information when you need to update you must remove or add product to stock"
    },
    {
      question: "Is my personal information secure?",
      answer: "We take data privacy seriously. All personal information is encrypted, and we follow strict security protocols. Check our Privacy Policy for more detailed information about how we protect your data."
    },
    {
      question: "How can I generate reports from my inventory data?",
      answer: "Navigate to the Reports section where you can generate various reports including stock levels, sales trends, and inventory valuation. You can filter by date range and export reports in multiple formats."
    }
  ];

  const guideSteps = [
    {
      title: "Getting Started",
      steps: [
        "Visit our homepage",
        "Click 'Sign Up' to create an account",
        "Verify your email address",
        "Complete your profile"
      ]
    },
    {
      title: "Logging your account",
      steps: [
        "If you're admin go to homepage",
        "Enter valid email",
        "Enter valid password you created while signup",
        "Click on login button finally manage your stock",
      ]
    },
    {
      title: "How to manage your stock",
      steps: [
        "First add category of the product",
        "Create product with the name and its category",
        "You can now add or remove product in the stock",
        "Mark as received or processed or cancelled"
      ]
    }
  ];

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className={`min-h-screen p-6 ${darkmode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      <div className="container md:w-[70%] w-full mx-auto px-4 py-8">
        {/* Page Header */}
        <h1 className={`text-3xl md:text-4xl font-bold mt-4 mb-8 text-center ${darkmode ? 'text-blue-400' : 'text-blue-600'}`}>
          User Guide & Help Center
        </h1>

        {/* Guide Section */}
        <section className={`mb-12 p-6 rounded-lg shadow-md ${darkmode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-2xl font-semibold mb-6 text-center ${darkmode ? 'text-blue-300' : 'text-blue-500'}`}>
            Getting Started Guide
          </h2>
          {guideSteps.map((guide, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-md p-4 mb-4 ${darkmode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} border`}
            >
              <h3 className={`text-lg font-semibold mb-3 ${darkmode ? 'text-blue-400' : 'text-blue-600'}`}>
                {guide.title}
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                {guide.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className={darkmode ? 'text-gray-300' : 'text-gray-600'}>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* FAQ Section */}
        <section className={`mb-12 p-6 rounded-lg shadow-md ${darkmode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-2xl font-semibold mb-6 text-center ${darkmode ? 'text-blue-300' : 'text-blue-500'}`}>
            Frequently Asked Questions
          </h2>
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className={`rounded-lg mb-4 shadow-md overflow-hidden ${darkmode ? 'bg-gray-700' : 'bg-gray-50'}`}
            >
              <div 
                onClick={() => toggleSection(index)}
                className={`flex justify-between items-center p-4 cursor-pointer transition duration-300 ${darkmode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
              >
                <h3 className={`text-md font-semibold ${darkmode ? 'text-gray-100' : 'text-gray-700'}`}>
                  {faq.question}
                </h3>
                <span className={`text-lg ${darkmode ? 'text-gray-300' : 'text-gray-500'}`}>
                  {activeSection === index ? '−' : '+'}
                </span>
              </div>
              {activeSection === index && (
                <div className={`p-4 pt-2 text-sm leading-relaxed ${darkmode ? 'text-gray-300 bg-gray-600' : 'text-gray-600 bg-gray-100'}`}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Additional Help Section */}
        <section className={`mt-8 text-center rounded-lg p-8 shadow-lg ${darkmode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <h2 className={`text-xl font-semibold mb-4 ${darkmode ? 'text-blue-300' : 'text-blue-500'}`}>
            Need More Help?
          </h2>
          <p className={`mb-4 text-sm ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
            If you can't find the answer you're looking for, don't hesitate to contact our support team.
          </p>
          <a href="#">
            <button
              className={`font-semibold py-2 px-5 rounded-md transition duration-300 ${darkmode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            >
              +250 788 123 456
            </button>
          </a>
        </section>
      </div>
    </div>
  );
}

export default Guide;