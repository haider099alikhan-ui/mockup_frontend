const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787'

import { supabase } from '../lib/supabaseClient'

/**
 * API client that auto-attaches the Supabase auth token.
 * All requests go through the backend API.
 */
async function getAuthHeaders() {
    if (!supabase) return {}
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.access_token) return {}
    return { Authorization: `Bearer ${session.access_token}` }
}

async function request(method, path, body = null) {
    const headers = {
        'Content-Type': 'application/json',
        ...(await getAuthHeaders()),
    }

    const options = { method, headers }
    if (body) options.body = JSON.stringify(body)

    const res = await fetch(`${API_URL}${path}`, options)
    const data = await res.json()

    if (!res.ok) {
        const err = new Error(data.error || 'API request failed')
        err.code = data.code
        err.status = res.status
        throw err
    }

    return data
}

export const api = {
    get: (path) => request('GET', path),
    post: (path, body) => request('POST', path, body),
    put: (path, body) => request('PUT', path, body),
    delete: (path) => request('DELETE', path),

    // ─── Projects ────────────────────────────────────
    projects: {
        list: () => request('GET', '/api/projects'),
        get: (id) => request('GET', `/api/projects/${id}`),
        create: (data) => request('POST', '/api/projects', data),
        update: (id, data) => request('PUT', `/api/projects/${id}`, data),
        delete: (id) => request('DELETE', `/api/projects/${id}`),
    },

    // ─── User ────────────────────────────────────────
    user: {
        getProfile: () => request('GET', '/api/user/profile'),
        updateProfile: (data) => request('PUT', '/api/user/profile', data),
    },

    // ─── Exports ─────────────────────────────────────
    exports: {
        check: () => request('POST', '/api/exports/check'),
        track: () => request('POST', '/api/exports/track'),
    },

    // ─── Documents ───────────────────────────────────
    documents: {
        list: () => request('GET', '/api/documents'),
        get: (id) => request('GET', `/api/documents/${id}`),
        create: (data) => request('POST', '/api/documents', data),
        update: (id, data) => request('PUT', `/api/documents/${id}`, data),
        delete: (id) => request('DELETE', `/api/documents/${id}`),
    }
}
