import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useAllCategories from "../../AdminCode/Hooks/useAllCategories";

const CategoryPills = () => {
    const { allCategories, isLoading } = useAllCategories();
    const scrollRef = useRef(null);

    // Function to handle scrolling left and right
    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            // Scroll by 60% of the visible width for a smooth feel
            const scrollAmount = direction === "left"
                ? -clientWidth * 0.6
                : clientWidth * 0.6;

            scrollRef.current.scrollBy({
                left: scrollAmount,
                behavior: "smooth",
            });
        }
    };

    if (isLoading) {
        return (
            <div className="w-full flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-400 font-medium">Loading categories...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full px-4 sm:px-10 group">
            {/* --- Left Arrow --- */}
            <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-[#5a11e8] text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-purple-700 hidden md:flex"
                aria-label="Scroll Left"
            >
                <ChevronLeft size={24} />
            </button>

            {/* --- Scroll Container --- */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar gap-4 py-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {allCategories?.map((category) => (
                    <div
                        key={category._id}
                        className="flex-shrink-0 snap-start"
                    >
                        <div className="group flex flex-col items-center gap-3 cursor-pointer w-24 sm:w-28 lg:w-32">
                            {/* Image Circle */}
                            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 
                                rounded-full bg-gray-100 flex items-center justify-center 
                                overflow-hidden shadow-sm group-hover:shadow-md 
                                group-hover:scale-110 transition-all duration-300 
                                border-2 border-transparent group-hover:border-purple-500">
                                <img
                                    src={category?.cat_img || 'https://via.placeholder.com/150'}
                                    alt={category?.cat_name}
                                    className="w-4/5 h-4/5 object-contain"
                                    loading="lazy"
                                />
                            </div>
                            {/* Text Label */}
                            <p className="text-xs sm:text-sm font-semibold text-[#3A456F] 
                               text-center group-hover:text-purple-600 transition-colors duration-300 
                               truncate w-full px-1">
                                {category?.cat_name}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- Right Arrow --- */}
            <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-[#5a11e8] text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-purple-700 hidden md:flex"
                aria-label="Scroll Right"
            >
                <ChevronRight size={24} />
            </button>

            {/* Custom CSS to hide scrollbar completely */}
            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default CategoryPills;
