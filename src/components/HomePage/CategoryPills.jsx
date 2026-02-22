import { useMemo } from "react";

// Slick carousel imports
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// Images (adjust paths if needed — recommended: move to /public/assets/ and use /assets/... paths)
import businessCardImg from "../../assets/Business card 2.png";
import stickerImg from "../../assets/Sticker.png";
import flyerImg from "../../assets/Flyer.png";
import stationaryImg from "../../assets/Stationery 1.png";
import letterHeadImg from "../../assets/Letter Head.png";
import bannerImg from "../../assets/Bann 1.png";
import productLabelImg from "../../assets/Product Label 1.png";

const CategoryPills = () => {

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;

        return (
            <div
                className={`${className} custom-next-arrow`}
                style={{
                    ...style,
                    background: "#2563eb",
                    color: "#ffffff",
                    borderRadius: "50%",
                    width: "42px",
                    height: "42px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    right: "10px",
                    zIndex: 10,
                    boxShadow: "0 6px 16px rgba(37, 99, 235, 0.35)",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} custom-next-arrow`}
                style={{
                    ...style,
                    background: "#2563eb",
                    color: "#ffffff",
                    borderRadius: "50%",
                    width: "42px",
                    height: "42px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    left: "10px",
                    zIndex: 10,
                    boxShadow: "0 6px 16px rgba(37, 99, 235, 0.35)",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                }}
                onClick={onClick}
            />
        );
    }






    // Memoize settings so they don't recreate on every render
    const settings = useMemo(
        () => ({
            // dots: true,
            infinite: true,           // loops smoothly — usually better UX
            speed: 600,
            slidesToShow: 7,          // good desktop starting point
            slidesToScroll: 4,
            initialSlide: 0,
            arrows: true,             // enable arrows (you can hide with CSS if unwanted)
            pauseOnHover: true,
            autoplay: false,          // set true if you want auto-play
            autoplaySpeed: 4000,
            lazyLoad: "ondemand",
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            responsive: [
                {
                    breakpoint: 1280,
                    settings: {
                        slidesToShow: 7,
                        slidesToScroll: 3,
                    },
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 6,
                        slidesToScroll: 3,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 2,
                    },
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        arrows: false,
                        dots: true
                    },
                },
            ],
        }),
        []
    );

    const categories = [
        { name: "Business Card", img: businessCardImg },
        { name: "Sticker Design", img: stickerImg },
        { name: "Flyer & Leaflets", img: flyerImg },
        { name: "Stationary Design", img: stationaryImg },
        { name: "Letter Head Design", img: letterHeadImg },
        { name: "Banner Design", img: bannerImg },
        { name: "Product Label", img: productLabelImg },
        { name: "Letter Head Design", img: letterHeadImg },
        { name: "Banner Design", img: bannerImg },
        { name: "Product Label", img: productLabelImg },
    ];

    return (
        <div className="w-full">
            <Slider {...settings}>
                {categories.map((category, index) => (
                    <div key={index} className="px-2 sm:px-3">
                        <div
                            className={`
                group flex flex-col items-center gap-3 
                rounded-2xl py-5 px-4  cursor-pointer
              `}
                        >
                            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 
                              rounded-full bg-purple-100 flex items-center justify-center 
                              overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
                                <img
                                    src={category.img}
                                    alt={`${category.name} icon`}
                                    className="w-5/6 h-5/6 object-contain"
                                    loading="lazy"
                                />
                            </div>
                            <p className="text-sm sm:text-base font-medium text-[#3A456F] text-center group-hover:text-purple-700 transition-colors">
                                {category.name}
                            </p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CategoryPills;