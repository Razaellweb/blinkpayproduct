"use client";

import React, { useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

// Testimonials data
const testimonials = [
  {
    text: "GeekPay has been my trusted financial partner for years. Their personalized service and innovative digital banking solutions have made managing my finances a breeze.",
    author: "Sara T",
  },
  {
    text: "I recently started my own business, and GeekPay has been instrumental in helping me set up my business accounts and secure the financing I needed. Their expert guidance and tailored solutions have been invaluable.",
    author: "John D",
  },
  {
    text: "I love the convenience of GeekPay's mobile banking app. It allows me to stay on top of my finances and make transactions on the go. The app is user-friendly and secure, giving me peace of mind.",
    author: "Emily G",
  },
  {
    text: "Switching to GeekPay was the best decision. Their customer support is always available and the digital experience is seamless.",
    author: "Michael B",
  },
  // ...add more if needed
];

const Testimonials = () => {
  const [current, setCurrent] = useState(1);

  const prevTestimonial = () => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const nextTestimonial = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const getIndex = (offset: number) =>
    (current + offset + testimonials.length) % testimonials.length;

  return (
    <div className="w-full mt-[4rem] md:mt-[6rem] ">
      <div className="flex items-center flex-wrap justify-between">
        <div className="w-[97%] md:w-[62%] 2xl:w-[52%] left-0">
          <h1 className="text-3xl md:text-4xl xl:text-5xl text-center md:text-left pt-4">
            Our <span className="text-[#CAFF33]">Testimonials </span>
          </h1>
          <h1 className="text-base pt-3.5 text-[#B3B3B3] text-center md:text-left">
            Discover how GeekPay has transformed lives with innovative digital
            solutions and personalized customer service. See why our clients
            trust us for a secure and prosperous financial journey
          </h1>
        </div>
        <div className="w-fit right-0 mt-4 md:mt-0 mx-auto md:mx-0">
          <div className="w-fit bg-[#1C1C1C] px-3 py-3 rounded-full flex items-center">
            <button className="px-5 py-2 rounded-full bg-[#CAFF33] text-black text-base cursor-pointer">
              For Individuals
            </button>
            <button className="px-5 py-2 rounded-full text-white text-base cursor-pointer">
              For Business
            </button>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center flex-wrap mt-[2rem] md:mt-[3.5rem] justify-center relative">
        {/* Left Arrow */}
        <button
          className="absolute cursor-pointer left-0 z-10 bg-[#1C1C1C] rounded-full p-2 hover:bg-[#CAFF33] hover:text-black transition md:block hidden"
          onClick={prevTestimonial}
          aria-label="Previous"
        >
          <ArrowLeftIcon className="w-6 h-6 text-[#CAFF33]" />
        </button>

        {/* Left (left-shadow only, pushed back) */}
        <article
          className="w-[96%] md:w-[33.3%] flex-col items-center justify-center space-y-8 px-6 2xl:px-14 relative transition-all duration-300 scale-90 -translate-x-6 z-0 md:flex hidden"
          style={{ zIndex: 1 }}
        >
          {/* Left shadow overlay */}
          <div className="absolute left-0 top-0 h-full w-[80%] pointer-events-none bg-gradient-to-r from-[#1E1E1E] to-transparent" />
          <div className="w-full flex items-center justify-between">
            <div className="w-[40%] h-[0.1vh] bg-[#262626]"></div>
            <img src="/Text.png" alt="" />
            <div className="w-[40%] h-[0.1vh] bg-[#262626]"></div>
          </div>
          <h1 className="text-base text-center text-[#B3B3B3]">
            {testimonials[getIndex(-1)].text}
          </h1>
          <h1 className="text-sm text-[#CAFF33]">
            {testimonials[getIndex(-1)].author}
          </h1>
        </article>

        {/* Center (focused, pop out) */}
        <article
          className="relative w-[87%] mx-auto md:mx-0 md:w-[33.3%] mt-5 md:mt-0 md:border-0 border border-[#262626] flex flex-col items-center justify-center space-y-8 pt-6 md:pt-0 px-6 2xl:px-14 transition-all duration-300 bg-transparent rounded-xl scale-110 z-20"
          style={{ zIndex: 2 }}
        >
            <div className="absolute left-0 top-0 h-full w-[30%] pointer-events-none bg-gradient-to-r from-[#1E1E1E] to-transparent block md:hidden" />
          <div className="w-full flex items-center justify-between">
            <div className="w-[40%] h-[0.1vh] bg-[#262626]"></div>
            <img src="/Text.png" alt="" />
            <div className="w-[40%] h-[0.1vh] bg-[#262626]"></div>
          </div>
          <h1 className={`text-base text-center text-white`}>
            {testimonials[getIndex(0)].text}
          </h1>
          <h1 className="text-sm text-[#CAFF33]">
            {testimonials[getIndex(0)].author}
          </h1>
          <div className="absolute right-0 top-0 h-full w-[30%] pointer-events-none bg-gradient-to-l from-[#1E1E1E] to-transparent block md:hidden" />
        </article>

        {/* Right (right-shadow only, pushed back) */}
        <article
          className="w-[96%] md:w-[33.3%] flex-col items-center justify-center space-y-8 px-6 2xl:px-14 relative transition-all duration-300 scale-90 translate-x-6 z-0 md:flex hidden"
          style={{ zIndex: 1 }}
        >
          {/* Right shadow overlay */}
          <div className="absolute right-0 top-0 h-full w-[80%] pointer-events-none bg-gradient-to-l from-[#1E1E1E] to-transparent" />
          <div className="w-full flex items-center justify-between">
            <div className="w-[40%] h-[0.1vh] bg-[#262626]"></div>
            <img src="/Text.png" alt="" />
            <div className="w-[40%] h-[0.1vh] bg-[#262626]"></div>
          </div>
          <h1 className="text-base text-center text-[#B3B3B3]">
            {testimonials[getIndex(1)].text}
          </h1>
          <h1 className="text-sm text-[#CAFF33]">
            {testimonials[getIndex(1)].author}
          </h1>
        </article>

        {/* Right Arrow */}
        <button
          className="absolute cursor-pointer right-0 z-10 bg-[#1C1C1C] rounded-full p-2 transition md:block hidden"
          onClick={nextTestimonial}
          aria-label="Next"
        >
          <ArrowRightIcon className="w-6 h-6 text-[#CAFF33]" />
        </button>

        {/* Mobile navigation arrows */}
        <div className="flex w-full justify-center items-center gap-4 mt-9 md:hidden">
          <button
            className="bg-[#1C1C1C] rounded-full border border-[#262626] p-2 hover:bg-[#CAFF33] hover:text-black transition"
            onClick={prevTestimonial}
            aria-label="Previous"
          >
            <ArrowLeftIcon className="w-7 h-7 text-[#CAFF33]" />
          </button>
          <button
            className="bg-[#1C1C1C] rounded-full border border-[#262626] p-2 transition"
            onClick={nextTestimonial}
            aria-label="Next"
          >
            <ArrowRightIcon className="w-7 h-7 text-[#CAFF33]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
