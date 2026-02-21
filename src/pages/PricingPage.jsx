import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Check, X, ChevronDown, ChevronUp, Crown, Zap, Shield, Palette, Download, Users, Headphones, ArrowLeft } from 'lucide-react'

const PLANS = {
    monthly: { price: 29, period: 'month', label: 'Monthly' },
    annual: { price: 15, period: 'month', label: 'Annually', savings: 'Save 48%', billed: '$180/year' },
}

const FREE_FEATURES = [
    { icon: Download, text: '5 exports per month' },
    { icon: Palette, text: '3 projects' },
    { icon: Shield, text: 'All templates' },
    { icon: Users, text: 'Cloud save' },
]

const PRO_FEATURES = [
    { icon: Download, text: 'Unlimited exports' },
    { icon: Palette, text: 'Unlimited projects' },
    { icon: Shield, text: 'All templates' },
    { icon: Users, text: 'Cloud save' },
    { icon: Zap, text: 'Priority support' },
    { icon: Crown, text: 'Early access to new features' },
]

const COMPARISON = [
    { feature: 'Projects', free: '3', pro: 'Unlimited' },
    { feature: 'Exports per month', free: '5', pro: 'Unlimited' },
    { feature: 'Templates', free: 'All', pro: 'All' },
    { feature: 'Cloud save', free: true, pro: true },
    { feature: 'Screenshot upload', free: true, pro: true },
    { feature: 'Custom backgrounds', free: true, pro: true },
    { feature: 'Priority support', free: false, pro: true },
    { feature: 'Early access features', free: false, pro: true },
    { feature: 'Commercial license', free: false, pro: true },
]

const FAQ = [
    {
        q: 'Can I use the free plan forever?',
        a: 'Yes! The free plan has no time limit. You can create up to 3 projects and export 5 times per month for free, forever.',
    },
    {
        q: 'Can I cancel my Pro subscription?',
        a: 'Absolutely. You can cancel anytime from your account settings. Your Pro features will remain active until the end of your billing period.',
    },
    {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, Mastercard, Amex) and debit cards through Stripe, our secure payment processor.',
    },
    {
        q: 'Do I need an account to use the app?',
        a: 'An account is needed to save your projects to the cloud and export. Sign up is free and takes 10 seconds.',
    },
]

