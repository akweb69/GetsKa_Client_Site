import React, { useState, useRef } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import useAllCategories from '../Hooks/useAllCategories';
import useProducts from '../Hooks/useProducts';

/* ─────────────────────────────────────────────
   EMPTY FORM STATE
───────────────────────────────────────────── */
const emptyForm = {
    title: '',
    sub_title: '',
    price: '',
    priceSlug: 'per unit price',
    p_category: '',
    min_quantity: 1,
    mainImage: '',
    paperDetails: '',
    speciality: '',
    // arrays stored as editable lists
    images: [''],
    priceBySize: [{ size: '', price: '' }],
    PriceBySidesPrint: [{ sides: '', price: '' }],
    Laminations: [''],
    deliveryTypes: [''],
    color: [{ color: '' }],
    faq: [{ question: '', answer: '' }],
    productDetails: {
        Overview: '',
        Specifications: {},
        Features: {},
    },
};

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const uploadToImgBB = async (file, apiKey) => {
    const formData = new FormData();
    formData.append('image', file);
    const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
    );
    return data.data.url;
};

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const ManageProducts = () => {
    const { allCategories = [] } = useAllCategories();
    const { products = [], isPending, refetch } = useProducts();

    const VITE_IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
    const base_url = import.meta.env.VITE_BASE_URL;

    /* ── UI state ── */
    const [view, setView] = useState('list'); // 'list' | 'add' | 'edit'
    const [editingProduct, setEditingProduct] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [uploadingMain, setUploadingMain] = useState(false);
    const [uploadingIdx, setUploadingIdx] = useState(null);
    const [search, setSearch] = useState('');
    const [specKey, setSpecKey] = useState('');
    const [specVal, setSpecVal] = useState('');
    const [featKey, setFeatKey] = useState('');
    const [featVal, setFeatVal] = useState('');
    const mainImgRef = useRef();

    /* ─────────────────────────────────────────
       OPEN ADD / EDIT
    ───────────────────────────────────────── */
    const openAdd = () => {
        setForm(emptyForm);
        setEditingProduct(null);
        setView('add');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const openEdit = (product) => {
        setEditingProduct(product);
        setForm({
            ...emptyForm,
            ...product,
            images: product.images?.length ? product.images : [''],
            priceBySize: product.priceBySize?.length ? product.priceBySize : [{ size: '', price: '' }],
            PriceBySidesPrint: product.PriceBySidesPrint?.length ? product.PriceBySidesPrint : [{ sides: '', price: '' }],
            Laminations: product.Laminations?.length ? product.Laminations : [''],
            deliveryTypes: product.deliveryTypes?.length ? product.deliveryTypes : [''],
            color: product.color?.length ? product.color : [{ color: '' }],
            faq: product.faq?.length ? product.faq : [{ question: '', answer: '' }],
            productDetails: product.productDetails || { Overview: '', Specifications: {}, Features: {} },
        });
        setView('edit');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    /* ─────────────────────────────────────────
       SCALAR FIELD CHANGE
    ───────────────────────────────────────── */
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('productDetails.')) {
            const key = name.split('.')[1];
            setForm(f => ({ ...f, productDetails: { ...f.productDetails, [key]: value } }));
        } else {
            setForm(f => ({ ...f, [name]: value }));
        }
    };

    /* ─────────────────────────────────────────
       ARRAY FIELD HELPERS
    ───────────────────────────────────────── */
    const handleArrChange = (arrKey, idx, val) =>
        setForm(f => {
            const arr = [...f[arrKey]];
            arr[idx] = val;
            return { ...f, [arrKey]: arr };
        });

    const handleObjArrChange = (arrKey, idx, field, val) =>
        setForm(f => {
            const arr = f[arrKey].map((item, i) => i === idx ? { ...item, [field]: val } : item);
            return { ...f, [arrKey]: arr };
        });

    const addArrItem = (arrKey, emptyItem) =>
        setForm(f => ({ ...f, [arrKey]: [...f[arrKey], emptyItem] }));

    const removeArrItem = (arrKey, idx) =>
        setForm(f => ({ ...f, [arrKey]: f[arrKey].filter((_, i) => i !== idx) }));

    /* ─────────────────────────────────────────
       SPEC / FEATURE KV HELPERS
    ───────────────────────────────────────── */
    const addSpec = () => {
        if (!specKey.trim()) return;
        setForm(f => ({
            ...f,
            productDetails: {
                ...f.productDetails,
                Specifications: { ...f.productDetails.Specifications, [specKey]: specVal },
            },
        }));
        setSpecKey(''); setSpecVal('');
    };

    const removeSpec = (key) =>
        setForm(f => {
            const specs = { ...f.productDetails.Specifications };
            delete specs[key];
            return { ...f, productDetails: { ...f.productDetails, Specifications: specs } };
        });

    const addFeat = () => {
        if (!featKey.trim()) return;
        setForm(f => ({
            ...f,
            productDetails: {
                ...f.productDetails,
                Features: { ...f.productDetails.Features, [featKey]: featVal },
            },
        }));
        setFeatKey(''); setFeatVal('');
    };

    const removeFeat = (key) =>
        setForm(f => {
            const feats = { ...f.productDetails.Features };
            delete feats[key];
            return { ...f, productDetails: { ...f.productDetails, Features: feats } };
        });

    /* ─────────────────────────────────────────
       IMAGE UPLOAD
    ───────────────────────────────────────── */
    const handleMainImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadingMain(true);
        const toastId = toast.loading('Uploading main image…');
        try {
            const url = await uploadToImgBB(file, VITE_IMGBB_API_KEY);
            setForm(f => ({ ...f, mainImage: url }));
            toast.success('Main image uploaded!', { id: toastId });
        } catch {
            toast.error('Image upload failed', { id: toastId });
        } finally {
            setUploadingMain(false);
        }
    };

    const handleGalleryUpload = async (e, idx) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadingIdx(idx);
        const toastId = toast.loading(`Uploading image ${idx + 1}…`);
        try {
            const url = await uploadToImgBB(file, VITE_IMGBB_API_KEY);
            handleArrChange('images', idx, url);
            toast.success(`Image ${idx + 1} uploaded!`, { id: toastId });
        } catch {
            toast.error('Image upload failed', { id: toastId });
        } finally {
            setUploadingIdx(null);
        }
    };

    /* ─────────────────────────────────────────
       SUBMIT (ADD / EDIT)
    ───────────────────────────────────────── */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title.trim()) { toast.error('Product title is required'); return; }
        if (!form.price) { toast.error('Price is required'); return; }

        // clean empty array entries
        const payload = {
            ...form,
            price: Number(form.price),
            min_quantity: Number(form.min_quantity),
            images: form.images.filter(Boolean),
            Laminations: form.Laminations.filter(Boolean),
            deliveryTypes: form.deliveryTypes.filter(Boolean),
            priceBySize: form.priceBySize.filter(p => p.size),
            PriceBySidesPrint: form.PriceBySidesPrint.filter(p => p.sides),
            color: form.color.filter(c => c.color),
            faq: form.faq.filter(f => f.question),
        };

        setSaving(true);
        const isEdit = view === 'edit';
        const toastId = toast.loading(isEdit ? 'Updating product…' : 'Adding product…');

        try {
            if (isEdit) {
                await axios.patch(`${base_url}/products/${editingProduct._id}`, payload);
                toast.success('Product updated successfully!', { id: toastId });
            } else {
                await axios.post(`${base_url}/products`, payload);
                toast.success('Product added successfully!', { id: toastId });
            }
            await refetch();
            setView('list');
        } catch (err) {
            toast.error(err?.response?.data?.error || 'Something went wrong', { id: toastId });
        } finally {
            setSaving(false);
        }
    };

    /* ─────────────────────────────────────────
       DELETE
    ───────────────────────────────────────── */
    const handleDelete = (product) => {
        toast((t) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p style={{ margin: 0, fontWeight: 600 }}>Delete "{product.title}"?</p>
                <p style={{ margin: 0, fontSize: 13, color: '#666' }}>This action cannot be undone.</p>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button
                        onClick={() => { toast.dismiss(t.id); confirmDelete(product._id); }}
                        style={{ flex: 1, padding: '7px 0', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}
                    >Delete</button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        style={{ flex: 1, padding: '7px 0', background: '#f3f4f6', color: '#333', border: 'none', borderRadius: 6, cursor: 'pointer' }}
                    >Cancel</button>
                </div>
            </div>
        ), { duration: 10000 });
    };

    const confirmDelete = async (id) => {
        setDeletingId(id);
        const toastId = toast.loading('Deleting product…');
        try {
            await axios.delete(`${base_url}/products/${id}`);
            toast.success('Product deleted!', { id: toastId });
            await refetch();
        } catch {
            toast.error('Failed to delete product', { id: toastId });
        } finally {
            setDeletingId(null);
        }
    };

    /* ─────────────────────────────────────────
       FILTERED PRODUCTS
    ───────────────────────────────────────── */
    const filtered = products.filter(p =>
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.p_category?.toLowerCase().includes(search.toLowerCase())
    );

    /* ═══════════════════════════════════════════
       RENDER
    ═══════════════════════════════════════════ */
    return (
        <div style={styles.wrapper}>
            <Toaster position="top-right" toastOptions={{ style: { fontFamily: 'inherit', fontSize: 14 } }} />

            {/* ── HEADER ── */}
            <div style={styles.topBar}>
                <div>
                    <h1 style={styles.heading}>Product Management</h1>
                    <p style={styles.subHeading}>{products.length} product{products.length !== 1 ? 's' : ''} in catalog</p>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    {view !== 'list' && (
                        <button style={styles.outlineBtn} onClick={() => setView('list')}>
                            ← Back to List
                        </button>
                    )}
                    {view === 'list' && (
                        <button style={styles.primaryBtn} onClick={openAdd}>
                            + Add Product
                        </button>
                    )}
                </div>
            </div>

            {/* ══════════════════════════════════════
          LIST VIEW
      ══════════════════════════════════════ */}
            {view === 'list' && (
                <div>
                    {/* search */}
                    <div style={styles.searchBar}>
                        <span style={styles.searchIcon}>🔍</span>
                        <input
                            style={styles.searchInput}
                            placeholder="Search by title or category…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    {isPending ? (
                        <div style={styles.loading}>
                            {[...Array(4)].map((_, i) => <div key={i} style={styles.skeleton} />)}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div style={styles.empty}>
                            <div style={styles.emptyIcon}>📦</div>
                            <p style={{ margin: '8px 0 0', color: '#9ca3af' }}>No products found</p>
                        </div>
                    ) : (
                        <div style={styles.tableWrap}>
                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        {['Image', 'Title', 'Category', 'Price', 'Min Qty', 'Actions'].map(h => (
                                            <th key={h} style={styles.th}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((p, i) => (
                                        <tr key={p._id} style={{ ...styles.tr, background: i % 2 === 0 ? '#fff' : '#f9fafb' }}>
                                            <td style={styles.td}>
                                                <img
                                                    src={p.mainImage || 'https://placehold.co/60x60?text=No+img'}
                                                    alt={p.title}
                                                    style={styles.thumb}
                                                    onError={e => { e.target.src = 'https://placehold.co/60x60?text=No+img'; }}
                                                />
                                            </td>
                                            <td style={{ ...styles.td, maxWidth: 220 }}>
                                                <p style={styles.productTitle}>{p.title}</p>
                                                <p style={styles.productSub}>{p.sub_title?.slice(0, 60)}{p.sub_title?.length > 60 ? '…' : ''}</p>
                                            </td>
                                            <td style={styles.td}>
                                                <span style={styles.badge}>{p.p_category || '—'}</span>
                                            </td>
                                            <td style={styles.td}>
                                                <span style={styles.price}>৳{Number(p.price).toLocaleString()}</span>
                                            </td>
                                            <td style={{ ...styles.td, textAlign: 'center' }}>{p.min_quantity}</td>
                                            <td style={styles.td}>
                                                <div style={{ display: 'flex', gap: 8 }}>
                                                    <button style={styles.editBtn} onClick={() => openEdit(p)}>✏️ Edit</button>
                                                    <button
                                                        style={{ ...styles.deleteBtn, opacity: deletingId === p._id ? 0.6 : 1 }}
                                                        disabled={deletingId === p._id}
                                                        onClick={() => handleDelete(p)}
                                                    >
                                                        {deletingId === p._id ? '…' : '🗑️ Delete'}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {/* ══════════════════════════════════════
          ADD / EDIT FORM VIEW
      ══════════════════════════════════════ */}
            {(view === 'add' || view === 'edit') && (
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGrid}>

                        {/* ── SECTION: Basic Info ── */}
                        <Section title="Basic Information" icon="📝">
                            <Grid2>
                                <Field label="Product Title *">
                                    <input name="title" value={form.title} onChange={handleChange} style={styles.input} placeholder="Enter product title" required />
                                </Field>
                                <Field label="Category">
                                    <select name="p_category" value={form.p_category} onChange={handleChange} style={styles.input}>
                                        <option value="">Select category</option>
                                        {allCategories.map(c => (
                                            <option key={c._id || c.cat_name} value={c.cat_name}>{c.cat_name}</option>
                                        ))}
                                    </select>
                                </Field>
                            </Grid2>
                            <Field label="Sub Title / Short Description">
                                <input name="sub_title" value={form.sub_title} onChange={handleChange} style={styles.input} placeholder="Short product description" />
                            </Field>
                            <Grid2>
                                <Field label="Base Price (৳) *">
                                    <input type="number" name="price" value={form.price} onChange={handleChange} style={styles.input} placeholder="0" min="0" required />
                                </Field>
                                <Field label="Price Slug">
                                    <input name="priceSlug" value={form.priceSlug} onChange={handleChange} style={styles.input} placeholder="e.g. per unit price" />
                                </Field>
                                <Field label="Minimum Quantity">
                                    <input type="number" name="min_quantity" value={form.min_quantity} onChange={handleChange} style={styles.input} min="1" />
                                </Field>
                            </Grid2>
                        </Section>

                        {/* ── SECTION: Images ── */}
                        <Section title="Images" icon="🖼️">
                            <Field label="Main Image">
                                <div style={styles.imageUploadRow}>
                                    {form.mainImage && (
                                        <img src={form.mainImage} alt="main" style={styles.previewThumb} />
                                    )}
                                    <div>
                                        <input ref={mainImgRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleMainImageUpload} />
                                        <button type="button" style={styles.uploadBtn} onClick={() => mainImgRef.current.click()} disabled={uploadingMain}>
                                            {uploadingMain ? <Spinner /> : '📤 Upload Main Image'}
                                        </button>
                                        <p style={styles.hint}>— or paste URL below —</p>
                                        <input name="mainImage" value={form.mainImage} onChange={handleChange} style={{ ...styles.input, marginTop: 4 }} placeholder="https://..." />
                                    </div>
                                </div>
                            </Field>

                            <Field label="Gallery Images">
                                {form.images.map((img, i) => (
                                    <div key={i} style={styles.galleryRow}>
                                        <span style={styles.galleryNum}>{i + 1}</span>
                                        {img && <img src={img} alt={`gallery-${i}`} style={styles.smallThumb} />}
                                        <input
                                            value={img}
                                            onChange={e => handleArrChange('images', i, e.target.value)}
                                            style={{ ...styles.input, flex: 1 }}
                                            placeholder="Image URL or upload"
                                        />
                                        <label style={{ ...styles.uploadBtn, padding: '6px 10px', cursor: 'pointer' }}>
                                            {uploadingIdx === i ? <Spinner /> : '📤'}
                                            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleGalleryUpload(e, i)} />
                                        </label>
                                        <button type="button" style={styles.removeBtn} onClick={() => removeArrItem('images', i)}>✕</button>
                                    </div>
                                ))}
                                <button type="button" style={styles.addRowBtn} onClick={() => addArrItem('images', '')}>+ Add Image</button>
                            </Field>
                        </Section>

                        {/* ── SECTION: Pricing Variants ── */}
                        <Section title="Pricing Variants" icon="💰">
                            <Field label="Price by Size">
                                {form.priceBySize.map((item, i) => (
                                    <div key={i} style={styles.rowGroup}>
                                        <input value={item.size} onChange={e => handleObjArrChange('priceBySize', i, 'size', e.target.value)} style={{ ...styles.input, flex: 1 }} placeholder="Size (e.g. 128GB)" />
                                        <input type="number" value={item.price} onChange={e => handleObjArrChange('priceBySize', i, 'price', e.target.value)} style={{ ...styles.input, width: 130 }} placeholder="Price (৳)" />
                                        <button type="button" style={styles.removeBtn} onClick={() => removeArrItem('priceBySize', i)}>✕</button>
                                    </div>
                                ))}
                                <button type="button" style={styles.addRowBtn} onClick={() => addArrItem('priceBySize', { size: '', price: '' })}>+ Add Size</button>
                            </Field>

                            <Field label="Price by Sides (Print)">
                                {form.PriceBySidesPrint.map((item, i) => (
                                    <div key={i} style={styles.rowGroup}>
                                        <input value={item.sides} onChange={e => handleObjArrChange('PriceBySidesPrint', i, 'sides', e.target.value)} style={{ ...styles.input, flex: 1 }} placeholder="e.g. single side print" />
                                        <input type="number" value={item.price} onChange={e => handleObjArrChange('PriceBySidesPrint', i, 'price', e.target.value)} style={{ ...styles.input, width: 130 }} placeholder="Price (৳)" />
                                        <button type="button" style={styles.removeBtn} onClick={() => removeArrItem('PriceBySidesPrint', i)}>✕</button>
                                    </div>
                                ))}
                                <button type="button" style={styles.addRowBtn} onClick={() => addArrItem('PriceBySidesPrint', { sides: '', price: '' })}>+ Add Sides Option</button>
                            </Field>
                        </Section>

                        {/* ── SECTION: Variants ── */}
                        <Section title="Variants & Options" icon="🎨">
                            <Field label="Colors">
                                <div style={styles.colorGrid}>
                                    {form.color.map((c, i) => (
                                        <div key={i} style={styles.colorRow}>
                                            <input
                                                type="color"
                                                value={c.color?.startsWith('#') ? c.color : '#000000'}
                                                onChange={e => handleObjArrChange('color', i, 'color', e.target.value)}
                                                style={styles.colorPicker}
                                            />
                                            <input value={c.color} onChange={e => handleObjArrChange('color', i, 'color', e.target.value)} style={{ ...styles.input, flex: 1 }} placeholder="e.g. red or #ff0000" />
                                            <button type="button" style={styles.removeBtn} onClick={() => removeArrItem('color', i)}>✕</button>
                                        </div>
                                    ))}
                                </div>
                                <button type="button" style={styles.addRowBtn} onClick={() => addArrItem('color', { color: '' })}>+ Add Color</button>
                            </Field>

                            <Field label="Laminations">
                                {form.Laminations.map((lam, i) => (
                                    <div key={i} style={styles.rowGroup}>
                                        <input value={lam} onChange={e => handleArrChange('Laminations', i, e.target.value)} style={{ ...styles.input, flex: 1 }} placeholder="Lamination name" />
                                        <button type="button" style={styles.removeBtn} onClick={() => removeArrItem('Laminations', i)}>✕</button>
                                    </div>
                                ))}
                                <button type="button" style={styles.addRowBtn} onClick={() => addArrItem('Laminations', '')}>+ Add Lamination</button>
                            </Field>

                            <Field label="Delivery Types">
                                {form.deliveryTypes.map((dt, i) => (
                                    <div key={i} style={styles.rowGroup}>
                                        <input value={dt} onChange={e => handleArrChange('deliveryTypes', i, e.target.value)} style={{ ...styles.input, flex: 1 }} placeholder="Delivery type" />
                                        <button type="button" style={styles.removeBtn} onClick={() => removeArrItem('deliveryTypes', i)}>✕</button>
                                    </div>
                                ))}
                                <button type="button" style={styles.addRowBtn} onClick={() => addArrItem('deliveryTypes', '')}>+ Add Delivery Type</button>
                            </Field>
                        </Section>

                        {/* ── SECTION: Product Details ── */}
                        <Section title="Product Details" icon="📋">
                            <Field label="Overview">
                                <textarea
                                    name="productDetails.Overview"
                                    value={form.productDetails.Overview}
                                    onChange={handleChange}
                                    style={{ ...styles.input, minHeight: 110, resize: 'vertical' }}
                                    placeholder="Detailed product overview…"
                                />
                            </Field>

                            <Field label="Specifications">
                                {Object.entries(form.productDetails.Specifications).map(([k, v]) => (
                                    <div key={k} style={{ ...styles.rowGroup, marginBottom: 6 }}>
                                        <span style={styles.kvLabel}>{k}</span>
                                        <span style={{ ...styles.input, flex: 1, background: '#f9fafb', color: '#555' }}>{v}</span>
                                        <button type="button" style={styles.removeBtn} onClick={() => removeSpec(k)}>✕</button>
                                    </div>
                                ))}
                                <div style={styles.rowGroup}>
                                    <input value={specKey} onChange={e => setSpecKey(e.target.value)} style={{ ...styles.input, flex: 1 }} placeholder="Key (e.g. Display)" />
                                    <input value={specVal} onChange={e => setSpecVal(e.target.value)} style={{ ...styles.input, flex: 2 }} placeholder="Value (e.g. 6.7-inch OLED)" />
                                    <button type="button" style={styles.addRowBtn} onClick={addSpec}>+ Add</button>
                                </div>
                            </Field>

                            <Field label="Features">
                                {Object.entries(form.productDetails.Features).map(([k, v]) => (
                                    <div key={k} style={{ ...styles.rowGroup, marginBottom: 6 }}>
                                        <span style={styles.kvLabel}>{k}</span>
                                        <span style={{ ...styles.input, flex: 1, background: '#f9fafb', color: '#555' }}>{v}</span>
                                        <button type="button" style={styles.removeBtn} onClick={() => removeFeat(k)}>✕</button>
                                    </div>
                                ))}
                                <div style={styles.rowGroup}>
                                    <input value={featKey} onChange={e => setFeatKey(e.target.value)} style={{ ...styles.input, flex: 1 }} placeholder="Key" />
                                    <input value={featVal} onChange={e => setFeatVal(e.target.value)} style={{ ...styles.input, flex: 2 }} placeholder="Value" />
                                    <button type="button" style={styles.addRowBtn} onClick={addFeat}>+ Add</button>
                                </div>
                            </Field>
                        </Section>

                        {/* ── SECTION: Paper & Speciality ── */}
                        <Section title="Paper & Speciality" icon="📄">
                            <Field label="Paper Details">
                                <textarea
                                    name="paperDetails"
                                    value={form.paperDetails}
                                    onChange={handleChange}
                                    style={{ ...styles.input, minHeight: 90, resize: 'vertical' }}
                                    placeholder="Paper details description…"
                                />
                            </Field>
                            <Field label="Speciality">
                                <textarea
                                    name="speciality"
                                    value={form.speciality}
                                    onChange={handleChange}
                                    style={{ ...styles.input, minHeight: 90, resize: 'vertical' }}
                                    placeholder="Product speciality…"
                                />
                            </Field>
                        </Section>

                        {/* ── SECTION: FAQ ── */}
                        <Section title="FAQ" icon="❓">
                            {form.faq.map((item, i) => (
                                <div key={i} style={styles.faqCard}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                        <span style={styles.faqNum}>Q{i + 1}</span>
                                        <button type="button" style={styles.removeBtn} onClick={() => removeArrItem('faq', i)}>✕ Remove</button>
                                    </div>
                                    <input
                                        value={item.question}
                                        onChange={e => handleObjArrChange('faq', i, 'question', e.target.value)}
                                        style={{ ...styles.input, marginBottom: 8 }}
                                        placeholder="Question"
                                    />
                                    <textarea
                                        value={item.answer}
                                        onChange={e => handleObjArrChange('faq', i, 'answer', e.target.value)}
                                        style={{ ...styles.input, minHeight: 80, resize: 'vertical' }}
                                        placeholder="Answer"
                                    />
                                </div>
                            ))}
                            <button type="button" style={styles.addRowBtn} onClick={() => addArrItem('faq', { question: '', answer: '' })}>+ Add FAQ</button>
                        </Section>
                    </div>

                    {/* ── SUBMIT BAR ── */}
                    <div style={styles.submitBar}>
                        <button type="button" style={styles.outlineBtn} onClick={() => setView('list')} disabled={saving}>
                            Cancel
                        </button>
                        <button type="submit" style={{ ...styles.primaryBtn, minWidth: 160, opacity: saving ? 0.7 : 1 }} disabled={saving}>
                            {saving
                                ? <><Spinner /> {view === 'edit' ? 'Updating…' : 'Adding…'}</>
                                : view === 'edit' ? '✅ Update Product' : '✅ Add Product'
                            }
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */
const Section = ({ title, icon, children }) => (
    <div style={styles.section}>
        <h2 style={styles.sectionTitle}>{icon} {title}</h2>
        <div style={styles.sectionBody}>{children}</div>
    </div>
);

const Field = ({ label, children }) => (
    <div style={styles.field}>
        <label style={styles.label}>{label}</label>
        {children}
    </div>
);

const Grid2 = ({ children }) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        {children}
    </div>
);

const Spinner = () => (
    <span style={{
        display: 'inline-block', width: 14, height: 14,
        border: '2px solid rgba(255,255,255,0.4)',
        borderTopColor: '#fff',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
        marginRight: 6,
        verticalAlign: 'middle',
    }} />
);

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const styles = {
    wrapper: {
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        maxWidth: 1100,
        margin: '0 auto',
        padding: '24px 20px 60px',
        color: '#1a1a2e',
    },
    topBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 28,
        flexWrap: 'wrap',
        gap: 12,
    },
    heading: {
        margin: 0,
        fontSize: 28,
        fontWeight: 700,
        letterSpacing: '-0.5px',
        color: '#453bff',
    },
    subHeading: {
        margin: '4px 0 0',
        fontSize: 14,
        color: '#6b7280',
    },
    primaryBtn: {
        background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
        color: '#fff',
        border: 'none',
        borderRadius: 10,
        padding: '10px 22px',
        fontWeight: 600,
        fontSize: 14,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
        transition: 'opacity 0.2s',
    },
    outlineBtn: {
        background: '#fff',
        color: '#374151',
        border: '1.5px solid #e5e7eb',
        borderRadius: 10,
        padding: '10px 22px',
        fontWeight: 600,
        fontSize: 14,
        cursor: 'pointer',
        transition: 'border-color 0.2s',
    },
    searchBar: {
        position: 'relative',
        maxWidth: 420,
        marginBottom: 20,
    },
    searchIcon: {
        position: 'absolute',
        left: 12,
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: 15,
    },
    searchInput: {
        width: '100%',
        padding: '10px 14px 10px 38px',
        borderRadius: 10,
        border: '1.5px solid #e5e7eb',
        fontSize: 14,
        outline: 'none',
        boxSizing: 'border-box',
        background: '#fff',
    },
    loading: { display: 'flex', flexDirection: 'column', gap: 14 },
    skeleton: {
        height: 60,
        borderRadius: 10,
        background: 'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)',
        backgroundSize: '200%',
        animation: 'shimmer 1.3s infinite',
    },
    empty: {
        textAlign: 'center',
        padding: '60px 20px',
        background: '#f9fafb',
        borderRadius: 16,
        border: '2px dashed #e5e7eb',
    },
    emptyIcon: { fontSize: 48 },
    tableWrap: {
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: '0 1px 8px rgba(0,0,0,0.07)',
        border: '1px solid #e5e7eb',
    },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: {
        background: '#f8fafc',
        padding: '13px 16px',
        textAlign: 'left',
        fontSize: 12,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        color: '#6b7280',
        borderBottom: '1px solid #e5e7eb',
    },
    tr: { transition: 'background 0.15s' },
    td: {
        padding: '12px 16px',
        fontSize: 14,
        color: '#374151',
        borderBottom: '1px solid #f3f4f6',
        verticalAlign: 'middle',
    },
    thumb: {
        width: 52,
        height: 52,
        objectFit: 'cover',
        borderRadius: 8,
        border: '1px solid #e5e7eb',
    },
    productTitle: {
        margin: 0,
        fontWeight: 600,
        fontSize: 14,
        color: '#111827',
        lineHeight: 1.4,
    },
    productSub: {
        margin: '2px 0 0',
        fontSize: 12,
        color: '#9ca3af',
    },
    badge: {
        background: '#ede9fe',
        color: '#6d28d9',
        borderRadius: 6,
        padding: '3px 10px',
        fontSize: 12,
        fontWeight: 600,
    },
    price: {
        fontWeight: 700,
        color: '#059669',
        fontSize: 15,
    },
    editBtn: {
        background: '#eff6ff',
        color: '#2563eb',
        border: 'none',
        borderRadius: 7,
        padding: '6px 12px',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
    },
    deleteBtn: {
        background: '#fef2f2',
        color: '#dc2626',
        border: 'none',
        borderRadius: 7,
        padding: '6px 12px',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
    },
    form: { display: 'flex', flexDirection: 'column', gap: 0 },
    formGrid: { display: 'flex', flexDirection: 'column', gap: 20 },
    section: {
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
    },
    sectionTitle: {
        margin: 0,
        padding: '16px 22px',
        fontSize: 16,
        fontWeight: 700,
        background: '#f8fafc',
        borderBottom: '1px solid #e5e7eb',
        color: '#111827',
    },
    sectionBody: { padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 16 },
    field: { display: 'flex', flexDirection: 'column', gap: 6 },
    label: { fontSize: 13, fontWeight: 600, color: '#374151' },
    input: {
        padding: '9px 13px',
        border: '1.5px solid #e5e7eb',
        borderRadius: 8,
        fontSize: 14,
        outline: 'none',
        color: '#111827',
        background: '#fff',
        width: '100%',
        boxSizing: 'border-box',
        transition: 'border-color 0.15s',
        fontFamily: 'inherit',
    },
    hint: { margin: '4px 0 0', fontSize: 11, color: '#9ca3af', textAlign: 'center' },
    imageUploadRow: { display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' },
    previewThumb: {
        width: 80,
        height: 80,
        objectFit: 'cover',
        borderRadius: 10,
        border: '1.5px solid #e5e7eb',
        flexShrink: 0,
    },
    smallThumb: {
        width: 36,
        height: 36,
        objectFit: 'cover',
        borderRadius: 6,
        border: '1px solid #e5e7eb',
        flexShrink: 0,
    },
    uploadBtn: {
        background: '#f0fdf4',
        color: '#16a34a',
        border: '1.5px solid #bbf7d0',
        borderRadius: 8,
        padding: '8px 16px',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
    },
    galleryRow: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 },
    galleryNum: {
        minWidth: 22,
        height: 22,
        borderRadius: '50%',
        background: '#ede9fe',
        color: '#7c3aed',
        fontSize: 11,
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowGroup: { display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 },
    removeBtn: {
        background: '#fef2f2',
        color: '#dc2626',
        border: 'none',
        borderRadius: 6,
        padding: '6px 10px',
        fontSize: 12,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        fontWeight: 600,
    },
    addRowBtn: {
        background: '#f0f9ff',
        color: '#0284c7',
        border: '1.5px dashed #bae6fd',
        borderRadius: 8,
        padding: '7px 16px',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
        display: 'inline-block',
        transition: 'background 0.15s',
    },
    colorGrid: { display: 'flex', flexDirection: 'column', gap: 8 },
    colorRow: { display: 'flex', gap: 8, alignItems: 'center' },
    colorPicker: {
        width: 38,
        height: 38,
        border: '1.5px solid #e5e7eb',
        borderRadius: 8,
        cursor: 'pointer',
        padding: 2,
        flexShrink: 0,
    },
    kvLabel: {
        background: '#f3f4f6',
        border: '1px solid #e5e7eb',
        borderRadius: 6,
        padding: '8px 12px',
        fontSize: 13,
        fontWeight: 600,
        color: '#374151',
        minWidth: 100,
        whiteSpace: 'nowrap',
    },
    faqCard: {
        background: '#f8fafc',
        border: '1px solid #e5e7eb',
        borderRadius: 10,
        padding: '14px 16px',
        marginBottom: 10,
    },
    faqNum: {
        background: '#6366f1',
        color: '#fff',
        borderRadius: 6,
        padding: '2px 8px',
        fontSize: 12,
        fontWeight: 700,
    },
    submitBar: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 12,
        marginTop: 24,
        padding: '18px 22px',
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 16,
        boxShadow: '0 -2px 10px rgba(0,0,0,0.04)',
        position: 'sticky',
        bottom: 16,
    },
};

// inject keyframes
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
    input:focus, textarea:focus, select:focus { border-color: #6366f1 !important; box-shadow: 0 0 0 3px rgba(99,102,241,0.12); }
    button:hover:not(:disabled) { opacity: 0.88; }
  `;
    document.head.appendChild(style);
}

export default ManageProducts;