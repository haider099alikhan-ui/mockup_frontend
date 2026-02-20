import { useNavigate } from 'react-router-dom'
import { templates } from '../../../data/templates'

function TemplatesTab() {
  const navigate = useNavigate()

  return (
    <div>
      <h2 className="mb-3 text-xs font-semibold text-gray-200">Templates</h2>
      <div className="grid grid-cols-2 gap-2">
        {templates.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() =>
              navigate(`/editor/${template.id}`, {
                state: {
                  id: template.id,
                  templateId: template.id,
                  templateName: template.name,
                  backgroundColor: template.backgroundColor,
                  primaryColor: template.primaryColor,
                  thumbnailColors: template.thumbnailColors,
                  slides: template.slides,
                },
              })
            }
            className="flex flex-col overflow-hidden rounded-lg border border-gray-700 bg-[#232323] text-left text-[10px] text-gray-200 transition-all duration-200 ease-out hover:scale-[1.03] hover:border-blue-500 hover:shadow-lg active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div
              className="flex h-20 items-center justify-center gap-1 px-1"
              style={{ backgroundColor: template.backgroundColor }}
            >
              {(template.thumbnailColors || []).slice(0, 4).map((color, i) => (
                <div
                  key={`${template.id}-thumb-${i}`}
                  className="flex h-12 w-6 flex-col items-center justify-between rounded-md p-0.5"
                  style={{ backgroundColor: color }}
                >
                  <div className="h-1 w-3 rounded-full bg-white/40" />
                  <div className="h-4 w-3 rounded border border-white/30 bg-black/20" />
                </div>
              ))}
            </div>
            <div className="px-2 py-1.5">
              <div className="truncate text-[11px] font-medium">{template.name}</div>
              <div className="text-[10px] text-gray-400">{template.slides?.length || 5} screens</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default TemplatesTab
