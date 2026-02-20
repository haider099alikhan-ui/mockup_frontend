// Detailed screen previews for mockups - shows realistic UI
export function AppStoreScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Status bar */}
      <div className="flex items-center justify-between bg-white px-3 py-1.5">
        <span className="text-[8px] font-semibold text-black">9:41</span>
        <div className="flex items-center gap-1">
          <div className="h-1 w-1 rounded-full bg-black" />
          <div className="h-[2px] w-[2px] rounded-full border border-black" />
          <div className="h-1 w-4 rounded-sm border border-black" />
        </div>
      </div>
      
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-50 to-white px-4 py-3">
        <div className="mb-2 h-2 w-24 rounded-full bg-blue-200" />
        <div className="mb-1 h-1.5 w-32 rounded-full bg-gray-300" />
        <div className="h-1 w-20 rounded-full bg-gray-200" />
      </div>
      
      {/* Hero image */}
      <div className="mx-3 mb-3 h-24 rounded-xl bg-gradient-to-br from-blue-400 to-purple-400" />
      
      {/* Cards */}
      <div className="space-y-2 px-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-2 rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
            <div className="h-12 w-12 shrink-0 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300" />
            <div className="flex-1 space-y-1">
              <div className="h-2 w-3/4 rounded-full bg-gray-300" />
              <div className="h-1.5 w-1/2 rounded-full bg-gray-200" />
              <div className="flex gap-1">
                <div className="h-1 w-8 rounded-full bg-blue-200" />
                <div className="h-1 w-6 rounded-full bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Bottom nav */}
      <div className="mt-auto flex justify-around border-t border-gray-200 bg-white py-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className={`h-1 w-1 rounded-full ${i === 1 ? 'bg-blue-500' : 'bg-gray-300'}`} />
            <div className="h-0.5 w-4 rounded-full bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function SocialMediaScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Status bar */}
      <div className="flex items-center justify-between bg-white px-3 py-1.5">
        <span className="text-[8px] font-semibold text-black">9:41</span>
        <div className="flex items-center gap-1">
          <div className="h-1 w-1 rounded-full bg-black" />
          <div className="h-[2px] w-[2px] rounded-full border border-black" />
          <div className="h-1 w-4 rounded-sm border border-black" />
        </div>
      </div>
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2">
        <div className="h-3 w-20 rounded bg-gray-300" />
        <div className="flex gap-2">
          <div className="h-2 w-2 rounded bg-gray-300" />
          <div className="h-2 w-2 rounded bg-gray-300" />
        </div>
      </div>
      
      {/* Stories */}
      <div className="flex gap-2 border-b border-gray-200 bg-white px-3 py-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="h-12 w-12 rounded-full border-2 border-pink-400 bg-gradient-to-br from-pink-300 to-purple-300" />
            <div className="h-1 w-8 rounded-full bg-gray-200" />
          </div>
        ))}
      </div>
      
      {/* Posts */}
      <div className="space-y-3 px-3 py-2">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-300 to-purple-300" />
              <div className="h-1.5 flex-1 rounded-full bg-gray-300" />
            </div>
            <div className="h-32 w-full rounded-lg bg-gradient-to-br from-gray-200 to-gray-300" />
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded bg-red-400" />
              <div className="h-2 w-2 rounded bg-gray-300" />
              <div className="h-2 w-2 rounded bg-gray-300" />
              <div className="h-1 flex-1 rounded-full bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function EcommerceScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Status bar */}
      <div className="flex items-center justify-between bg-white px-3 py-1.5">
        <span className="text-[8px] font-semibold text-black">9:41</span>
        <div className="flex items-center gap-1">
          <div className="h-1 w-1 rounded-full bg-black" />
          <div className="h-[2px] w-[2px] rounded-full border border-black" />
          <div className="h-1 w-4 rounded-sm border border-black" />
        </div>
      </div>
      
      {/* Search bar */}
      <div className="bg-gradient-to-r from-orange-400 to-pink-400 px-4 py-3">
        <div className="mb-2 flex items-center gap-2 rounded-lg bg-white px-2 py-1.5">
          <div className="h-1.5 w-1.5 rounded bg-gray-400" />
          <div className="h-1 flex-1 rounded-full bg-gray-200" />
        </div>
      </div>
      
      {/* Banner */}
      <div className="mx-3 mb-3 h-20 rounded-xl bg-gradient-to-r from-orange-300 to-pink-300" />
      
      {/* Product grid */}
      <div className="grid grid-cols-2 gap-2 px-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-1 rounded-lg border border-gray-200 bg-white p-2">
            <div className="h-20 w-full rounded bg-gradient-to-br from-gray-200 to-gray-300" />
            <div className="h-1.5 w-3/4 rounded-full bg-gray-300" />
            <div className="flex items-center gap-1">
              <div className="h-1 w-8 rounded-full bg-green-400" />
              <div className="h-1 w-6 rounded-full bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Bottom nav */}
      <div className="mt-auto flex justify-around border-t border-gray-200 bg-white py-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className={`h-1 w-1 rounded-full ${i === 1 ? 'bg-orange-500' : 'bg-gray-300'}`} />
            <div className="h-0.5 w-4 rounded-full bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function DashboardScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-gray-50">
      {/* Status bar */}
      <div className="flex items-center justify-between bg-white px-3 py-1.5">
        <span className="text-[8px] font-semibold text-black">9:41</span>
        <div className="flex items-center gap-1">
          <div className="h-1 w-1 rounded-full bg-black" />
          <div className="h-[2px] w-[2px] rounded-full border border-black" />
          <div className="h-1 w-4 rounded-sm border border-black" />
        </div>
      </div>
      
      {/* Header */}
      <div className="bg-white px-4 py-3 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <div className="h-3 w-24 rounded bg-gray-300" />
          <div className="h-5 w-5 rounded-full bg-gray-300" />
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-2 px-3 py-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-lg bg-white p-2 shadow-sm">
            <div className="mb-1 h-1 w-12 rounded-full bg-gray-300" />
            <div className="mb-1 h-2 w-16 rounded bg-blue-300" />
            <div className="h-0.5 w-8 rounded-full bg-gray-200" />
          </div>
        ))}
      </div>
      
      {/* Chart area */}
      <div className="mx-3 mb-2 rounded-lg bg-white p-2 shadow-sm">
        <div className="mb-2 h-1.5 w-20 rounded-full bg-gray-300" />
        <div className="h-16 w-full rounded bg-gradient-to-t from-blue-200 to-blue-100" />
      </div>
      
      {/* List */}
      <div className="space-y-1 px-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg bg-white p-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-300 to-pink-300" />
            <div className="flex-1 space-y-1">
              <div className="h-1.5 w-3/4 rounded-full bg-gray-300" />
              <div className="h-1 w-1/2 rounded-full bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function FitnessScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-b from-green-50 to-white">
      {/* Status bar */}
      <div className="flex items-center justify-between bg-transparent px-3 py-1.5">
        <span className="text-[8px] font-semibold text-black">9:41</span>
        <div className="flex items-center gap-1">
          <div className="h-1 w-1 rounded-full bg-black" />
          <div className="h-[2px] w-[2px] rounded-full border border-black" />
          <div className="h-1 w-4 rounded-sm border border-black" />
        </div>
      </div>
      
      {/* Header */}
      <div className="px-4 py-3">
        <div className="mb-2 h-3 w-28 rounded bg-gray-300" />
        <div className="h-1.5 w-20 rounded-full bg-gray-200" />
      </div>
      
      {/* Progress circle */}
      <div className="mx-auto mb-3 flex h-24 w-24 items-center justify-center rounded-full border-4 border-green-400 bg-white">
        <div className="text-center">
          <div className="h-2 w-12 rounded-full bg-green-400 mx-auto mb-1" />
          <div className="h-1 w-8 rounded-full bg-gray-200 mx-auto" />
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 px-3 mb-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg bg-white p-2 text-center shadow-sm">
            <div className="mb-1 h-2 w-8 rounded-full bg-green-300 mx-auto" />
            <div className="h-1 w-6 rounded-full bg-gray-200 mx-auto" />
          </div>
        ))}
      </div>
      
      {/* Workout list */}
      <div className="space-y-2 px-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg bg-white p-2 shadow-sm">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-300 to-emerald-300" />
            <div className="flex-1 space-y-1">
              <div className="h-1.5 w-3/4 rounded-full bg-gray-300" />
              <div className="h-1 w-1/2 rounded-full bg-gray-200" />
            </div>
            <div className="h-6 w-6 rounded-full bg-green-400" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function MusicScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-b from-purple-900 to-black">
      {/* Status bar */}
      <div className="flex items-center justify-between bg-transparent px-3 py-1.5">
        <span className="text-[8px] font-semibold text-white">9:41</span>
        <div className="flex items-center gap-1">
          <div className="h-1 w-1 rounded-full bg-white" />
          <div className="h-[2px] w-[2px] rounded-full border border-white" />
          <div className="h-1 w-4 rounded-sm border border-white" />
        </div>
      </div>
      
      {/* Now playing */}
      <div className="px-4 py-6 text-center">
        <div className="mx-auto mb-4 h-48 w-48 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-2xl" />
        <div className="mb-1 h-2 w-32 rounded-full bg-white mx-auto" />
        <div className="h-1.5 w-24 rounded-full bg-gray-400 mx-auto" />
      </div>
      
      {/* Progress bar */}
      <div className="px-4 mb-4">
        <div className="mb-1 flex items-center justify-between">
          <div className="h-1 w-8 rounded-full bg-gray-500" />
          <div className="h-1 w-8 rounded-full bg-gray-500" />
        </div>
        <div className="h-1 w-full rounded-full bg-gray-700">
          <div className="h-full w-1/3 rounded-full bg-purple-400" />
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-center gap-4 px-4 mb-4">
        <div className="h-6 w-6 rounded-full bg-gray-600" />
        <div className="h-8 w-8 rounded-full bg-white" />
        <div className="h-6 w-6 rounded-full bg-gray-600" />
      </div>
      
      {/* Playlist */}
      <div className="space-y-1 px-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg bg-white/5 p-2">
            <div className="h-10 w-10 rounded bg-gradient-to-br from-purple-400 to-pink-400" />
            <div className="flex-1 space-y-1">
              <div className="h-1.5 w-3/4 rounded-full bg-white/30" />
              <div className="h-1 w-1/2 rounded-full bg-white/20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
