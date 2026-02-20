function FilterChips({ activeFilter, setActiveFilter, templateCounts = {} }) {
  const chips = [
    { id: 'all', label: 'All' },
    { id: 'mockups', label: 'Mockups' },
    { id: 'landscape', label: 'Landscape' },
    { id: 'handheld-devices', label: 'Handheld Devices' },
    { id: '3d-devices', label: '3D Devices' },
    { id: '2d-devices', label: '2D Devices' },
    { id: 'colorful-devices', label: 'Colorful Devices' },
    { id: 'minimalistic', label: 'Minimalistic' },
    { id: 'dark', label: 'Dark' },
    { id: 'illustrations', label: 'Illustrations' },
  ]

  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
      {chips.map((chip) => {
        const isActive = activeFilter === chip.id
        const count = templateCounts[chip.id]
        return (
          <button
            key={chip.id}
            type="button"
            onClick={() => setActiveFilter(chip.id)}
            className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 ease-out active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              isActive
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {chip.label}
            {count != null && (
              <span className={`ml-1.5 ${isActive ? 'text-gray-400' : 'text-gray-300'}`}>
                · {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default FilterChips
