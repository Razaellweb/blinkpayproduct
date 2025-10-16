import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import React from "react";

const Features = () => {
  return (
    <div className="w-full mt-[4rem] md:mt-[6rem]">
      <div className="w-[97%] mx-auto md:mx-0 md:w-[68%] left-0">
        <h1 className="text-3xl md:text-4xl xl:text-5xl text-center md:text-left pt-4">
          Our <span className="text-[#CAFF33]">Features </span>
        </h1>
        <h1 className="text-base pt-3.5 text-[#B3B3B3] text-center md:text-left">
          Experience a host of powerful features at GeekPay, including seamless online banking, secure transactions, and personalized financial insights, all designed to enhance your banking experience
        </h1>
      </div>

      <div className="mt-[3.5rem] w-full flex items-start justify-between flex-wrap">
        <div className="w-[97%] mx-auto xl:mx-0 md:w-[23%] 2xl:w-[17.5%] bg-[#1C1C1C] rounded-[1rem] py-6 md:py-11 pl-6 md:pl-11 md:pr-11">
          <div className="flex gap-4 md:gap-0 overflow-x-scroll md:overflow-x-hidden md:flex-col md:space-y-5">
            <div className="w-fit md:w-full whitespace-nowrap rounded-full py-3 px-5 bg-[#1A1A1A] text-base cursor-pointer text-[#CAFF33] border border-[#262626]">
              Online Banking
            </div>

            <div className="w-fit md:w-full whitespace-nowrap rounded-full py-3 px-5 text-base cursor-pointer border border-[#262626]">
              Financial Tools
            </div>

            <div className="w-fit md:w-full whitespace-nowrap rounded-full py-3 px-5 text-base cursor-pointer border border-[#262626]">
              Customer Support
            </div>
          </div>
        </div>

        <div className="w-[97%] mx-auto md:mx-0 md:w-[75%] 2xl:w-[79%] mt-4 md:mt-0 flex items-center justify-between flex-wrap">
          <div className="w-[97%] mx-auto md:mx-0 md:w-[49%] 2xl:w-[48%] mt-[4.5%] md:mt-0 bg-[#1C1C1C] rounded-[1rem] px-8 py-11 md:px-11 md:py-14 2xl:py-11 border border-[#262626]">
            <h1 className="text-xl w-full flex items-center justify-between text-white">
              24/7 Account Access
              <span className="text-[#CAFF33]">
                <ArrowUpRightIcon className="w-6 h-6" />
              </span>
            </h1>

            <h1 className="text-base pt-4.5 text-[#B3B3B3]">
              Enjoy the convenience of accessing your accounts anytime, anywhere through our secure online banking platform. Check balances, transfer funds, and pay bills with ease.
            </h1>
          </div>

          <div className="w-[97%] mx-auto md:mx-0 md:w-[49%] 2xl:w-[48%] mt-[4.5%] md:mt-0 bg-[#1C1C1C] rounded-[1rem] px-8 py-11 md:px-11 md:py-14 2xl:py-11 border border-[#262626]">
            <h1 className="text-xl w-full flex items-center justify-between text-white">
              Mobile Banking App
              <span className="text-[#CAFF33]">
                <ArrowUpRightIcon className="w-6 h-6" />
              </span>
            </h1>

            <h1 className="text-base pt-4.5 text-[#B3B3B3]">
              Stay connected to your finances on the go with our user-friendly mobile banking app. Easily manage your accounts, deposit checks, and make payments from your smartphone or tablet.
            </h1>
          </div>

          <div className="w-[97%] mx-auto md:mx-0 md:w-[49%] 2xl:w-[48%] mt-[4.5%] md:mt-[2%] 2xl:mt-[4%] bg-[#1C1C1C] rounded-[1rem] px-8 py-8 md:px-11 md:py-11 border border-[#262626]">
            <h1 className="text-xl w-full flex items-center justify-between text-white">
              Secure Transactions
              <span className="text-[#CAFF33]">
                <ArrowUpRightIcon className="w-6 h-6" />
              </span>
            </h1>

            <h1 className="text-base pt-4.5 text-[#B3B3B3]">
              Rest assured knowing that your transactions are protected by industry-leading security measures. We employ encryption and multi-factor authentication to safeguard your financial information.
            </h1>
          </div>

          <div className="w-[97%] mx-auto md:mx-0 md:w-[49%] 2xl:w-[48%] mt-[4.5%] md:mt-[2%] 2xl:mt-[4%] bg-[#1C1C1C] rounded-[1rem] px-8 py-11 md:px-11 md:py-14 2xl:py-11 border border-[#262626]">
            <h1 className="text-xl w-full flex items-center justify-between text-white">
              Bill Pay and Transfers
              <span className="text-[#CAFF33]">
                <ArrowUpRightIcon className="w-6 h-6" />
              </span>
            </h1>

            <h1 className="text-base pt-4.5 text-[#B3B3B3]">
              Save time and avoid late fees with our convenient bill pay service. Set up recurring payments or make one-time transfers between your accounts with just a few clicks.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
