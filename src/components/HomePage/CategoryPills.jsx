import { useMemo } from "react";

// Slick carousel imports
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import businessCardImg from "../../assets/Business card 2.png";
import stickerImg from "../../assets/Sticker.png";
import flyerImg from "../../assets/Flyer.png";
import stationaryImg from "../../assets/Stationery 1.png";
import letterHeadImg from "../../assets/Letter Head.png";
import bannerImg from "../../assets/Bann 1.png";
import productLabelImg from "../../assets/Product Label 1.png";
import useAllCategories from "../../AdminCode/Hooks/useAllCategories";

const CategoryPills = () => {

    const { allCategories, isLoading } = useAllCategories();

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

    if (isLoading) {
        return (
            <div className="w-full flex items-center justify-center py-10">
                <p className="text-gray-500 text-lg">Loading categories...</p>
            </div>
        );
    }



    return (
        <div className="w-full">
            <Slider {...settings}>
                {allCategories?.map((category, index) => (
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
                                    src={category?.cat_img}
                                    alt={`${category?.cat_name} icon`}
                                    className="w-5/6 h-5/6 object-contain"
                                    loading="lazy"
                                />
                            </div>
                            <p className="text-sm sm:text-base font-medium text-[#3A456F] text-center group-hover:text-purple-700 transition-colors">
                                {category?.cat_name}
                            </p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CategoryPills;