import { useState, useEffect } from 'react'
import { Search, ChevronDown, ChevronRight, Plus } from 'lucide-react'
import CustomDeviceModal from '../modals/CustomDeviceModal'
import { getCustomDevicePresets, saveCustomDevicePreset } from '../../../utils/devicePresets'

const DEVICE_CATEGORIES = [
  {
    name: 'iPhones',
    devices: [
      { name: 'iPhone 17 Pro Max', width: 130, height: 260 },
      { name: 'iPhone 17 Air', width: 110, height: 220 },
      { name: 'iPhone 17', width: 120, height: 240 },
      { name: 'iPhone 16 Pro Max', width: 130, height: 260 },
      { name: 'iPhone 16 Plus', width: 125, height: 250 },
      { name: 'iPhone 15 Pro', width: 120, height: 240 },
    ],
  },
  {
    name: '3D Devices',
    devices: [
      { name: '3D iPhone 17 Pro Max', width: 140, height: 280 },
      { name: '3D iPhone 17 Air', width: 120, height: 240 },
      { name: '3D iPad Pro 13', width: 200, height: 280 },
    ],
  },
  {
    name: 'Handheld',
    devices: [
      { name: 'Handheld iPhone 17 Pro Max', width: 150, height: 300 },
      { name: 'Handheld iPhone (Dim Light)', width: 150, height: 300 },
      { name: 'Handheld iPhone (Silhouette)', width: 150, height: 300 },
    ],
  },
  {
    name: 'iPads',
    devices: [
      { name: 'iPad Pro 13', width: 200, height: 270 },
      { name: 'iPad Pro 11', width: 180, height: 250 },
      { name: 'iPad Mini', width: 160, height: 220 },
    ],
  },
  {
    name: 'Android',
    devices: [
      { name: 'Android Phone', width: 120, height: 240 },
      { name: 'Android Samsung', width: 125, height: 250 },
      { name: 'Google Pixel', width: 120, height: 240 },
      { name: 'Android Tab', width: 200, height: 280 },
    ],
  },
  {
    name: 'Other',
    devices: [
      { name: 'Computer', width: 240, height: 160 },
      { name: 'Browser', width: 220, height: 150 },
      { name: 'Apple Watch', width: 60, height: 70 },
    ],
  },
]

