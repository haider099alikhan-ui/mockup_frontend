import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
    FileText,
    PanelTop,
    Smartphone,
    Mail,
    LifeBuoy,
    Languages,
    CircleDollarSign,
    Globe,
    Menu,
    LogOut,
    ArrowLeft,
    Shield
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
            { label: 'Screenshots Maker', path: '/', icon: Smartphone },
        ]
    },
]

export default function HostedDocsLayout({ children, title, subtitle }) {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <div className="flex h-screen w-full bg-gray-950 text-gray-100 font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 bg-[#0a0a0a] border-r border-gray-800/60 flex flex-col h-full overflow-y-auto">
                <div className="p-6">
                    <button
                        onClick={() => navigate('/projects')}
                        className="flex items-center gap-2.5 group transition-opacity hover:opacity-80"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-rose-600 text-sm font-bold text-white shadow-sm shadow-rose-500/20 group-hover:shadow-rose-500/40">
                            A
                        </div>
                        <span className="text-[15px] font-bold tracking-tight text-white">
                            AppLaunchpad
                        </span>
                    </button>
                </div>

                <div className="px-4 py-2 flex-1 space-y-8">
                    {SIDEBAR_SECTIONS.map((section, idx) => (
                        <div key={idx}>
                            <h3 className="px-3 mb-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                {section.title}
                            </h3>
                            <ul className="space-y-1">
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
                                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                                                        ? 'bg-blue-600/10 text-blue-400'
                                                        : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                                                    }`}
                                            >
                                                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-500' : 'opacity-70'}`} />
                                                <span>{item.label}</span>
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom area */}
                <div className="p-4 border-t border-gray-800/60">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800/50 hover:text-white transition-all"
                    >
                        <ArrowLeft className="w-4 h-4 opacity-70" />
                        Back to Editor
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-[0.99]">

                {/* Header Page Title optional if needed */}
                {(title || subtitle) && (
                    <header className="h-20 bg-gray-950/50 backdrop-blur-md border-b border-gray-800/50 flex items-center justify-between px-8 flex-shrink-0 z-10">
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-white">{title}</h1>
                            {subtitle && <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>}
                        </div>
                    </header>
                )}

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
