import React from "react";

const Cases = () => {
  return (
    <div className="w-full mt-[4rem] md:mt-[6rem]">
      <div className="w-[97%] mx-auto md:mx-0 md:w-[70%] left-0">
        <h1 className="text-3xl md:text-4xl xl:text-5xl text-center md:text-left pt-4 text-[#CAFF33]">
          Use Cases
        </h1>
        <h1 className="text-base pt-3.5 text-[#B3B3B3] text-center md:text-left">
          At GeekPay, we cater to the diverse needs of individuals and
          businesses alike, offering a wide range of financial solutions
        </h1>
      </div>

      <div className="w-full flex justify-between items-center flex-wrap mt-[3.5rem]">
        <div className="relative w-[97%] mx-auto md:mx-0 md:w-[48%] bg-[#1C1C1C] flex items-center justify-center rounded-[1.5rem]">
          <img
            src="/Abstract-Design-2.png"
            alt=""
            className="absolute top-0 left-0 z-0"
          />
          <div className="p-5 md:p-8 flex flex-wrap items-center justify-between z-50">
            <div className="w-[48.5%] border border-[#262626] rounded-[1rem] space-y-3 bg-[#1A1A1A] flex flex-col items-center justify-center py-5 px-12 text-center">
              <img src="/Icon-Container-3.png" alt="" className="" />
              <h1 className="text-base md:text-xl">
                Managing Personal Finances
              </h1>
            </div>

            <div className="w-[48.5%] border border-[#262626] rounded-[1rem] space-y-3 bg-[#1A1A1A] flex flex-col items-center justify-center py-5 2xl:py-8 px-12 text-center">
              <img src="/Icon-Container-10.png" alt="" className="" />
              <h1 className="text-base md:text-xl">Saving for the Future</h1>
            </div>

            <div className="w-[48.5%] border border-[#262626] rounded-[1rem] mt-[3%] space-y-3 bg-[#1A1A1A] flex flex-col items-center justify-center py-8 px-12 text-center">
              <img src="/Icon-Container-9.png" alt="" className="" />
              <h1 className="text-base md:text-xl">Homeownership</h1>
            </div>

            <div className="w-[48.5%] border border-[#262626] rounded-[1rem] mt-[3%] space-y-3 bg-[#1A1A1A] flex flex-col items-center justify-center py-5 2xl:py-8 px-12 text-center">
              <img src="/Icon-Container-8.png" alt="" className="" />
              <h1 className="text-base md:text-xl">Educational Funding</h1>
            </div>
          </div>
        </div>

        <div className="w-[97%] mx-auto md:mx-0 md:w-[48%] mt-5 md:mt-0">
          <h1 className="text-xl text-center md:text-left font-semibold">
            For Individuals
          </h1>
          <h1 className="text-base pt-3 text-[#B3B3B3] text-center md:text-left">
            For individuals, our mortgage services pave the way to
            homeownership, and our flexible personal loans provide vital support
            during various life milestones. We also prioritize retirement
            planning, ensuring a financially secure future for our customers
          </h1>
          <div className="w-full flex items-center flex-wrap md:mt-[2.5rem]">
            <div className="w-[80%] mx-auto md:mx-0 md:w-[33.3%] py-9 md:py-0 border-b border-b-[#262626] md:border-b-0 md:border-b-[#262626] md:border-r md:border-r-[#262626]">
              <h1 className="text-5xl pt-1.5 md:pt-4 text-[#CAFF33] text-center md:text-left">
                78%
              </h1>
              <h1 className="text-base md:w-[70%] pt-3 text-[#B3B3B3] text-center md:text-left">
                Secure Retirement Planning
              </h1>
            </div>

            <div className="w-[80%] mx-auto md:mx-0 md:w-[33.3%] py-9 md:py-0 md:pl-6 border-b border-b-[#262626] md:border-b-0 md:border-b-[#262626] md:border-r md:border-r-[#262626]">
              <h1 className="text-5xl pt-1.5 md:pt-4 text-[#CAFF33] text-center md:text-left">
                63%
              </h1>
              <h1 className="text-base md:w-[80%] 2xl:w-[70%] pt-3 text-[#B3B3B3] text-center md:text-left">
                Manageable Debt Consolidation
              </h1>
            </div>

            <div className="w-[80%] mx-auto md:mx-0 md:w-[33.3%] py-9 md:py-0 md:pl-6 md:border-r md:border-r-[#262626]">
              <h1 className="text-5xl pt-1.5 md:pt-4 text-[#CAFF33] text-center md:text-left">
                91%
              </h1>
              <h1 className="text-base md:w-[80%] 2xl:w-[70%] pt-3 text-[#B3B3B3] text-center md:text-left">
                Reducing financial burdens
              </h1>
            </div>
          </div>

          <div className="w-full flex items-center justify-center md:hidden ">
            <button className="w-fit mx-auto px-7 py-3 rounded-full bg-[#262626] text-base cursor-pointer mt-[2rem]">
              Learn More
            </button>
          </div>

          <div className="w-full hidden md:block ">
            <button className=" px-7 py-3 rounded-full bg-[#262626] text-base cursor-pointer mt-[2rem]">
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div className="w-full md:flex justify-between items-center mt-[3rem] flex-col-reverse md:flex-row hidden">
        <div className="w-[97%] mx-auto md:mx-0 md:w-[48%] mt-5 md:mt-0 ">
          <h1 className="text-xl text-center md:text-left font-semibold">
            For Business
          </h1>
          <h1 className="text-base text-center md:text-left pt-3 text-[#B3B3B3]">
            For businesses, we empower growth with working capital solutions
            that optimize cash flow, and our tailored financing options fuel
            business expansion. Whatever your financial aspirations, GeekPay is
            committed to providing the right tools and support to achieve them
          </h1>
          <div className="w-full flex items-center md:mt-[2.5rem] flex-wrap">
            <div className="w-[80%] mx-auto md:mx-0 md:w-[33.3%] py-9 md:py-0 border-b border-b-[#262626] md:border-b-0 md:border-b-[#262626] md:border-r md:border-r-[#262626]">
              <h1 className="text-5xl pt-1.5 md:pt-4 text-[#CAFF33] text-center md:text-left">
                65%
              </h1>
              <h1 className="text-base md:w-[70%] pt-3 text-[#B3B3B3] text-center md:text-left">
                Cash Flow Management
              </h1>
            </div>

            <div className="w-[80%] mx-auto md:mx-0 md:w-[33.3%] py-9 md:py-0 md:pl-6 border-b border-b-[#262626] md:border-b-0 md:border-b-[#262626] md:border-r md:border-r-[#262626]">
              <h1 className="text-5xl pt-1.5 md:pt-4 text-[#CAFF33] text-center md:text-left">
                70%
              </h1>
              <h1 className="text-base md:w-[80%] 2xl:w-[70%] pt-3 text-[#B3B3B3] text-center md:text-left">
                Drive Business Expansion
              </h1>
            </div>

            <div className="w-[80%] mx-auto md:mx-0 md:w-[33.3%] py-9 md:py-0 md:pl-6 md:border-r md:border-r-[#262626]">
              <h1 className="text-5xl pt-1.5 md:pt-4 text-[#CAFF33] text-center md:text-left">
                45%
              </h1>
              <h1 className="text-base md:w-[80%] 2xl:w-[70%] pt-3 text-[#B3B3B3] text-center md:text-left">
                Streamline payroll processing
              </h1>
            </div>
          </div>

          <div className="w-full flex items-center justify-center md:hidden ">
            <button className="w-fit mx-auto px-7 py-3 rounded-full bg-[#262626] text-base cursor-pointer mt-[2rem]">
              Learn More
            </button>
          </div>

          <div className="w-full hidden md:block ">
            <button className=" px-7 py-3 rounded-full bg-[#262626] text-base cursor-pointer mt-[2rem]">
              Learn More
            </button>
          </div>
        </div>

        <div className="relative w-[97%] mx-auto md:mx-0 md:w-[48%] bg-[#1C1C1C] flex items-center justify-center rounded-[1.5rem]">
          <img
            src="/Abstract-Design-2.png"
            alt=""
            className="absolute top-0 left-0 z-0"
          />
          <div className="p-8 flex flex-wrap items-center justify-between z-50">
            <div className="w-[48.5%] border border-[#262626] rounded-[1rem] space-y-3 bg-[#1A1A1A] flex flex-col items-center justify-center py-5 px-12 text-center">
              <img src="/Icon-Container-7.png" alt="" className="" />
              <h1 className="text-base md:text-xl">
                Startups and entrepreneurs
              </h1>
            </div>

            <div className="w-[48.5%] border border-[#262626] rounded-[1rem] space-y-3 bg-[#1A1A1A] flex flex-col items-center justify-center py-5 2xl:py-8 px-12 text-center">
              <img src="/Icon-Container-6.png" alt="" className="" />
              <h1 className="text-base md:text-xl">Cash Flow Management</h1>
            </div>

            <div className="w-[48.5%] border border-[#262626] rounded-[1rem] mt-[3%] space-y-3 bg-[#1A1A1A] flex flex-col items-center justify-center py-5 2xl:py-8 px-12 text-center">
              <img src="/Icon-Container-5.png" alt="" className="" />
              <h1 className="text-base md:text-xl">Business Expansion</h1>
            </div>

            <div className="w-[48.5%] border border-[#262626] rounded-[1rem] mt-[3%] space-y-3 bg-[#1A1A1A] flex flex-col items-center justify-center py-5 2xl:py-8 px-12 text-center">
              <img src="/Icon-Container-4.png" alt="" className="" />
              <h1 className="text-base md:text-xl">Payment Solutions</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-[3rem] flex-col-reverse md:flex-row block md:hidden">
        <div className="relative w-[97%] mx-auto md:mx-0 md:w-[48%] bg-[#1C1C1C] flex items-center justify-center rounded-[1.5rem]">
          <img
            src="/Abstract-Design-2.png"
            alt=""
            className="absolute top-0 left-0 z-0"
          />
          <div className="p-8 flex flex-wrap items-center justify-between z-50">
            <div className="w-[48.5%] border border-[#262626] rounded-[1rem] space-y-3 bg-[#1A1A1A] flex flex-col items-center justify-center py-5 px-12 text-center">
              <img src="/Icon-Container-7.png" alt="" className="" />
              <h1 className="text-base md:text-xl">
                Startups and entrepreneurs
              </h1>
            </div>

            <div className="w-[48.5%] border border-[#262626] rounded-[1rem] space-y-3 bg-[#1A1A1A] flex flex-col items-center justify-center py-5 2xl:py-8 px-12 text-center">
              <img src="/Icon-Container-6.png" alt="" className="" />
              <h1 className="text-base md:text-xl">Cash Flow Management</h1>
            </div>

            <div className="w-[48.5%] border border-[#262626] rounded-[1rem] mt-[3%] space-y-3 bg-[#1A1A1A] flex flex-col items-center justify-center py-5 2xl:py-8 px-12 text-center">
              <img src="/Icon-Container-5.png" alt="" className="" />
              <h1 className="text-base md:text-xl">Business Expansion</h1>
            </div>

            <div className="w-[48.5%] border border-[#262626] rounded-[1rem] mt-[3%] space-y-3 bg-[#1A1A1A] flex flex-col items-center justify-center py-5 2xl:py-8 px-12 text-center">
              <img src="/Icon-Container-4.png" alt="" className="" />
              <h1 className="text-base md:text-xl">Payment Solutions</h1>
            </div>
          </div>
        </div>

        <div className="w-[97%] mx-auto md:mx-0 md:w-[48%] mt-5 md:mt-0">
        <h1 className="text-xl text-center md:text-left font-semibold">
          For Business
        </h1>
        <h1 className="text-base text-center md:text-left pt-3 text-[#B3B3B3]">
          For businesses, we empower growth with working capital solutions that
          optimize cash flow, and our tailored financing options fuel business
          expansion. Whatever your financial aspirations, GeekPay is committed
          to providing the right tools and support to achieve them
        </h1>
        <div className="w-full flex items-center md:mt-[2.5rem] flex-wrap">
          <div className="w-[80%] mx-auto md:mx-0 md:w-[33.3%] py-9 md:py-0 border-b border-b-[#262626] md:border-b-0 md:border-b-[#262626] md:border-r md:border-r-[#262626]">
            <h1 className="text-5xl pt-1.5 md:pt-4 text-[#CAFF33] text-center md:text-left">
              65%
            </h1>
            <h1 className="text-base md:w-[70%] pt-3 text-[#B3B3B3] text-center md:text-left">
              Cash Flow Management
            </h1>
          </div>

          <div className="w-[80%] mx-auto md:mx-0 md:w-[33.3%] py-9 md:py-0 md:pl-6 border-b border-b-[#262626] md:border-b-0 md:border-b-[#262626] md:border-r md:border-r-[#262626]">
            <h1 className="text-5xl pt-1.5 md:pt-4 text-[#CAFF33] text-center md:text-left">
              70%
            </h1>
            <h1 className="text-base md:w-[80%] 2xl:w-[70%] pt-3 text-[#B3B3B3] text-center md:text-left">
              Drive Business Expansion
            </h1>
          </div>

          <div className="w-[80%] mx-auto md:mx-0 md:w-[33.3%] py-9 md:py-0 md:pl-6 md:border-r md:border-r-[#262626]">
            <h1 className="text-5xl pt-1.5 md:pt-4 text-[#CAFF33] text-center md:text-left">
              45%
            </h1>
            <h1 className="text-base md:w-[80%] 2xl:w-[70%] pt-3 text-[#B3B3B3] text-center md:text-left">
              Streamline payroll processing
            </h1>
          </div>
        </div>

        <div className="w-full flex items-center justify-center md:hidden ">
          <button className="w-fit mx-auto px-7 py-3 rounded-full bg-[#262626] text-base cursor-pointer mt-[2rem]">
            Learn More
          </button>
        </div>

        <div className="w-full hidden md:block ">
          <button className=" px-7 py-3 rounded-full bg-[#262626] text-base cursor-pointer mt-[2rem]">
            Learn More
          </button>
        </div>
      </div>
      </div>

      
    </div>
  );
};

export default Cases;
