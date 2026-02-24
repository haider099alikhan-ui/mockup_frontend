import React, { useState, useEffect } from 'react'
import { api } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../components/Toast'
import HostedDocsLayout from '../components/dashboard/HostedDocsLayout'
import { Save, Info, ExternalLink, Check, Copy, Loader2 } from 'lucide-react'

function getBackendUrl() {
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL
   
    return 'https://mockupcreator-api.haider099alikhan-ui.workers.dev'
}

function getPublicUrl() {
    const envUrl = import.meta.env.VITE_API_URL
    if (envUrl && !envUrl.includes('localhost')) return envUrl
    return 'https://mockupcreator-api.haider099alikhan-ui.workers.dev'
}

export default function AppAdsPage() {
    const [doc, setDoc] = useState(null)
    const [content, setContent] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [copied, setCopied] = useState(false)
    const { profile } = useAuth()
    const navigate = useNavigate()
    const toast = useToast()

    useEffect(() => { fetchAppAdsDoc() }, [])

    const fetchAppAdsDoc = async () => {
        try {
            setIsLoading(true)
            const res = await api.documents.list()
            const existing = res.documents?.find(d => d.type === 'app_ads')
            if (existing) { setDoc(existing); setContent(existing.content || '') }
        } catch (err) {
            toast('Failed to load app-ads.txt.', 'error')
        } finally {
            setIsLoading(false)
        }
    }

    const handleSave = async () => {
        try {
            setIsSaving(true)
            if (doc?.id) {
                await api.documents.update(doc.id, { content, is_public: true })
                toast('app-ads.txt updated successfully!', 'success')
            } else {
                const res = await api.documents.create({ title: 'app-ads.txt', type: 'app_ads', content, is_public: true })
                setDoc(res.document)
                toast('app-ads.txt created successfully!', 'success')
            }
        } catch (err) {
            toast('Failed to save document.', 'error')
        } finally {
            setIsSaving(false)
        }
    }

    const handleCopyLink = () => {
        if (!doc?.id || !publicUrl) return
        navigator.clipboard.writeText(publicUrl)
        setCopied(true)
        toast('Link copied to clipboard!', 'success')
        setTimeout(() => setCopied(false), 2000)
    }

    const publicUrl = (doc?.id && profile?.id) ? `${getPublicUrl()}/u/${profile.id}/ads.txt` : null

    return (
        <HostedDocsLayout title="app-ads.txt" subtitle="Manage your App Store ad monetization verifier file.">
            <div className="max-w-4xl mx-auto py-2">

                {/* Actions bar */}
                <div className="flex items-center justify-between mb-8">
                    <p className="text-gray-500 text-[13px] max-w-xl leading-relaxed">
                        Authorize digital sellers to trade your ad inventory transparently. Keep this up-to-date with your ad networks.
                    </p>
                    <div className="flex items-center gap-2.5">
                        {doc?.id && (
                            <button
                                onClick={handleCopyLink}
                                className="flex items-center gap-2 text-[13px] font-semibold text-gray-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] px-4 py-2 rounded-xl transition-all"
                            >
                                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied ? 'Copied Link' : 'Copy Link'}
                            </button>
                        )}
                        <button
                            onClick={handleSave}
                            disabled={isSaving || isLoading}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-[13px] font-bold px-5 py-2 rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 active:scale-[0.97]"
                        >
                            {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                            Publish File
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-8 h-8 border-[3px] border-gray-700 border-t-blue-500 rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="space-y-6">

                        {/* Public link */}
                        {doc?.id && (
                            <div className="rounded-2xl p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between ring-1 ring-blue-500/15"
                                style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.06) 0%, rgba(99,102,241,0.04) 100%)' }}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-blue-500/10 ring-1 ring-blue-500/20 mt-0.5">
                                        <Info className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-blue-300 font-bold text-[14px] mb-1">
                                            Your Developer Domain URL
                                        </h3>
                                        <p className="text-[12px] text-blue-200/50 leading-relaxed max-w-lg">
                                            Copy this URL and set it as the "Developer Website" in your Google Play Store or App Store listing.
                                        </p>
                                    </div>
                                </div>
                                <a
                                    href={publicUrl || '#'}
                                    target={publicUrl ? '_blank' : '_self'}
                                    rel="noreferrer"
                                    className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-white px-4 py-2 rounded-xl text-[12px] font-semibold transition-all whitespace-nowrap"
                                >
                                    <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                                    View Live File
                                </a>
                            </div>
                        )}

                        {/* Editor */}
                        <div className="rounded-2xl border border-white/[0.06] overflow-hidden shadow-2xl shadow-black/30 focus-within:border-blue-500/30 transition-colors"
                            style={{ background: 'linear-gradient(180deg, #111118 0%, #0e0e14 100%)' }}
                        >
                            <div className="bg-white/[0.02] border-b border-white/[0.05] px-5 py-3 text-[10px] font-bold tracking-[0.15em] uppercase text-gray-500 flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
                                Raw Text Content
                            </div>
                            <div className="relative">
                                <textarea
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                    placeholder={"google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0\nPaste your AdMob / AppLovin / Unity lines here..."}
                                    className="w-full h-[500px] border-none p-6 text-gray-300 bg-transparent font-mono text-[13px] leading-relaxed focus:outline-none resize-none placeholder:text-gray-700"
                                    spellCheck="false"
                                />
                                <div className="absolute right-4 bottom-4 text-[10px] font-bold text-gray-600 bg-[#0c0c10] px-3 py-1.5 rounded-lg border border-white/[0.06] pointer-events-none">
                                    {content.split('\n').filter(l => l.trim()).length} lines active
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </HostedDocsLayout>
    )
}
