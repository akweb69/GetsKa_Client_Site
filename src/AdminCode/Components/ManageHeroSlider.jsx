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
    Pencil,
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

    // ── Edit / Delete states ──
    const [editingItem, setEditingItem] = useState(null);
    const [editBtn1, setEditBtn1] = useState("");
    const [editBtn2, setEditBtn2] = useState("");
    const [editImage, setEditImage] = useState(null);
    const [editPreview, setEditPreview] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const fileInputRef = useRef(null);
    const editFileInputRef = useRef(null);

    const handleImageChange = (file) => {
        if (!file) return;
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleEditImageChange = (file) => {
        if (!file) return;
        setEditImage(file);
        setEditPreview(URL.createObjectURL(file));
    };

    const handleFileInput = (e) => handleImageChange(e.target.files[0]);
    const handleEditFileInput = (e) => handleEditImageChange(e.target.files[0]);

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file?.type.startsWith("image/")) handleImageChange(file);
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

    const clearEditImage = () => {
        setEditImage(null);
        setEditPreview(null);
        if (editFileInputRef.current) editFileInputRef.current.value = "";
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

            toast.success("Slide Added!", { id: "upload" });
            refetch();
            clearImage();
            setBtn1("");
            setBtn2("");
        } catch (err) {
            toast.error("Failed to add slide");
            console.error(err);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this slide permanently?")) return;

        try {
            setDeletingId(id);
            await axios.delete(`${base_url}/hero-slider/${id}`);
            toast.success("Slide deleted");
            refetch();
        } catch (err) {
            toast.error("Delete failed");
            console.error(err);
        } finally {
            setDeletingId(null);
        }
    };

    const startEdit = (item) => {
        setEditingItem(item);
        setEditBtn1(item.button1 || "");
        setEditBtn2(item.button2 || "");
        setEditPreview(item.image);
        setEditImage(null); // new image is optional
        setIsEditing(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            let imageUrl = editingItem.image;

            if (editImage) {
                toast.loading("Uploading new image...", { id: "edit" });
                const formData = new FormData();
                formData.append("image", editImage);

                const imgbbRes = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${imgbb_api_key}`,
                    formData
                );
                imageUrl = imgbbRes.data.data.url;
            }

            await axios.patch(`${base_url}/hero-slider/${editingItem._id}`, {
                image: imageUrl,
                button1: editBtn1,
                button2: editBtn2,
            });

            toast.success("Slide updated!", { id: "edit" });
            setIsEditing(false);
            setEditingItem(null);
            clearEditImage();
            refetch();
        } catch (err) {
            toast.error("Update failed");
            console.error(err);
        }
    };

    if (isLoading) return <AdminLoader />;

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 px-4 py-8 md:py-12">
            {/* Header */}
            <div className="max-w-6xl mx-auto mb-10 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                    <LayoutDashboard className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold">Hero Slider</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Manage homepage banner slides</p>
                </div>
                <div className="ml-auto flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-full px-4 py-1.5">
                    <Layers className="w-4 h-4 text-indigo-400" />
                    <span className="text-sm font-medium text-gray-300">
                        {heroSlider?.length ?? 0} Slides
                    </span>
                </div>
            </div>

            <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8">
                {/* Add Form */}
                <div className="lg:col-span-2">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl shadow-black/40 sticky top-6">
                        <div className="flex items-center gap-2 mb-6">
                            <PlusCircle className="w-5 h-5 text-indigo-400" />
                            <h3 className="font-semibold text-white text-lg">Add New Slide</h3>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Dropzone */}
                            <div
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onClick={() => !preview && fileInputRef.current?.click()}
                                className={`relative rounded-xl border-2 border-dashed transition-all cursor-pointer overflow-hidden h-44
                                    ${isDragging ? "border-indigo-500 bg-indigo-500/10 scale-[1.02]" : preview ? "border-gray-700 cursor-default" : "border-gray-700 hover:border-indigo-500/60 hover:bg-indigo-500/5"}`}
                            >
                                {preview ? (
                                    <div className="relative h-full">
                                        <img src={preview} alt="preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); clearImage(); }}
                                            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-red-600 text-white"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center px-4">
                                        <ImagePlus className="w-10 h-10 text-gray-600 mb-3" />
                                        <p className="text-sm text-gray-400">Drop image or click to browse</p>
                                        <p className="text-xs text-gray-600 mt-1">PNG, JPG, WEBP</p>
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

                            {isUploading && progress > 0 && (
                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-indigo-600 transition-all"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            )}

                            {/* Buttons inputs */}
                            {[
                                { label: "Button 1", val: btn1, set: setBtn1, ph: "Shop Now" },
                                { label: "Button 2", val: btn2, set: setBtn2, ph: "Learn More" },
                            ].map(({ label, val, set, ph }, i) => (
                                <div key={i}>
                                    <label className="block text-sm text-gray-400 mb-1.5">{label}</label>
                                    <input
                                        type="text"
                                        value={val}
                                        onChange={(e) => set(e.target.value)}
                                        placeholder={ph}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                            ))}

                            <button
                                type="submit"
                                disabled={isUploading || !image}
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-xl font-medium flex items-center justify-center gap-2"
                            >
                                {isUploading ? "Uploading..." : "Add Slide"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Grid */}
                <div className="lg:col-span-3">
                    {heroSlider?.length === 0 ? (
                        <div className="text-center py-20 text-gray-600">
                            <Layers className="w-16 h-16 mx-auto mb-4 opacity-30" />
                            <p>No slides yet</p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 gap-5">
                            {heroSlider.map((item, idx) => (
                                <SliderCard
                                    key={item._id}
                                    item={item}
                                    index={idx}
                                    onDelete={handleDelete}
                                    onEdit={startEdit}
                                    isDeleting={deletingId === item._id}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Edit Modal ── */}
            {isEditing && editingItem && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold flex items-center gap-2">
                                    <Pencil className="w-5 h-5 text-indigo-400" />
                                    Edit Slide
                                </h3>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleUpdate} className="space-y-5">
                                {/* Current / New Image */}
                                <div className="relative rounded-xl overflow-hidden border border-gray-700 h-48">
                                    <img
                                        src={editPreview}
                                        alt="preview"
                                        className="w-full h-full object-cover"
                                    />
                                    {editImage && (
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm font-medium">
                                            New image selected
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        onClick={clearEditImage}
                                        className="absolute top-3 right-3 p-2 bg-black/60 rounded-full hover:bg-red-600/80"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-1.5">Replace Image (optional)</label>
                                    <input
                                        ref={editFileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleEditFileInput}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600/20 file:text-indigo-400 hover:file:bg-indigo-600/30"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-1.5">Button 1 Text</label>
                                    <input
                                        type="text"
                                        value={editBtn1}
                                        onChange={(e) => setEditBtn1(e.target.value)}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-1.5">Button 2 Text</label>
                                    <input
                                        type="text"
                                        value={editBtn2}
                                        onChange={(e) => setEditBtn2(e.target.value)}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-medium"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const SliderCard = ({ item, index, onDelete, onEdit, isDeleting }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all hover:border-indigo-500/40 hover:-translate-y-1"
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={item.image}
                    alt={`Slide ${index + 1}`}
                    className={`w-full h-full object-cover transition-transform duration-500 ${hovered ? "scale-110" : "scale-100"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 text-xs font-mono text-gray-300">
                    #{String(index + 1).padStart(2, "0")}
                </div>

                <div className={`absolute top-3 right-3 flex gap-2 transition-all ${hovered ? "opacity-100" : "opacity-0 -translate-y-2"}`}>
                    <button
                        onClick={() => onEdit(item)}
                        className="p-2 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white backdrop-blur-sm"
                        title="Edit"
                    >
                        <Pencil className="w-4 h-4" />
                    </button>

                    <button
                        onClick={() => onDelete(item._id)}
                        disabled={isDeleting}
                        className="p-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white backdrop-blur-sm disabled:opacity-50"
                        title="Delete"
                    >
                        {isDeleting ? (
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                        ) : (
                            <Trash2 className="w-4 h-4" />
                        )}
                    </button>
                </div>
            </div>

            <div className="p-4 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span className="text-gray-400">Btn 1:</span>
                    <span className="text-gray-200 truncate">{item.button1 || "—"}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                    <span className="text-gray-400">Btn 2:</span>
                    <span className="text-gray-200 truncate">{item.button2 || "—"}</span>
                </div>
            </div>
        </div>
    );
};

export default ManageHeroSlider;