export default function PricingPage() {
    const navigate = useNavigate()
    const { isAuthenticated, isPro } = useAuth()
    const [billing, setBilling] = useState('annual')
    const [openFaq, setOpenFaq] = useState(null)

    const plan = PLANS[billing]

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {/* Header */}
            <header className="flex items-center justify-between border-b border-gray-800 px-6 py-3">
                <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2.5"
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500 text-sm font-bold text-white">A</div>
                    <span className="text-[15px] font-bold text-white">AppLaunchpad</span>
                </button>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </button>
            </header>

            <main className="mx-auto max-w-5xl px-6 py-16">
                {/* Title */}
                <div className="mb-12 text-center">
                    <h1 className="mb-3 text-4xl font-extrabold tracking-tight md:text-5xl">
                        Simple, transparent{' '}
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">pricing</span>
                    </h1>
                    <p className="text-lg text-gray-400">
                        Start free. Upgrade when you need more power.
                    </p>
                </div>

                {/* Billing toggle */}
                <div className="mb-10 flex items-center justify-center gap-3">
                    <button
                        type="button"
                        onClick={() => setBilling('monthly')}
                        className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${billing === 'monthly' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-gray-300'}`}
                    >
                        Monthly
                    </button>
                    <button
                        type="button"
                        onClick={() => setBilling('annual')}
                        className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all ${billing === 'annual' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-gray-300'}`}
                    >
                        Annually
                        <span className="rounded-full bg-green-500/20 px-2.5 py-0.5 text-xs font-bold text-green-400">
                            Save 48%
                        </span>
                    </button>
                </div>

                {/* Plan cards */}
                <div className="mb-20 grid gap-6 md:grid-cols-2">
                    {/* Free */}
                    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8">
                        <div className="mb-6">
                            <h2 className="mb-1 text-xl font-bold text-white">Free</h2>
                            <p className="text-sm text-gray-400">To get started</p>
                        </div>
                        <div className="mb-6">
                            <span className="text-4xl font-extrabold text-white">$0</span>
                            <span className="text-gray-400"> / month</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => navigate(isAuthenticated ? '/' : '/auth?mode=signup')}
                            className="mb-8 w-full rounded-xl border border-gray-700 bg-gray-800 py-3 text-sm font-semibold text-white transition-all hover:bg-gray-700 active:scale-[0.98]"
                        >
                            {isAuthenticated ? 'Current Plan' : 'Get Started Free'}
                        </button>
                        <ul className="space-y-3">
                            {FREE_FEATURES.map((f) => (
                                <li key={f.text} className="flex items-center gap-3 text-sm text-gray-300">
                                    <f.icon className="h-4 w-4 text-gray-500" />
                                    {f.text}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Pro */}
                    <div className="relative rounded-2xl border border-blue-500/30 bg-gradient-to-b from-blue-500/5 to-purple-500/5 p-8">
                        <div className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1 text-xs font-bold text-white shadow-lg">
                            MOST POPULAR
                        </div>
                        <div className="mb-6">
                            <h2 className="mb-1 text-xl font-bold text-white">Pro</h2>
                            <p className="text-sm text-gray-400">For professionals</p>
                        </div>
                        <div className="mb-1 flex items-baseline gap-1">
                            <span className="text-4xl font-extrabold text-white">${plan.price}</span>
                            <span className="text-gray-400"> / {plan.period}</span>
                        </div>
                        {billing === 'annual' && (
                            <p className="mb-6 text-xs text-gray-500">Billed at {plan.billed}</p>
                        )}
                        {billing === 'monthly' && <div className="mb-6" />}
                        <button
                            type="button"
                            onClick={() => {
                                if (!isAuthenticated) navigate('/auth?mode=signup')
                                // TODO: Stripe checkout
                            }}
                            disabled={isPro}
                            className="mb-8 w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:from-blue-500 hover:to-purple-500 active:scale-[0.98] disabled:opacity-50"
                        >
                            {isPro ? 'Current Plan' : 'Upgrade to Pro'}
                        </button>
                        <ul className="space-y-3">
                            {PRO_FEATURES.map((f) => (
                                <li key={f.text} className="flex items-center gap-3 text-sm text-white">
                                    <f.icon className="h-4 w-4 text-blue-400" />
                                    {f.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Feature comparison */}
                <div className="mb-20">
                    <h2 className="mb-8 text-center text-2xl font-bold text-white">Compare plans</h2>
                    <div className="overflow-hidden rounded-xl border border-gray-800">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-800 bg-gray-900/50">
                                    <th className="px-6 py-4 text-left font-medium text-gray-400">Feature</th>
                                    <th className="px-6 py-4 text-center font-medium text-gray-400">Free</th>
                                    <th className="px-6 py-4 text-center font-medium text-blue-400">Pro</th>
                                </tr>
                            </thead>
                            <tbody>
                                {COMPARISON.map((row, i) => (
                                    <tr key={row.feature} className={i % 2 === 0 ? 'bg-gray-900/30' : ''}>
                                        <td className="px-6 py-3.5 text-gray-300">{row.feature}</td>
                                        <td className="px-6 py-3.5 text-center">
                                            {typeof row.free === 'boolean'
                                                ? row.free
                                                    ? <Check className="mx-auto h-4 w-4 text-green-400" />
                                                    : <X className="mx-auto h-4 w-4 text-gray-600" />
                                                : <span className="text-gray-300">{row.free}</span>
                                            }
                                        </td>
                                        <td className="px-6 py-3.5 text-center">
                                            {typeof row.pro === 'boolean'
                                                ? row.pro
                                                    ? <Check className="mx-auto h-4 w-4 text-blue-400" />
                                                    : <X className="mx-auto h-4 w-4 text-gray-600" />
                                                : <span className="font-medium text-white">{row.pro}</span>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* FAQ */}
                <div className="mx-auto max-w-2xl">
                    <h2 className="mb-8 text-center text-2xl font-bold text-white">Frequently asked questions</h2>
                    <div className="space-y-3">
                        {FAQ.map((item, i) => (
                            <div key={i} className="rounded-xl border border-gray-800 bg-gray-900/30">
                                <button
                                    type="button"
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium text-white"
                                >
                                    {item.q}
                                    {openFaq === i
                                        ? <ChevronUp className="h-4 w-4 text-gray-500" />
                                        : <ChevronDown className="h-4 w-4 text-gray-500" />
                                    }
                                </button>
                                {openFaq === i && (
                                    <div className="border-t border-gray-800 px-6 py-4 text-sm leading-relaxed text-gray-400">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}
