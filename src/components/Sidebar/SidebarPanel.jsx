import { Suspense, lazy } from 'react'
import { Trash2, Copy, AlignHorizontalJustifyCenter, AlignVerticalJustifyCenter, AlignStartHorizontal, AlignEndHorizontal, AlignStartVertical, AlignEndVertical } from 'lucide-react'
import TextPropertiesPanel from './panels/TextPropertiesPanel'
import BulkEditPanel from './panels/BulkEditPanel'

const CANVAS_W = 280
const CANVAS_H = 480

const TemplatesTab = lazy(() => import('./tabs/TemplatesTab'))
const ElementsTab = lazy(() => import('./tabs/ElementsTab'))
const TextTab = lazy(() => import('./tabs/TextTab'))
const BackgroundTab = lazy(() => import('./tabs/BackgroundTab'))
const UploadsTab = lazy(() => import('./tabs/UploadsTab'))
const LayersTab = lazy(() => import('./tabs/LayersTab'))

function SidebarPanel({
  activeTab,
  activeElementsSubTab,
  setActiveElementsSubTab,
  activeBackgroundSubTab,
  setActiveBackgroundSubTab,
  slides,
  activeSlide,
  setSlideBackground,
  addElementToSlide,
  selectedElement,
  onUpdateElement,
  onDeleteElement,
  onDuplicateElement,
  selectedElementIds,
  onSelectElement,
  selectedElements,
  onReorderElements,
  onToggleVisibility,
  onToggleLock,
  onApplyToAllSlides,
}) {
  const showBulkEdit = selectedElements && selectedElements.length >= 2
  const showTextProperties = selectedElement && selectedElement.type === 'text' && !showBulkEdit
  const showDeviceProperties = selectedElement && selectedElement.type === 'device' && !showBulkEdit
  const showElementPanel = showTextProperties || showDeviceProperties || showBulkEdit

  return (
    <aside
      className="flex h-full w-72 flex-col border-r border-gray-800"
      style={{ backgroundColor: 'var(--panel-bg)' }}
    >
      <div className="scroll-smooth flex-1 overflow-y-auto border-l border-black/10 p-3 text-xs text-gray-200">
        {showElementPanel ? (
          <div className="space-y-3">
            {showBulkEdit ? (
              <BulkEditPanel
                selectedElements={selectedElements}
                onUpdateElements={onUpdateElement}
              />
            ) : (
              <>
                <div className="flex items-center justify-between border-b border-gray-700 pb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    {showTextProperties ? 'Text Properties' : 'Device Properties'}
                  </span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={onDuplicateElement}
                  className="flex h-6 w-6 items-center justify-center rounded border border-gray-700 text-gray-400 transition-all hover:bg-[#333] hover:text-white active:scale-90"
                  title="Duplicate (Ctrl+D)"
                >
                  <Copy className="h-3 w-3" />
                </button>
                <button
                  type="button"
                  onClick={onDeleteElement}
                  className="flex h-6 w-6 items-center justify-center rounded border border-gray-700 text-gray-400 transition-all hover:bg-red-500/20 hover:text-red-400 active:scale-90"
                  title="Delete (Del)"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-gray-400">Align on Canvas</label>
              <div className="flex flex-wrap gap-1">
                {[
                  { icon: AlignStartHorizontal, title: 'Align left', fn: () => onUpdateElement(selectedElement.id, { x: 0 }) },
                  { icon: AlignHorizontalJustifyCenter, title: 'Center horizontally', fn: () => onUpdateElement(selectedElement.id, { x: (CANVAS_W - selectedElement.width) / 2 }) },
                  { icon: AlignEndHorizontal, title: 'Align right', fn: () => onUpdateElement(selectedElement.id, { x: CANVAS_W - selectedElement.width }) },
                  { icon: AlignStartVertical, title: 'Align top', fn: () => onUpdateElement(selectedElement.id, { y: 0 }) },
                  { icon: AlignVerticalJustifyCenter, title: 'Center vertically', fn: () => onUpdateElement(selectedElement.id, { y: (CANVAS_H - selectedElement.height) / 2 }) },
                  { icon: AlignEndVertical, title: 'Align bottom', fn: () => onUpdateElement(selectedElement.id, { y: CANVAS_H - selectedElement.height }) },
                ].map(({ icon: Icon, title, fn }) => (
                  <button
                    key={title}
                    type="button"
                    onClick={fn}
                    title={title}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-700 text-gray-400 transition-all hover:bg-[#333] hover:text-white active:scale-90"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </button>
                ))}
              </div>
            </div>

            {showTextProperties && (
              <TextPropertiesPanel
                element={selectedElement}
                onUpdate={onUpdateElement}
              />
            )}
            {showDeviceProperties && (
              <div className="space-y-4 animate-fade-slide-in">
                <div>
                  <label className="mb-1.5 block text-[10px] font-medium text-gray-400">Position</label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <span className="text-[9px] text-gray-500">X</span>
                      <input
                        type="number"
                        value={Math.round(selectedElement.x)}
                        onChange={(e) => onUpdateElement(selectedElement.id, { x: Number(e.target.value) })}
                        className="h-7 w-full rounded border border-gray-700 bg-[#1a1a1a] px-2 text-[11px] text-white outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="text-[9px] text-gray-500">Y</span>
                      <input
                        type="number"
                        value={Math.round(selectedElement.y)}
                        onChange={(e) => onUpdateElement(selectedElement.id, { y: Number(e.target.value) })}
                        className="h-7 w-full rounded border border-gray-700 bg-[#1a1a1a] px-2 text-[11px] text-white outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-medium text-gray-400">Size</label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <span className="text-[9px] text-gray-500">W</span>
                      <input
                        type="number"
                        value={Math.round(selectedElement.width)}
                        onChange={(e) => onUpdateElement(selectedElement.id, { width: Number(e.target.value) })}
                        className="h-7 w-full rounded border border-gray-700 bg-[#1a1a1a] px-2 text-[11px] text-white outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="text-[9px] text-gray-500">H</span>
                      <input
                        type="number"
                        value={Math.round(selectedElement.height)}
                        onChange={(e) => onUpdateElement(selectedElement.id, { height: Number(e.target.value) })}
                        className="h-7 w-full rounded border border-gray-700 bg-[#1a1a1a] px-2 text-[11px] text-white outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-medium text-gray-400">Rotation</label>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={selectedElement.style?.rotation || 0}
                    onChange={(e) => onUpdateElement(selectedElement.id, { style: { rotation: Number(e.target.value) } })}
                    className="w-full accent-blue-500"
                  />
                  <span className="text-[10px] text-gray-500">{selectedElement.style?.rotation || 0}°</span>
                </div>
                <p className="text-[10px] text-gray-500">
                  Click the device screen to upload a screenshot.
                </p>
              </div>
            )}
              </>
            )}
          </div>
        ) : (
          <Suspense
            fallback={
              <div className="space-y-2 animate-pulse-soft">
                <div className="h-4 w-24 rounded bg-gray-700" />
                <div className="h-20 rounded bg-gray-700" />
                <div className="h-20 rounded bg-gray-800" />
              </div>
            }
          >
            <div key={activeTab} className="animate-fade-slide-in space-y-4">
              {activeTab === 'templates' && <TemplatesTab />}
              {activeTab === 'elements' && (
                <ElementsTab
                  activeSubTab={activeElementsSubTab}
                  setActiveSubTab={setActiveElementsSubTab}
                  addElementToSlide={addElementToSlide}
                  activeSlide={activeSlide}
                />
              )}
              {activeTab === 'text' && (
                <TextTab addElementToSlide={addElementToSlide} activeSlide={activeSlide} />
              )}
              {activeTab === 'background' && (
                <BackgroundTab
                  activeSubTab={activeBackgroundSubTab}
                  setActiveSubTab={setActiveBackgroundSubTab}
                  slides={slides}
                  activeSlide={activeSlide}
                  setSlideBackground={setSlideBackground}
                  onApplyToAllSlides={onApplyToAllSlides}
                />
              )}
              {activeTab === 'uploads' && (
                <UploadsTab
                  slides={slides}
                  activeSlide={activeSlide}
                  selectedElementId={selectedElementIds.length === 1 ? selectedElementIds[0] : null}
                  onUpdateElement={onUpdateElement}
                />
              )}
              {activeTab === 'layers' && (
                <LayersTab
                  slides={slides}
                  activeSlide={activeSlide}
                  selectedElementIds={selectedElementIds}
                  onSelectElement={onSelectElement}
                  onReorderElements={onReorderElements}
                  onToggleVisibility={onToggleVisibility}
                  onToggleLock={onToggleLock}
                />
              )}
            </div>
          </Suspense>
        )}
      </div>
    </aside>
  )
}

export default SidebarPanel
