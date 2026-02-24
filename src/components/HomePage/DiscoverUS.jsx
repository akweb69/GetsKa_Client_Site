// DiscoverUs.tsx
import { Link } from 'react-router-dom';
import videoframe from '../../assets/discover---videoframe.png'; // your placeholder image

const DiscoverUs = () => {
    return (
        <div className="w-full bg-[#09164B] py-10 md:py-16 lg:py-20 mt-10 lg:mt-20">
            <div className="w-11/12 mx-auto">
                <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Left - Text content */}
                    <div className="text-white space-y-6 md:space-y-8">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                            Discover Us
                        </h2>

                        <p className="text-lg md:text-xl text-blue-200/90 leading-relaxed">
                            Welcome to Getska Design! Explore our printing services through our curated video collection.
                            From design to craftsmanship, join us on a captivating journey through the world of print.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 pt-2">
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-blue-100">
                                    <span className="text-green-400 text-xl">✔</span>
                                    <span>Timely Delivery</span>
                                </li>
                                <li className="flex items-center gap-3 text-blue-100">
                                    <span className="text-green-400 text-xl">✔</span>
                                    <span>Exceptional Quality</span>
                                </li>
                                <li className="flex items-center gap-3 text-blue-100">
                                    <span className="text-green-400 text-xl">✔</span>
                                    <span>Personalized Service</span>
                                </li>
                            </ul>

                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-blue-100">
                                    <span className="text-green-400 text-xl">✔</span>
                                    <span>Customer Satisfaction</span>
                                </li>
                                <li className="flex items-center gap-3 text-blue-100">
                                    <span className="text-green-400 text-xl">✔</span>
                                    <span>Cost-Effective Solutions</span>
                                </li>
                                <li className="flex items-center gap-3 text-blue-100">
                                    <span className="text-green-400 text-xl">✔</span>
                                    <span>State-of-the-Art Printing</span>
                                </li>
                            </ul>
                        </div>

                        {/* Buttons */}

                        <div className="flex items-center gap-4 ">
                            <Link className=' bg-[#5216E7] text-white rounded-md p-3 text-center'>
                                Customized now
                            </Link>
                            <Link className=' text-sm text-[#C4ABFE] rounded-md p-3 text-center border border-[#C4ABFE] '>
                                Explore services
                            </Link>
                        </div>
                    </div>

                    {/* Right - Video / Image frame */}
                    <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-black/40">
                        <img
                            src={videoframe}
                            alt="Getska Design printing video showcase"
                            className="w-full h-auto object-cover"
                        />

                        {/* Optional: Play button overlay (if you want to mimic video feel) */}
                        {/* <button
                            className="
                absolute inset-0 flex items-center justify-center
                bg-black/20 hover:bg-black/40 transition-colors
              "
                            aria-label="Play video"
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                                <svg
                                    className="w-8 h-8 md:w-10 md:h-10 text-[#09164B]"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscoverUs;