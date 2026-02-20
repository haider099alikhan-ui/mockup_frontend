const bs = (id, overrides = {}) => ({
  id,
  backgroundColor: '#1b00f6',
  elements: [],
  ...overrides,
})

// ─── CLEAN COVER ────────────────────────────────────────────────
export function buildMockupCleanCover(t) {
  const g = 'linear-gradient(160deg, #111 0%, #333 50%, #111 100%)'

  return [
    bs(1, {
      backgroundColor: '#1C1C1C',
      elements: [
        // Left column - Button: mt-[83px] mb-[77px], bg-[#0065FF] py-[22px] px-[34px] rounded-[23px] text-[41px]
        { id: 'cc1-button', type: 'badge', x: 16, y: 83, width: 350, height: 85, content: 'Free and updated', style: { bgColor: '#0065FF', color: '#ffffff', fontSize: 41, fontWeight: '700', borderRadius: 23, px: 34, py: 22, textTransform: 'none', letterSpacing: '0' } },
        
        // Text below button area: mb-[76px] text-[#666666] text-[39px]
        { id: 'cc1-text', type: 'text', x: 16, y: 280, width: 350, height: 50, content: 'Very clean and easy to use', style: { fontSize: 39, fontWeight: '400', color: '#666666', align: 'left' } },
        
        // Decorative vertical lines - mt-48 (192px), bg-[#C8C9C4] w-[3px] h-8 (32px), h-[60px]
        { id: 'cc1-line1', type: 'blob', x: 380, y: 192, width: 3, height: 32, style: { color: '#C8C9C4', opacity: 1, borderRadius: '1px' } },
        { id: 'cc1-line2', type: 'blob', x: 380, y: 249, width: 3, height: 60, style: { color: '#C8C9C4', opacity: 1, borderRadius: '1px' } },
        { id: 'cc1-line3', type: 'blob', x: 380, y: 312, width: 3, height: 60, style: { color: '#C8C9C4', opacity: 1, borderRadius: '1px' } },
        
        // Decorative dots - mt-[117px] (117px), bg-[#E4E4E3A3] w-[5px] h-1.5 (6px), bg-[#9AA8B180] w-[5px] h-1 (4px)
        { id: 'cc1-dot1', type: 'blob', x: 390, y: 117, width: 5, height: 6, style: { color: '#E4E4E3', opacity: 0.64 } },
        { id: 'cc1-dot2', type: 'blob', x: 390, y: 123, width: 5, height: 4, style: { color: '#9AA8B1', opacity: 0.5 } },
        
        // Right side device mockups - positioned to match React component layout
        { id: 'cc1-device-main', type: 'device', x: 450, y: 50, width: 150, height: 300, style: { rotation: 0, screenGradient: g }, screenType: 'app-store' },
        { id: 'cc1-device-secondary', type: 'device', x: 200, y: 350, width: 120, height: 240, style: { rotation: -8, screenGradient: g }, screenType: 'dashboard' },
        
        // Additional decorative dots from right side
        { id: 'cc1-dot3', type: 'blob', x: 580, y: 86, width: 6, height: 6, style: { color: '#E4E4E3', opacity: 0.64 } },
        { id: 'cc1-dot4', type: 'blob', x: 580, y: 400, width: 6, height: 4, style: { color: '#9AA8B1', opacity: 0.5 } },
        
        // Bottom decorative line
        { id: 'cc1-line4', type: 'blob', x: 450, y: 400, width: 3, height: 101, style: { color: '#C8C9C4', opacity: 1, borderRadius: '1px' } },
      ],
    }),
  ]
}

export const MOCKUP_BUILDERS = {
  'mockup-clean-cover': buildMockupCleanCover,
}
