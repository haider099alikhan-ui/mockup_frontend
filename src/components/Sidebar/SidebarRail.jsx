import {
  Grid2X2,
  Shapes,
  Type,
  Image as ImageIcon,
  Upload,
  Layers,
} from 'lucide-react'

const tabs = [
  { id: 'templates', label: 'Templates', icon: Grid2X2 },
  { id: 'elements', label: 'Elements', icon: Shapes },
  { id: 'text', label: 'Text', icon: Type },
  { id: 'background', label: 'Background', icon: ImageIcon },
  { id: 'uploads', label: 'Uploads', icon: Upload },
  { id: 'layers', label: 'Layers', icon: Layers },
]

function SidebarRail({ activeTab, setActiveTab }) {
  return (
    <aside
      className="flex h-full w-20 flex-col items-center justify-center gap-2 border-r border-gray-800"
      style={{ backgroundColor: 'var(--sidebar-bg)' }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex h-16 w-16 cursor-pointer flex-col items-center justify-center rounded-xl text-xs transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              isActive
                ? 'bg-[#2a2a2a] text-white'
                : 'text-gray-400 hover:bg-[#2a2a2a] hover:text-white'
            }`}
          >
            <Icon className="mb-1 h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        )
      })}
    </aside>
  )
}

export default SidebarRail

