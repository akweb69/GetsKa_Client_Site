import { Framer, Pipette, Quote } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const ClientInsights = () => {
    return (
        <div className='w-11/12 mx-auto pt-6 md:pt-10 lg:pt-20'>
            <section className='w-full grid space-y-4 md:grid-cols-3 items-center gap-6 md:space-y-0'>

                <div className="">
                    <h1 className=" text-[#F2EDFF] text-2xl font-bold md:text-4xl ">Client Insights</h1>
                    <p className="text-[#D7C6FE] md:text-lg text-sm py-4 " >Discover the stories of our satisfied clients. Their testimonials showcase the quality and impact of our services.</p>

                    <div className="md:grid grid-cols-2 gap-4 items-center w-full">
                        <Link className='w-full bg-[#5216E7] text-white rounded-md p-3 text-center'>
                            Customized now
                        </Link>
                        <Link className='w-full text-sm text-[#C4ABFE] rounded-md p-3 text-center border border-[#C4ABFE] '>
                            Explore services
                        </Link>
                    </div>
                </div>
                {/* middle */}
                <div className="w-full h-full bg-[#F2EDFF] p-6 md:p-8 rounded-2xl">

                    {/* Quote icon */}
                    <Quote
                        size={36}
                        color="#5B21B6"
                        strokeWidth={1.5}
                        fill="#5B21B6"
                        className="mb-4"
                    />

                    {/* Testimonial text */}
                    <p className="text-[#3A456F] text-base md:text-lg leading-relaxed">
                        Absolutely thrilled with the top-notch prints and exceptional
                        service provided by this agency. Highly recommend!
                    </p>

                    {/* User info */}
                    <div className="flex items-center gap-3 pt-6">

                        {/* Image */}
                        <img
                            src="https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // your image path
                            alt="client"
                            width={48}
                            height={48}
                            className="rounded-full w-12 h-12 object-cover"
                            referrerPolicy='no-referrer'
                        />
                        {/* Name & company */}
                        <div>
                            <h4 className="text-[#050C29] font-semibold text-sm md:text-base">
                                Ahmad Ibrahim
                            </h4>

                            <p className="text-[#6B7280] text-xs md:text-sm">
                                Petronas
                            </p>
                        </div>

                    </div>

                </div>
                <div className="w-full h-full bg-[#F2EDFF] p-6 md:p-8 rounded-2xl">

                    {/* Quote icon */}
                    <Quote
                        size={36}
                        color="#5B21B6"
                        strokeWidth={1.5}
                        fill="#5B21B6"
                        className="mb-4"
                    />

                    {/* Testimonial text */}
                    <p className="text-[#3A456F] text-base md:text-lg leading-relaxed">
                        Absolutely thrilled with the top-notch prints and exceptional
                        service provided by this agency. Highly recommend!
                    </p>

                    {/* User info */}
                    <div className="flex items-center gap-3 pt-6">

                        {/* Image */}
                        <img
                            src="https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // your image path
                            alt="client"
                            width={48}
                            height={48}
                            className="rounded-full w-12 h-12 object-cover"
                            referrerPolicy='no-referrer'
                        />

                        {/* Name & company */}
                        <div>
                            <h4 className="text-[#050C29] font-semibold text-sm md:text-base">
                                Ahmad Ibrahim
                            </h4>

                            <p className="text-[#6B7280] text-xs md:text-sm">
                                Petronas
                            </p>
                        </div>

                    </div>

                </div>
                <div className="w-full h-full bg-[#F2EDFF] p-6 md:p-8 rounded-2xl">

                    {/* Quote icon */}
                    <Quote
                        size={36}
                        color="#5B21B6"
                        strokeWidth={1.5}
                        fill="#5B21B6"
                        className="mb-4"
                    />

                    {/* Testimonial text */}
                    <p className="text-[#3A456F] text-base md:text-lg leading-relaxed">
                        Absolutely thrilled with the top-notch prints and exceptional
                        service provided by this agency. Highly recommend!
                    </p>

                    {/* User info */}
                    <div className="flex items-center gap-3 pt-6">

                        {/* Image */}
                        <img
                            src="https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // your image path
                            alt="client"
                            width={48}
                            height={48}
                            className="rounded-full w-12 h-12 object-cover"
                            referrerPolicy='no-referrer'
                        />

                        {/* Name & company */}
                        <div>
                            <h4 className="text-[#050C29] font-semibold text-sm md:text-base">
                                Ahmad Ibrahim
                            </h4>

                            <p className="text-[#6B7280] text-xs md:text-sm">
                                Petronas
                            </p>
                        </div>

                    </div>

                </div>
                <div className="w-full h-full bg-[#F2EDFF] p-6 md:p-8 rounded-2xl">

                    {/* Quote icon */}
                    <Quote
                        size={36}
                        color="#5B21B6"
                        strokeWidth={1.5}
                        fill="#5B21B6"
                        className="mb-4"
                    />

                    {/* Testimonial text */}
                    <p className="text-[#3A456F] text-base md:text-lg leading-relaxed">
                        Absolutely thrilled with the top-notch prints and exceptional
                        service provided by this agency. Highly recommend!
                    </p>

                    {/* User info */}
                    <div className="flex items-center gap-3 pt-6">

                        {/* Image */}
                        <img
                            src="https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // your image path
                            alt="client"
                            width={48}
                            height={48}
                            className="rounded-full w-12 h-12 object-cover"
                            referrerPolicy='no-referrer'
                        />

                        {/* Name & company */}
                        <div>
                            <h4 className="text-[#050C29] font-semibold text-sm md:text-base">
                                Ahmad Ibrahim
                            </h4>

                            <p className="text-[#6B7280] text-xs md:text-sm">
                                Petronas
                            </p>
                        </div>

                    </div>

                </div>
                <div className="w-full h-full bg-[#F2EDFF] p-6 md:p-8 rounded-2xl">

                    {/* Quote icon */}
                    <Quote
                        size={36}
                        color="#5B21B6"
                        strokeWidth={1.5}
                        fill="#5B21B6"
                        className="mb-4"
                    />

                    {/* Testimonial text */}
                    <p className="text-[#3A456F] text-base md:text-lg leading-relaxed">
                        Absolutely thrilled with the top-notch prints and exceptional
                        service provided by this agency. Highly recommend!
                    </p>

                    {/* User info */}
                    <div className="flex items-center gap-3 pt-6">

                        {/* Image */}
                        <img
                            src="https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // your image path
                            alt="client"
                            width={48}
                            height={48}
                            className="rounded-full w-12 h-12 object-cover"
                            referrerPolicy='no-referrer'
                        />

                        {/* Name & company */}
                        <div>
                            <h4 className="text-[#050C29] font-semibold text-sm md:text-base">
                                Ahmad Ibrahim
                            </h4>

                            <p className="text-[#6B7280] text-xs md:text-sm">
                                Petronas
                            </p>
                        </div>

                    </div>

                </div>

            </section>
        </div>
    );
};

export default ClientInsights;