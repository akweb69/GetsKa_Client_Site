import { Framer, Pipette } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

import videoBg from '../../assets/vidoe--------1.png'
import DiscoverUS from './DiscoverUS';
import ClientInsights from './ClientInsights';

const CoreServices = () => {
    return (
        <div className='w-full bg-[#351E6A] rounded-2xl md:rounded-3xl my-4 md:my-6 lg:my-10 py-6 md:py-10 lg:py-20'>
            <div className="w-11/12 mx-auto ">
                {/* section--01 */}
                <section className='w-full grid space-y-4 md:grid-cols-3 items-center gap-6 md:space-y-0'>

                    <div className="">
                        <h1 className=" text-[#F2EDFF] text-2xl font-bold md:text-4xl ">Core Services</h1>
                        <p className="text-[#D7C6FE] md:text-lg text-sm py-4 " >Our diverse services are designed to bring your ideas to life. Trust us for quality, precision, and innovation in every project.</p>

                        <div className="grid grid-cols-2 gap-4 items-center w-full">
                            <Link className='w-full bg-[#5216E7] text-white rounded-md p-3 text-center'>
                                Customized now
                            </Link>
                            <Link className='w-full text-sm text-[#C4ABFE] rounded-md p-3 text-center border border-[#C4ABFE] '>
                                Explore services
                            </Link>
                        </div>
                    </div>
                    {/* middle */}
                    <div className="w-full h-full bg-[#F2EDFF] p-4 md:p-6 rounded-xl md:rounded-2xl">
                        <div className="">
                            <Framer size={36} color="#ee1717" strokeWidth={1.5} />
                        </div>
                        <h2 className="py-4 text-[#050C29] text-xl md:text-2xl font-semibold">
                            Graphic Design
                        </h2>
                        <p className="text-[#3A456F] text-sm md:text-lg">
                            Creating impactful and engaging graphic designs tailored to your needs.                        </p>

                        <Link className='flex gap-1 items-center pt-4'>
                            Explore more <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                            </svg>
                        </Link>
                    </div>
                    <div className="w-full h-full bg-[#F2EDFF] p-4 md:p-6 rounded-xl md:rounded-2xl">
                        <div className="">
                            <Pipette size={36} color="#4405d6" strokeWidth={1.5} />
                        </div>
                        <h2 className="py-4 text-[#050C29] text-xl md:text-2xl font-semibold">
                            Branding
                        </h2>
                        <p className="text-[#3A456F] text-sm md:text-lg">
                            Craft a powerful brand presence with designs that capture your vision and resonate with audience.
                        </p>

                        <Link className='flex gap-1 items-center pt-4'>
                            Explore more <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                            </svg>
                        </Link>
                    </div>

                </section>

                {/* video section */}
                <div className="w-full h-64 md:h-96 lg:h-[580px] bg-gray-200 rounded-xl my-6">
                    <img src={videoBg} alt="video background" className="w-full h-full object-cover rounded-xl" />
                </div>
            </div>
            {/* discover us */}
            <div className="">
                <DiscoverUS />
            </div>
            <div className="">
                <ClientInsights />
            </div>

        </div>
    );
};

export default CoreServices;