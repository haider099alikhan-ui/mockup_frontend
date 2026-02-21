import { Crown, X, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ExportLimitModal({ info, onDismiss }) {
    const navigate = useNavigate()

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="relative mx-4 w-full max-w-md overflow-hidden rounded-2xl border border-gray-700 bg-gray-900 shadow-2xl">
                {/* Close button */}
                <button
                    type="button"
                    onClick={onDismiss}
                    className="absolute right-3 top-3 rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-800 hover:text-gray-300"
                >
                    <X className="h-4 w-4" />
                </button>

                {/* Gradient accent */}
                <div className="h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500" />

                <div className="p-8 text-center">
                    {/* Icon */}
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10">
                        <Zap className="h-7 w-7 text-amber-400" />
                    </div>

                    <h2 className="mb-2 text-xl font-bold text-white">Export limit reached</h2>
                    <p className="mb-1 text-sm text-gray-400">
                        You've used all <strong className="text-white">{info?.limit || 5}</strong> free exports this month.
                    </p>
                    <p className="mb-6 text-sm text-gray-500">
                        Upgrade to Pro for unlimited exports and more.
                    </p>

                    {/* CTA */}
                    <button
                        type="button"
                        onClick={() => {
                            onDismiss()
                            navigate('/pricing')
                        }}
                        className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3 text-sm font-bold text-black shadow-lg shadow-amber-500/20 transition-all hover:from-amber-400 hover:to-orange-400 active:scale-[0.98]"
                    >
                        <Crown className="h-4 w-4" />
                        Upgrade to Pro — Unlimited Exports
                    </button>

                    <button
                        type="button"
                        onClick={onDismiss}
                        className="w-full rounded-xl border border-gray-700 py-3 text-sm font-medium text-gray-400 transition-all hover:bg-gray-800 hover:text-gray-300"
                    >
                        Maybe later
                    </button>

                    <p className="mt-4 text-[11px] text-gray-600">
                        Exports reset at the start of each month
                    </p>
                </div>
            </div>
        </div>
    )
}
