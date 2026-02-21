import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Sparkles } from 'lucide-react'
import sampleProjects from '../data/sampleProjects'

/* ──────────────────────────────────────────────
   Accent-colour map for tech-stack badges
   ────────────────────────────────────────────── */
const ACCENT = {
    blue: { badge: 'bg-blue-100 text-blue-700 ring-blue-200', dot: 'bg-blue-500' },
    rose: { badge: 'bg-rose-100 text-rose-700 ring-rose-200', dot: 'bg-rose-500' },
    emerald: { badge: 'bg-emerald-100 text-emerald-700 ring-emerald-200', dot: 'bg-emerald-500' },
    green: { badge: 'bg-green-100 text-green-700 ring-green-200', dot: 'bg-green-500' },
    amber: { badge: 'bg-amber-100 text-amber-700 ring-amber-200', dot: 'bg-amber-500' },
    slate: { badge: 'bg-slate-200 text-slate-700 ring-slate-300', dot: 'bg-slate-500' },
}

/* ──────────────────────────────────────────────
   Scroll-triggered fade-in hook
   ────────────────────────────────────────────── */
function useReveal() {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
            { threshold: 0.15 },
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])

    return { ref, visible }
}

/* ──────────────────────────────────────────────
   Project Banner Component
   ────────────────────────────────────────────── */
function ProjectBanner({ project, index }) {
    const reversed = index % 2 !== 0
    const accent = ACCENT[project.accent] || ACCENT.blue
    const { ref, visible } = useReveal()

    return (
        <section
            ref={ref}
            className={`relative overflow-hidden bg-gradient-to-br ${project.gradient} transition-all duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
        >
            {/* Decorative blurred blob */}
            <div
                className={`pointer-events-none absolute -top-32 ${reversed ? '-left-32' : '-right-32'
                    } h-96 w-96 rounded-full bg-white/40 blur-3xl`}
            />

            <div
                className={`relative mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-16 md:min-h-[480px] md:flex-row md:gap-16 md:py-0 ${reversed ? 'md:flex-row-reverse' : ''
                    }`}
            >
                {/* ── Mockup Image (60-70% width) ── */}
                <div className="flex w-full items-center justify-center md:w-[62%]">
                    <div className="group relative">
                        <img
                            src={project.image}
                            alt={`${project.title} mockup`}
                            className="h-auto max-h-[420px] w-auto max-w-full drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                            loading="lazy"
                        />
                        {/* Subtle reflection glow */}
                        <div className="pointer-events-none absolute -bottom-8 left-1/2 h-16 w-3/4 -translate-x-1/2 rounded-full bg-black/5 blur-2xl" />
                    </div>
                </div>

                {/* ── Content (30-40% width) ── */}
                <div className="flex w-full flex-col items-start justify-center md:w-[38%]">
                    {/* Index badge */}
                    <span className={`mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest ring-1 ${accent.badge}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                        Project {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Title */}
                    <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-[2.75rem]">
                        {project.title}
                    </h2>

                    {/* Tagline */}
                    <p className="mt-2 text-lg font-medium text-gray-600 sm:text-xl">
                        {project.tagline}
                    </p>

                    {/* Description */}
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-500 sm:text-base">
                        {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="mt-6 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ring-1 ${accent.badge}`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* CTA */}
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn mt-8 inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-gray-900/20 transition-all duration-200 hover:bg-black hover:shadow-xl hover:shadow-gray-900/25 active:scale-95"
                        >
                            View Case Study
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                        </a>
                    )}
                </div>
            </div>
        </section>
    )
}

/* ──────────────────────────────────────────────
   Projects Page
   ────────────────────────────────────────────── */
function ProjectsPage() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* ─── Navbar ─── */}
            <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="flex cursor-pointer items-center gap-2.5 rounded-lg transition-opacity hover:opacity-80"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-rose-600 text-sm font-bold text-white shadow-sm">
                            A
                        </div>
                        <span className="text-[15px] font-bold tracking-tight text-gray-900">
                            AppLaunchpad
                        </span>
                    </button>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => navigate('/policies')}
                            className="hidden text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 sm:block"
                        >
                            Policies
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/app-ads')}
                            className="hidden text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 sm:block"
                        >
                            App-Ads.txt
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/pricing')}
                            className="hidden text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 sm:block"
                        >
                            Pricing
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-1.5 text-sm font-medium text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-50 active:scale-95"
                        >
                            <ArrowLeft className="h-3.5 w-3.5" />
                            Home
                        </button>
                    </div>
                </div>
            </header>

            {/* ─── Hero ─── */}
            <section className="relative overflow-hidden bg-white pb-6 pt-20 text-center md:pt-28">
                {/* Background flair */}
                <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-100/60 via-purple-100/40 to-pink-100/30 blur-3xl" />

                <div className="relative mx-auto max-w-3xl px-6">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 ring-1 ring-blue-100">
                        <Sparkles className="h-3.5 w-3.5" />
                        Our Work
                    </div>
                    <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
                        Projects we&apos;re{' '}
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                            proud of
                        </span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-gray-500 sm:text-lg">
                        Premium apps built with obsessive attention to detail —
                        each one a showcase of modern design and engineering craft.
                    </p>
                </div>
            </section>

            {/* ─── Project Banners ─── */}
            <main>
                {sampleProjects.map((project, i) => (
                    <ProjectBanner key={project.id} project={project} index={i} />
                ))}
            </main>

            {/* ─── CTA Section ─── */}
            <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24 text-center">
                <div className="mx-auto max-w-2xl px-6">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        Ready to build something{' '}
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            extraordinary
                        </span>
                        ?
                    </h2>
                    <p className="mx-auto mt-4 max-w-md text-base text-gray-400">
                        Start creating stunning app store screenshots and mockups today — no design skills required.
                    </p>
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-gray-900 shadow-xl shadow-white/10 transition-all duration-200 hover:shadow-2xl hover:shadow-white/20 active:scale-95"
                    >
                        Get Started Free
                        <ArrowUpRight className="h-4 w-4" />
                    </button>
                </div>
            </section>

            {/* ─── Footer ─── */}
            <footer className="border-t border-gray-100 bg-gray-50/50">
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-rose-600 text-xs font-bold text-white">
                            A
                        </div>
                        <span className="text-sm font-bold text-gray-900">
                            AppLaunchpad
                        </span>
                    </div>
                    <div className="flex items-center gap-6 text-xs text-gray-400">
                        <button type="button" onClick={() => navigate('/pricing')} className="transition-colors hover:text-gray-700">
                            Pricing
                        </button>
                        <span>·</span>
                        <button type="button" onClick={() => navigate('/projects')} className="transition-colors hover:text-gray-700">
                            Projects
                        </button>
                        <span>·</span>
                        <span>© {new Date().getFullYear()} AppLaunchpad</span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default ProjectsPage
