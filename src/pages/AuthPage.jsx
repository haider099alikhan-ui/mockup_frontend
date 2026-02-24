import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2, CheckCircle2, Layers, Zap, Download } from 'lucide-react'

const FEATURES = [
    { icon: Layers, text: '21+ professional templates' },
    { icon: Zap, text: 'One-click export to PNG / JPG' },
    { icon: Download, text: 'Instant cloud save' },
]

export default function AuthPage() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const { signIn, signUp, signInWithGoogle, resetPassword, isAuthenticated } = useAuth()

    const [mode, setMode] = useState(searchParams.get('mode') || 'login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    if (isAuthenticated) {
        navigate('/', { replace: true })
        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)
        try {
            if (mode === 'reset') {
                await resetPassword(email)
                setSuccess('Password reset email sent! Check your inbox.')
            } else if (mode === 'signup') {
                const data = await signUp(email, password, fullName)
                if (data?.session) navigate('/')
                else setSuccess('Account created! You can now log in.')
            } else {
                await signIn(email, password)
                navigate('/')
            }
        } catch (err) {
            setError(err.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            setError('')
            await signInWithGoogle()
        } catch (err) {
            setError(err.message || 'Google login failed')
        }
    }

    const switchMode = (next) => { setMode(next); setError(''); setSuccess('') }

    return (
        <div className="flex min-h-screen">
            {/* ─── Left brand panel ─── */}
            <div className="relative hidden w-[46%] flex-col justify-between overflow-hidden bg-gray-950 p-10 lg:flex">
                {/* Ambient gradient orbs */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />
                    <div className="absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-violet-600/15 blur-[100px]" />
                    <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[80px]" />
                </div>

                {/* Noise grain overlay */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.035]"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
                />

                <div className="relative z-10">
                    {/* Logo */}
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-black text-white shadow-lg shadow-blue-500/30">
                            A
                        </div>
                        <span className="text-lg font-bold text-white">ShotMock</span>
                    </button>
                </div>

                <div className="relative z-10 flex flex-col gap-8">
                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-indigo-400">App Store Screenshot Builder</p>
                        <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-white">
                            Design screenshots that{' '}
                            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                                convert
                            </span>
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-slate-400">
                            Professional templates, drag-and-drop editor, and one-click export. No design skills required.
                        </p>
                    </div>

                    <ul className="flex flex-col gap-3">
                        {FEATURES.map(({ icon: Icon, text }) => (
                            <li key={text} className="flex items-center gap-3">
                                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/8 ring-1 ring-white/10">
                                    <Icon className="h-4 w-4 text-indigo-300" />
                                </div>
                                <span className="text-sm font-medium text-slate-300">{text}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Social proof */}
                    <div className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/5 px-5 py-4 backdrop-blur-sm">
                        <div className="flex -space-x-2">
                            {['from-pink-400 to-rose-500', 'from-blue-400 to-cyan-500', 'from-amber-400 to-orange-500', 'from-emerald-400 to-teal-500'].map((g, i) => (
                                <div key={i} className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${g} text-[11px] font-bold text-white ring-2 ring-gray-950`}>
                                    {['J', 'A', 'M', 'S'][i]}
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="h-3 w-3 fill-amber-400 text-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                ))}
                            </div>
                            <p className="mt-0.5 text-xs text-slate-400">Loved by <strong className="text-white">10,000+</strong> app developers</p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10">
                    <p className="text-xs text-slate-600">© {new Date().getFullYear()} ShotMock</p>
                </div>
            </div>

            {/* ─── Right form panel ─── */}
            <div className="flex flex-1 flex-col items-center justify-center bg-white px-6 py-12">
                {/* Mobile logo */}
                <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="mb-8 flex items-center gap-2.5 lg:hidden"
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-black text-white">
                        A
                    </div>
                    <span className="text-base font-bold text-gray-900">ShotMock</span>
                </button>

                <div className="w-full max-w-[380px]">
                    <div className="animate-fade-up mb-8">
                        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
                            {mode === 'reset' ? 'Reset your password' : mode === 'signup' ? 'Create your account' : 'Welcome back'}
                        </h1>
                        <p className="mt-1.5 text-sm text-gray-500">
                            {mode === 'reset'
                                ? 'Enter your email and we\'ll send a reset link'
                                : mode === 'signup'
                                    ? 'Start creating beautiful screenshots — it\'s free'
                                    : 'Sign in to continue to ShotMock'}
                        </p>
                    </div>

                    {/* Alerts */}
                    {error && (
                        <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                            <span className="mt-0.5 flex-shrink-0">⚠</span>
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                            {success}
                        </div>
                    )}

                    {/* Google OAuth */}
                    {mode !== 'reset' && (
                        <>
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="mb-4 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Continue with Google
                            </button>

                            <div className="relative my-5 flex items-center">
                                <div className="flex-1 border-t border-gray-100" />
                                <span className="px-4 text-xs font-medium text-gray-400">or</span>
                                <div className="flex-1 border-t border-gray-100" />
                            </div>
                        </>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {mode === 'signup' && (
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-gray-600">Full Name</label>
                                <div className="relative">
                                    <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="John Doe"
                                        autoComplete="name"
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-blue-400 focus:bg-white focus:ring-3 focus:ring-blue-500/15"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-gray-600">Email</label>
                            <div className="relative">
                                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-blue-400 focus:bg-white focus:ring-3 focus:ring-blue-500/15"
                                    required
                                />
                            </div>
                        </div>

                        {mode !== 'reset' && (
                            <div>
                                <div className="mb-1.5 flex items-center justify-between">
                                    <label className="text-xs font-semibold text-gray-600">Password</label>
                                    {mode === 'login' && (
                                        <button type="button" onClick={() => switchMode('reset')} className="text-xs font-medium text-blue-600 hover:text-blue-700">
                                            Forgot password?
                                        </button>
                                    )}
                                </div>
                                <div className="relative">
                                    <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-12 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-blue-400 focus:bg-white focus:ring-3 focus:ring-blue-500/15"
                                        required
                                        minLength={6}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-500 hover:to-indigo-500 hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        >
                            {loading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <>
                                    {mode === 'reset' ? 'Send Reset Link' : mode === 'signup' ? 'Create Account' : 'Sign In'}
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Toggle */}
                    <p className="mt-6 text-center text-sm text-gray-500">
                        {mode === 'reset' ? (
                            <button type="button" onClick={() => switchMode('login')} className="font-semibold text-blue-600 hover:text-blue-700">
                                ← Back to sign in
                            </button>
                        ) : mode === 'signup' ? (
                            <>Already have an account?{' '}
                                <button type="button" onClick={() => switchMode('login')} className="font-semibold text-blue-600 hover:text-blue-700">
                                    Sign in
                                </button>
                            </>
                        ) : (
                            <>Don't have an account?{' '}
                                <button type="button" onClick={() => switchMode('signup')} className="font-semibold text-blue-600 hover:text-blue-700">
                                    Sign up free
                                </button>
                            </>
                        )}
                    </p>

                    <p className="mt-8 text-center text-[11px] text-gray-400">
                        By continuing, you agree to our{' '}
                        <a href="#" className="underline hover:text-gray-600">Terms</a>{' '}and{' '}
                        <a href="#" className="underline hover:text-gray-600">Privacy Policy</a>.
                    </p>
                </div>
            </div>
        </div>
    )
}
