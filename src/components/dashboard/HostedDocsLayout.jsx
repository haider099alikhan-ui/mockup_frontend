import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
    FileText,
    Smartphone,
    ArrowLeft,
    Shield,
    ChevronRight,
    Sparkles
} from 'lucide-react'

const SIDEBAR_SECTIONS = [
    {
        title: 'Documents & Legal',
        items: [
            { label: 'Privacy & Terms', path: '/policies', icon: Shield },
            { label: 'app-ads.txt', path: '/app-ads', icon: FileText },
        ]
    },
    {
        title: 'App Store Assets',
        items: [
            { label: 'Screenshot Maker', path: '/', icon: Smartphone },
        ]
    },
]

export default function HostedDocsLayout({ children, title, subtitle }) {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <div className="flex h-screen w-full bg-[#0c0c10] text-gray-100 font-sans overflow-hidden">
            {/* ─── Sidebar ─── */}
            <aside className="w-64 flex-shrink-0 flex flex-col h-full overflow-y-auto border-r border-white/[0.06]"
                style={{ background: 'linear-gradient(180deg, #111118 0%, #0c0c10 100%)' }}
            >
                {/* Logo */}
                <div className="p-5 pb-4">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2.5 group transition-opacity hover:opacity-80"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-black text-white shadow-lg shadow-blue-500/25">
                            S
                        </div>
                        <span className="text-[15px] font-bold tracking-tight text-white">
                            ShotMock
                        </span>
                    </button>
                </div>

                {/* Badge */}
                <div className="mx-4 mb-5 flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500/[0.08] to-violet-500/[0.08] px-3.5 py-2.5 ring-1 ring-indigo-500/15">
                    <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                    <span className="text-[11px] font-semibold text-indigo-300">Developer Dashboard</span>
                </div>

                <div className="px-3 flex-1 space-y-7">
                    {SIDEBAR_SECTIONS.map((section, idx) => (
                        <div key={idx}>
                            <h3 className="px-3 mb-2.5 text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase">
                                {section.title}
                            </h3>
                            <ul className="space-y-0.5">
                                {section.items.map((item) => {
                                    const isActive = item.path === '/policies'
                                        ? location.pathname.startsWith('/policies')
                                        : item.path === '/app-ads'
                                            ? location.pathname.startsWith('/app-ads')
                                            : location.pathname === item.path

                                    const Icon = item.icon

                                    return (
                                        <li key={item.label}>
                                            <button
                                                onClick={() => navigate(item.path)}
                                                className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${isActive
                                                    ? 'bg-blue-500/[0.12] text-blue-300 shadow-sm shadow-blue-500/10'
                                                    : 'text-gray-400 hover:bg-white/[0.04] hover:text-gray-200'
                                                    }`}
                                            >
                                                <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg transition-colors ${isActive ? 'bg-blue-500/15' : 'bg-white/[0.04] group-hover:bg-white/[0.06]'}`}>
                                                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-gray-500'}`} />
                                                </div>
                                                <span className="flex-1 text-left">{item.label}</span>
                                                <ChevronRight className={`w-3 h-3 transition-all ${isActive ? 'text-blue-500 opacity-100' : 'text-gray-600 opacity-0 group-hover:opacity-100'}`} />
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="p-3 border-t border-white/[0.05]">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-gray-500 hover:bg-white/[0.04] hover:text-gray-300 transition-all"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back to Editor
                    </button>
                </div>
            </aside>

            {/* ─── Main Content ─── */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#0c0c10]">
                {/* Header */}
                {(title || subtitle) && (
                    <header className="h-[72px] bg-[#0c0c10]/80 backdrop-blur-xl border-b border-white/[0.05] flex items-center px-8 flex-shrink-0 z-10">
                        <div>
                            <h1 className="text-lg font-bold tracking-tight text-white">{title}</h1>
                            {subtitle && <p className="text-[13px] text-gray-500 mt-0.5">{subtitle}</p>}
                        </div>
                    </header>
                )}

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
