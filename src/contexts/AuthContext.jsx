import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    // Fetch user profile from backend
    const fetchProfile = async (accessToken) => {
        try {
            let apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8787' : 'https://mockupcreator-api.haider099alikhan-ui.workers.dev')
            if (!import.meta.env.DEV && apiUrl.includes('localhost')) {
                apiUrl = 'https://mockupcreator-api.haider099alikhan-ui.workers.dev'
            }
            const res = await fetch(`${apiUrl}/api/user/profile`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            if (res.ok) {
                const data = await res.json()
                setProfile(data.profile)
            }
        } catch (err) {
            console.warn('Failed to fetch profile:', err)
        }
    }

    useEffect(() => {
        if (!supabase) {
            setLoading(false)
            return
        }

        // Get initial session
        supabase.auth.getSession().then(({ data: { session: s } }) => {
            setSession(s)
            setUser(s?.user || null)
            if (s?.access_token) fetchProfile(s.access_token)
            setLoading(false)
        })

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, s) => {
                setSession(s)
                setUser(s?.user || null)
                if (s?.access_token) {
                    fetchProfile(s.access_token)
                } else {
                    setProfile(null)
                }
            }
        )

        return () => subscription.unsubscribe()
    }, [])

    const signUp = async (email, password, fullName) => {
        if (!supabase) throw new Error('Supabase not configured')
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: fullName },
            },
        })
        if (error) throw error
        return data
    }

    const signIn = async (email, password) => {
        if (!supabase) throw new Error('Supabase not configured')
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) throw error
        return data
    }

    const signInWithGoogle = async () => {
        if (!supabase) throw new Error('Supabase not configured')
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/`,
            },
        })
        if (error) throw error
        return data
    }

    const signOut = async () => {
        if (!supabase) return
        await supabase.auth.signOut()
        setUser(null)
        setSession(null)
        setProfile(null)
    }

    const resetPassword = async (email) => {
        if (!supabase) throw new Error('Supabase not configured')
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth?type=recovery`,
        })
        if (error) throw error
    }

    const value = {
        user,
        session,
        profile,
        loading,
        isAuthenticated: !!user,
        isPro: profile?.plan === 'pro',
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        resetPassword,
        refreshProfile: () => session?.access_token && fetchProfile(session.access_token),
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}