function ElementsTab({ activeSubTab, setActiveSubTab, addElementToSlide, activeSlide }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showCustomModal, setShowCustomModal] = useState(false)
  const [customPresets, setCustomPresets] = useState(getCustomDevicePresets())
  const [expandedCategories, setExpandedCategories] = useState(() => {
    const initial = {}
    DEVICE_CATEGORIES.forEach((cat, i) => {
      initial[cat.name] = i === 0
    })
    initial['Custom'] = true
    return initial
  })

  const searchLower = searchQuery.trim().toLowerCase()
  const isSearching = searchLower.length > 0

  const allCategories = [
    ...DEVICE_CATEGORIES,
    ...(customPresets.length > 0
      ? [
          {
            name: 'Custom',
            devices: customPresets,
          },
        ]
      : []),
  ]

  useEffect(() => {
    if (!searchQuery.trim()) {
      setExpandedCategories(() => {
        const initial = {}
        allCategories.forEach((cat, i) => {
          initial[cat.name] = i === 0
        })
        return initial
      })
    }
  }, [searchQuery, customPresets])

  const getCategoryExpanded = (categoryName) => {
    if (isSearching) return true
    return expandedCategories[categoryName] ?? false
  }

  const toggleCategory = (categoryName) => {
    if (isSearching) return
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }))
  }

  const handleAddDevice = (device) => {
    addElementToSlide(activeSlide, {
      type: 'device',
      x: 70,
      y: 100,
      width: device.width,
      height: device.height,
      style: {},
    })
  }

  const handleSaveCustomPreset = (preset) => {
    if (saveCustomDevicePreset(preset)) {
      setCustomPresets(getCustomDevicePresets())
    }
  }

  const handleAddCustomDevice = (device) => {
    handleAddDevice(device)
  }

  const getDevicePreviewSize = (device) => {
    const maxDim = 48
    const scale = maxDim / Math.max(device.width, device.height)
    return {
      width: device.width * scale,
      height: device.height * scale,
    }
  }

  return (
    <div>
      <div className="mb-3 flex gap-2 text-[11px]">
        {['devices', 'images', 'elements'].map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveSubTab(id)}
            className={`flex-1 rounded-full px-2 py-1 capitalize transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              activeSubTab === id ? 'bg-[#3a3a3a] text-white' : 'bg-[#222222] text-gray-400'
            }`}
          >
            {id}
          </button>
        ))}
      </div>

      {activeSubTab === 'devices' && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xs font-semibold text-gray-200">Devices</h3>
            <button
              type="button"
              onClick={() => setShowCustomModal(true)}
              className="flex items-center gap-1 rounded-md border border-gray-700 bg-[#1f1f1f] px-2 py-1 text-[10px] text-gray-300 transition-all hover:border-blue-500 hover:bg-[#2a2a2a] hover:text-white"
              title="Add Custom Device"
            >
              <Plus className="h-3 w-3" />
              Custom
            </button>
          </div>
          <div className="relative mb-3">
            <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search devices"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-gray-700 bg-[#1f1f1f] py-1.5 pl-8 pr-2 text-[11px] text-gray-200 outline-none transition-all focus:border-blue-500"
            />
          </div>
          <div className="space-y-1">
            {allCategories
              .map((cat) => ({
                ...cat,
                devices: cat.devices.filter((d) => d.name.toLowerCase().includes(searchLower)),
              }))
              .filter((cat) => cat.devices.length > 0)
              .map((category) => {
              const isExpanded = getCategoryExpanded(category.name)
              return (
                <div key={category.name} className="rounded-lg border border-gray-700 bg-[#232323]">
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.name)}
                    className="flex w-full items-center gap-2 px-2 py-2 text-left text-xs font-medium text-gray-200 transition-colors hover:bg-[#2a2a2a]"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
                    )}
                    <span>{category.name}</span>
                  </button>
                  {isExpanded && (
                    <div className="grid grid-cols-2 gap-2 p-2 pt-0">
                      {category.devices.map((device) => {
                        const previewSize = getDevicePreviewSize(device)
                        return (
                          <button
                            key={device.name}
                            type="button"
                            onClick={() => handleAddDevice(device)}
                            className="flex flex-col items-center rounded-lg border border-gray-700 bg-[#1f1f1f] p-2 text-[10px] text-gray-200 transition-all duration-150 ease-out hover:border-blue-500 hover:shadow-md active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                          >
                            <div className="mb-2 flex h-14 w-full items-center justify-center rounded-md bg-[#111111]">
                              <div
                                className="rounded-[1rem] border border-gray-400 bg-[#1a1a1a]"
                                style={{
                                  width: previewSize.width,
                                  height: previewSize.height,
                                }}
                              />
                            </div>
                            <span className="text-center">{device.name}</span>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <CustomDeviceModal
            isOpen={showCustomModal}
            onClose={() => setShowCustomModal(false)}
            onSave={handleSaveCustomPreset}
            onAdd={handleAddCustomDevice}
          />
        </div>
      )}

      {activeSubTab === 'images' && (
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-gray-200">Stock Photos</h3>
          <input
            placeholder="Search images"
            className="w-full rounded-md border border-gray-700 bg-[#1f1f1f] px-2 py-1.5 text-[11px] text-gray-200 outline-none transition-all focus:border-blue-500"
          />
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={`stock-${index}`}
                className="h-14 rounded-md bg-gradient-to-br from-gray-500 to-gray-800 animate-pulse-soft"
              />
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'elements' && (
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-200">Design Elements</h3>
          <div className="grid grid-cols-3 gap-2">
            {[
              { symbol: '★', type: 'text', content: '★', fontSize: 40 },
              { symbol: '◎', type: 'text', content: '◎', fontSize: 40 },
              { symbol: '▲', type: 'text', content: '▲', fontSize: 40 },
              { symbol: '◆', type: 'text', content: '◆', fontSize: 40 },
              { symbol: '●', type: 'text', content: '●', fontSize: 40 },
              { symbol: '🏆', type: 'text', content: '🏆', fontSize: 40 },
              { symbol: '↗', type: 'text', content: '↗', fontSize: 40 },
              { symbol: '↘', type: 'text', content: '↘', fontSize: 40 },
              { symbol: '✦', type: 'text', content: '✦', fontSize: 40 },
            ].map((item) => (
              <button
                key={item.symbol}
                type="button"
                onClick={() =>
                  addElementToSlide(activeSlide, {
                    type: 'text',
                    x: 100,
                    y: 200,
                    width: 60,
                    height: 60,
                    content: item.content,
                    style: { fontSize: item.fontSize, fontWeight: '400', align: 'center' },
                  })
                }
                className="flex h-14 items-center justify-center rounded-md bg-[#232323] text-lg transition-all duration-150 hover:bg-[#333] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{item.symbol}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ElementsTab
