
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

/* ─── Enhanced Input (kept exactly the same behaviour + better focus ring) ─── */
const AuthInput = ({ type = 'text', placeholder, value, onChange, showToggle, onToggle, showPass }) => (
    <div className="relative">
        <input
            type={showToggle ? (showPass ? 'text' : 'password') : type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full rounded-2xl px-5 py-4 text-[15px] outline-none transition-all duration-200 shadow-sm"
            style={{
                background: INPUT_BG,
                color: TEXT_DARK,
                border: '2px solid transparent'
            }}
            onFocus={(e) => {
                e.target.style.borderColor = PURPLE
                e.target.style.background = '#ece8ff'
                e.target.style.boxShadow = `0 0 0 4px ${PURPLE} 25`
            }}
            onBlur={(e) => {
                e.target.style.borderColor = 'transparent'
                e.target.style.background = INPUT_BG
                e.target.style.boxShadow = 'none'
            }}
        />
        {showToggle && (
            <button
                type="button"
                onClick={onToggle}
                className="absolute right-5 top-1/2 -translate-y-1/2 transition-all hover:scale-110"
                style={{ color: TEXT_MUTED }}
            >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        )}
    </div>
)

/* ─── Enhanced Social Button – now with label for better UX ─── */
const SocialBtn = ({ icon, label, onClick, isLoading }) => (
    <button
        type="button"
        disabled={isLoading}
        onClick={onClick}
        className="flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-medium text-sm transition-all duration-200 hover:brightness-95 active:scale-[0.98] disabled:opacity-50 shadow-sm border border-transparent hover:border-gray-200"
        style={{ background: INPUT_BG, color: TEXT_DARK }}
    >
        {icon}
        <span>{label}</span>
    </button>
)

/* ═══════════════════════════════════════════════════════════════
   SIGN UP SCREEN – Fully responsive two-column professional layout
═══════════════════════════════════════════════════════════════ */
export const SignUp = () => {
    const navigate = useNavigate()
    const { signUpWithEmailPassword, continueWithGoogle, userLoading } = useAuth()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false)

    useEffect(() => { window.scrollTo(0, 0) }, [])

    const handleSignUp = async () => {
        if (!name || !email || !password) {
            toast.error("Please fill in all fields.")
            return
        }

        try {
            const userCredential = await signUpWithEmailPassword(email, password)

            const finalUserData = {
                name,
                email,
                role: "user",
                isVerified: true,
                isBlocked: false
            }

            await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, finalUserData)

            toast.success("Account created successfully!")
            navigate('/')
        } catch (error) {
            toast.error(error.message || "An error occurred during sign up.")
        }
    }

    const handleGoogleLogin = async () => {
        try {
            const result = await continueWithGoogle()
            const finalUserData = {
                name: result?.displayName,
                email: result?.email,
                role: "user",
                isVerified: true,
                isBlocked: false
            }
            await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, finalUserData)
            toast.success("Welcome to Getska!")
            navigate('/dashboard')
        } catch (err) {
            toast.error("Google Sign-in failed. Please try again.")
        }
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden" style={{ backgroundColor: BG }}>

            {/* LEFT HERO COLUMN – Hidden on mobile, vibrant gradient */}
            <div
                className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 lg:p-16 relative"
                style={{
                    background: 'linear-gradient(135deg, #0d0d1f 0%, #5a11e8 100%)',
                }}
            >
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-white rounded-3xl flex items-center justify-center shadow-inner text-[#5a11e8] text-4xl font-black">G</div>
                    <span className="text-white text-4xl font-bold tracking-tighter">Getska</span>
                </div>

                {/* Hero Content */}
                <div className="max-w-lg">
                    <h1 className="text-white text-6xl lg:text-7xl font-black leading-none tracking-[-2px] mb-6">
                        Hello, future<br />creator.
                    </h1>
                    <p className="text-white/90 text-2xl leading-tight">
                        Create your account in seconds and unlock a world of possibilities.
                    </p>

                    {/* Trust line */}
                    <div className="mt-12 flex items-center gap-8 text-white/70 text-sm">
                        <div className="flex items-center">
                            <div className="flex -space-x-3">
                                <div className="w-7 h-7 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 flex items-center justify-center text-xs">👋</div>
                                <div className="w-7 h-7 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 flex items-center justify-center text-xs">🚀</div>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium">Trusted by 12,458 creators</p>
                            <p className="text-xs">4.98 average rating</p>
                        </div>
                    </div>
                </div>

                {/* Bottom tag */}
                <p className="text-white/40 text-sm font-medium tracking-widest">
                    SECURE • FAST • BEAUTIFUL
                </p>
            </div>

            {/* RIGHT FORM COLUMN */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-16 bg-[#f0eef9]">
                <div
                    className="relative w-full max-w-[460px] rounded-3xl p-10 shadow-2xl"
                    style={{
                        background: CARD,
                        boxShadow: '0 25px 60px -15px rgb(90 17 232 / 0.2)'
                    }}
                >
                    {/* Back button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-6 right-6 w-10 h-10 rounded-2xl flex items-center justify-center transition-all hover:bg-black/5 active:scale-95"
                        style={{ color: TEXT_MUTED }}
                    >
                        <X size={20} />
                    </button>

                    <h1 className="text-[42px] font-extrabold leading-none mb-1" style={{ color: TEXT_DARK }}>
                        Hello
                    </h1>
                    <p className="text-[15px] mb-9" style={{ color: TEXT_MUTED }}>
                        Create your account now!
                    </p>

                    <div className="flex flex-col gap-4 mb-8">
                        <AuthInput placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
                        <AuthInput type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <AuthInput
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            showToggle
                            onToggle={() => setShowPass(!showPass)}
                            showPass={showPass}
                        />
                    </div>

                    <button
                        onClick={handleSignUp}
                        disabled={userLoading}
                        className="w-full py-4 rounded-2xl text-white font-semibold text-[16.5px] tracking-wide transition-all hover:brightness-110 active:scale-[0.98] mb-6 disabled:opacity-70"
                        style={{
                            background: PURPLE,
                            boxShadow: `0 10px 30px ${PURPLE}40`
                        }}
                    >
                        {userLoading ? "Creating account..." : "Create account"}
                    </button>

                    <p className="text-center text-[13.5px] text-[#6e6a8a] mb-4">or continue with</p>

                    <div className="flex gap-3 mb-8">
                        <SocialBtn
                            icon={<GoogleIcon />}
                            label="Google"
                            onClick={handleGoogleLogin}
                            isLoading={userLoading}
                        />
                    </div>

                    <p className="text-center text-[13.5px]" style={{ color: TEXT_MUTED }}>
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium underline underline-offset-4 hover:text-[#5a11e8]" style={{ color: LINK_CLR }}>
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

/* ═══════════════════════════════════════════════════════════════
   LOG IN SCREEN – Fully responsive two-column professional layout
═══════════════════════════════════════════════════════════════ */
export const Login = () => {
    const navigate = useNavigate()
    const { loginWithEmailPassword, continueWithGoogle, userLoading } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => { window.scrollTo(0, 0) }, [])

    const handleLogin = async () => {
        setErrorMessage(null)
        if (!email || !password) {
            toast.error("Please fill in all fields.")
            return
        }
        try {
            await loginWithEmailPassword(email, password)
            toast.success("Login successful!")
            navigate('/dashboard')
        } catch (err) {
            const msg = "Invalid email or password. Please try again."
            setErrorMessage(msg)
            toast.error(msg)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            const result = await continueWithGoogle()
            const finalUserData = {
                name: result?.displayName,
                email: result?.email,
                role: "user",
                isVerified: true,
                isBlocked: false
            }
            await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, finalUserData)
            toast.success("Welcome back to Getska!")
            navigate('/')
        } catch (err) {
            toast.error("Google Sign-in failed. Please try again.")
        }
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden" style={{ backgroundColor: BG }}>

            {/* LEFT HERO COLUMN – Same beautiful gradient */}
            <div
                className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 lg:p-16 relative"
                style={{
                    background: 'linear-gradient(135deg, #0d0d1f 0%, #5a11e8 100%)',
                }}
            >
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-white rounded-3xl flex items-center justify-center shadow-inner text-[#5a11e8] text-4xl font-black">G</div>
                    <span className="text-white text-4xl font-bold tracking-tighter">Getska</span>
                </div>

                {/* Hero Content */}
                <div className="max-w-lg">
                    <h1 className="text-white text-6xl lg:text-7xl font-black leading-none tracking-[-2px] mb-6">
                        Welcome back.
                    </h1>
                    <p className="text-white/90 text-2xl leading-tight">
                        Sign in to continue your journey with the Getska community.
                    </p>

                    {/* Trust line */}
                    <div className="mt-12 flex items-center gap-8 text-white/70 text-sm">
                        <div className="flex items-center">
                            <div className="flex -space-x-3">
                                <div className="w-7 h-7 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 flex items-center justify-center text-xs">🔒</div>
                                <div className="w-7 h-7 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 flex items-center justify-center text-xs">⚡</div>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium">Secure login • 99.9% uptime</p>
                            <p className="text-xs">Used by 12,458 creators daily</p>
                        </div>
                    </div>
                </div>

                <p className="text-white/40 text-sm font-medium tracking-widest">
                    SECURE • FAST • BEAUTIFUL
                </p>
            </div>

            {/* RIGHT FORM COLUMN */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-16 bg-[#f0eef9]">
                <div
                    className="relative w-full max-w-[460px] rounded-3xl p-10 shadow-2xl"
                    style={{
                        background: CARD,
                        boxShadow: '0 25px 60px -15px rgb(90 17 232 / 0.2)'
                    }}
                >
                    {/* Back button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-6 right-6 w-10 h-10 rounded-2xl flex items-center justify-center transition-all hover:bg-black/5 active:scale-95"
                        style={{ color: TEXT_MUTED }}
                    >
                        <X size={20} />
                    </button>

                    <h1 className="text-[42px] font-extrabold leading-none mb-1" style={{ color: TEXT_DARK }}>
                        Welcome
                    </h1>
                    <p className="text-[15px] mb-5" style={{ color: TEXT_MUTED }}>
                        We are really happy to see you again!
                    </p>

                    {errorMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm"
                        >
                            {errorMessage}
                        </motion.div>
                    )}

                    <div className="flex flex-col gap-4 mb-6">
                        <AuthInput type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <AuthInput
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            showToggle
                            onToggle={() => setShowPass(!showPass)}
                            showPass={showPass}
                        />
                    </div>

                    <div className="mb-8">
                        <Link
                            to="/forgot-password"
                            className="text-[13.5px] underline underline-offset-4 transition-colors hover:text-[#5a11e8]"
                            style={{ color: TEXT_MUTED }}
                        >
                            Forgot your password?
                        </Link>
                    </div>

                    <button
                        onClick={handleLogin}
                        disabled={userLoading}
                        className="w-full py-4 rounded-2xl text-white font-semibold text-[16.5px] tracking-wide transition-all hover:brightness-110 active:scale-[0.98] mb-6 disabled:opacity-70"
                        style={{
                            background: PURPLE,
                            boxShadow: `0 10px 30px ${PURPLE}40`
                        }}
                    >
                        {userLoading ? "Signing in..." : "Sign in"}
                    </button>

                    <p className="text-center text-[13.5px] text-[#6e6a8a] mb-4">or continue with</p>

                    <div className="flex gap-3 mb-8">
                        <SocialBtn
                            icon={<GoogleIcon />}
                            label="Google"
                            onClick={handleGoogleLogin}
                            isLoading={userLoading}
                        />
                    </div>

                    <p className="text-center text-[13.5px]" style={{ color: TEXT_MUTED }}>
                        New in Getska?{' '}
                        <Link to="/signup" className="font-medium underline underline-offset-4 hover:text-[#5a11e8]" style={{ color: LINK_CLR }}>
                            Create account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}