import React from 'react'

const Products = () => {
  return (
    <div className='w-full mt-[4rem] md:mt-[6rem] '>
        <div className="flex items-center flex-wrap justify-between">
            <div className="w-[97%] md:w-[62%] 2xl:w-[52%] md:left-0">
                <h1 className="text-3xl md:text-4xl xl:text-5xl text-center md:text-left pt-4">
                    Our <span className="text-[#CAFF33]">Products </span>
                </h1>
                <h1 className="text-base pt-3.5 text-[#B3B3B3] text-center md:text-left">
                    Discover a range of comprehensive and customizable banking products at GeekPay, designed to suit your unique financial needs and aspirations
                </h1>
            </div>
            <div className='w-fit right-0 mt-4 md:mt-0 mx-auto md:mx-0'>
                <div className='w-fit bg-[#1C1C1C] px-3 py-3 rounded-full flex items-center'>
                   <button className='px-5 py-2 rounded-full bg-[#CAFF33] text-black text-base cursor-pointer'>For Individuals</button> 
                   <button className='px-5 py-2 rounded-full text-white text-base cursor-pointer'>For Business</button> 
                </div>
            </div>
        </div>
        <div className="w-full flex items-center flex-wrap mt-[3.5rem]">
            <article className='w-[97%] md:w-[33.3%] flex flex-col items-center justify-center space-y-4 pb-9 md:pb-0 px-6 2xl:px-14 border-b border-b-[#262626] md:border-b-0 md:border-b-[#262626] md:border-r md:border-r-[#262626]'>
                <img src="/Icon-Container.png" alt='' className='' />
                <h1 className="text-xl">
                    Checking Accounts
                </h1>
                <h1 className="text-base text-center text-[#B3B3B3]">
                   Enjoy easy and convenient access to your funds with our range of checking account options. Benefit from features such as online and mobile banking, debit cards, and free ATM access.
                </h1>
            </article>

             <article className='w-[97%] md:w-[33.3%] flex flex-col items-center justify-center space-y-4  py-9 md:py-0 px-6 2xl:px-14 border-b border-b-[#262626] md:border-b-0 md:border-b-[#262626] md:border-r md:border-r-[#262626]'>
                <img src="/Icon-Container-1.png" alt='' className='' />
                <h1 className="text-xl">
                    Savings Accounts
                </h1>
                <h1 className="text-base text-center text-[#B3B3B3]">
                    Build your savings with our competitive interest rates and flexible savings account options. Whether you're saving for a specific goal or want to grow your wealth over time, we have the right account for you.   
                </h1>
            </article>

             <article className='w-[97%] md:w-[33.3%] flex flex-col items-center justify-center space-y-4  pt-9 md:pt-0 px-6 2xl:px-14'>
                <img src="/Icon-Container-2.png" alt='' className='' />
                <h1 className="text-xl">
                    Loans and Mortgages
                </h1>
                <h1 className="text-base text-center text-[#B3B3B3]">
                    Realize your dreams with our flexible loan and mortgage options. From personal loans to home mortgages, our experienced loan officers are here to guide you through the application process and help you secure the funds you need.
                </h1>
            </article>
        </div>
    </div>
  )
}

export default Products