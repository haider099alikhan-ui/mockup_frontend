import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { api } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { Plus, Trash2, ExternalLink, Save, ArrowLeft, Copy, Check, Info, FileText, Settings2, Globe, Clock, ShieldCheck, Loader2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../components/Toast'
import HostedDocsLayout from '../components/dashboard/HostedDocsLayout'

function getBackendUrl() {
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL
    if (import.meta.env.DEV) return 'http://localhost:8787'
    return 'https://mockupcreator-api.haider099alikhan-ui.workers.dev'
}

// Always use production URL for public-facing links (not localhost)
function getPublicUrl() {
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL
    return 'https://mockupcreator-api.haider099alikhan-ui.workers.dev'
}

export default function PoliciesPage() {
    const [documents, setDocuments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [editingDoc, setEditingDoc] = useState(null)
    const [showNewModal, setShowNewModal] = useState(false)
    const { profile } = useAuth()
    const [isSaving, setIsSaving] = useState(false)

    const [newDocForm, setNewDocForm] = useState({
        title: '', type: 'privacy_policy', language: 'en', content: '', is_public: true
    })

    const toast = useToast()

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link'],
            ['clean']
        ]
    }

    useEffect(() => { fetchDocuments() }, [])

    const fetchDocuments = async () => {
        try {
            setIsLoading(true)
            const res = await api.documents.list()
            setDocuments(res.documents || [])
        } catch (err) {
            toast('Failed to load documents.', 'error')
        } finally {
            setIsLoading(false)
        }
    }

    const handleCreateSubmit = async (e) => {
        e.preventDefault()
        if (!newDocForm.title.trim()) return
        try {
            setIsSaving(true)
            const created = await api.documents.create(newDocForm)
            toast('Document created.', 'success')
            setShowNewModal(false)
            fetchDocuments()
            setEditingDoc(created)
            setNewDocForm({ title: '', type: 'privacy_policy', language: 'en', content: '', is_public: true })
        } catch (err) {
            toast('Failed to create document.', 'error')
        } finally {
            setIsSaving(false)
        }
    }

    const handleSaveEdit = async () => {
        if (!editingDoc) return
        try {
            setIsSaving(true)
            await api.documents.update(editingDoc.id, editingDoc)
            toast('Document published successfully.', 'success')
            fetchDocuments()
        } catch (err) {
            toast('Failed to save document.', 'error')
        } finally {
            setIsSaving(false)
        }
    }

    const handleDelete = async (id, e) => {
        if (e) e.stopPropagation()
        if (!confirm('Are you sure you want to delete this document? This cannot be undone.')) return
        try {
            await api.documents.delete(id)
            toast('Document deleted.', 'success')
            if (editingDoc?.id === id) setEditingDoc(null)
            fetchDocuments()
        } catch (err) {
            toast('Failed to delete document.', 'error')
        }
    }

    const copyLink = (docType) => {
        if (!profile?.id) return
        const docMap = { privacy_policy: 'privacy-policy', terms: 'terms', dmca: 'dmca', other: 'legal' }
        navigator.clipboard.writeText(`${getPublicUrl()}/u/${profile.id}/${docMap[docType] || 'doc'}`)
        toast('Link copied to clipboard', 'success')
    }

    const handleViewProfile = () => {
        if (!profile?.id) return
        window.open(`${getPublicUrl()}/u/${profile.id}`, '_blank')
    }

    const DocumentCard = ({ doc }) => {
        const [copied, setCopied] = useState(false)
        const docMap = { privacy_policy: 'privacy-policy', terms: 'terms', dmca: 'dmca', other: 'legal' }
        const publicUrl = profile?.id ? `${getPublicUrl()}/u/${profile.id}/${docMap[doc.type] || 'doc'}` : null

        const handleCopy = (e) => {
            e.stopPropagation()
            if (!publicUrl) return
            navigator.clipboard.writeText(publicUrl)
            setCopied(true)
            toast('Link copied to clipboard!', 'success')
            setTimeout(() => setCopied(false), 2000)
        }

        const typeLabels = { privacy_policy: "Privacy Policy", terms: "Terms of Service", dmca: "DMCA", other: "Other" }
        const typeColors = {
            privacy_policy: 'from-blue-500/15 to-blue-600/10 ring-blue-500/20 text-blue-400',
            terms: 'from-violet-500/15 to-violet-600/10 ring-violet-500/20 text-violet-400',
            dmca: 'from-amber-500/15 to-amber-600/10 ring-amber-500/20 text-amber-400',
            other: 'from-gray-500/15 to-gray-600/10 ring-gray-500/20 text-gray-400',
        }

        return (
            <div
                onClick={() => setEditingDoc(doc)}
                className="group flex flex-col justify-between rounded-2xl border border-white/[0.06] p-6 cursor-pointer hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-200 relative overflow-hidden"
                style={{ background: 'linear-gradient(180deg, #131318 0%, #0f0f14 100%)' }}
            >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-600 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${typeColors[doc.type] || typeColors.other} ring-1 flex items-center justify-center`}>
                                <FileText className="w-4 h-4" />
                            </div>
                            <h3 className="font-bold text-gray-100 max-w-[150px] sm:max-w-[200px] truncate text-[14px]" title={doc.title}>
                                {doc.title}
                            </h3>
                        </div>
                        <button
                            onClick={(e) => handleDelete(doc.id, e)}
                            className="text-gray-600 hover:text-red-400 p-2 opacity-0 group-hover:opacity-100 transition-all rounded-lg hover:bg-red-500/10"
                            title="Delete Document"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2 text-[11px] mb-5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.04] ring-1 ring-white/[0.06] text-gray-400 rounded-lg font-medium">
                            <ShieldCheck className="w-3 h-3" />
                            {typeLabels[doc.type] || doc.type}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.04] ring-1 ring-white/[0.06] text-gray-400 rounded-lg font-medium">
                            <Globe className="w-3 h-3" />
                            {doc.language === 'en' ? 'English' : doc.language || 'English'}
                        </span>
                    </div>
                </div>

                {doc.is_public && (
                    <div className="mt-2 flex gap-2 pt-4 border-t border-white/[0.04]">
                        <a
                            href={publicUrl || '#'}
                            target={publicUrl ? '_blank' : '_self'}
                            rel="noreferrer"
                            onClick={(e) => { e.stopPropagation(); handleViewProfile(e) }}
                            className="flex items-center justify-center gap-1.5 text-[11px] text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/[0.08] hover:bg-blue-500/15 px-4 py-2 rounded-xl flex-1 font-semibold ring-1 ring-blue-500/15"
                        >
                            <ExternalLink className="w-3 h-3" />
                            View Live
                        </a>
                        <button
                            onClick={handleCopy}
                            className="flex items-center justify-center gap-1.5 text-[11px] text-gray-300 hover:text-white transition-colors bg-white/[0.04] hover:bg-white/[0.07] px-4 py-2 rounded-xl flex-1 font-semibold ring-1 ring-white/[0.06]"
                        >
                            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            {copied ? 'Copied!' : 'Copy Link'}
                        </button>
                    </div>
                )}
            </div>
        )
    }

    // ─── EDIT VIEW ──────────────────────────────────────────────
    if (editingDoc) {
        return (
            <HostedDocsLayout>
                <div className="max-w-5xl mx-auto pb-20">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/[0.05]">
                        <div>
                            <button onClick={() => setEditingDoc(null)}
                                className="flex items-center gap-2 text-[13px] text-gray-500 hover:text-gray-300 transition-colors mb-4"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" />
                                Back to Policies
                            </button>
                            <div className="flex items-center gap-4">
                                <h1 className="text-2xl font-extrabold tracking-tight text-white">{editingDoc.title}</h1>
                                {editingDoc.is_public && (
                                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                                        Published
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                            {editingDoc.is_public && (
                                <button onClick={() => copyLink(editingDoc.type)}
                                    className="flex items-center gap-2 text-[13px] font-semibold text-gray-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] px-4 py-2 rounded-xl transition-all"
                                >
                                    <Copy className="w-3.5 h-3.5" />
                                    Get Link
                                </button>
                            )}
                            <button onClick={handleSaveEdit}
                                disabled={isSaving || !(editingDoc.title || '').trim()}
                                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-[13px] font-bold px-5 py-2 rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 active:scale-[0.97]"
                            >
                                {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                                Publish Updates
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Editor */}
                        <div className="lg:col-span-3 space-y-6">
                            <div className="rounded-2xl border border-white/[0.06] overflow-hidden focus-within:border-blue-500/30 transition-colors shadow-2xl shadow-black/30"
                                style={{ background: 'linear-gradient(180deg, #111118 0%, #0e0e14 100%)' }}
                            >
                                <div className="dark-quill-editor">
                                    <ReactQuill
                                        theme="snow" value={editingDoc.content}
                                        onChange={v => setEditingDoc({ ...editingDoc, content: v })}
                                        modules={modules} placeholder="Start writing your policy here..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Settings */}
                        <div className="lg:col-span-1 space-y-5">
                            <div className="rounded-2xl border border-white/[0.06] p-5"
                                style={{ background: 'linear-gradient(180deg, #131318 0%, #0f0f14 100%)' }}
                            >
                                <h3 className="text-[13px] font-bold text-gray-200 flex items-center gap-2 mb-5">
                                    <Settings2 className="w-3.5 h-3.5 text-gray-500" />
                                    Document Details
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[11px] font-semibold text-gray-500 mb-1.5 block uppercase tracking-wider">Title</label>
                                        <input type="text" value={editingDoc.title}
                                            onChange={e => setEditingDoc({ ...editingDoc, title: e.target.value })}
                                            className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2.5 text-[13px] text-gray-200 focus:outline-none focus:border-blue-500/50 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-semibold text-gray-500 mb-1.5 block uppercase tracking-wider">Type</label>
                                        <select value={editingDoc.type}
                                            onChange={e => setEditingDoc({ ...editingDoc, type: e.target.value })}
                                            className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2.5 text-[13px] text-gray-200 focus:outline-none focus:border-blue-500/50 transition-colors appearance-none cursor-pointer"
                                        >
                                            <option value="privacy_policy">Privacy Policy</option>
                                            <option value="terms">Terms of Service</option>
                                            <option value="dmca">DMCA Policy</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-semibold text-gray-500 mb-1.5 block uppercase tracking-wider">Language</label>
                                        <select value={editingDoc.language || 'en'}
                                            onChange={e => setEditingDoc({ ...editingDoc, language: e.target.value })}
                                            className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2.5 text-[13px] text-gray-200 focus:outline-none focus:border-blue-500/50 transition-colors appearance-none cursor-pointer"
                                        >
                                            <option value="en">English (en)</option>
                                            <option value="es">Español (es)</option>
                                            <option value="fr">Français (fr)</option>
                                            <option value="de">Deutsch (de)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-white/[0.06] p-5"
                                style={{ background: 'linear-gradient(180deg, #131318 0%, #0f0f14 100%)' }}
                            >
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="relative flex items-center mt-0.5">
                                        <input type="checkbox" checked={editingDoc.is_public}
                                            onChange={e => setEditingDoc({ ...editingDoc, is_public: e.target.checked })}
                                            className="peer sr-only"
                                        />
                                        <div className="w-10 h-5 bg-gray-800 rounded-full peer peer-checked:bg-blue-600 transition-colors" />
                                        <div className="absolute left-[2px] top-[2px] w-4 h-4 bg-gray-400 rounded-full peer-checked:translate-x-5 peer-checked:bg-white transition-all" />
                                    </div>
                                    <div>
                                        <span className="text-[13px] font-semibold text-gray-300 block mb-0.5">Public Access</span>
                                        <span className="text-[11px] text-gray-500 block">Anyone with the link can view this document.</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <style>{`
                    .dark-quill-editor .ql-toolbar.ql-snow {
                        border: none; border-bottom: 1px solid rgba(255,255,255,0.06);
                        background: rgba(255,255,255,0.02); padding: 12px 16px;
                    }
                    .dark-quill-editor .ql-toolbar.ql-snow .ql-picker-label { color: #6b7280; }
                    .dark-quill-editor .ql-toolbar.ql-snow .ql-stroke { stroke: #6b7280; }
                    .dark-quill-editor .ql-toolbar.ql-snow .ql-fill { fill: #6b7280; }
                    .dark-quill-editor .ql-toolbar.ql-snow button:hover .ql-stroke,
                    .dark-quill-editor .ql-toolbar.ql-snow button:focus .ql-stroke,
                    .dark-quill-editor .ql-toolbar.ql-snow button.ql-active .ql-stroke,
                    .dark-quill-editor .ql-toolbar.ql-snow .ql-picker-label:hover,
                    .dark-quill-editor .ql-toolbar.ql-snow .ql-picker-label.ql-active {
                        stroke: #60a5fa !important; color: #60a5fa !important;
                    }
                    .dark-quill-editor .ql-container.ql-snow {
                        border: none; color: #e5e7eb; font-family: inherit; font-size: 14px;
                        background: rgba(255,255,255,0.01);
                    }
                    .dark-quill-editor .ql-editor {
                        min-height: 500px; padding: 32px; line-height: 1.7;
                    }
                    .dark-quill-editor .ql-editor.ql-blank::before {
                        color: #374151; font-style: normal;
                    }
                `}</style>
            </HostedDocsLayout>
        )
    }

    // ─── MANAGE VIEW ────────────────────────────────────────────
    return (
        <HostedDocsLayout title="Privacy Policies & Terms" subtitle="Create and host legal documents for your app stores.">
            <div className="max-w-6xl mx-auto py-2">

                {/* Actions */}
                <div className="flex items-center justify-between mb-8 gap-4">
                    <p className="text-gray-500 text-[13px] max-w-xl leading-relaxed hidden md:block">
                        These documents are hosted securely and comply with formatting standards for App Store and Google Play submissions.
                    </p>
                    <div className="flex items-center gap-2.5 w-full md:w-auto">
                        <button onClick={handleViewProfile}
                            className="flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] text-white px-4 py-2 rounded-xl text-[13px] font-semibold transition-all whitespace-nowrap"
                        >
                            <Globe className="w-3.5 h-3.5 text-blue-400" />
                            View Profile
                        </button>
                        <button onClick={() => setShowNewModal(true)}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-2 rounded-xl text-[13px] font-bold transition-all shadow-lg shadow-blue-500/20 whitespace-nowrap active:scale-[0.97]"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            New Document
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-24">
                        <div className="w-9 h-9 border-[3px] border-gray-700 border-t-blue-500 rounded-full animate-spin" />
                    </div>
                ) : documents.length === 0 ? (
                    <div className="text-center py-24 rounded-2xl border border-white/[0.06] border-dashed"
                        style={{ background: 'linear-gradient(180deg, #131318 0%, #0f0f14 100%)' }}
                    >
                        <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-5 ring-8 ring-blue-500/5">
                            <FileText className="w-7 h-7 text-blue-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-200 mb-2">No documents yet</h3>
                        <p className="text-[13px] text-gray-500 mb-8 max-w-md mx-auto">
                            Create a hosted Privacy Policy or Terms of Service to link in your app store submission quickly and securely.
                        </p>
                        <button onClick={() => setShowNewModal(true)}
                            className="inline-flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all ring-1 ring-white/[0.08]"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            Create your first document
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {documents.map(doc => <DocumentCard key={doc.id} doc={doc} />)}
                    </div>
                )}
            </div>

            {/* ─── NEW DOCUMENT MODAL ─── */}
            {showNewModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="w-full max-w-[480px] overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl"
                        style={{ background: 'linear-gradient(180deg, #16161c 0%, #111118 100%)' }}
                    >
                        <div className="px-6 py-5 border-b border-white/[0.05]">
                            <h3 className="text-lg font-extrabold text-white tracking-tight">Create Document</h3>
                            <p className="text-[13px] text-gray-500 mt-1">Setup your new legal document to host.</p>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="p-6">
                            <div className="mb-6 space-y-1.5">
                                <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider">Document Title</label>
                                <input type="text" autoFocus required value={newDocForm.title}
                                    onChange={e => setNewDocForm({ ...newDocForm, title: e.target.value })}
                                    placeholder="e.g. FitTrack Privacy Policy"
                                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-[13px] text-white focus:outline-none focus:border-blue-500/50 transition-colors placeholder:text-gray-600"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Document Type</label>
                                <div className="space-y-2">
                                    {['privacy_policy', 'terms', 'dmca', 'other'].map(type => (
                                        <label key={type} className="flex items-center gap-3 cursor-pointer group bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 hover:border-white/[0.1] transition-colors">
                                            <div className="relative flex items-center justify-center w-5 h-5">
                                                <input type="radio" name="docType" value={type}
                                                    checked={newDocForm.type === type}
                                                    onChange={e => setNewDocForm({ ...newDocForm, type: e.target.value })}
                                                    className="peer appearance-none w-5 h-5 border border-gray-600 rounded-full checked:border-blue-500 checked:border-[6px] transition-all cursor-pointer bg-transparent"
                                                />
                                            </div>
                                            <span className="text-[13px] text-gray-300 font-medium group-hover:text-white transition-colors capitalize">
                                                {type.replace('_', ' ')}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-8 space-y-1.5">
                                <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider">Language</label>
                                <select value={newDocForm.language}
                                    onChange={e => setNewDocForm({ ...newDocForm, language: e.target.value })}
                                    className="w-full appearance-none bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-[13px] text-gray-200 focus:outline-none focus:border-blue-500/50 cursor-pointer"
                                >
                                    <option value="en">English (en) — Default</option>
                                    <option value="es">Español (es)</option>
                                    <option value="fr">Français (fr)</option>
                                    <option value="de">Deutsch (de)</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-end gap-2.5 pt-5 border-t border-white/[0.05]">
                                <button type="button" onClick={() => setShowNewModal(false)}
                                    className="px-4 py-2 text-[13px] font-medium text-gray-400 hover:text-white hover:bg-white/[0.05] rounded-xl transition-colors"
                                >Cancel</button>
                                <button type="submit" disabled={!newDocForm.title.trim() || isSaving}
                                    className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-[13px] font-bold rounded-xl transition-all disabled:opacity-50 flex items-center gap-2 active:scale-[0.97]"
                                >
                                    {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                                    Create Document
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </HostedDocsLayout>
    )
}
