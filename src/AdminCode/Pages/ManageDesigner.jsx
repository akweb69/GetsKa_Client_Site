import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ManageDesigner = () => {
    const base_url = import.meta.env.VITE_BASE_URL;
    const imgbb_api_key = import.meta.env.VITE_IMGBB_API_KEY;

    const { id } = useParams();
    const navigate = useNavigate();

    // States
    const [designers, setDesigners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const [isEdit, setIsEdit] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // Form Data
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        rating: 0,
        jobs: 0,
        PricePerHour: 0,
        profileImage: "",
        portfolio_link: "",
        about: "",
        skills: [],
        tools: [],
        experience: "",
        portfolios: []
    });

    // UI Helpers
    const [newSkill, setNewSkill] = useState("");
    const [newTool, setNewTool] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedDesigner, setSelectedDesigner] = useState(null);

    // Image States
    const [profilePreview, setProfilePreview] = useState(null);
    const [profileUploading, setProfileUploading] = useState(false);
    const [profileProgress, setProfileProgress] = useState(0);

    // Each portfolio entry: { id, title, tags, link, image, preview, uploading, progress }
    const [workEntries, setWorkEntries] = useState([]);

    // Fetch all designers
    const fetchDesigners = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${base_url}/designers`);
            setDesigners(res.data);
        } catch (error) {
            console.error("Failed to fetch designers", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDesigners();
    }, []);

    useEffect(() => {
        if (id) {
            loadDesignerForEdit(id);
        }
    }, [id]);

    const loadDesignerForEdit = async (designerId) => {
        try {
            const res = await axios.get(`${base_url}/designers/${designerId}`);
            const data = res.data;
            setFormData(data);
            setIsEdit(true);
            setEditingId(designerId);
            setProfilePreview(data.profileImage);

            const entries = data.portfolios?.map((p, i) => ({
                id: `existing-${i}-${Date.now()}`,
                title: p.title || "",
                tags: p.tags || "",
                link: p.link || "",
                image: p.image || "",
                preview: p.image || "",
                uploading: false,
                progress: 100
            })) || [];
            setWorkEntries(entries);
        } catch (error) {
            console.error("Error loading designer:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) || 0 : value
        }));
    };

    const addSkill = () => {
        if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
            setFormData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
            setNewSkill("");
        }
    };

    const addTool = () => {
        if (newTool.trim() && !formData.tools.includes(newTool.trim())) {
            setFormData(prev => ({ ...prev, tools: [...prev.tools, newTool.trim()] }));
            setNewTool("");
        }
    };

    const removeItem = (key, index) => {
        setFormData(prev => ({
            ...prev,
            [key]: prev[key].filter((_, i) => i !== index)
        }));
    };

    const handleProfileImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setProfilePreview(URL.createObjectURL(file));
        setProfileUploading(true);
        setProfileProgress(0);

        const fd = new FormData();
        fd.append("image", file);

        try {
            const res = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbb_api_key}`, fd, {
                onUploadProgress: (p) => setProfileProgress(Math.round((p.loaded * 100) / p.total))
            });
            setFormData(prev => ({ ...prev, profileImage: res.data.data.url }));
        } catch (err) {
            alert("Profile image upload failed");
        } finally {
            setProfileUploading(false);
        }
    };

    // Add a blank work entry
    const addWorkEntry = () => {
        const newEntry = {
            id: `new-${Date.now()}-${Math.random()}`,
            title: "",
            tags: "",
            link: "",
            image: "",
            preview: null,
            uploading: false,
            progress: 0
        };
        setWorkEntries(prev => [...prev, newEntry]);
    };

    // Update a field in a work entry
    const updateWorkEntry = (entryId, field, value) => {
        setWorkEntries(prev =>
            prev.map(entry =>
                entry.id === entryId ? { ...entry, [field]: value } : entry
            )
        );
    };

    // Handle image upload for a specific work entry
    const handleWorkEntryImage = async (entryId, file) => {
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        setWorkEntries(prev =>
            prev.map(entry =>
                entry.id === entryId
                    ? { ...entry, preview: previewUrl, uploading: true, progress: 0 }
                    : entry
            )
        );

        const fd = new FormData();
        fd.append("image", file);

        try {
            const res = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbb_api_key}`, fd, {
                onUploadProgress: (p) => {
                    const percent = Math.round((p.loaded * 100) / p.total);
                    setWorkEntries(prev =>
                        prev.map(entry =>
                            entry.id === entryId ? { ...entry, progress: percent } : entry
                        )
                    );
                }
            });

            const imageUrl = res.data.data.url;
            setWorkEntries(prev =>
                prev.map(entry =>
                    entry.id === entryId
                        ? { ...entry, image: imageUrl, uploading: false, progress: 100 }
                        : entry
                )
            );
        } catch (err) {
            alert("Image upload failed for this work entry");
            setWorkEntries(prev =>
                prev.map(entry =>
                    entry.id === entryId
                        ? { ...entry, uploading: false, preview: entry.image || null }
                        : entry
                )
            );
        }
    };

    // Remove a work entry
    const removeWorkEntry = (entryId) => {
        setWorkEntries(prev => prev.filter(entry => entry.id !== entryId));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        // Build portfolios array from workEntries
        const portfolios = workEntries
            .filter(entry => entry.image)
            .map(entry => ({
                title: entry.title,
                tags: entry.tags,
                link: entry.link,
                image: entry.image
            }));

        try {
            const { _id, ...cleanData } = formData;
            const payload = { ...cleanData, portfolios };

            if (isEdit) {
                await axios.patch(`${base_url}/designers/${editingId}`, payload);
                toast.success("Designer updated successfully!");
            } else {
                await axios.post(`${base_url}/designers`, payload);
                toast.success("Designer added successfully!");
            }

            resetForm();
            fetchDesigners();
        } catch (error) {
            toast.error("Operation failed!");
        } finally {
            setSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: "", role: "", rating: 0, jobs: 0, PricePerHour: 0,
            profileImage: "", portfolio_link: "", about: "",
            skills: [], tools: [], experience: "", portfolios: []
        });
        setProfilePreview(null);
        setWorkEntries([]);
        setIsEdit(false);
        setEditingId(null);
        if (id) navigate('/manage-designers');
    };

    const handleDelete = async (designerId) => {
        if (!window.confirm("Delete this designer permanently?")) return;
        setDeletingId(designerId);
        try {
            await axios.delete(`${base_url}/designers/${designerId}`);
            fetchDesigners();
        } catch (error) {
            alert("Delete failed");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="min-h-screen bg-transparent py-10 px-4 text-[#5D544B]">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-serif font-bold text-[#3E362E] mb-2">Designer Studio</h1>
                    <p className="text-[#A68F78] uppercase tracking-widest text-sm">Curation & Management Portal</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Side: Form */}
                    <div className="lg:col-span-5">
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#F4EDE4] sticky top-8">
                            <h2 className="text-2xl font-serif font-semibold mb-8 border-b border-[#F4EDE4] pb-4">
                                {isEdit ? "Refine Profile" : "Onboard Designer"}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2 md:col-span-1">
                                        <label className="text-xs font-bold uppercase text-[#A68F78] mb-1 block">Full Name</label>
                                        <input type="text" name="name" value={formData.name} onChange={handleChange}
                                            className="w-full bg-[#FDFBF9] p-3 border border-[#E6D5C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4C3B3]" required />
                                    </div>
                                    <div className="col-span-2 md:col-span-1">
                                        <label className="text-xs font-bold uppercase text-[#A68F78] mb-1 block">Specialization</label>
                                        <input type="text" name="role" value={formData.role} onChange={handleChange}
                                            className="w-full bg-[#FDFBF9] p-3 border border-[#E6D5C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4C3B3]" required />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="text-[10px] font-bold uppercase text-[#A68F78]">Rating</label>
                                        <input type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange}
                                            className="w-full bg-[#FDFBF9] p-3 border border-[#E6D5C3] rounded-xl" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold uppercase text-[#A68F78]">Projects</label>
                                        <input type="number" name="jobs" value={formData.jobs} onChange={handleChange}
                                            className="w-full bg-[#FDFBF9] p-3 border border-[#E6D5C3] rounded-xl" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold uppercase text-[#A68F78]">$/Hour</label>
                                        <input type="number" name="PricePerHour" value={formData.PricePerHour} onChange={handleChange}
                                            className="w-full bg-[#FDFBF9] p-3 border border-[#E6D5C3] rounded-xl" />
                                    </div>
                                </div>

                                {/* Profile Image Upload */}
                                <div className="flex items-center gap-6 p-4 bg-[#FDFBF9] rounded-2xl border border-dashed border-[#E6D5C3]">
                                    <div className="relative group cursor-pointer">
                                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md bg-gray-100">
                                            {profilePreview ? (
                                                <img src={profilePreview} alt="Avatar" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Upload</div>
                                            )}
                                        </div>
                                        <input type="file" accept="image/*" onChange={handleProfileImage}
                                            className="absolute inset-0 opacity-0 cursor-pointer" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-[#5D544B]">Profile Picture</p>
                                        <p className="text-xs text-[#A68F78]">JPG, PNG supported</p>
                                        {profileUploading && (
                                            <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
                                                <div className="bg-[#A68F78] h-full transition-all" style={{ width: `${profileProgress}%` }}></div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold uppercase text-[#A68F78] mb-1 block">About Bio</label>
                                    <textarea name="about" value={formData.about} onChange={handleChange} rows={3}
                                        className="w-full bg-[#FDFBF9] p-3 border border-[#E6D5C3] rounded-xl focus:outline-none" placeholder="Tell the story..."></textarea>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold uppercase text-[#A68F78] mb-1 block">Experience</label>
                                        <input type="text" name="experience" value={formData.experience} onChange={handleChange}
                                            placeholder="e.g. 5 Years" className="w-full bg-[#FDFBF9] p-3 border border-[#E6D5C3] rounded-xl" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold uppercase text-[#A68F78] mb-1 block">Portfolio URL</label>
                                        <input type="url" name="portfolio_link" value={formData.portfolio_link} onChange={handleChange}
                                            className="w-full bg-[#FDFBF9] p-3 border border-[#E6D5C3] rounded-xl" />
                                    </div>
                                </div>

                                {/* Skills Tag Input */}
                                <div>
                                    <label className="text-xs font-bold uppercase text-[#A68F78] mb-1 block">Expertise Tags</label>
                                    <div className="flex gap-2">
                                        <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                                            className="flex-1 bg-[#FDFBF9] p-3 border border-[#E6D5C3] rounded-xl" placeholder="React, Figma..." />
                                        <button type="button" onClick={addSkill} className="bg-[#5D544B] text-white px-4 rounded-xl hover:bg-[#3E362E]">Add</button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {formData.skills.map((s, i) => (
                                            <span key={i} className="bg-[#F4EDE4] text-[#5D544B] px-3 py-1 rounded-lg text-sm flex items-center gap-2 border border-[#E6D5C3]">
                                                {s} <button type="button" onClick={() => removeItem('skills', i)} className="hover:text-red-500 text-lg leading-none">&times;</button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* ── Work Showcase ── */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-xs font-bold uppercase text-[#A68F78]">Work Showcase</label>
                                        <button
                                            type="button"
                                            onClick={addWorkEntry}
                                            className="flex items-center gap-1.5 text-xs font-bold text-[#5D544B] bg-[#F4EDE4] hover:bg-[#E6D5C3] border border-[#E6D5C3] px-3 py-1.5 rounded-lg transition-all"
                                        >
                                            <span className="text-base leading-none">+</span> Add More
                                        </button>
                                    </div>

                                    <div className="space-y-4 max-h-[32rem] overflow-y-auto pr-1 custom-scrollbar">
                                        {workEntries.length === 0 && (
                                            <div className="text-center py-8 border-2 border-dashed border-[#E6D5C3] rounded-2xl bg-[#FDFBF9]">
                                                <p className="text-[#A68F78] text-sm">No works added yet.</p>
                                                <button
                                                    type="button"
                                                    onClick={addWorkEntry}
                                                    className="mt-2 text-xs font-bold text-[#5D544B] underline underline-offset-2"
                                                >
                                                    + Add your first work
                                                </button>
                                            </div>
                                        )}

                                        {workEntries.map((entry, index) => (
                                            <div
                                                key={entry.id}
                                                className="bg-[#FDFBF9] border border-[#E6D5C3] rounded-2xl p-4 space-y-3 relative"
                                            >
                                                {/* Entry header */}
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-[10px] font-bold uppercase text-[#A68F78] tracking-wider">
                                                        Work #{index + 1}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeWorkEntry(entry.id)}
                                                        className="w-6 h-6 flex items-center justify-center text-[#A68F78] hover:text-red-500 hover:bg-red-50 rounded-full transition text-lg leading-none"
                                                        title="Remove"
                                                    >
                                                        &times;
                                                    </button>
                                                </div>

                                                {/* Image upload area */}
                                                <div className="relative group">
                                                    <label className="cursor-pointer block">
                                                        <div className={`w-full h-32 rounded-xl overflow-hidden border-2 border-dashed flex items-center justify-center transition-all
                                                            ${entry.preview ? 'border-transparent' : 'border-[#E6D5C3] bg-white hover:border-[#A68F78]'}`}>
                                                            {entry.preview ? (
                                                                <div className="relative w-full h-full">
                                                                    <img
                                                                        src={entry.preview}
                                                                        alt="preview"
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                    {/* Hover overlay */}
                                                                    <div className="absolute inset-0 bg-[#3E362E]/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                                                                        <span className="text-white text-xs font-bold">Change Image</span>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="text-center">
                                                                    <div className="text-2xl text-[#D4C3B3] mb-1">🖼️</div>
                                                                    <p className="text-[#A68F78] text-xs font-medium">Click to upload image</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) => {
                                                                if (e.target.files[0]) {
                                                                    handleWorkEntryImage(entry.id, e.target.files[0]);
                                                                }
                                                            }}
                                                        />
                                                    </label>

                                                    {/* Upload progress bar */}
                                                    {entry.uploading && (
                                                        <div className="mt-1.5 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                                            <div
                                                                className="bg-[#A68F78] h-full transition-all duration-300"
                                                                style={{ width: `${entry.progress}%` }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Title */}
                                                <div>
                                                    <label className="text-[10px] font-bold uppercase text-[#A68F78] mb-1 block">Title</label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. Brand Identity Redesign"
                                                        value={entry.title}
                                                        onChange={(e) => updateWorkEntry(entry.id, 'title', e.target.value)}
                                                        className="w-full bg-white p-2.5 border border-[#E6D5C3] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#D4C3B3]"
                                                    />
                                                </div>

                                                {/* Tags */}
                                                <div>
                                                    <label className="text-[10px] font-bold uppercase text-[#A68F78] mb-1 block">Tags</label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. branding, logo, UI"
                                                        value={entry.tags}
                                                        onChange={(e) => updateWorkEntry(entry.id, 'tags', e.target.value)}
                                                        className="w-full bg-white p-2.5 border border-[#E6D5C3] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#D4C3B3]"
                                                    />
                                                    <p className="text-[10px] text-[#C4B3A3] mt-0.5">Comma separated tags</p>
                                                </div>

                                                {/* Link (optional) */}
                                                <div>
                                                    <label className="text-[10px] font-bold uppercase text-[#A68F78] mb-1 block">
                                                        Link <span className="normal-case font-normal text-[#C4B3A3]">(optional)</span>
                                                    </label>
                                                    <input
                                                        type="url"
                                                        placeholder="https://..."
                                                        value={entry.link}
                                                        onChange={(e) => updateWorkEntry(entry.id, 'link', e.target.value)}
                                                        className="w-full bg-white p-2.5 border border-[#E6D5C3] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#D4C3B3]"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Bottom Add More button (visible when entries exist) */}
                                    {workEntries.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={addWorkEntry}
                                            className="mt-3 w-full py-2.5 border-2 border-dashed border-[#E6D5C3] rounded-xl text-[#A68F78] text-sm font-bold hover:border-[#A68F78] hover:text-[#5D544B] hover:bg-[#FDFBF9] transition-all"
                                        >
                                            + Add Another Work
                                        </button>
                                    )}
                                </div>

                                <div className="pt-4 flex flex-col gap-3">
                                    <button type="submit" disabled={submitting}
                                        className="w-full bg-[#5D544B] hover:bg-[#3E362E] disabled:bg-gray-300 text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#5d544b30] transition-all">
                                        {submitting ? "Processing..." : isEdit ? "Update Designer Profile" : "Launch Designer Profile"}
                                    </button>
                                    {isEdit && (
                                        <button type="button" onClick={resetForm} className="text-sm font-bold text-[#A68F78] hover:underline uppercase">Cancel Changes</button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Side: List */}
                    <div className="lg:col-span-7">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-serif font-semibold text-[#3E362E]">Directory</h2>
                            <span className="bg-[#F4EDE4] px-4 py-1 rounded-full text-sm font-bold border border-[#E6D5C3]">{designers.length} Registered</span>
                        </div>

                        {loading ? (
                            <div className="text-center py-20 animate-pulse text-[#A68F78]">Sifting through profiles...</div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {designers.map((designer) => (
                                    <div key={designer._id} className="bg-white rounded-[1.5rem] p-6 border border-[#F4EDE4] hover:shadow-xl hover:shadow-[#e6d5c330] transition-all group">
                                        <div className="flex items-start gap-4 mb-6">
                                            <img src={designer.profileImage} className="w-16 h-16 rounded-2xl object-cover border-2 border-[#F4EDE4]" alt="" />
                                            <div>
                                                <h3 className="font-bold text-lg text-[#3E362E]">{designer.name}</h3>
                                                <p className="text-[#A68F78] text-sm font-medium">{designer.role}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs bg-[#FDFBF9] border border-[#F4EDE4] px-2 py-0.5 rounded text-[#5D544B] font-bold">${designer.PricePerHour}/hr</span>
                                                    <span className="text-xs text-[#A68F78]">★ {designer.rating}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <button onClick={() => { setSelectedDesigner(designer); setShowModal(true); }}
                                                className="flex-1 bg-[#FDFBF9] text-[#5D544B] border border-[#E6D5C3] py-2 rounded-xl text-sm font-bold hover:bg-[#F4EDE4] transition">View</button>
                                            <button onClick={() => loadDesignerForEdit(designer._id)}
                                                className="flex-1 bg-[#E6D5C3] text-[#5D544B] py-2 rounded-xl text-sm font-bold hover:bg-[#D4C3B3] transition">Edit</button>
                                            <button onClick={() => handleDelete(designer._id)} disabled={deletingId === designer._id}
                                                className="w-10 flex items-center justify-center bg-white text-red-300 border border-red-50 hover:bg-red-500 hover:text-white rounded-xl transition">
                                                <span className="text-xl">×</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && selectedDesigner && (
                <div className="fixed inset-0 bg-[#3E362E]/60 backdrop-blur-sm flex items-center justify-center z-50 p-6" onClick={() => setShowModal(false)}>
                    <div className="bg-[#FDFBF9] rounded-[2.5rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="p-10">
                            <div className="flex justify-between items-start mb-8">
                                <div className="flex items-center gap-6">
                                    <img src={selectedDesigner.profileImage} className="w-24 h-24 rounded-3xl object-cover shadow-lg border-4 border-white" alt="" />
                                    <div>
                                        <h2 className="text-3xl font-serif font-bold text-[#3E362E]">{selectedDesigner.name}</h2>
                                        <p className="text-[#A68F78] font-bold uppercase tracking-wider">{selectedDesigner.role}</p>
                                    </div>
                                </div>
                                <button onClick={() => setShowModal(false)} className="text-3xl hover:text-red-500">&times;</button>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-8 py-6 border-y border-[#F4EDE4]">
                                <div><p className="text-[10px] font-bold text-[#A68F78] uppercase">Experience</p><p className="font-bold">{selectedDesigner.experience || "N/A"}</p></div>
                                <div><p className="text-[10px] font-bold text-[#A68F78] uppercase">Completed Jobs</p><p className="font-bold">{selectedDesigner.jobs}</p></div>
                                <div><p className="text-[10px] font-bold text-[#A68F78] uppercase">Client Rating</p><p className="font-bold">{selectedDesigner.rating} / 5.0</p></div>
                                <div><p className="text-[10px] font-bold text-[#A68F78] uppercase">Rates</p><p className="font-bold">${selectedDesigner.PricePerHour}/hour</p></div>
                            </div>

                            <div className="mb-8">
                                <h3 className="font-serif font-bold text-[#3E362E] mb-3">Professional Bio</h3>
                                <p className="text-[#5D544B] leading-relaxed italic">"{selectedDesigner.about}"</p>
                            </div>

                            <div className="mb-10">
                                <h3 className="font-serif font-bold text-[#3E362E] mb-4">Portfolio Highlights</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {selectedDesigner.portfolios?.map((p, i) => (
                                        <div key={i} className="group overflow-hidden rounded-2xl border border-[#F4EDE4] bg-white">
                                            <img src={p.image} className="w-full h-32 object-cover group-hover:scale-105 transition-transform" alt="" />
                                            <div className="p-3 space-y-1">
                                                <p className="text-xs font-bold text-[#3E362E] truncate">{p.title || "Untitled Project"}</p>
                                                {p.tags && (
                                                    <p className="text-[10px] text-[#A68F78] truncate">{p.tags}</p>
                                                )}
                                                {p.link && (
                                                    <a href={p.link} target="_blank" rel="noopener noreferrer"
                                                        className="text-[10px] text-[#5D544B] underline hover:text-[#3E362E]">
                                                        View Project →
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageDesigner;