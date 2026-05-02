import { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, ShoppingCart, ChevronDown, ChevronUp, Heart,
  Palette, X, Upload, FileImage, CheckCircle2, Phone,
  Mail, User, MessageSquare, DollarSign, Package, Trash2,
  Plus, Minus, Eye, ZoomIn
} from 'lucide-react';
import { PopularChoices, HireDesignersBlock, ProductCard } from '../components/Shared';
import useProducts from '../AdminCode/Hooks/useProducts';
import { useAuth } from '../Context/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';

const reviews = [
  { name: 'Sarah Tucker', date: 'Feb 12, 2024', stars: 5, text: 'Excellent quality! The prints came out perfect and exactly as described.' },
  { name: 'Michael Chen', date: 'Jan 24, 2024', stars: 5, text: "Fantastic customization options. Absolutely love the final product!" },
  { name: 'Ayesha Rahman', date: 'Jan 20, 2024', stars: 5, text: 'Great service and premium packaging. Will definitely order again.' },
];

/* ─── Upload Item Component ─── */
const UploadItem = ({ file, progress, onRemove }) => {
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    if (!file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="cd-upload-item"
    >
      <div className="cd-upload-preview">
        {preview
          ? <img src={preview} alt={file.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />
          : <FileImage size={22} color="#9b7dd4" />
        }
      </div>
      <div className="cd-upload-info">
        <span className="cd-upload-name">{file.name}</span>
        <span className="cd-upload-size">{(file.size / 1024).toFixed(1)} KB</span>
        <div className="cd-progress-track">
          <motion.div
            className="cd-progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
        {progress >= 100 && (
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="cd-upload-done"
          >
            <CheckCircle2 size={12} /> Ready
          </motion.span>
        )}
      </div>
      <button className="cd-upload-remove" onClick={() => onRemove(file.name)}>
        <Trash2 size={14} />
      </button>
    </motion.div>
  );
};

/* ─── Custom Design Form ─── */
const CustomDesignForm = ({ product, onClose }) => {
  const [form, setForm] = useState({
    title: '',
    budget: '',
    quantity: '',
    details: '',
    name: '',
    email: '',
    phone: '',
  });
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const dropRef = useRef(null);
  const inputRef = useRef(null);

  const simulateUpload = (file) => {
    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.random() * 25 + 10;
      if (prog >= 100) { prog = 100; clearInterval(interval); }
      setUploadProgress(prev => ({ ...prev, [file.name]: Math.min(100, prog) }));
    }, 180);
  };

  const addFiles = useCallback((newFiles) => {
    const validFiles = Array.from(newFiles).filter(f => f.type.startsWith('image/'));
    setFiles(prev => {
      const existing = new Set(prev.map(f => f.name));
      const toAdd = validFiles.filter(f => !existing.has(f.name));
      toAdd.forEach(simulateUpload);
      return [...prev, ...toAdd];
    });
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const removeFile = (name) => {
    setFiles(prev => prev.filter(f => f.name !== name));
    setUploadProgress(prev => { const p = { ...prev }; delete p[name]; return p; });
  };

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="cd-success"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="cd-success-icon"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h3>Request Submitted!</h3>
        <p>We've received your custom design request for <strong>{product.title}</strong>. Our team will get back to you within 24 hours.</p>
        <button className="cd-success-btn" onClick={onClose}>Back to Product</button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="cd-form">
      <div className="cd-form-grid">
        {/* Left Column */}
        <div className="cd-form-col">
          <div className="cd-field">
            <label><Package size={14} /> Design Title</label>
            <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Premium Business Card Design" required />
          </div>
          <div className="cd-row-2">
            <div className="cd-field">
              <label><DollarSign size={14} /> Budget (€)</label>
              <input name="budget" type="number" value={form.budget} onChange={handleChange} placeholder="0.00" min="0" required />
            </div>
            <div className="cd-field">
              <label><Package size={14} /> Quantity</label>
              <input name="quantity" type="number" value={form.quantity} onChange={handleChange} placeholder="Min 1" min="1" required />
            </div>
          </div>
          <div className="cd-field">
            <label><MessageSquare size={14} /> Design Details & Requirements</label>
            <textarea
              name="details"
              value={form.details}
              onChange={handleChange}
              placeholder="Describe your design vision — colors, style, text content, references, any specific requirements..."
              rows={5}
              required
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="cd-form-col">
          {/* File Upload Zone */}
          <div className="cd-field">
            <label><FileImage size={14} /> Your Design / Concept Files</label>
            <div
              ref={dropRef}
              className={`cd-dropzone ${isDragging ? 'dragging' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
            >
              <input
                ref={inputRef}
                type="file"
                multiple
                accept="image/*"
                style={{ display: 'none' }}
                onChange={e => addFiles(e.target.files)}
              />
              <motion.div
                animate={isDragging ? { scale: 1.05 } : { scale: 1 }}
                className="cd-dropzone-inner"
              >
                <div className="cd-dropzone-icon">
                  <Upload size={28} />
                </div>
                <p className="cd-dropzone-title">Drop images here or click to browse</p>
                <p className="cd-dropzone-hint">PNG, JPG, GIF, WEBP — Multiple files supported</p>
              </motion.div>
            </div>

            {/* File List */}
            <AnimatePresence>
              {files.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="cd-file-list"
                >
                  <div className="cd-file-list-header">
                    <span>{files.length} file{files.length > 1 ? 's' : ''} selected</span>
                    <button type="button" onClick={() => { setFiles([]); setUploadProgress({}); }}>Clear all</button>
                  </div>
                  <AnimatePresence>
                    {files.map(file => (
                      <UploadItem
                        key={file.name}
                        file={file}
                        progress={uploadProgress[file.name] || 0}
                        onRemove={removeFile}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="cd-contact-section">
        <h4 className="cd-contact-title">Contact Information</h4>
        <div className="cd-contact-grid">
          <div className="cd-field">
            <label><User size={14} /> Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
          </div>
          <div className="cd-field">
            <label><Mail size={14} /> Email Address</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
          </div>
          <div className="cd-field">
            <label><Phone size={14} /> Phone Number</label>
            <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+880 1XX-XXXXXXX" />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="cd-submit-row">
        <button type="button" className="cd-cancel-btn" onClick={onClose}>Cancel</button>
        <button type="submit" className="cd-submit-btn">
          <Palette size={18} />
          Submit Custom Design Request
        </button>
      </div>
    </form>
  );
};

/* ─── Main Component ─── */
const ProductDetail = () => {
  const { productName } = useParams();
  const { products, isLoading } = useProducts();
  const { user, userLoading } = useAuth();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('Details & Info');
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSide, setSelectedSide] = useState(null);
  const [selectedLamination, setSelectedLamination] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wantCustomDesign, setWantCustomDesign] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);


  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // smoth scrolling
    window.scrollTo(0, 0);
  }, [location.pathname])

  useEffect(() => {
    if (products?.length) {
      const found = products.find(item =>
        item.title === productName || item.slug === productName || item._id === productName
      );
      setProduct(found || null);
    }
  }, [products, productName]);

  useEffect(() => {
    if (product) {
      if (product.priceBySize?.length) setSelectedSize(product.priceBySize[0]);
      if (product.PriceBySidesPrint?.length) setSelectedSide(product.PriceBySidesPrint[0]);
      if (product.Laminations?.length) setSelectedLamination(product.Laminations[0]);
      if (product.deliveryTypes?.length) setSelectedDelivery(product.deliveryTypes[0]);
      setQty(product.min_quantity || 1);
    }
  }, [product]);

  const tabs = ['Details & Info', 'FAQ', 'Paper', 'Speciality'];

  const basePrice = selectedSize ? parseFloat(selectedSize.price) : (product?.price || 0);
  const sideExtra = selectedSide ? parseFloat(selectedSide.increasePriceAmount || 0) : 0;
  const deliveryExtra = selectedDelivery?.increasePriceAmountByDeliveryTypes
    ? parseFloat(selectedDelivery.increasePriceAmountByDeliveryTypes) : 0;
  const totalPrice = (basePrice + sideExtra + deliveryExtra) * qty;

  const allImages = product?.images?.length
    ? product.images
    : [product?.mainImage].filter(Boolean);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.08 } }
  };

  if (isLoading || userLoading) {
    return (
      <div className="pd-loading">
        <div className="pd-spinner" />
        <p>Loading product…</p>
      </div>
    );
  }

  const base_url = import.meta.env.VITE_BASE_URL;
  // handle add to cart function--->
  const handleAddToCart = async () => {
    toast.loading("Please wait checking your information...")
    if (!user && !user?.email) {
      toast.dismiss()
      toast.error("Please login first")
      return;
    }

    toast.loading("Checking success please wait for add to cart your item...")
    const cartData = {
      userEmail: user?.email,
      itemId: product._id,
      selectedSize: selectedSize,
      selectedSide: selectedSide,
      selectedLamination: selectedLamination,
      selectedDelivery: selectedDelivery,
      selectedImage: selectedImage,
      quantity: qty,
      totalPrice: totalPrice

    }

    const res = await axios.get(`${base_url}/cart`, cartData);
    if (res.data) {
      toast.dismiss();
      toast.success("✅ successfully added to cart")
    }
    else {
      toast.dismiss();
      toast.error("❌ something went wrong try again letter")
    }

  }









  if (!product) {
    return (
      <div className="pd-notfound">
        <span>😕</span>
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        /* ─── Design Tokens ─── */
        :root {
          --pd-primary: #5A33B4;
          --pd-primary-light: #7B55D0;
          --pd-primary-pale: #f0ebff;
          --pd-accent: #FF6B6B;
          --pd-bg: #f7f5ff;
          --pd-white: #ffffff;
          --pd-text: #1a1128;
          --pd-muted: #7c6e96;
          --pd-border: rgba(90,51,180,0.12);
          --pd-radius: 20px;
          --pd-radius-sm: 12px;
          --pd-shadow: 0 4px 24px rgba(90,51,180,0.08);
          --pd-shadow-lg: 0 12px 48px rgba(90,51,180,0.15);
          --font-display: 'Playfair Display', Georgia, serif;
          --font-body: 'DM Sans', 'Segoe UI', sans-serif;
        }

        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .pd-root {
          background: var(--pd-bg);
          min-height: 100vh;
          padding-bottom: 4rem;
          font-family: var(--font-body);
          color: var(--pd-text);
        }

        .pd-loading, .pd-notfound {
          min-height: 100vh; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 12px;
          background: var(--pd-bg); font-family: var(--font-body); color: var(--pd-muted);
        }
        .pd-spinner {
          width: 36px; height: 36px; border-radius: 50%;
          border: 3px solid var(--pd-primary-pale);
          border-top-color: var(--pd-primary);
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ─── Product Main ─── */
        .pd-main {
          max-width: 1200px; margin: 0 auto; padding: 2.5rem 1.5rem;
        }
        .pd-layout {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 3rem; align-items: start;
        }
        @media (max-width: 900px) { .pd-layout { grid-template-columns: 1fr; gap: 2rem; } }

        /* ─── Gallery ─── */
        .pd-gallery { display: flex; gap: 14px; }
        .pd-thumbs {
          display: flex; flex-direction: column; gap: 10px;
          max-height: 520px; overflow-y: auto;
        }
        .pd-thumbs::-webkit-scrollbar { width: 4px; }
        .pd-thumbs::-webkit-scrollbar-thumb { background: var(--pd-primary-pale); border-radius: 4px; }
        .pd-thumb-btn {
          width: 64px; height: 64px; border-radius: 14px; overflow: hidden;
          border: 2px solid transparent; cursor: pointer; background: none; padding: 0;
          transition: all 0.2s; flex-shrink: 0;
        }
        .pd-thumb-btn.active { border-color: var(--pd-primary); box-shadow: 0 0 0 3px rgba(90,51,180,0.15); }
        .pd-thumb-btn:hover:not(.active) { border-color: var(--pd-primary-pale); transform: scale(1.04); }
        .pd-thumb-btn img { width: 100%; height: 100%; object-fit: cover; }
        .pd-main-img-wrap {
          flex: 1; background: var(--pd-white); border-radius: var(--pd-radius);
          overflow: hidden; box-shadow: var(--pd-shadow); position: relative;
          border: 1px solid var(--pd-border); cursor: zoom-in;
        }
        .pd-main-img-wrap img {
          width: 100%; min-height: 400px; max-height: 500px;
          object-fit: contain; padding: 24px; display: block;
        }
        .pd-zoom-hint {
          position: absolute; bottom: 12px; right: 12px;
          background: rgba(90,51,180,0.1); border-radius: 8px;
          padding: 6px 10px; display: flex; align-items: center; gap: 5px;
          font-size: 11px; color: var(--pd-primary); font-weight: 600;
          pointer-events: none;
        }
        @media (max-width: 600px) { .pd-thumbs { display: none; } }

        /* ─── Product Info Card ─── */
        .pd-info-card {
          background: var(--pd-white); border-radius: var(--pd-radius);
          padding: 2rem; box-shadow: var(--pd-shadow);
          border: 1px solid var(--pd-border);
        }
        .pd-info-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
        .pd-title { font-family: var(--font-display); font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 700; line-height: 1.2; color: var(--pd-text); margin: 0; }
        .pd-subtitle { color: var(--pd-muted); font-size: 0.875rem; margin: 6px 0 0; }
        .pd-wish-btn {
          background: none; border: none; cursor: pointer; padding: 10px;
          border-radius: 50%; transition: background 0.2s;
        }
        .pd-wish-btn:hover { background: var(--pd-primary-pale); }
        .pd-stars { display: flex; align-items: center; gap: 8px; margin-bottom: 1.25rem; }
        .pd-stars-row { display: flex; gap: 2px; color: #f59e0b; }
        .pd-review-count { color: var(--pd-muted); font-size: 0.8rem; }
        .pd-price-big { font-size: clamp(2rem, 5vw, 2.8rem); font-weight: 800; color: var(--pd-primary); margin: 0 0 2px; line-height: 1; }
        .pd-price-slug { color: var(--pd-muted); font-size: 0.75rem; margin: 0 0 1.5rem; }
        .pd-divider { height: 1px; background: var(--pd-border); margin: 1.25rem 0; }

        /* ─── Selects ─── */
        .pd-options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px; }
        .pd-field-label { display: block; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.08em; color: var(--pd-muted); text-transform: uppercase; margin-bottom: 6px; }
        .pd-select {
          width: 100%; background: var(--pd-bg); border: 1.5px solid var(--pd-border);
          border-radius: var(--pd-radius-sm); padding: 10px 14px; font-size: 0.875rem;
          font-family: var(--font-body); color: var(--pd-text); outline: none; cursor: pointer;
          transition: border-color 0.2s;
        }
        .pd-select:focus { border-color: var(--pd-primary); }

        /* ─── Qty ─── */
        .pd-qty-wrap { margin: 1rem 0; }
        .pd-qty-ctrl {
          display: inline-flex; align-items: center; gap: 0;
          background: var(--pd-bg); border: 1.5px solid var(--pd-border);
          border-radius: var(--pd-radius-sm); overflow: hidden;
        }
        .pd-qty-btn {
          background: none; border: none; cursor: pointer; padding: 10px 18px;
          font-size: 1.2rem; font-weight: 700; color: var(--pd-primary);
          transition: background 0.15s; display: flex; align-items: center;
        }
        .pd-qty-btn:hover { background: var(--pd-primary-pale); }
        .pd-qty-val { padding: 0 20px; font-size: 1rem; font-weight: 700; color: var(--pd-text); min-width: 48px; text-align: center; }

        /* ─── Total & Cart ─── */
        .pd-total-row { display: flex; justify-content: space-between; align-items: center; margin: 1.5rem 0 1rem; }
        .pd-total-label { color: var(--pd-muted); font-size: 0.875rem; }
        .pd-total-price { font-size: 2rem; font-weight: 800; color: var(--pd-primary); }
        .pd-add-cart {
          width: 100%; background: var(--pd-primary); color: #fff;
          border: none; border-radius: var(--pd-radius-sm); padding: 15px;
          font-size: 1rem; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          font-family: var(--font-body); transition: all 0.2s;
          box-shadow: 0 6px 20px rgba(90,51,180,0.3);
        }
        .pd-add-cart:hover { background: var(--pd-primary-light); transform: translateY(-1px); box-shadow: 0 8px 28px rgba(90,51,180,0.4); }
        .pd-add-cart:active { transform: translateY(0); }

        /* ─── Custom Design Toggle ─── */
        .pd-custom-toggle {
          margin-top: 14px;
          background: linear-gradient(135deg, #fdf4ff, #f0ebff);
          border: 1.5px solid rgba(90,51,180,0.2); border-radius: var(--pd-radius-sm);
          padding: 14px 16px; display: flex; align-items: center; gap: 12px;
          cursor: pointer; transition: all 0.25s; user-select: none;
        }
        .pd-custom-toggle:hover { border-color: var(--pd-primary); background: var(--pd-primary-pale); }
        .pd-custom-toggle.active { border-color: var(--pd-primary); background: var(--pd-primary-pale); box-shadow: 0 0 0 4px rgba(90,51,180,0.08); }
        .pd-toggle-checkbox {
          width: 20px; height: 20px; border-radius: 6px;
          border: 2px solid var(--pd-primary); background: var(--pd-white);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: background 0.2s;
        }
        .pd-toggle-checkbox.checked { background: var(--pd-primary); }
        .pd-toggle-text { flex: 1; }
        .pd-toggle-text strong { font-size: 0.875rem; font-weight: 700; color: var(--pd-text); display: block; }
        .pd-toggle-text span { font-size: 0.75rem; color: var(--pd-muted); }
        .pd-toggle-palette { color: var(--pd-primary); }

        /* ─── Custom Design Panel ─── */
        .pd-custom-panel {
          max-width: 1200px; margin: 0 auto 2rem; padding: 0 1.5rem;
        }
        .pd-custom-inner {
          background: var(--pd-white); border-radius: var(--pd-radius);
          border: 1.5px solid rgba(90,51,180,0.15); overflow: hidden;
          box-shadow: var(--pd-shadow-lg);
        }
        .pd-custom-header {
          background: linear-gradient(135deg, var(--pd-primary), var(--pd-primary-light));
          padding: 1.75rem 2rem; display: flex; justify-content: space-between; align-items: center;
        }
        .pd-custom-header h2 { font-family: var(--font-display); color: #fff; margin: 0; font-size: 1.5rem; }
        .pd-custom-header p { color: rgba(255,255,255,0.75); font-size: 0.8rem; margin: 4px 0 0; }
        .pd-custom-close {
          background: rgba(255,255,255,0.15); border: none; color: #fff;
          border-radius: 50%; width: 36px; height: 36px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s; flex-shrink: 0;
        }
        .pd-custom-close:hover { background: rgba(255,255,255,0.25); }
        .pd-custom-body { padding: 2rem; }

        /* ─── Custom Design Form ─── */
        .cd-form { display: flex; flex-direction: column; gap: 1.5rem; }
        .cd-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        @media (max-width: 768px) { .cd-form-grid { grid-template-columns: 1fr; } }
        .cd-form-col { display: flex; flex-direction: column; gap: 1rem; }
        .cd-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .cd-field { display: flex; flex-direction: column; gap: 6px; }
        .cd-field label {
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.06em;
          text-transform: uppercase; color: var(--pd-muted);
          display: flex; align-items: center; gap: 5px;
        }
        .cd-field input, .cd-field textarea {
          background: var(--pd-bg); border: 1.5px solid var(--pd-border);
          border-radius: var(--pd-radius-sm); padding: 11px 14px;
          font-size: 0.875rem; font-family: var(--font-body);
          color: var(--pd-text); outline: none; transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%; box-sizing: border-box; resize: vertical;
        }
        .cd-field input:focus, .cd-field textarea:focus {
          border-color: var(--pd-primary);
          box-shadow: 0 0 0 3px rgba(90,51,180,0.1);
        }
        .cd-field textarea { min-height: 120px; }

        /* ─── Dropzone ─── */
        .cd-dropzone {
          border: 2px dashed rgba(90,51,180,0.25); border-radius: var(--pd-radius-sm);
          background: #faf8ff; cursor: pointer; transition: all 0.25s; overflow: hidden;
        }
        .cd-dropzone:hover, .cd-dropzone.dragging {
          border-color: var(--pd-primary);
          background: var(--pd-primary-pale);
        }
        .cd-dropzone-inner { padding: 28px 20px; text-align: center; }
        .cd-dropzone-icon {
          width: 56px; height: 56px; border-radius: 50%;
          background: rgba(90,51,180,0.08); display: flex; align-items: center;
          justify-content: center; margin: 0 auto 12px; color: var(--pd-primary);
          transition: transform 0.2s;
        }
        .cd-dropzone:hover .cd-dropzone-icon, .cd-dropzone.dragging .cd-dropzone-icon {
          transform: scale(1.1) translateY(-3px);
        }
        .cd-dropzone-title { font-weight: 700; color: var(--pd-text); margin: 0 0 4px; font-size: 0.9rem; }
        .cd-dropzone-hint { color: var(--pd-muted); font-size: 0.75rem; margin: 0; }

        /* ─── File List ─── */
        .cd-file-list { margin-top: 10px; display: flex; flex-direction: column; gap: 6px; }
        .cd-file-list-header {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 0.75rem; color: var(--pd-muted); padding: 0 2px;
        }
        .cd-file-list-header button {
          background: none; border: none; cursor: pointer; color: var(--pd-accent);
          font-size: 0.75rem; font-weight: 600; font-family: var(--font-body);
        }
        .cd-upload-item {
          display: flex; align-items: center; gap: 10px; padding: 10px 12px;
          background: var(--pd-bg); border-radius: 10px; border: 1px solid var(--pd-border);
        }
        .cd-upload-preview {
          width: 44px; height: 44px; border-radius: 8px; background: var(--pd-primary-pale);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; flex-shrink: 0;
        }
        .cd-upload-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
        .cd-upload-name {
          font-size: 0.8rem; font-weight: 600; color: var(--pd-text);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .cd-upload-size { font-size: 0.7rem; color: var(--pd-muted); }
        .cd-progress-track { height: 4px; background: rgba(90,51,180,0.1); border-radius: 2px; overflow: hidden; }
        .cd-progress-fill { height: 100%; background: var(--pd-primary); border-radius: 2px; }
        .cd-upload-done {
          display: flex; align-items: center; gap: 4px;
          font-size: 0.7rem; font-weight: 700; color: #16a34a;
        }
        .cd-upload-remove {
          background: none; border: none; cursor: pointer; color: #dc2626;
          padding: 6px; border-radius: 6px; display: flex; align-items: center;
          transition: background 0.15s; flex-shrink: 0;
        }
        .cd-upload-remove:hover { background: #fef2f2; }

        /* ─── Contact Section ─── */
        .cd-contact-section {
          padding: 1.25rem 1.5rem; background: #faf8ff;
          border: 1px solid var(--pd-border); border-radius: var(--pd-radius-sm);
        }
        .cd-contact-title {
          font-size: 0.8rem; font-weight: 700; letter-spacing: 0.06em;
          text-transform: uppercase; color: var(--pd-muted); margin: 0 0 1rem;
        }
        .cd-contact-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        @media (max-width: 640px) { .cd-contact-grid { grid-template-columns: 1fr; } }

        /* ─── Submit Row ─── */
        .cd-submit-row {
          display: flex; justify-content: flex-end; gap: 12px; align-items: center;
          padding-top: 1rem; border-top: 1px solid var(--pd-border);
        }
        .cd-cancel-btn {
          background: none; border: 1.5px solid var(--pd-border); border-radius: 12px;
          padding: 12px 24px; font-size: 0.875rem; font-weight: 600; cursor: pointer;
          color: var(--pd-muted); font-family: var(--font-body); transition: all 0.2s;
        }
        .cd-cancel-btn:hover { border-color: var(--pd-primary); color: var(--pd-primary); }
        .cd-submit-btn {
          background: var(--pd-primary); color: #fff; border: none;
          border-radius: 12px; padding: 12px 28px; font-size: 0.9rem; font-weight: 700;
          cursor: pointer; font-family: var(--font-body);
          display: flex; align-items: center; gap: 8px;
          box-shadow: 0 4px 16px rgba(90,51,180,0.3); transition: all 0.2s;
        }
        .cd-submit-btn:hover { background: var(--pd-primary-light); transform: translateY(-1px); box-shadow: 0 6px 24px rgba(90,51,180,0.4); }

        /* ─── Success ─── */
        .cd-success {
          text-align: center; padding: 3rem 2rem; display: flex;
          flex-direction: column; align-items: center; gap: 14px;
        }
        .cd-success-icon { width: 80px; height: 80px; border-radius: 50%; background: #dcfce7; display: flex; align-items: center; justify-content: center; color: #16a34a; }
        .cd-success h3 { font-family: var(--font-display); font-size: 1.8rem; margin: 0; color: var(--pd-text); }
        .cd-success p { color: var(--pd-muted); max-width: 420px; line-height: 1.6; margin: 0; }
        .cd-success-btn {
          background: var(--pd-primary); color: #fff; border: none;
          border-radius: 12px; padding: 12px 28px; font-size: 0.9rem; font-weight: 700;
          cursor: pointer; font-family: var(--font-body); margin-top: 8px;
          transition: background 0.2s;
        }
        .cd-success-btn:hover { background: var(--pd-primary-light); }

        /* ─── Tabs ─── */
        .pd-tabs-section { max-width: 1200px; margin: 0 auto 2rem; padding: 0 1.5rem; }
        .pd-tabs-nav {
          background: var(--pd-white); border-radius: var(--pd-radius);
          padding: 8px; display: flex; gap: 6px; overflow-x: auto; margin-bottom: 1.5rem;
          box-shadow: var(--pd-shadow); border: 1px solid var(--pd-border);
        }
        .pd-tabs-nav::-webkit-scrollbar { height: 3px; }
        .pd-tab-btn {
          padding: 10px 22px; border-radius: var(--pd-radius-sm);
          border: none; cursor: pointer; font-size: 0.875rem; font-weight: 600;
          white-space: nowrap; transition: all 0.22s; font-family: var(--font-body);
          background: none; color: var(--pd-muted);
        }
        .pd-tab-btn:hover { background: var(--pd-primary-pale); color: var(--pd-primary); }
        .pd-tab-btn.active { background: var(--pd-primary); color: #fff; box-shadow: 0 4px 12px rgba(90,51,180,0.3); }
        .pd-tab-content {
          background: var(--pd-white); border-radius: var(--pd-radius);
          padding: 2.5rem; box-shadow: var(--pd-shadow); border: 1px solid var(--pd-border);
        }
        .pd-overview-title { font-family: var(--font-display); font-size: 1.6rem; margin: 0 0 1rem; }
        .pd-overview-text { color: var(--pd-muted); line-height: 1.8; white-space: pre-line; }

        /* Specs/Features */
        .pd-kv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 1.5rem; }
        @media (max-width: 600px) { .pd-kv-grid { grid-template-columns: 1fr; } }
        .pd-kv-item { background: var(--pd-bg); border-radius: 10px; padding: 12px 16px; border: 1px solid var(--pd-border); }
        .pd-kv-key { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--pd-primary); margin-bottom: 3px; }
        .pd-kv-val { font-size: 0.9rem; font-weight: 500; color: var(--pd-text); }

        /* FAQ */
        .pd-faq-item { border-bottom: 1px solid var(--pd-border); }
        .pd-faq-item:last-child { border-bottom: none; }
        .pd-faq-btn {
          width: 100%; display: flex; justify-content: space-between; align-items: center;
          background: none; border: none; padding: 1.1rem 0; cursor: pointer;
          text-align: left; font-family: var(--font-body); transition: color 0.2s;
        }
        .pd-faq-btn:hover { color: var(--pd-primary); }
        .pd-faq-q { font-weight: 600; font-size: 0.95rem; padding-right: 1rem; color: var(--pd-text); }
        .pd-faq-icon { color: var(--pd-primary); flex-shrink: 0; }
        .pd-faq-ans { padding: 0 0 1rem; color: var(--pd-muted); font-size: 0.875rem; line-height: 1.7; }

        /* ─── Reviews ─── */
        .pd-reviews-section { max-width: 1200px; margin: 0 auto 2.5rem; padding: 0 1.5rem; }
        .pd-section-title { font-family: var(--font-display); font-size: 1.75rem; margin: 0 0 1.5rem; }
        .pd-reviews-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.25rem; }
        .pd-review-card {
          background: var(--pd-white); border-radius: var(--pd-radius);
          padding: 1.75rem; border: 1px solid var(--pd-border);
          box-shadow: var(--pd-shadow);
        }
        .pd-review-stars { display: flex; gap: 2px; color: #f59e0b; margin-bottom: 12px; }
        .pd-review-text { font-style: italic; color: var(--pd-muted); line-height: 1.7; margin-bottom: 1.25rem; font-size: 0.9rem; }
        .pd-reviewer { display: flex; align-items: center; gap: 12px; }
        .pd-reviewer-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #c4b5fd, #f9a8d4); flex-shrink: 0; }
        .pd-reviewer-name { font-weight: 700; font-size: 0.9rem; }
        .pd-reviewer-date { font-size: 0.75rem; color: var(--pd-muted); }

        /* ─── Related ─── */
        .pd-related-section { max-width: 1200px; margin: 0 auto 2.5rem; padding: 0 1.5rem; }
        .pd-related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1.25rem; }

        /* ─── Lightbox ─── */
        .pd-lightbox {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(0,0,0,0.9); display: flex; align-items: center; justify-content: center;
          cursor: zoom-out;
        }
        .pd-lightbox img { max-width: 90vw; max-height: 90vh; object-fit: contain; border-radius: 12px; }
        .pd-lightbox-close {
          position: absolute; top: 20px; right: 24px;
          background: rgba(255,255,255,0.1); border: none; color: #fff;
          width: 44px; height: 44px; border-radius: 50%; font-size: 20px;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .pd-lightbox-close:hover { background: rgba(255,255,255,0.2); }

        /* ─── Side preview images on select ─── */
        .pd-side-preview { width: 100%; margin-top: 6px; border-radius: 10px; overflow: hidden; max-height: 120px; object-fit: cover; border: 1px solid var(--pd-border); }
      `}</style>

      <div className="pd-root">
        {/* ─── Product Main Section ─── */}
        <section className="pd-main">
          <div className="pd-layout">

            {/* Gallery */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <div className="pd-gallery">
                {allImages.length > 1 && (
                  <div className="pd-thumbs">
                    {allImages.map((img, i) => (
                      <motion.button
                        key={i}
                        whileTap={{ scale: 0.95 }}
                        className={`pd-thumb-btn ${selectedImage === i ? 'active' : ''}`}
                        onClick={() => setSelectedImage(i)}
                      >
                        <img src={img} alt={`thumb-${i}`} />
                      </motion.button>
                    ))}
                  </div>
                )}
                <div
                  className="pd-main-img-wrap"
                  onClick={() => setLightboxImg(allImages[selectedImage])}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedImage}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      src={allImages[selectedImage]}
                      alt={product.title}
                    />
                  </AnimatePresence>
                  <div className="pd-zoom-hint">
                    <ZoomIn size={12} /> Click to zoom
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div initial="hidden" animate="visible" variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay: 0.1 } } }}>
              <div className="pd-info-card">
                <div className="pd-info-header">
                  <div>
                    <h1 className="pd-title">{product.title}</h1>
                    {product.sub_title && <p className="pd-subtitle">{product.sub_title}</p>}
                  </div>
                  <button
                    className="pd-wish-btn"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart
                      size={22}
                      fill={isWishlisted ? '#ef4444' : 'none'}
                      color={isWishlisted ? '#ef4444' : '#9ca3af'}
                    />
                  </button>
                </div>

                <div className="pd-stars">
                  <div className="pd-stars-row">
                    {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="currentColor" />)}
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>4.9</span>
                  <span className="pd-review-count">(221 reviews)</span>
                </div>

                <p className="pd-price-big">
                  € {selectedSize ? selectedSize.price : product.price}
                </p>
                <p className="pd-price-slug">{product.priceSlug}</p>

                <div className="pd-divider" />

                {/* Size + Sides */}
                <div className="pd-options-grid">
                  {product.priceBySize?.length > 0 && (
                    <div>
                      <label className="pd-field-label">Size</label>
                      <select
                        className="pd-select"
                        value={selectedSize?.size || ''}
                        onChange={e => {
                          const found = product.priceBySize.find(s => s.size === e.target.value);
                          setSelectedSize(found);
                        }}
                      >
                        {product.priceBySize.map((s, i) => (
                          <option key={i} value={s.size}>{s.size}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {product.PriceBySidesPrint?.length > 0 && (
                    <div>
                      <label className="pd-field-label">Print Sides</label>
                      <div className="relative w-full">
                        {/* Selected */}
                        <div
                          className="pd-select flex items-center justify-between cursor-pointer"
                          onClick={() => setOpen(!open)}
                        >
                          {selectedSide ? (
                            <div className="flex items-center gap-2">
                              <img
                                src={selectedSide.sidePreviewImage}
                                alt=""
                                className="w-8 h-8 object-cover rounded"
                              />
                              <span>{selectedSide.sides}</span>
                            </div>
                          ) : (
                            <span>Select Side</span>
                          )}
                        </div>

                        {/* Dropdown */}
                        {open && (
                          <div className="absolute w-full bg-white border mt-1 rounded shadow z-50">
                            {product.PriceBySidesPrint.map((s, i) => (
                              <div
                                key={i}
                                onClick={() => {
                                  setSelectedSide(s);
                                  setOpen(false);
                                }}
                                className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
                              >
                                <img
                                  src={s?.sidePreviewImage}
                                  alt=""
                                  className="w-10 h-10 object-cover rounded"
                                />
                                <span>{s?.sides}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {/* Side preview image */}
                      {/* <AnimatePresence>
                        {selectedSide?.sidePreviewImage && (
                          <motion.img
                            key={selectedSide.sides}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            src={selectedSide.sidePreviewImage}
                            alt={selectedSide.sides}
                            className="pd-side-preview"
                          />
                        )}
                      </AnimatePresence> */}
                    </div>
                  )}
                </div>

                {/* Lamination + Delivery */}
                <div className="pd-options-grid">
                  {product.Laminations?.length > 0 && (
                    <div>
                      <label className="pd-field-label">Lamination</label>
                      <select className="pd-select" value={selectedLamination} onChange={e => setSelectedLamination(e.target.value)}>
                        {product.Laminations.map((l, i) => (
                          <option key={i} value={l}>{l}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {product.deliveryTypes?.length > 0 && (
                    <div>
                      <label className="pd-field-label">Delivery</label>
                      <select
                        className="pd-select"
                        value={typeof selectedDelivery === 'object' ? selectedDelivery?.deliveryType : selectedDelivery}
                        onChange={e => {
                          const found = product.deliveryTypes.find(d =>
                            (typeof d === 'object' ? d.deliveryType : d) === e.target.value
                          );
                          setSelectedDelivery(found);
                        }}
                      >
                        {product.deliveryTypes.map((d, i) => {
                          const label = typeof d === 'object' ? d.deliveryType : d;
                          return <option key={i} value={label}>{label}</option>;
                        })}
                      </select>
                    </div>
                  )}
                </div>

                {/* Quantity */}
                <div className="pd-qty-wrap">
                  <label className="pd-field-label">Quantity (Min: {product.min_quantity})</label>
                  <div className="pd-qty-ctrl">
                    <button className="pd-qty-btn" onClick={() => setQty(Math.max(product.min_quantity || 1, qty - 1))}>
                      <Minus size={16} />
                    </button>
                    <span className="pd-qty-val">{qty}</span>
                    <button className="pd-qty-btn" onClick={() => setQty(qty + 1)}>
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Total & Cart */}
                <div className="pd-divider" />
                <div className="pd-total-row">
                  <span className="pd-total-label">Total Price</span>
                  <motion.span
                    key={totalPrice}
                    initial={{ scale: 1.1, color: '#7B55D0' }}
                    animate={{ scale: 1, color: '#5A33B4' }}
                    transition={{ duration: 0.3 }}
                    className="pd-total-price"
                  >
                    € {totalPrice.toFixed(2)}
                  </motion.span>
                </div>

                <motion.button
                  onClick={() => handleAddToCart()}
                  whileTap={{ scale: 0.98 }}
                  className="pd-add-cart"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </motion.button>

                {/* ─── Custom Design Toggle ─── */}
                <motion.div
                  className={`pd-custom-toggle ${wantCustomDesign ? 'active' : ''}`}
                  onClick={() => setWantCustomDesign(!wantCustomDesign)}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className={`pd-toggle-checkbox ${wantCustomDesign ? 'checked' : ''}`}>
                    <AnimatePresence>
                      {wantCustomDesign && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          <CheckCircle2 size={14} color="#fff" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="pd-toggle-text">
                    <strong>I want a Custom Design</strong>
                    <span>Submit your design concept or let us create one for you</span>
                  </div>
                  <Palette size={20} className="pd-toggle-palette" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Custom Design Panel ─── */}
        <AnimatePresence>
          {wantCustomDesign && (
            <motion.section
              initial={{ opacity: 0, y: -20, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -10, scaleY: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'top' }}
              className="pd-custom-panel"
            >
              <div className="pd-custom-inner">
                <div className="pd-custom-header">
                  <div>
                    <h2>Custom Design Request</h2>
                    <p>Tell us your vision — we'll bring it to life for <strong>{product.title}</strong></p>
                  </div>
                  <button className="pd-custom-close" onClick={() => setWantCustomDesign(false)}>
                    <X size={18} />
                  </button>
                </div>
                <div className="pd-custom-body">
                  <CustomDesignForm product={product} onClose={() => setWantCustomDesign(false)} />
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ─── Tabs ─── */}
        <section className="pd-tabs-section">
          <div className="pd-tabs-nav">
            {tabs.map(tab => (
              <button
                key={tab}
                className={`pd-tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="pd-tab-content">
            <AnimatePresence mode="wait">
              {activeTab === 'Details & Info' && (
                <motion.div key="details" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <h3 className="pd-overview-title">Product Overview</h3>
                  <p className="pd-overview-text">
                    {product.productDetails?.Overview || 'Detailed product information coming soon.'}
                  </p>

                  {Object.keys(product.productDetails?.Specifications || {}).length > 0 && (
                    <>
                      <h4 style={{ margin: '1.75rem 0 0.5rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--pd-primary)', fontWeight: 700 }}>Specifications</h4>
                      <div className="pd-kv-grid">
                        {Object.entries(product.productDetails.Specifications).map(([k, v]) => (
                          <div key={k} className="pd-kv-item">
                            <div className="pd-kv-key">{k}</div>
                            <div className="pd-kv-val">{v}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {Object.keys(product.productDetails?.Features || {}).length > 0 && (
                    <>
                      <h4 style={{ margin: '1.75rem 0 0.5rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--pd-primary)', fontWeight: 700 }}>Features</h4>
                      <div className="pd-kv-grid">
                        {Object.entries(product.productDetails.Features).map(([k, v]) => (
                          <div key={k} className="pd-kv-item">
                            <div className="pd-kv-key">{k}</div>
                            <div className="pd-kv-val">{v}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              {activeTab === 'FAQ' && (
                <motion.div key="faq" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <h3 className="pd-overview-title">Frequently Asked Questions</h3>
                  {product.faq?.length ? product.faq.map((item, i) => (
                    <div key={i} className="pd-faq-item">
                      <button className="pd-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                        <span className="pd-faq-q">{item.question}</span>
                        <span className="pd-faq-icon">
                          {openFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </span>
                      </button>
                      <AnimatePresence>
                        {openFaq === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ overflow: 'hidden' }}
                          >
                            <p className="pd-faq-ans">{item.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )) : <p style={{ color: 'var(--pd-muted)' }}>No FAQs available for this product.</p>}
                </motion.div>
              )}

              {activeTab === 'Paper' && (
                <motion.div key="paper" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <h3 className="pd-overview-title">Paper Details</h3>
                  <p className="pd-overview-text">{product.paperDetails || 'No paper details available.'}</p>
                </motion.div>
              )}

              {activeTab === 'Speciality' && (
                <motion.div key="spec" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <h3 className="pd-overview-title">Product Speciality</h3>
                  <p className="pd-overview-text">{product.speciality || 'No speciality information available.'}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ─── Reviews ─── */}
        <section className="pd-reviews-section">
          <h2 className="pd-section-title">Customer Reviews</h2>
          <div className="pd-reviews-grid">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                className="pd-review-card"
              >
                <div className="pd-review-stars">
                  {[...Array(review.stars)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <p className="pd-review-text">"{review.text}"</p>
                <div className="pd-reviewer">
                  <div className="pd-reviewer-avatar" />
                  <div>
                    <div className="pd-reviewer-name">{review.name}</div>
                    <div className="pd-reviewer-date">{review.date}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── Related Products ─── */}
        <section className="pd-related-section">
          <h2 className="pd-section-title">You May Also Like</h2>
          <div className="pd-related-grid">
            {products?.slice(0, 5).map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <ProductCard
                  name={p.title}
                  price={`€ ${p.price?.toFixed(2)}`}
                  qty={p.min_quantity}
                  img={p.mainImage}
                />
              </motion.div>
            ))}
          </div>
        </section>

        <PopularChoices />
        <HireDesignersBlock />
      </div>

      {/* ─── Lightbox ─── */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            className="pd-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
          >
            <button className="pd-lightbox-close" onClick={() => setLightboxImg(null)}>
              <X size={20} />
            </button>
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 250, damping: 22 }}
              src={lightboxImg}
              alt="zoom"
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductDetail;