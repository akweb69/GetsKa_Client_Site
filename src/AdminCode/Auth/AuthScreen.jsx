import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, X } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
// IMPORTANT: Import useAuth, NOT AuthProvider
import { useAuth } from '../../Context/AuthContext'

/* ─── shared colours ────────────────────────────────────────── */
const BG = '#0d0d1f'
const CARD = '#f0eef9'
const INPUT_BG = '#e5e1f5'
const PURPLE = '#5a11e8'
const TEXT_DARK = '#13103a'
const TEXT_MUTED = '#6e6a8a'
const LINK_CLR = '#5a11e8'

/* ─── Google SVG logo ─────────────────────────────────────────*/
const GoogleIcon = () => (
    <svg width="22" height="22" viewBox="0 0 48 48">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
)

const FacebookIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
)

const AuthInput = ({ type = 'text', placeholder, value, onChange, showToggle, onToggle, showPass }) => (
    <div className="relative">
        <input
            type={showToggle ? (showPass ? 'text' : 'password') : type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full rounded-xl px-4 py-3.5 text-[14.5px] outline-none transition-all"
            style={{ background: INPUT_BG, color: TEXT_DARK, border: '1.5px solid transparent' }}
            onFocus={(e) => { e.target.style.borderColor = PURPLE; e.target.style.background = '#ece8ff' }}
            onBlur={(e) => { e.target.style.borderColor = 'transparent'; e.target.style.background = INPUT_BG }}
        />
        {showToggle && (
            <button type="button" onClick={onToggle} className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70" style={{ color: TEXT_MUTED }}>
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        )}
    </div>
)

const SocialBtn = ({ icon, onClick, isLoading }) => (
    <button
        type="button"
        disabled={isLoading}
        onClick={onClick}
        className="flex-1 flex items-center justify-center py-3 rounded-xl transition-all hover:brightness-95 active:scale-[.98] disabled:opacity-50"
        style={{ background: INPUT_BG }}
    >
        {icon}
    </button>
)

/* ═══════════════════════════════════════════════════════════════
   SIGN UP SCREEN
═══════════════════════════════════════════════════════════════ */
export const SignUp = () => {
    const navigate = useNavigate()
    const { signUpWithEmailPassword, userLoading } = useAuth();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false)

    useEffect(() => { window.scrollTo(0, 0) }, [])

    const handleSignUp = async () => {
        if (!name || !email || !password) {
            toast.error("Please fill in all fields.");
            return;
        }

        try {
            // 1. Create user in Firebase
            const userCredential = await signUpWithEmailPassword(email, password);

            // 2. Save additional info (name, role) to your custom DB via axios
            const finalUserData = {
                uid: userCredential.user.uid, // Link Firebase UID to your DB
                name,
                email,
                role: "user",
                isVerified: true,
                isBlocked: false
            }

            await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, finalUserData);

            toast.success("Account created successfully!");
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.message || "An error occurred during sign up.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 mb-20" style={{ background: BG }}>
            <div className="relative w-full max-w-[460px] rounded-3xl p-10" style={{ background: CARD }}>
                <button onClick={() => navigate(-1)} className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-black/8" style={{ color: TEXT_MUTED }}>
                    <X size={18} />
                </button>

                <h1 className="text-[42px] font-extrabold leading-tight mb-1" style={{ color: TEXT_DARK }}>Hello</h1>
                <p className="text-[15px] mb-9" style={{ color: TEXT_MUTED }}>Create your account now!</p>

                <div className="flex flex-col gap-3 mb-7">
                    <AuthInput placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <AuthInput type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <AuthInput placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} showToggle onToggle={() => setShowPass(!showPass)} showPass={showPass} />
                </div>

                <button
                    onClick={handleSignUp}
                    disabled={userLoading}
                    className="w-full py-4 rounded-xl text-white font-semibold text-[16px] tracking-wide transition-all hover:brightness-110 active:scale-[.98] mb-5 disabled:opacity-70"
                    style={{ background: PURPLE, boxShadow: `0 6px 24px ${PURPLE}55` }}
                >
                    {userLoading ? "Processing..." : "Sign up"}
                </button>

                <p className="text-center text-[13.5px]" style={{ color: TEXT_MUTED }}>
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium underline underline-offset-2" style={{ color: LINK_CLR }}>Log in</Link>
                </p>
            </div>
        </div>
    )
}

/* ═══════════════════════════════════════════════════════════════
   LOG IN SCREEN
═══════════════════════════════════════════════════════════════ */
export const Login = () => {
    const navigate = useNavigate()
    const { loginWithEmailPassword, continueWithGoogle, userLoading } = useAuth();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => { window.scrollTo(0, 0) }, [])

    const handleLogin = async () => {
        setErrorMessage(null);
        if (!email || !password) {
            toast.error("Please fill in all fields.");
            return;
        }
        try {
            await loginWithEmailPassword(email, password);
            toast.success("Login successful!");
            navigate('/dashboard');
        } catch (err) {
            const msg = "Invalid email or password. Please try again.";
            setErrorMessage(msg);
            toast.error(msg);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await continueWithGoogle();
            toast.success("Welcome back!");
            navigate('/dashboard');
        } catch (err) {
            toast.error("Google Sign-in failed. Please try again.");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 mb-20" style={{ background: BG }}>
            <div className="relative w-full max-w-[460px] rounded-3xl p-10" style={{ background: CARD }}>
                <button onClick={() => navigate(-1)} className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-black/8" style={{ color: TEXT_MUTED }}>
                    <X size={18} />
                </button>

                <h1 className="text-[42px] font-extrabold leading-tight mb-1" style={{ color: TEXT_DARK }}>Welcome</h1>
                <p className="text-[15px] mb-5" style={{ color: TEXT_MUTED }}>We are really happy to see you again!</p>

                {errorMessage && (
                    <div className="mb-4">
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="w-full p-4 rounded-lg border border-rose-600 bg-rose-50 shadow text-xs md:text-sm">
                            {errorMessage}
                        </motion.div>
                    </div>
                )}

                <div className="flex flex-col gap-3 mb-2">
                    <AuthInput type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <AuthInput placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} showToggle onToggle={() => setShowPass(!showPass)} showPass={showPass} />
                </div>

                <div className="mb-8">
                    <Link to="/forgot-password" className="text-[13px] underline underline-offset-2 transition-opacity hover:opacity-70" style={{ color: TEXT_MUTED }}>
                        Forgot Password
                    </Link>
                </div>

                <button
                    onClick={handleLogin}
                    disabled={userLoading}
                    className="w-full py-4 rounded-xl text-white font-semibold text-[16px] tracking-wide transition-all hover:brightness-110 active:scale-[.98] mb-5 disabled:opacity-70"
                    style={{ background: PURPLE, boxShadow: `0 6px 24px ${PURPLE}55` }}
                >
                    {userLoading ? "Signing in..." : "Log in"}
                </button>

                <p className="text-center text-[13.5px] mb-4" style={{ color: TEXT_MUTED }}>or continue with</p>

                <div className="flex gap-3 mb-6">
                    <SocialBtn icon={<GoogleIcon />} onClick={handleGoogleLogin} isLoading={userLoading} />
                    <SocialBtn icon={<FacebookIcon />} onClick={() => toast.error("Facebook login not implemented yet")} isLoading={userLoading} />
                </div>

                <p className="text-center text-[13.5px]" style={{ color: TEXT_MUTED }}>
                    New in Getska?{' '}
                    <Link to="/signup" className="font-medium underline underline-offset-2" style={{ color: LINK_CLR }}>Create account</Link>
                </p>
            </div>
        </div>
    )
}
