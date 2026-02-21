import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react'

export default function AuthPage() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const { signIn, signUp, signInWithGoogle, resetPassword, isAuthenticated } = useAuth()

    const [mode, setMode] = useState(searchParams.get('mode') || 'login') // login | signup | reset
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // Redirect if already logged in
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
                if (data?.session) {
                    navigate('/')
                } else {
                    setSuccess('Account created! You can now log in.')
                }
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

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
            {/* Background gradient blobs */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
                <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Logo */}
                <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="mx-auto mb-8 flex items-center justify-center gap-2.5"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500 text-sm font-bold text-white shadow-lg">
                        A
                    </div>
                    <span className="text-lg font-bold text-white">AppLaunchpad</span>
                </button>

                {/* Card */}
                <div className="animate-fade-up rounded-2xl border border-gray-800 bg-gray-900/80 p-8 shadow-2xl backdrop-blur-sm">
                    <h1 className="mb-1 text-center text-2xl font-bold text-white">
                        {mode === 'reset' ? 'Reset Password' : mode === 'signup' ? 'Create Account' : 'Welcome Back'}
                    </h1>
                    <p className="mb-6 text-center text-sm text-gray-400">
                        {mode === 'reset'
                            ? 'Enter your email to receive a reset link'
                            : mode === 'signup'
                                ? 'Start creating beautiful mockups for free'
                                : 'Sign in to your account'}
                    </p>

                    {/* Error / Success messages */}
                    {error && (
                        <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-4 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                            {success}
                        </div>
                    )}

                    {/* Google OAuth */}
                    {mode !== 'reset' && (
                        <>
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="mb-4 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 text-sm font-medium text-white transition-all hover:border-gray-600 hover:bg-gray-800 active:scale-[0.98]"
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
                                <div className="flex-1 border-t border-gray-700" />
                                <span className="px-4 text-xs text-gray-500">or</span>
                                <div className="flex-1 border-t border-gray-700" />
                            </div>
                        </>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {mode === 'signup' && (
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-gray-400">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="John Doe"
                                        autoComplete="name"
                                        className="w-full rounded-xl border border-gray-700 bg-gray-800/50 py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-gray-400">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    className="w-full rounded-xl border border-gray-700 bg-gray-800/50 py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
                                    required
                                />
                            </div>
                        </div>

                        {mode !== 'reset' && (
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-gray-400">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                                        className="w-full rounded-xl border border-gray-700 bg-gray-800/50 py-3 pl-10 pr-12 text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
                                        required
                                        minLength={6}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>
                        )}

                        {mode === 'login' && (
                            <div className="text-right">
                                <button
                                    type="button"
                                    onClick={() => { setMode('reset'); setError(''); setSuccess('') }}
                                    className="text-xs text-blue-400 hover:text-blue-300"
                                >
                                    Forgot password?
                                </button>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500 active:scale-[0.98] disabled:opacity-50"
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

                    {/* Toggle login/signup */}
                    <p className="mt-6 text-center text-sm text-gray-400">
                        {mode === 'reset' ? (
                            <button
                                type="button"
                                onClick={() => { setMode('login'); setError(''); setSuccess('') }}
                                className="text-blue-400 hover:text-blue-300"
                            >
                                Back to sign in
                            </button>
                        ) : mode === 'signup' ? (
                            <>
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => { setMode('login'); setError(''); setSuccess('') }}
                                    className="font-medium text-blue-400 hover:text-blue-300"
                                >
                                    Sign in
                                </button>
                            </>
                        ) : (
                            <>
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => { setMode('signup'); setError(''); setSuccess('') }}
                                    className="font-medium text-blue-400 hover:text-blue-300"
                                >
                                    Sign up free
                                </button>
                            </>
                        )}
                    </p>
                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-xs text-gray-600">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    )
}
