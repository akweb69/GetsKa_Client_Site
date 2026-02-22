import { Link } from 'react-router-dom';
import rectengleMobile from '../../assets/Rectangle 1.png'
import rectengleMobile111 from '../../assets/Frame 1000011393.png'
const UniqueEdge = () => {
    return (
        <div className='w-full p-4 md:p-10 lg:p-20 rounded-2xl md:rounded-3xl bg-[#09164B]'>
            <div className="pb-6 md:pb-8">
                <h1 className="text-center text-[#F2EDFF] font-bold text-2xl md:text-4xl " >
                    Unique Edge
                </h1>
                <p className="max-w-[450px] mx-auto text-center text-[#D7C6FE] mt-2">
                    We go beyond the ordinary with our expertise, delivering unmatched quality and reliability.
                </p>
            </div>

            <div className="md:grid grid-cols-3 gap-4 md:gap-6 h-full">
                {/* left side */}
                <div className="flex flex-col gap-4 md:gap-6">


                    {
                        [{ n: "01", n1: "Designing Expertise", n2: "Designs that embody your brand, crafted with care and precision." }, { n: "02", n1: "Printing Precision", n2: "Meticulous detail and modern tech for impeccable print results." }, { n: "03", n1: "Reliable Delivery", n2: "On-time, every time. We deliver with your deadlines in mind." },].map((d, i) => (
                            <div key={i} className=" bg-white p-4 md:p-6 lg:p-10 rounded-xl">
                                <h1 className="text-[#8E94AC] font-bold text-lg md:text-2xl " >
                                    {d.n}
                                </h1>
                                <p className="text-[#050C29] text-lg md:text-2xl font-semibold mt-2">
                                    {d.n1}
                                </p>
                                <p className="text-[#3A456F]  mt-2">
                                    {d.n2}
                                </p>
                            </div>
                        ))
                    }

                </div>
                {/* middle side */}
                <div className="h-full">
                    <img src={rectengleMobile} alt="" className='h-full w-full' />

                </div>
                {/* right side */}
                <div className="p-4 md:p-6 bg-white rounded-xl">
                    <p className="text-xl md:text-3xl font-semibold text-[#050C29]">
                        Create Impactful Prints with Lively, Rich Colors
                    </p>
                    <p className="md:text-lg text-[#3A456F] py-4 ">
                        Add a vibrant touch to your prints with colors that capture attention and elevate your brand.
                    </p>
                    <Link to={"/products"} className='text-center bg-[#5216E7] block w-full rounded-lg text-white py-2 '  >
                        Customized now
                    </Link>
                    <Link to={"/products"} className='block text-center border border-[#5216E7] text-[#5216E7] rounded-lg mt-4 py-2 '  >
                        Explore services
                    </Link>

                    <div className="w-full flex justify-end">
                        <img src={rectengleMobile111} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UniqueEdge;