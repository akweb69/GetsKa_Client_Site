import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, X } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
// import motion for animation
import { motion } from 'framer-motion'

/* ─── shared colours ────────────────────────────────────────── */
const BG = '#0d0d1f'          // dark navy page bg
const CARD = '#f0eef9'          // lavender-white card
const INPUT_BG = '#e5e1f5'          // muted lavender input fill
const PURPLE = '#5a11e8'          // CTA button purple
const TEXT_DARK = '#13103a'          // near-black headings
const TEXT_MUTED = '#6e6a8a'          // subtitle / muted text
const LINK_CLR = '#5a11e8'          // inline links

/* ─── Google SVG logo ─────────────────────────────────────────*/
const GoogleIcon = () => (
    <svg width="22" height="22" viewBox="0 0 48 48">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

/* ─── Facebook SVG logo ───────────────────────────────────────*/
const FacebookIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
)

/* ─── Input field ─────────────────────────────────────────────*/
const AuthInput = ({ type = 'text', placeholder, value, onChange, showToggle, onToggle, showPass }) => (
    <div className="relative">
        <input
            type={showToggle ? (showPass ? 'text' : 'password') : type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full rounded-xl px-4 py-3.5 text-[14.5px] outline-none transition-all"
            style={{
                background: INPUT_BG,
                color: TEXT_DARK,
                border: '1.5px solid transparent',
                fontFamily: 'inherit',
            }}
            onFocus={(e) => { e.target.style.borderColor = PURPLE; e.target.style.background = '#ece8ff' }}
            onBlur={(e) => { e.target.style.borderColor = 'transparent'; e.target.style.background = INPUT_BG }}
        />
        {showToggle && (
            <button
                type="button"
                onClick={onToggle}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                style={{ color: TEXT_MUTED }}
            >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        )}
    </div>
)


/* ─── Social button ───────────────────────────────────────────*/
const SocialBtn = ({ icon, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className="flex-1 flex items-center justify-center py-3 rounded-xl transition-all hover:brightness-95 active:scale-[.98]"
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
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    // user info save in DB and then navigate to dashboard or home page
    const handleSignUp = async () => {
        // Implementation for sign up logic
        const finalUserData = {
            name,
            email,
            password,
            role: "user",
            isVerified: true,
            isBlocked: false
        }

        if (!name || !email || !password) {
            toast.error("Please fill in all fields.");
            return;
        }

        // first  check if user already exists with the email
        const existingUser = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${email}`);
        if (existingUser.data) {
            toast.error("User with this email already exists. Please try logging in.");
            return;
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, finalUserData);
        if (response.status === 200) {
            toast.success("User registered successfully!");
            navigate('/login');
        } else {
            toast.error("Failed to register user. Please try again.");
        }

    };


    return (
        <div className="min-h-screen flex items-center justify-center p-4 mb-20" style={{ background: BG }}>
            <div
                className="relative w-full max-w-[460px] rounded-3xl p-10"
                style={{ background: CARD }}
            >
                {/* close */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-black/8"
                    style={{ color: TEXT_MUTED }}
                >
                    <X size={18} />
                </button>

                {/* heading */}
                <h1 className="text-[42px] font-extrabold leading-tight mb-1" style={{ color: TEXT_DARK }}>
                    Hello
                </h1>
                <p className="text-[15px] mb-9" style={{ color: TEXT_MUTED }}>
                    Create your account now!
                </p>

                {/* fields */}
                <div className="flex flex-col gap-3 mb-7">
                    <AuthInput
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <AuthInput
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <AuthInput
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        showToggle
                        onToggle={() => setShowPass(!showPass)}
                        showPass={showPass}
                    />
                </div>

                {/* CTA */}
                <button
                    onClick={handleSignUp}
                    type="button"
                    className="w-full py-4 rounded-xl text-white font-semibold text-[16px] tracking-wide transition-all hover:brightness-110 active:scale-[.98] mb-5"
                    style={{ background: PURPLE, boxShadow: `0 6px 24px ${PURPLE}55` }}
                >
                    Sign up
                </button>

                {/* divider */}
                {/* <p className="text-center text-[13.5px] mb-4" style={{ color: TEXT_MUTED }}>
                    or continue with
                </p> */}

                {/* social */}
                {/* <div className="flex gap-3 mb-6">
                    <SocialBtn icon={<GoogleIcon />} onClick={() => { }} />
                    <SocialBtn icon={<FacebookIcon />} onClick={() => { }} />
                </div> */}

                {/* switch */}
                <p className="text-center text-[13.5px]" style={{ color: TEXT_MUTED }}>
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium underline underline-offset-2" style={{ color: LINK_CLR }}>
                        Log in
                    </Link>
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
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [showErrorMassamge, setShowErrorMassage] = useState(null)


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // login user function---->
    const handleLogin = async () => {
        setShowErrorMassage(null);
        if (!email || !password) {
            toast.error("Please fill in all fields.");
            setShowErrorMassage("Please fill in all fields.");
            return;
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, { email, password });
            if (response.status === 200) {
                toast.success("Login successful!");
                navigate('/dashboard');
            }
        } catch (err) {
            const msg = err.response?.status === 401
                ? "Unauthorized. Please check your credentials."
                : "Login failed. Please try again.";
            setShowErrorMassage(msg);
            toast.error(msg);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 mb-20" style={{ background: BG }}>
            <div
                className="relative w-full max-w-[460px] rounded-3xl p-10"
                style={{ background: CARD }}
            >
                {/* close */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-black/8"
                    style={{ color: TEXT_MUTED }}
                >
                    <X size={18} />
                </button>

                {/* heading */}
                <h1 className="text-[42px] font-extrabold leading-tight mb-1" style={{ color: TEXT_DARK }}>
                    Welcome
                </h1>
                <p className="text-[15px] mb-5" style={{ color: TEXT_MUTED }}>
                    We are really happy to see you again!
                </p>

                {
                    showErrorMassamge != null && <div className="mb-4">
                        {/* show error massage here */}
                        <motion.div
                            // animation
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}

                            className="w-full p-4 rounded-lg border border-rose-600 bg-rose-50 shadow text-xs md:text-sm">
                            {showErrorMassamge}
                        </motion.div>
                    </div>
                }

                {/* fields */}
                <div className="flex flex-col gap-3 mb-2">
                    <AuthInput
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <AuthInput
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        showToggle
                        onToggle={() => setShowPass(!showPass)}
                        showPass={showPass}
                    />
                </div>

                {/* forgot */}
                <div className="mb-8">
                    <Link
                        to="/forgot-password"
                        className="text-[13px] underline underline-offset-2 transition-opacity hover:opacity-70"
                        style={{ color: TEXT_MUTED }}
                    >
                        Forgot Password
                    </Link>
                </div>

                {/* CTA */}
                <button
                    onClick={handleLogin}
                    type="button"
                    className="w-full py-4 rounded-xl text-white font-semibold text-[16px] tracking-wide transition-all hover:brightness-110 active:scale-[.98] mb-5"
                    style={{ background: PURPLE, boxShadow: `0 6px 24px ${PURPLE}55` }}
                >
                    Log in
                </button>

                {/* divider */}
                {/* <p className="text-center text-[13.5px] mb-4" style={{ color: TEXT_MUTED }}>
                    or continue with
                </p> */}

                {/* social */}
                {/* <div className="flex gap-3 mb-6">
                    <SocialBtn icon={<GoogleIcon />} onClick={() => { }} />
                    <SocialBtn icon={<FacebookIcon />} onClick={() => { }} />
                </div> */}

                {/* switch */}
                <p className="text-center text-[13.5px]" style={{ color: TEXT_MUTED }}>
                    New in Getska?{' '}
                    <Link to="/signup" className="font-medium underline underline-offset-2" style={{ color: LINK_CLR }}>
                        Create account
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp