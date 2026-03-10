import React, { useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useHeroSlider from "../Hooks/useHeroSectionSlider";
import AdminLoader from "./AdminLoader";
import {
    ImagePlus,
    Trash2,
    Upload,
    Eye,
    Layers,
    Sparkles,
    MousePointerClick,
    X,
    CheckCircle2,
    PlusCircle,
    LayoutDashboard,
} from "lucide-react";

const ManageHeroSlider = () => {
    const base_url = import.meta.env.VITE_BASE_URL;
    const imgbb_api_key = import.meta.env.VITE_IMGBB_API_KEY;

    const { refetch, isLoading, heroSlider } = useHeroSlider();

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [progress, setProgress] = useState(0);
    const [btn1, setBtn1] = useState("");
    const [btn2, setBtn2] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleImageChange = (file) => {
        if (!file) return;
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleFileInput = (e) => {
        handleImageChange(e.target.files[0]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            handleImageChange(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const clearImage = () => {
        setImage(null);
        setPreview(null);
        setProgress(0);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) return toast.error("Please select an image");

        try {
            setIsUploading(true);
            const formData = new FormData();
            formData.append("image", image);

            toast.loading("Uploading Image...", { id: "upload" });

            const imgbbRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=${imgbb_api_key}`,
                formData,
                {
                    onUploadProgress: (event) => {
                        const percent = Math.round((event.loaded * 100) / event.total);
                        setProgress(percent);
                    },
                }
            );

            const imageUrl = imgbbRes.data.data.url;

            await axios.post(`${base_url}/hero-slider`, {
                image: imageUrl,
                button1: btn1,
                button2: btn2,
            });

            toast.success("Slider Added Successfully!", { id: "upload" });
            refetch();
            clearImage();
            setBtn1("");
            setBtn2("");
        } catch (error) {
            toast.error("Upload Failed");
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    if (isLoading) return <AdminLoader />;

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 px-4 py-8 md:py-12">
            {/* ── Header ── */}
            <div className="max-w-6xl mx-auto mb-10 flex items-center gap-3 animate-fade-in">
                <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                    <LayoutDashboard className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                        Hero Slider
                    </h2>
                    <p className="text-sm text-gray-500 mt-0.5">
                        Manage your homepage banner slides
                    </p>
                </div>
                <div className="ml-auto flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-full px-4 py-1.5">
                    <Layers className="w-4 h-4 text-indigo-400" />
                    <span className="text-sm font-medium text-gray-300">
                        {heroSlider?.length ?? 0} Slides
                    </span>
                </div>
            </div>

            <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8">
                {/* ── Upload Form ── */}
                <div className="lg:col-span-2">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl shadow-black/40 sticky top-6">
                        <div className="flex items-center gap-2 mb-6">
                            <PlusCircle className="w-5 h-5 text-indigo-400" />
                            <h3 className="font-semibold text-white text-lg">Add New Slide</h3>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Drop Zone */}
                            <div
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onClick={() => !preview && fileInputRef.current?.click()}
                                className={`relative group rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden
                  ${isDragging
                                        ? "border-indigo-500 bg-indigo-500/10 scale-[1.02]"
                                        : preview
                                            ? "border-gray-700 cursor-default"
                                            : "border-gray-700 hover:border-indigo-500/60 hover:bg-indigo-500/5"
                                    }`}
                            >
                                {preview ? (
                                    <div className="relative h-44">
                                        <img
                                            src={preview}
                                            alt="preview"
                                            className="w-full h-full object-cover rounded-xl"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-xl" />
                                        <div className="absolute bottom-2 left-3 flex items-center gap-1.5 text-xs text-white/80">
                                            <Eye className="w-3.5 h-3.5" />
                                            Preview
                                        </div>
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); clearImage(); }}
                                            className="absolute top-2 right-2 p-1 rounded-full bg-black/60 hover:bg-red-500/80 text-white transition-colors duration-200"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="py-10 flex flex-col items-center gap-3 text-center px-4">
                                        <div className="p-3 rounded-full bg-gray-800 group-hover:bg-indigo-500/10 transition-colors duration-300">
                                            <ImagePlus className="w-7 h-7 text-gray-500 group-hover:text-indigo-400 transition-colors duration-300" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
                                                Drop image here or{" "}
                                                <span className="text-indigo-400">browse</span>
                                            </p>
                                            <p className="text-xs text-gray-600 mt-1">PNG, JPG, WEBP up to 10MB</p>
                                        </div>
                                    </div>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileInput}
                                    className="hidden"
                                />
                            </div>

                            {/* Progress Bar */}
                            {isUploading && progress > 0 && (
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <Upload className="w-3 h-3" /> Uploading
                                        </span>
                                        <span className="font-mono">{progress}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-300"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Button Inputs */}
                            {[
                                { label: "Button 1 Text", value: btn1, setter: setBtn1, placeholder: "e.g. Shop Now" },
                                { label: "Button 2 Text", value: btn2, setter: setBtn2, placeholder: "e.g. Learn More" },
                            ].map(({ label, value, setter, placeholder }, i) => (
                                <div key={i} className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-400 flex items-center gap-1.5">
                                        <MousePointerClick className="w-3.5 h-3.5 text-indigo-400" />
                                        {label}
                                    </label>
                                    <input
                                        type="text"
                                        value={value}
                                        onChange={(e) => setter(e.target.value)}
                                        placeholder={placeholder}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-gray-100 placeholder-gray-600
                      focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
                                    />
                                </div>
                            ))}

                            <button
                                type="submit"
                                disabled={isUploading}
                                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500
                  disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm
                  py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25
                  active:scale-[0.98] group"
                            >
                                {isUploading ? (
                                    <>
                                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                        </svg>
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
                                        Add Slide
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* ── Slider Grid ── */}
                <div className="lg:col-span-3">
                    {heroSlider?.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-20 text-gray-600">
                            <div className="p-4 rounded-2xl bg-gray-900 border border-gray-800 mb-4">
                                <Layers className="w-10 h-10 text-gray-700" />
                            </div>
                            <p className="font-medium text-gray-500">No slides yet</p>
                            <p className="text-sm mt-1 text-gray-700">Add your first slider image</p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 gap-5">
                            {heroSlider?.map((item, index) => (
                                <SliderCard key={item._id} item={item} index={index} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

/* ── Slider Card ── */
const SliderCard = ({ item, index }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg shadow-black/30
        transition-all duration-300 hover:border-indigo-500/40 hover:shadow-indigo-500/10 hover:shadow-xl hover:-translate-y-1"
            style={{ animationDelay: `${index * 80}ms` }}
        >
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
                <img
                    src={item?.image}
                    alt={`Slide ${index + 1}`}
                    className={`w-full h-full object-cover transition-transform duration-700 ${hovered ? "scale-110" : "scale-100"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />

                {/* Index Badge */}
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-xs text-gray-300 font-mono">
                    #{String(index + 1).padStart(2, "0")}
                </div>

                {/* Actions overlay */}
                <div className={`absolute top-3 right-3 flex gap-2 transition-all duration-300 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
                    <button
                        className="p-1.5 rounded-lg bg-red-500/80 hover:bg-red-500 backdrop-blur-sm text-white transition-colors duration-200"
                        title="Delete"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            {/* Card Body */}
            <div className="p-4 space-y-3">
                {[item?.button1, item?.button2].map((btn, i) =>
                    btn ? (
                        <div
                            key={i}
                            className="flex items-center gap-2 text-sm"
                        >
                            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${i === 0 ? "bg-indigo-400" : "bg-violet-400"}`} />
                            <span className="text-gray-400 text-xs">Btn {i + 1}:</span>
                            <span className="text-gray-200 font-medium truncate">{btn}</span>
                        </div>
                    ) : (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-800 flex-shrink-0" />
                            <span>Btn {i + 1}: —</span>
                        </div>
                    )
                )}

                <div className="pt-2 border-t border-gray-800 flex items-center gap-1.5 text-xs text-gray-600">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                    Active
                </div>
            </div>
        </div>
    );
};

export default ManageHeroSlider;