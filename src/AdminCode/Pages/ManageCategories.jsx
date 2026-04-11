import React, { useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiGrid,
    FiPlus,
    FiTrash2,
    FiEdit3,
    FiX,
    FiCheck,
    FiImage,
    FiTag,
    FiUploadCloud,
    FiAlertTriangle,
    FiRefreshCw,
    FiAlignLeft,   // New icon for description
} from "react-icons/fi";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import useAllCategories from "../Hooks/useAllCategories";

/* ─── Animation Variants ───────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
    }),
    exit: { opacity: 0, y: -16, transition: { duration: 0.25 } },
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.88 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, scale: 0.88, transition: { duration: 0.2 } },
};

const overlayVariant = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
    exit: { opacity: 0 },
};

/* ─── Skeleton Card ─────────────────────────────────────── */
const SkeletonCard = ({ i }) => (
    <motion.div
        custom={i}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden"
    >
        <div className="h-40 bg-gray-800 animate-pulse" />
        <div className="p-4 space-y-2">
            <div className="h-4 w-3/4 bg-gray-800 rounded-full animate-pulse" />
            <div className="h-3 w-1/2 bg-gray-800/60 rounded-full animate-pulse" />
        </div>
    </motion.div>
);

/* ─── Delete Confirm Modal ──────────────────────────────── */
const DeleteModal = ({ category, onConfirm, onCancel, loading }) => (
    <AnimatePresence>
        <motion.div
            variants={overlayVariant}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
        >
            <motion.div
                variants={scaleIn}
                initial="hidden"
                animate="show"
                exit="exit"
                className="bg-gray-900 border border-gray-700 rounded-2xl p-7 max-w-sm w-full shadow-2xl shadow-black/60"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
                        <FiAlertTriangle className="w-5 h-5 text-red-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Delete Category</h3>
                </div>
                <p className="text-gray-400 text-sm mb-2">
                    Are you sure you want to delete{" "}
                    <span className="text-white font-semibold">{category?.cat_name}</span>?
                </p>
                <p className="text-gray-600 text-xs mb-6">This action cannot be undone.</p>
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-2.5 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 text-sm font-medium transition-all duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <FiRefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                            <FiTrash2 className="w-4 h-4" />
                        )}
                        Delete
                    </button>
                </div>
            </motion.div>
        </motion.div>
    </AnimatePresence>
);

