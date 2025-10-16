"use client";
import React, { useState } from "react";

const faqs = [
  {
    question: "How do I open an account with GeekPay?",
    answer:
      'Opening an account with GeekPay is easy. Simply visit our website and click on the "Open an Account" button. Follow the prompts, provide the required information, and complete the application process. If you have any questions or need assistance, our customer support team is available to help.',
  },
  {
    question: "What documents do I need to provide to apply for a loan?",
    answer:
      "The documents required for a loan application may vary depending on the type of loan you are applying for. Generally, you will need to provide identification documents (such as a passport or driver's license), proof of income (such as pay stubs or tax returns), and information about the collateral (if applicable). Our loan officers will guide you through the specific requirements during the application process.",
  },
  {
    question: "How can I access my accounts online?",
    answer:
      'Accessing your accounts online is simple and secure. Visit our website and click on the "Login" button. Enter your username and password to access your accounts. If you haven\'t registered for online banking, click on the "Enroll Now" button and follow the registration process. If you need assistance, our customer support team is available to guide you.',
  },
  {
    question: "Are my transactions and personal information secure?",
    answer:
      "At GeekPay, we prioritize the security of your transactions and personal information. We employ industry-leading encryption and multi-factor authentication to ensure that your data is protected. Additionally, we regularly update our security measures to stay ahead of emerging threats. You can bank with confidence knowing that we have robust security systems in place.",
  },
  {
    question: "What is GeekPay's mobile app available on?",
    answer:
      "Our mobile app is available for download on both iOS and Android devices. You can use it to check balances, transfer funds, deposit checks, and manage your finances on the go.",
  },
  {
    question: "Can I set up automatic bill payments?",
    answer:
      "Yes, you can set up automatic payments for recurring bills through our online banking platform. Just go to the Bill Pay section and follow the setup process.",
  },
];

const FAQ = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleFaqs = showAll ? faqs : faqs.slice(0, 4);

  return (
    <div className="w-full mt-[4rem] md:mt-[6rem]">
      {/* Header */}
      <div className="w-[97%] mx-auto md:mx-0 md:w-[68%]">
        <h1 className="text-3xl md:text-4xl xl:text-5xl text-center md:text-left pt-4">
          <span className="text-[#CAFF33]">Frequently </span>Asked Questions
        </h1>
        <h1 className="text-base pt-3.5 text-[#B3B3B3] text-center md:text-left">
          Still you have any questions? Contact our Team via{" "}
          <a
            href="mailto:support@GeekPay.com"
            className="text-[#CAFF33] hover:underline"
          >
            support@GeekPay.com
          </a>
        </h1>
      </div>

      {/* FAQ List */}
      <div className="relative mt-[2rem] md:mt-[3.5rem] w-full mb-[2rem]">
        <div className="flex flex-wrap justify-between">
          {visibleFaqs.map((faq, index) => (
            <div
              key={index}
              className="w-[97%] mx-auto md:w-[49%] 2xl:w-[48%] mt-[4.5%] md:mt-[2%] bg-[#1C1C1C] rounded-[1rem] px-6 py-9 md:px-11 md:py-14 border border-[#262626]"
            >
              <h1 className="text-xl text-white">{faq.question}</h1>
              <div className="my-5 h-[1px] bg-[#262626]" />
              <p className="text-base text-[#B3B3B3]">{faq.answer}</p>
            </div>
          ))}
        </div>
        {/* Fade-out effect at the bottom */}
        <div
  className="absolute bottom-0 left-0 w-full h-[40vh] pointer-events-none bg-gradient-to-t from-[#1E1E1E] to-transparent"
/>

      </div>

      {/* Load More Button */}
      {!showAll && (
        <div className="w-full flex items-center justify-center mt-5">
          <button
            onClick={() => setShowAll(true)}
            className="px-7 py-3 rounded-full bg-[#262626] text-base cursor-pointer hover:bg-[#333333] transition-colors duration-300"
          >
            Load All FAQs ↓
          </button>
        </div>
      )}
    </div>
  );
};

export default FAQ;
