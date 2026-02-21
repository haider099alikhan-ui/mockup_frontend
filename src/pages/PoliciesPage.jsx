import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { api } from '../services/api'
import { Plus, Trash2, ExternalLink, Save, ArrowLeft, Copy, Check, Info, FileText, Settings2, Globe, Clock, ShieldCheck, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../components/Toast'
import HostedDocsLayout from '../components/dashboard/HostedDocsLayout'

function getBackendUrl() {
    return import.meta.env.VITE_API_URL || 'http://localhost:8787'
}

export default function PoliciesPage() {
    const [documents, setDocuments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [editingDoc, setEditingDoc] = useState(null)
    const [showNewModal, setShowNewModal] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const [newDocForm, setNewDocForm] = useState({
        title: '',
        type: 'privacy_policy',
        language: 'en',
        content: '',
        is_public: true
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

    useEffect(() => {
        fetchDocuments()
    }, [])

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

    const copyLink = (docId) => {
        navigator.clipboard.writeText(`${getBackendUrl()}/p/${docId}`)
        toast('Link copied to clipboard', 'success')
    }

    const DocumentCard = ({ doc }) => {
        const [copied, setCopied] = useState(false)
        const publicUrl = `${getBackendUrl()}/p/${doc.id}`

        const handleCopy = (e) => {
            e.stopPropagation()
            navigator.clipboard.writeText(publicUrl)
            setCopied(true)
            toast('Link copied to clipboard!', 'success')
            setTimeout(() => setCopied(false), 2000)
        }

        const typeLabels = {
            privacy_policy: "Privacy Policy",
            terms: "Terms of Service",
            dmca: "DMCA",
            other: "Other"
        }

        return (
            <div
                onClick={() => setEditingDoc(doc)}
                className="group flex flex-col justify-between rounded-xl border border-gray-800 bg-[#111111] p-6 cursor-pointer hover:border-blue-500/40 hover:bg-[#161616] hover:shadow-2xl hover:shadow-blue-900/10 transition-all relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-blue-400" />
                            </div>
                            <h3 className="font-semibold text-gray-100 max-w-[150px] sm:max-w-[200px] truncate" title={doc.title}>
                                {doc.title}
                            </h3>
                        </div>
                        <button
                            onClick={(e) => handleDelete(doc.id, e)}
                            className="text-gray-600 hover:text-red-400 p-2 opacity-0 group-hover:opacity-100 transition-all rounded-md hover:bg-gray-900"
                            title="Delete Document"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs mb-5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-900 border border-gray-800 text-gray-400 rounded-md">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            {typeLabels[doc.type] || doc.type}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-900 border border-gray-800 text-gray-400 rounded-md">
                            <Globe className="w-3.5 h-3.5" />
                            {doc.language === 'en' ? 'English (en)' : doc.language || 'English (en)'}
                        </span>
                    </div>
                </div>

                {doc.is_public && (
                    <div className="mt-2 flex gap-2 pt-5 border-t border-gray-800/60">
                        <a
                            href={publicUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 hover:bg-blue-500/20 px-4 py-2 rounded-lg flex-1 font-medium"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                            View Live
                        </a>
                        <button
                            onClick={handleCopy}
                            className="flex items-center justify-center gap-1.5 text-xs text-gray-300 hover:text-white transition-colors bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg flex-1 font-medium ring-1 ring-inset ring-gray-700"
                        >
                            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                            {copied ? 'Copied!' : 'Copy Link'}
                        </button>
                    </div>
                )}
            </div>
        )
    }

    // ─── EDIT VIEW ──────────────────────────────────────────────────────────
    if (editingDoc) {
        return (
            <HostedDocsLayout>
                <div className="max-w-5xl mx-auto pb-20">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-800/60">
                        <div>
                            <button
                                onClick={() => setEditingDoc(null)}
                                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-4"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Policies
                            </button>
                            <div className="flex items-center gap-4">
                                <h1 className="text-3xl font-bold tracking-tight text-white">{editingDoc.title}</h1>
                                {editingDoc.is_public && (
                                    <span className="px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold uppercase tracking-wider">
                                        Published
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {editingDoc.is_public && (
                                <button
                                    onClick={() => copyLink(editingDoc.id)}
                                    className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white bg-[#111] hover:bg-gray-800 border border-gray-800 px-4 py-2.5 rounded-lg transition-colors"
                                >
                                    <Copy className="w-4 h-4" />
                                    Get Link
                                </button>
                            )}
                            <button
                                onClick={handleSaveEdit}
                                disabled={isSaving || !editingDoc.title.trim()}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50"
                            >
                                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                Publish Updates
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Editor Side */}
                        <div className="lg:col-span-3 space-y-6">
                            <div className="bg-[#111111] rounded-xl border border-gray-800 overflow-hidden focus-within:border-blue-500/50 transition-colors shadow-xl shadow-black/20">
                                <div className="dark-quill-editor">
                                    <ReactQuill
                                        theme="snow"
                                        value={editingDoc.content}
                                        onChange={v => setEditingDoc({ ...editingDoc, content: v })}
                                        modules={modules}
                                        placeholder="Start writing your policy here..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Settings Side */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-[#111111] border border-gray-800 rounded-xl p-5">
                                <h3 className="text-sm font-semibold text-gray-200 flex items-center gap-2 mb-4">
                                    <Settings2 className="w-4 h-4 text-gray-400" />
                                    Document Details
                                </h3>

                                <div className="space-y-4">
                                    {/* Title */}
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 mb-1.5 block">Title</label>
                                        <input
                                            type="text"
                                            value={editingDoc.title}
                                            onChange={e => setEditingDoc({ ...editingDoc, title: e.target.value })}
                                            className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
                                        />
                                    </div>

                                    {/* Type */}
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 mb-1.5 block">Type</label>
                                        <select
                                            value={editingDoc.type}
                                            onChange={e => setEditingDoc({ ...editingDoc, type: e.target.value })}
                                            className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                                        >
                                            <option value="privacy_policy">Privacy Policy</option>
                                            <option value="terms">Terms of Service</option>
                                            <option value="dmca">DMCA Policy</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    {/* Language */}
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 mb-1.5 block">Language</label>
                                        <select
                                            value={editingDoc.language || 'en'}
                                            onChange={e => setEditingDoc({ ...editingDoc, language: e.target.value })}
                                            className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                                        >
                                            <option value="en">English (en)</option>
                                            <option value="es">Español (es)</option>
                                            <option value="fr">Français (fr)</option>
                                            <option value="de">Deutsch (de)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#1a1a1a]/50 border border-gray-800/50 rounded-xl p-5">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="relative flex items-center mt-0.5">
                                        <input
                                            type="checkbox"
                                            checked={editingDoc.is_public}
                                            onChange={e => setEditingDoc({ ...editingDoc, is_public: e.target.checked })}
                                            className="peer sr-only"
                                        />
                                        <div className="w-10 h-5 bg-gray-800 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                                        <div className="absolute left-[2px] top-[2px] w-4 h-4 bg-gray-400 rounded-full peer-checked:translate-x-5 peer-checked:bg-white transition-all"></div>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-300 block mb-0.5">Public Access</span>
                                        <span className="text-xs text-gray-500 block">Allow anyone with the link to view this document.</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <style>{`
                    .dark-quill-editor .ql-toolbar.ql-snow {
                        border: none;
                        border-bottom: 1px solid #1f2937;
                        background: #111111;
                        padding: 12px 16px;
                    }
                    .dark-quill-editor .ql-toolbar.ql-snow .ql-picker-label {
                        color: #9ca3af;
                    }
                    .dark-quill-editor .ql-toolbar.ql-snow .ql-stroke {
                        stroke: #9ca3af;
                    }
                    .dark-quill-editor .ql-toolbar.ql-snow .ql-fill {
                        fill: #9ca3af;
                    }
                    .dark-quill-editor .ql-toolbar.ql-snow button:hover .ql-stroke,
                    .dark-quill-editor .ql-toolbar.ql-snow button:focus .ql-stroke,
                    .dark-quill-editor .ql-toolbar.ql-snow button.ql-active .ql-stroke,
                    .dark-quill-editor .ql-toolbar.ql-snow .ql-picker-label:hover,
                    .dark-quill-editor .ql-toolbar.ql-snow .ql-picker-label.ql-active {
                        stroke: #60a5fa !important;
                        color: #60a5fa !important;
                    }
                    .dark-quill-editor .ql-container.ql-snow {
                        border: none;
                        color: #f3f4f6;
                        font-family: inherit;
                        font-size: 15px;
                        background: #0a0a0a;
                    }
                    .dark-quill-editor .ql-editor {
                        min-height: 500px;
                        padding: 32px;
                        line-height: 1.7;
                    }
                    .dark-quill-editor .ql-editor.ql-blank::before {
                        color: #4b5563;
                        font-style: normal;
                    }
                `}</style>
            </HostedDocsLayout>
        )
    }

    // ─── MANAGE VIEW ────────────────────────────────────────────────────────
    return (
        <HostedDocsLayout title="Privacy Policies & Terms" subtitle="Create and host legal documents for your app stores.">
            <div className="max-w-6xl mx-auto py-4">

                {/* Header Actions */}
                <div className="flex items-center justify-between mb-8">
                    <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
                        These documents are hosted securely and comply with formatting standards for App Store and Google Play submissions.
                    </p>
                    <button
                        onClick={() => setShowNewModal(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
                    >
                        <Plus className="w-4 h-4" />
                        New Document
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-24">
                        <div className="w-10 h-10 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : documents.length === 0 ? (
                    <div className="text-center py-24 bg-[#111111] rounded-2xl border border-gray-800/60 border-dashed">
                        <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-gray-900/50">
                            <FileText className="w-7 h-7 text-blue-500 mb-0.5 ml-0.5" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-200 mb-2">No documents yet</h3>
                        <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto">
                            Create a hosted Privacy Policy or Terms of Service to link in your app store submission quickly and securely.
                        </p>
                        <button
                            onClick={() => setShowNewModal(true)}
                            className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ring-1 ring-inset ring-gray-700"
                        >
                            <Plus className="w-4 h-4" />
                            Create your first document
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {documents.map(doc => (
                            <DocumentCard key={doc.id} doc={doc} />
                        ))}
                    </div>
                )}
            </div>

            {/* ─── NEW DOCUMENT MODAL ────────────────────────────────────── */}
            {showNewModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-sm">
                    <div className="bg-[#121212] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-[500px] overflow-hidden">

                        <div className="px-6 py-5 border-b border-gray-800/80 bg-[#161616]">
                            <h3 className="text-lg font-bold text-white tracking-tight">Create Document</h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Setup your new legal document to host.
                            </p>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="p-6">

                            <div className="mb-6 space-y-1.5">
                                <label className="text-sm font-medium text-gray-300">Document Title</label>
                                <input
                                    type="text"
                                    autoFocus
                                    required
                                    value={newDocForm.title}
                                    onChange={e => setNewDocForm({ ...newDocForm, title: e.target.value })}
                                    placeholder="e.g. FitTrack Privacy Policy"
                                    className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-600"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-300 mb-3">Document Type</label>
                                <div className="space-y-3">
                                    {['privacy_policy', 'terms', 'dmca', 'other'].map(type => (
                                        <label key={type} className="flex items-center gap-3 cursor-pointer group bg-[#0a0a0a] border border-gray-800 rounded-xl p-3 hover:border-gray-700 transition-colors">
                                            <div className="relative flex items-center justify-center w-5 h-5">
                                                <input
                                                    type="radio"
                                                    name="docType"
                                                    value={type}
                                                    checked={newDocForm.type === type}
                                                    onChange={e => setNewDocForm({ ...newDocForm, type: e.target.value })}
                                                    className="peer appearance-none w-5 h-5 border border-gray-600 rounded-full checked:border-blue-500 checked:border-[6px] transition-all cursor-pointer bg-[#1a1a1a]"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <span className="text-[14px] text-gray-300 font-medium group-hover:text-white transition-colors capitalize">
                                                    {type.replace('_', ' ')}
                                                </span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-8 space-y-1.5">
                                <label className="text-sm font-medium text-gray-300">Language</label>
                                <div className="relative">
                                    <select
                                        value={newDocForm.language}
                                        onChange={e => setNewDocForm({ ...newDocForm, language: e.target.value })}
                                        className="w-full appearance-none bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-blue-500 cursor-pointer"
                                    >
                                        <option value="en">English (en) - Default</option>
                                        <option value="es">Español (es)</option>
                                        <option value="fr">Français (fr)</option>
                                        <option value="de">Deutsch (de)</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L5 5L9 1" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-800/50">
                                <button
                                    type="button"
                                    onClick={() => setShowNewModal(false)}
                                    className="px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!newDocForm.title.trim() || isSaving}
                                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
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