/* ─── Edit Modal ────────────────────────────────────────── */
const EditModal = ({ category, onSave, onCancel, imgbb_api_key }) => {
    const [name, setName] = useState(category.cat_name || "");
    const [sortDesc, setSortDesc] = useState(category.cat_sort_desc || ""); // New field
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(category.cat_img || "");
    const [saving, setSaving] = useState(false);
    const fileRef = useRef();

    const handleFile = (e) => {
        const f = e.target.files[0];
        if (!f) return;
        setImageFile(f);
        setPreview(URL.createObjectURL(f));
    };

    const handleSave = async () => {
        if (!name.trim()) return toast.error("Category name is required");
        setSaving(true);
        try {
            let imgUrl = category.cat_img;
            if (imageFile) {
                const fd = new FormData();
                fd.append("image", imageFile);
                const res = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${imgbb_api_key}`,
                    fd
                );
                imgUrl = res.data.data.url;
            }
            await onSave({
                cat_name: name.trim(),
                cat_img: imgUrl,
                cat_sort_desc: sortDesc.trim()   // New field
            });
        } catch {
            toast.error("Failed to save");
        } finally {
            setSaving(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                variants={overlayVariant}
                initial="hidden"
                animate="show"
                exit="exit"
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            >
                <motion.div
                    variants={scaleIn}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="bg-gray-900 border border-gray-700 rounded-2xl p-7 max-w-md w-full shadow-2xl shadow-black/60"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20">
                                <FiEdit3 className="w-4 h-4 text-violet-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white">Edit Category</h3>
                        </div>
                        <button
                            onClick={onCancel}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-gray-800 transition-colors"
                        >
                            <FiX className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Image */}
                    <div
                        onClick={() => fileRef.current?.click()}
                        className="relative h-40 rounded-xl overflow-hidden border-2 border-dashed border-gray-700 hover:border-violet-500/60 cursor-pointer mb-5 group transition-colors duration-200"
                    >
                        {preview ? (
                            <>
                                <img src={preview} alt="" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <FiImage className="w-7 h-7 text-white" />
                                </div>
                            </>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center gap-2 text-gray-600 group-hover:text-violet-400 transition-colors">
                                <FiUploadCloud className="w-8 h-8" />
                                <span className="text-xs">Click to upload image</span>
                            </div>
                        )}
                        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
                    </div>

                    {/* Name */}
                    <div className="mb-5 space-y-1.5">
                        <label className="text-sm text-gray-400 font-medium flex items-center gap-1.5">
                            <FiTag className="w-3.5 h-3.5 text-violet-400" /> Category Name
                        </label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Electronics"
                            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-100 placeholder-gray-600
                focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/50 transition-all duration-200"
                        />
                    </div>

                    {/* New Field: Sort Description */}
                    <div className="mb-6 space-y-1.5">
                        <label className="text-sm text-gray-400 font-medium flex items-center gap-1.5">
                            <FiAlignLeft className="w-3.5 h-3.5 text-violet-400" />
                            Sort Description (Optional)
                        </label>
                        <textarea
                            value={sortDesc}
                            onChange={(e) => setSortDesc(e.target.value)}
                            placeholder="Short description for sorting or display (e.g. Best selling, New arrival, etc.)"
                            rows={3}
                            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-100 placeholder-gray-600
                focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/50 transition-all duration-200 resize-y min-h-[80px]"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={onCancel}
                            className="flex-1 py-2.5 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 text-sm font-medium transition-all duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            {saving ? <FiRefreshCw className="w-4 h-4 animate-spin" /> : <FiCheck className="w-4 h-4" />}
                            Save Changes
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

/* ─── Category Card ─────────────────────────────────────── */
const CategoryCard = ({ item, index, onEdit, onDelete }) => (
    <motion.div
        custom={index}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        exit="exit"
        layout
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="group relative bg-gray-900 border border-gray-800 hover:border-violet-500/30 rounded-2xl overflow-hidden
      shadow-lg shadow-black/20 hover:shadow-violet-500/10 hover:shadow-xl transition-all duration-300"
    >
        {/* Image */}
        <div className="relative h-44 overflow-hidden bg-gray-800">
            <motion.img
                src={item.cat_img}
                alt={item.cat_name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />

            {/* Index badge */}
            <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-xs font-mono text-gray-300">
                #{String(index + 1).padStart(2, "0")}
            </div>

            {/* Action buttons */}
            <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 translate-y-[-6px] group-hover:translate-y-0 transition-all duration-300">
                <button
                    onClick={() => onEdit(item)}
                    className="p-2 rounded-lg bg-violet-600/80 hover:bg-violet-500 backdrop-blur-sm text-white transition-colors duration-200"
                    title="Edit"
                >
                    <FiEdit3 className="w-3.5 h-3.5" />
                </button>
                <button
                    onClick={() => onDelete(item)}
                    className="p-2 rounded-lg bg-red-600/80 hover:bg-red-500 backdrop-blur-sm text-white transition-colors duration-200"
                    title="Delete"
                >
                    <FiTrash2 className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>

        {/* Body */}
        <div className="px-4 py-4">
            <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-violet-400 flex-shrink-0" />
                <p className="text-gray-100 font-semibold text-sm truncate">{item.cat_name}</p>
            </div>

            {/* New: Sort Description */}
            {item.cat_sort_desc && (
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mt-1">
                    {item.cat_sort_desc}
                </p>
            )}
        </div>
    </motion.div>
);

/* ─── Main Component ────────────────────────────────────── */
const ManageCategories = () => {
    const base_url = import.meta.env.VITE_BASE_URL;
    const imgbb_api_key = import.meta.env.VITE_IMGBB_API_KEY;
    const { refetch, isLoading, allCategories } = useAllCategories();

    /* Form state */
    const [catName, setCatName] = useState("");
    const [catSortDesc, setCatSortDesc] = useState("");        // ← New state
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const fileRef = useRef();

    /* Modal state */
    const [editTarget, setEditTarget] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);

    /* ── File handling ── */
    const handleFile = (file) => {
        if (!file || !file.type.startsWith("image/")) return;
        setImageFile(file);
        setPreview(URL.createObjectURL(file));
    };
    const clearImage = () => {
        setImageFile(null);
        setPreview(null);
        setProgress(0);
        if (fileRef.current) fileRef.current.value = "";
    };

    /* ── Create ── */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!catName.trim()) return toast.error("Category name is required");
        if (!imageFile) return toast.error("Please select an image");

        setUploading(true);
        const toastId = toast.loading("Uploading...");
        try {
            const fd = new FormData();
            fd.append("image", imageFile);
            const imgRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=${imgbb_api_key}`,
                fd,
                {
                    onUploadProgress: (ev) =>
                        setProgress(Math.round((ev.loaded * 100) / ev.total)),
                }
            );
            const cat_img = imgRes.data.data.url;

            await axios.post(`${base_url}/categories`, {
                cat_name: catName.trim(),
                cat_img,
                cat_sort_desc: catSortDesc.trim()   // ← New field
            });

            toast.success("Category added!", { id: toastId });
            refetch();
            setCatName("");
            setCatSortDesc("");        // Reset new field
            clearImage();
        } catch {
            toast.error("Failed to add category", { id: toastId });
        } finally {
            setUploading(false);
        }
    };

    /* ── Edit save ── */
    const handleEditSave = async (data) => {
        const toastId = toast.loading("Saving...");
        try {
            await axios.patch(`${base_url}/categories/${editTarget._id}`, data);
            toast.success("Category updated!", { id: toastId });
            setEditTarget(null);
            refetch();
        } catch {
            toast.error("Update failed", { id: toastId });
        }
    };

    /* ── Delete ── */
    const handleDeleteConfirm = async () => {
        setDeleting(true);
        const toastId = toast.loading("Deleting...");
        try {
            await axios.delete(`${base_url}/categories/${deleteTarget._id}`);
            toast.success("Category deleted!", { id: toastId });
            setDeleteTarget(null);
            refetch();
        } catch {
            toast.error("Delete failed", { id: toastId });
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 px-4 py-8 md:py-12">

            {/* ── Modals ── */}
            <AnimatePresence>
                {deleteTarget && (
                    <DeleteModal
                        category={deleteTarget}
                        onConfirm={handleDeleteConfirm}
                        onCancel={() => setDeleteTarget(null)}
                        loading={deleting}
                    />
                )}
                {editTarget && (
                    <EditModal
                        category={editTarget}
                        onSave={handleEditSave}
                        onCancel={() => setEditTarget(null)}
                        imgbb_api_key={imgbb_api_key}
                    />
                )}
            </AnimatePresence>

            {/* ── Page Header ── */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="max-w-6xl mx-auto mb-10 flex items-center gap-3"
            >
                <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20">
                    <HiOutlineSquares2X2 className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                        Manage Categories
                    </h2>
                    <p className="text-sm text-gray-500 mt-0.5">Add, edit or remove product categories</p>
                </div>
                <div className="ml-auto flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-full px-4 py-1.5">
                    <FiGrid className="w-3.5 h-3.5 text-violet-400" />
                    <span className="text-sm font-medium text-gray-300">
                        {allCategories?.length ?? 0} Categories
                    </span>
                </div>
            </motion.div>

            <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8 items-start">

                {/* ── Add Form ── */}
                <motion.div
                    variants={fadeUp}
                    custom={1}
                    initial="hidden"
                    animate="show"
                    className="lg:col-span-2"
                >
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl shadow-black/30 sticky top-6">
                        <div className="flex items-center gap-2 mb-6">
                            <FiPlus className="w-5 h-5 text-violet-400" />
                            <h3 className="font-semibold text-white text-lg">New Category</h3>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Drop Zone */}
                            <div
                                onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); }}
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onClick={() => !preview && fileRef.current?.click()}
                                className={`relative rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden
                  ${isDragging ? "border-violet-500 bg-violet-500/10 scale-[1.02]"
                                        : preview ? "border-gray-700 cursor-default"
                                            : "border-gray-700 hover:border-violet-500/60 hover:bg-violet-500/5"}`}
                            >
                                {preview ? (
                                    <div className="relative h-44">
                                        <img src={preview} alt="preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); clearImage(); }}
                                            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-red-500/80 text-white transition-colors"
                                        >
                                            <FiX className="w-3.5 h-3.5" />
                                        </button>
                                        <span className="absolute bottom-2 left-3 text-xs text-white/70">Preview</span>
                                    </div>
                                ) : (
                                    <div className="py-10 flex flex-col items-center gap-3">
                                        <div className="p-3 rounded-full bg-gray-800 group-hover:bg-violet-500/10 transition-colors">
                                            <FiUploadCloud className="w-7 h-7 text-gray-500" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm text-gray-400">Drop image or <span className="text-violet-400">browse</span></p>
                                            <p className="text-xs text-gray-600 mt-1">PNG, JPG, WEBP</p>
                                        </div>
                                    </div>
                                )}
                                <input ref={fileRef} type="file" accept="image/*" className="hidden"
                                    onChange={(e) => handleFile(e.target.files[0])} />
                            </div>

                            {/* Progress */}
                            <AnimatePresence>
                                {uploading && progress > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-1.5"
                                    >
                                        <div className="flex justify-between text-xs text-gray-400">
                                            <span>Uploading image...</span>
                                            <span className="font-mono">{progress}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progress}%` }}
                                                transition={{ duration: 0.2 }}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Name Input */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-400 flex items-center gap-1.5">
                                    <FiTag className="w-3.5 h-3.5 text-violet-400" /> Category Name
                                </label>
                                <input
                                    type="text"
                                    value={catName}
                                    onChange={(e) => setCatName(e.target.value)}
                                    placeholder="e.g. Electronics"
                                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-100 placeholder-gray-600
                    focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/50 transition-all duration-200"
                                />
                            </div>

                            {/* New Field: Sort Description in Add Form */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-400 flex items-center gap-1.5">
                                    <FiAlignLeft className="w-3.5 h-3.5 text-violet-400" />
                                    Sort Description (Optional)
                                </label>
                                <textarea
                                    value={catSortDesc}
                                    onChange={(e) => setCatSortDesc(e.target.value)}
                                    placeholder="Short description for sorting or display purpose..."
                                    rows={3}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-100 placeholder-gray-600
                    focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/50 transition-all duration-200 resize-y min-h-[80px]"
                                />
                            </div>

                            {/* Submit */}
                            <motion.button
                                type="submit"
                                disabled={uploading}
                                whileTap={{ scale: 0.97 }}
                                className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500
                  disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm
                  py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/25"
                            >
                                {uploading ? (
                                    <FiRefreshCw className="w-4 h-4 animate-spin" />
                                ) : (
                                    <FiPlus className="w-4 h-4" />
                                )}
                                {uploading ? "Adding..." : "Add Category"}
                            </motion.button>
                        </form>
                    </div>
                </motion.div>

                {/* ── Category Grid ── */}
                <div className="lg:col-span-3">
                    {isLoading ? (
                        <div className="grid sm:grid-cols-2 gap-5">
                            {[...Array(4)].map((_, i) => <SkeletonCard key={i} i={i} />)}
                        </div>
                    ) : !allCategories?.length ? (
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="show"
                            className="flex flex-col items-center justify-center text-center py-24 text-gray-600"
                        >
                            <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800 mb-4">
                                <FiGrid className="w-10 h-10 text-gray-700" />
                            </div>
                            <p className="font-semibold text-gray-500">No categories yet</p>
                            <p className="text-sm mt-1 text-gray-700">Add your first category using the form</p>
                        </motion.div>
                    ) : (
                        <motion.div layout className="grid sm:grid-cols-2 gap-5">
                            <AnimatePresence>
                                {allCategories.map((item, i) => (
                                    <CategoryCard
                                        key={item._id}
                                        item={item}
                                        index={i}
                                        onEdit={setEditTarget}
                                        onDelete={setDeleteTarget}
                                    />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageCategories;