import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Check, X, ChevronDown, Crown, Zap, Shield, Palette, Download, Users, ArrowLeft, Sparkles, ArrowRight } from 'lucide-react'

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
    { q: 'Can I use the free plan forever?', a: 'Yes! The free plan has no time limit. You can create up to 3 projects and export 5 times per month for free, forever.' },
    { q: 'Can I cancel my Pro subscription?', a: 'Absolutely. You can cancel anytime from your account settings. Your Pro features will remain active until the end of your billing period.' },
    { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, Amex) and debit cards through Stripe, our secure payment processor.' },
    { q: 'Do I need an account to use the app?', a: 'An account is needed to save your projects to the cloud and export. Sign up is free and takes 10 seconds.' },
]

function FaqItem({ item, index, openFaq, setOpenFaq }) {
    const isOpen = openFaq === index
    return (
        <div className={`overflow-hidden rounded-2xl border transition-all duration-200 ${isOpen ? 'border-blue-200 bg-blue-50/50' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
            <button
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-6 py-4.5 text-left"
            >
                <span className={`text-sm font-semibold ${isOpen ? 'text-blue-700' : 'text-gray-900'}`}>{item.q}</span>
                <ChevronDown className={`h-4 w-4 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-500' : 'text-gray-400'}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="px-6 pb-5 text-sm leading-relaxed text-gray-600">{item.a}</p>
            </div>
        </div>
    )
}

export default function PricingPage() {
    const navigate = useNavigate()
    const { isAuthenticated, isPro } = useAuth()
    const [billing, setBilling] = useState('annual')
    const [openFaq, setOpenFaq] = useState(null)

    const plan = PLANS[billing]

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {/* ─── Header ─── */}
            <header className="flex items-center justify-between border-b border-gray-100 bg-white/90 px-6 py-3 backdrop-blur-xl">
                <button type="button" onClick={() => navigate('/')} className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-black text-white shadow-md shadow-blue-500/25">A</div>
                    <span className="text-[15px] font-bold text-gray-900">ShotMock</span>
                </button>
                <button type="button" onClick={() => navigate(-1)} className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900">
                    <ArrowLeft className="h-4 w-4" />Back
                </button>
            </header>

            <main className="mx-auto max-w-5xl px-6 py-20">
                {/* ─── Title ─── */}
                <div className="mb-14 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
                        <Sparkles className="h-3.5 w-3.5" />
                        Simple Pricing
                    </div>
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
                        Start free.{' '}
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Upgrade when ready.</span>
                    </h1>
                    <p className="text-lg text-gray-500">No hidden fees. Cancel anytime.</p>
                </div>

                {/* ─── Billing toggle ─── */}
                <div className="mb-12 flex justify-center">
                    <div className="inline-flex items-center rounded-full bg-gray-100 p-1 shadow-inner">
                        <button
                            type="button"
                            onClick={() => setBilling('monthly')}
                            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${billing === 'monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Monthly
                        </button>
                        <button
                            type="button"
                            onClick={() => setBilling('annual')}
                            className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${billing === 'annual' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Annually
                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Save 48%</span>
                        </button>
                    </div>
                </div>

                {/* ─── Plan cards ─── */}
                <div className="mb-24 grid gap-6 md:grid-cols-2">
                    {/* Free */}
                    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                        <div className="mb-8">
                            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-400">Free</p>
                            <h2 className="text-2xl font-extrabold text-gray-900">To get started</h2>
                        </div>
                        <div className="mb-8 flex items-baseline gap-1">
                            <span className="text-5xl font-extrabold text-gray-900">$0</span>
                            <span className="text-gray-400">/ month</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => navigate(isAuthenticated ? '/' : '/auth?mode=signup')}
                            className="mb-8 w-full rounded-xl border-2 border-gray-200 bg-gray-50 py-3 text-sm font-bold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-100 active:scale-[0.98]"
                        >
                            {isAuthenticated ? '✓ Current Plan' : 'Get Started Free'}
                        </button>
                        <ul className="space-y-3.5">
                            {FREE_FEATURES.map((f) => (
                                <li key={f.text} className="flex items-center gap-3 text-sm text-gray-600">
                                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
                                        <Check className="h-3 w-3 text-gray-500" />
                                    </div>
                                    {f.text}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Pro */}
                    <div className="relative rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-8 text-white shadow-2xl shadow-blue-500/30">
                        {/* Shine overlay */}
                        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/15 to-transparent" />
                        <div className="absolute -top-3.5 left-6 rounded-full bg-amber-400 px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-amber-900 shadow-lg">
                            ✦ Most Popular
                        </div>
                        <div className="relative">
                            <div className="mb-8">
                                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-blue-200">Pro</p>
                                <h2 className="text-2xl font-extrabold text-white">For professionals</h2>
                            </div>
                            <div className="mb-2 flex items-baseline gap-1">
                                <span className="text-5xl font-extrabold text-white">${plan.price}</span>
                                <span className="text-blue-200">/ {plan.period}</span>
                            </div>
                            {billing === 'annual' && (
                                <p className="mb-8 text-xs text-blue-200">Billed at {plan.billed}</p>
                            )}
                            {billing === 'monthly' && <div className="mb-8" />}
                            <button
                                type="button"
                                onClick={() => { if (!isAuthenticated) navigate('/auth?mode=signup') }}
                                disabled={isPro}
                                className="mb-8 w-full rounded-xl bg-white py-3 text-sm font-extrabold text-indigo-700 shadow-lg transition-all hover:bg-blue-50 active:scale-[0.98] disabled:opacity-60"
                            >
                                {isPro ? '✓ Current Plan' : 'Upgrade to Pro'}
                            </button>
                            <ul className="space-y-3.5">
                                {PRO_FEATURES.map((f) => (
                                    <li key={f.text} className="flex items-center gap-3 text-sm text-white/90">
                                        <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                                            <Check className="h-3 w-3 text-white" />
                                        </div>
                                        {f.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* ─── Feature comparison ─── */}
                <div className="mb-24">
                    <h2 className="mb-8 text-center text-2xl font-extrabold text-gray-900">Compare plans</h2>
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/70">
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">Feature</th>
                                    <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-400">Free</th>
                                    <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-indigo-600">Pro</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {COMPARISON.map((row) => (
                                    <tr key={row.feature} className="transition-colors hover:bg-gray-50/50">
                                        <td className="px-6 py-3.5 font-medium text-gray-700">{row.feature}</td>
                                        <td className="px-6 py-3.5 text-center">
                                            {typeof row.free === 'boolean'
                                                ? row.free
                                                    ? <Check className="mx-auto h-4 w-4 text-emerald-500" />
                                                    : <X className="mx-auto h-4 w-4 text-gray-300" />
                                                : <span className="font-medium text-gray-600">{row.free}</span>
                                            }
                                        </td>
                                        <td className="px-6 py-3.5 text-center">
                                            {typeof row.pro === 'boolean'
                                                ? row.pro
                                                    ? <Check className="mx-auto h-4 w-4 text-indigo-500" />
                                                    : <X className="mx-auto h-4 w-4 text-gray-300" />
                                                : <span className="font-bold text-indigo-600">{row.pro}</span>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ─── FAQ ─── */}
                <div className="mx-auto mb-24 max-w-2xl">
                    <h2 className="mb-8 text-center text-2xl font-extrabold text-gray-900">Frequently asked questions</h2>
                    <div className="flex flex-col gap-3">
                        {FAQ.map((item, i) => (
                            <FaqItem key={i} item={item} index={i} openFaq={openFaq} setOpenFaq={setOpenFaq} />
                        ))}
                    </div>
                </div>

                {/* ─── Bottom CTA ─── */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 px-8 py-14 text-center">
                    <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />
                    <div className="relative">
                        <h2 className="mb-3 text-2xl font-extrabold text-white sm:text-3xl">Ready to create stunning screenshots?</h2>
                        <p className="mb-8 text-gray-400">Join over 10,000 app developers using ShotMock.</p>
                        <button
                            type="button"
                            onClick={() => navigate(isAuthenticated ? '/' : '/auth?mode=signup')}
                            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-extrabold text-gray-900 shadow-xl shadow-white/10 transition-all hover:-translate-y-0.5 hover:shadow-2xl active:scale-95"
                        >
                            {isAuthenticated ? 'Open Editor' : 'Start for Free'}
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}
