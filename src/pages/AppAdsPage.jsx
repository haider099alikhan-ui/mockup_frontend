import React, { useState, useEffect } from 'react'
import { api } from '../services/api'
import { ArrowLeft, Save, Copy, ExternalLink, Check, Info, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../components/Toast'
import HostedDocsLayout from '../components/dashboard/HostedDocsLayout'

function getBackendUrl() {
    return import.meta.env.VITE_API_URL || 'http://localhost:8787'
}

export default function AppAdsPage() {
    const [doc, setDoc] = useState(null)
    const [content, setContent] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [copied, setCopied] = useState(false)
    const navigate = useNavigate()
    const toast = useToast()

    useEffect(() => {
        fetchAppAdsDoc()
    }, [])

    const fetchAppAdsDoc = async () => {
        try {
            setIsLoading(true)
            const res = await api.documents.list()
            const existing = res.documents?.find(d => d.type === 'app_ads')

            if (existing) {
                setDoc(existing)
                setContent(existing.content || '')
            }
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
                const res = await api.documents.create({
                    title: 'app-ads.txt',
                    type: 'app_ads',
                    content: content,
                    is_public: true
                })
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
        if (!doc?.id) return
        const publicUrl = `${getBackendUrl()}/p/${doc.id}`
        navigator.clipboard.writeText(publicUrl)
        setCopied(true)
        toast('Link copied to clipboard!', 'success')
        setTimeout(() => setCopied(false), 2000)
    }

    const publicUrl = doc?.id ? `${getBackendUrl()}/p/${doc.id}` : null

    return (
        <HostedDocsLayout title="app-ads.txt" subtitle="Manage your App Store ad monetization verifier file.">
            <div className="max-w-4xl mx-auto py-4">

                {/* Header flex (Right aligned Actions since left aligns with title from Layout) */}
                <div className="flex items-center justify-between mb-8">
                    <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
                        Authorize digital sellers to trade your ad inventory transparently. Keep this up-to-date with your ad networks.
                    </p>
                    <div className="flex items-center gap-3">
                        {doc?.id && (
                            <button
                                onClick={handleCopyLink}
                                className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white bg-[#111] hover:bg-gray-800 border border-gray-800 px-5 py-2.5 rounded-lg transition-colors"
                            >
                                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                {copied ? 'Copied Link' : 'Copy Link'}
                            </button>
                        )}
                        <button
                            onClick={handleSave}
                            disabled={isSaving || isLoading}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50"
                        >
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Publish File
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="space-y-6">

                        {/* Public Link Section */}
                        {doc?.id && (
                            <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between shadow-xl shadow-blue-900/5">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-blue-500/10 rounded-lg shrink-0 mt-0.5">
                                        <Info className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-blue-300 font-semibold text-[15px] mb-1">
                                            Your Developer Domain URL
                                        </h3>
                                        <p className="text-sm text-blue-200/60 leading-relaxed max-w-lg">
                                            Copy this URL and set it as the "Developer Website" in your Google Play Store or App Store listing. Ad networks will crawl it automatically.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3 w-full sm:w-auto shrink-0 pl-16 sm:pl-0">
                                    <a
                                        href={publicUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ring-1 ring-inset ring-gray-600/50"
                                    >
                                        <ExternalLink className="w-4 h-4 text-gray-400" />
                                        View Live File
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Editor */}
                        <div className="bg-[#111111] rounded-xl border border-gray-800 overflow-hidden shadow-xl shadow-black/20 focus-within:border-blue-500/50 transition-colors">
                            <div className="bg-gray-900/50 border-b border-gray-800 px-5 py-3 text-xs font-semibold tracking-wider uppercase text-gray-500 flex items-center justify-between">
                                <span>Raw Text Content</span>
                            </div>
                            <div className="p-0 relative">
                                <textarea
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                    placeholder="google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0&#10;Paste your AdMob / AppLovin / Unity lines here..."
                                    className="w-full h-[500px] border-none p-6 text-gray-300 bg-transparent font-mono text-[14px] leading-relaxed focus:outline-none focus:ring-0 resize-none placeholder:text-gray-700"
                                    spellCheck="false"
                                />
                                <div className="absolute right-4 bottom-4 text-xs font-medium text-gray-600 bg-gray-950 px-3 py-1.5 rounded-md border border-gray-800 pointer-events-none">
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
