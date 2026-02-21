const bs = (id, overrides = {}) => ({
  id,
  backgroundColor: '#1b00f6',
  elements: [],
  ...overrides,
})

// ─── SPORTS BLUE ─────────────────────────────────────────────
export function buildSportsBlue(t) {
  const sl = t.slides
  const g = 'linear-gradient(145deg, #0a00cc 0%, #3322ff 50%, #0a00cc 100%)'

  return [
    bs(1, {
      backgroundColor: sl[0].backgroundColor || t.backgroundColor,
      elements: [
        { id: 'sb1-blob', type: 'blob', x: -40, y: 180, width: 320, height: 320, style: { color: '#0000aa', opacity: 0.35 } },
        { id: 'sb1-blob2', type: 'blob', x: 180, y: -30, width: 200, height: 200, style: { color: '#2200ee', opacity: 0.25 } },
        { id: 'sb1-badge', type: 'badge', x: 16, y: 18, width: 60, height: 20, content: 'LIVE', style: { bgColor: 'rgba(255,60,60,0.9)', color: '#fff', fontSize: 8, fontWeight: '700', px: 10, py: 4 } },
        { id: 'sb1-text', type: 'text', x: 16, y: 50, width: 150, height: 130, content: 'Live\nsports\nanytime', style: { fontSize: 38, fontWeight: '900', align: 'left', color: '#ffffff' } },
        { id: 'sb1-device', type: 'device', x: 120, y: 80, width: 150, height: 300, style: { rotation: -10, screenGradient: g } },
        { id: 'sb1-desc', type: 'text', x: 16, y: 430, width: 200, height: 30, content: 'Every game. Every league. One app.', style: { fontSize: 9, fontWeight: '400', color: '#aab4ff' } },
      ],
    }),
    bs(2, {
      backgroundColor: '#0d00e0',
      elements: [
        { id: 'sb2-blob', type: 'blob', x: 60, y: -60, width: 280, height: 280, style: { color: '#1a0aff', opacity: 0.3 } },
        { id: 'sb2-device', type: 'device', x: 50, y: 30, width: 170, height: 330, style: { rotation: 0, screenGradient: g } },
        { id: 'sb2-text', type: 'text', x: 30, y: 380, width: 220, height: 80, content: 'Games\nanywhere', style: { fontSize: 42, fontWeight: '900', align: 'center', color: '#ffffff' } },
      ],
    }),
    bs(3, {
      backgroundColor: '#1000ff',
      elements: [
        { id: 'sb3-text', type: 'text', x: 16, y: 24, width: 260, height: 60, content: 'Instant match\nupdates', style: { fontSize: 30, fontWeight: '900', align: 'left', color: '#ffffff' } },
        { id: 'sb3-badge', type: 'badge', x: 16, y: 94, width: 80, height: 20, content: 'REAL-TIME', style: { bgColor: 'rgba(255,255,255,0.15)', color: '#c4c8ff', fontSize: 8, fontWeight: '600' } },
        { id: 'sb3-device', type: 'device', x: 30, y: 130, width: 130, height: 260, style: { rotation: -6, screenGradient: g } },
        { id: 'sb3-device2', type: 'device', x: 130, y: 150, width: 130, height: 260, style: { rotation: 6, screenGradient: g } },
      ],
    }),
    bs(4, {
      backgroundColor: '#0800dd',
      elements: [
        { id: 'sb4-blob', type: 'blob', x: -30, y: 50, width: 300, height: 300, style: { color: '#1a0aff', opacity: 0.3 } },
        { id: 'sb4-device', type: 'device', x: 40, y: 20, width: 190, height: 360, style: { rotation: 0, screenGradient: g } },
        { id: 'sb4-text', type: 'text', x: 20, y: 395, width: 240, height: 70, content: 'Watch key\nmoments', style: { fontSize: 36, fontWeight: '900', align: 'left', color: '#ffffff' } },
      ],
    }),
    bs(5, {
      backgroundColor: '#1200f0',
      elements: [
        { id: 'sb5-blob', type: 'blob', x: 100, y: 60, width: 260, height: 260, style: { color: '#0000bb', opacity: 0.35 } },
        { id: 'sb5-branding', type: 'branding', x: 16, y: 16, width: 100, height: 20, content: 'SportsApp', style: { color: '#ffffff', fontSize: 11, fontWeight: '700' } },
        { id: 'sb5-text', type: 'text', x: 16, y: 50, width: 170, height: 120, content: 'Stadium\nvibes', style: { fontSize: 44, fontWeight: '900', align: 'left', color: '#ffffff' } },
        { id: 'sb5-device', type: 'device', x: 100, y: 100, width: 160, height: 310, style: { rotation: 8, screenGradient: g } },
        { id: 'sb5-badge', type: 'badge', x: 16, y: 440, width: 100, height: 20, content: '⚡ 50M+ FANS', style: { bgColor: 'rgba(255,255,255,0.12)', color: '#c0c8ff', fontSize: 8 } },
      ],
    }),
  ]
}

// ─── STREAMING DARK ──────────────────────────────────────────
export function buildStreamingDark(t) {
  const sl = t.slides
  const g = 'linear-gradient(160deg, #111 0%, #333 50%, #111 100%)'

  return [
    bs(1, {
      backgroundColor: sl[0].backgroundColor,
      elements: [
        { id: 'sd1-blob', type: 'blob', x: 60, y: 100, width: 280, height: 280, style: { color: '#2a2a2a', opacity: 0.5 } },
        { id: 'sd1-branding', type: 'branding', x: 16, y: 16, width: 100, height: 20, content: 'StreamNow.', style: { color: '#ffffff', fontSize: 11, fontWeight: '600' } },
        { id: 'sd1-text', type: 'text', x: 16, y: 52, width: 160, height: 130, content: 'Enjoy\nEvery\nMoment', style: { fontSize: 36, fontWeight: '900', align: 'left', color: '#ffffff' } },
        { id: 'sd1-device', type: 'device', x: 110, y: 100, width: 140, height: 280, style: { rotation: -8, screenGradient: g } },
        { id: 'sd1-desc', type: 'text', x: 16, y: 410, width: 200, height: 40, content: 'Stream movies, shows and\nexclusives all in one place.', style: { fontSize: 9, fontWeight: '400', color: '#888888' } },
      ],
    }),
    bs(2, {
      backgroundColor: sl[1].backgroundColor,
      elements: [
        { id: 'sd2-blob', type: 'blob', x: 80, y: -40, width: 260, height: 260, style: { color: '#2a2a2a', opacity: 0.45 } },
        { id: 'sd2-device', type: 'device', x: 20, y: 40, width: 160, height: 310, style: { rotation: 8, screenGradient: 'linear-gradient(160deg, #2a1a3a 0%, #3a2a4a 50%, #1a1a2a 100%)' } },
        { id: 'sd2-text', type: 'text', x: 50, y: 370, width: 200, height: 90, content: 'Instant\nAccess', style: { fontSize: 40, fontWeight: '900', align: 'center', color: '#ffffff' } },
      ],
    }),
    bs(3, {
      backgroundColor: sl[2].backgroundColor,
      elements: [
        { id: 'sd3-text', type: 'text', x: 20, y: 20, width: 240, height: 110, content: 'Watch\nTogether\nAnytime', style: { fontSize: 34, fontWeight: '900', align: 'left', color: '#ffffff' } },
        { id: 'sd3-device', type: 'device', x: 60, y: 150, width: 150, height: 300, style: { rotation: 0, screenGradient: 'linear-gradient(180deg, #1a1a2e 0%, #2a2a3e 100%)' } },
      ],
    }),
    bs(4, {
      backgroundColor: sl[3].backgroundColor,
      elements: [
        { id: 'sd4-blob', type: 'blob', x: -20, y: 60, width: 300, height: 300, style: { color: '#252525', opacity: 0.5 } },
        { id: 'sd4-device', type: 'device', x: 40, y: 20, width: 180, height: 340, style: { rotation: 0, screenGradient: 'linear-gradient(170deg, #1a1a1a 0%, #2a2a2a 100%)' } },
        { id: 'sd4-text', type: 'text', x: 16, y: 380, width: 240, height: 80, content: 'Watch With\nEase', style: { fontSize: 38, fontWeight: '900', align: 'left', color: '#ffffff' } },
      ],
    }),
    bs(5, {
      backgroundColor: sl[4].backgroundColor,
      elements: [
        { id: 'sd5-text', type: 'text', x: 16, y: 24, width: 180, height: 80, content: 'New Releases\nDaily', style: { fontSize: 32, fontWeight: '900', align: 'left', color: '#ffffff' } },
        { id: 'sd5-device', type: 'device', x: 80, y: 120, width: 160, height: 320, style: { rotation: 0, screenGradient: 'linear-gradient(160deg, #1a1a1a 0%, #333 100%)' } },
      ],
    }),
  ]
}

// ─── EDUCATION PURPLE ────────────────────────────────────────
export function buildEducationPurple(t) {
  const g = 'linear-gradient(150deg, #1a1040 0%, #2d1b6e 50%, #1a1040 100%)'

  return [
    bs(1, {
      backgroundColor: '#221b4b',
      elements: [
        { id: 'ep1-blob', type: 'blob', x: -50, y: 200, width: 340, height: 340, style: { color: '#2e1f6b', opacity: 0.45 } },
        { id: 'ep1-blob2', type: 'blob', x: 160, y: -30, width: 180, height: 180, style: { color: '#3a2a7a', opacity: 0.3 } },
        { id: 'ep1-branding', type: 'branding', x: 16, y: 16, width: 100, height: 20, content: 'ThinkUp', style: { color: '#c9b8ff', fontSize: 12, fontWeight: '700' } },
        { id: 'ep1-text', type: 'text', x: 16, y: 55, width: 160, height: 140, content: 'Learn\nSmarter\nNot Harder', style: { fontSize: 34, fontWeight: '900', color: '#ffffff' } },
        { id: 'ep1-device', type: 'device', x: 115, y: 85, width: 145, height: 290, style: { rotation: -8, screenGradient: g } },
        { id: 'ep1-badge', type: 'badge', x: 16, y: 440, width: 100, height: 20, content: '🎓 #1 EDUCATION APP', style: { bgColor: 'rgba(180,150,255,0.15)', color: '#c9b8ff', fontSize: 7, fontWeight: '600' } },
      ],
    }),
    bs(2, {
      backgroundColor: '#1e1745',
      elements: [
        { id: 'ep2-blob', type: 'blob', x: 70, y: -50, width: 280, height: 280, style: { color: '#2e1f6b', opacity: 0.35 } },
        { id: 'ep2-device', type: 'device', x: 40, y: 30, width: 170, height: 330, style: { rotation: 0, screenGradient: g } },
        { id: 'ep2-text', type: 'text', x: 30, y: 380, width: 220, height: 80, content: 'Smarter\nevery day', style: { fontSize: 40, fontWeight: '900', align: 'center', color: '#ffffff' } },
      ],
    }),
    bs(3, {
      backgroundColor: '#261d52',
      elements: [
        { id: 'ep3-text', type: 'text', x: 16, y: 24, width: 240, height: 60, content: 'Short reads', style: { fontSize: 36, fontWeight: '900', color: '#ffffff' } },
        { id: 'ep3-badge', type: 'badge', x: 16, y: 90, width: 60, height: 20, content: '5 MIN', style: { bgColor: 'rgba(180,150,255,0.2)', color: '#d4c6ff', fontSize: 9, fontWeight: '700' } },
        { id: 'ep3-device', type: 'device', x: 70, y: 130, width: 140, height: 280, style: { rotation: 5, screenGradient: g } },
        { id: 'ep3-desc', type: 'text', x: 16, y: 430, width: 200, height: 30, content: 'Bite-sized lessons that stick.', style: { fontSize: 9, fontWeight: '400', color: '#9988cc' } },
      ],
    }),
    bs(4, {
      backgroundColor: '#201a48',
      elements: [
        { id: 'ep4-blob', type: 'blob', x: -30, y: 80, width: 300, height: 300, style: { color: '#2e1f6b', opacity: 0.4 } },
        { id: 'ep4-device', type: 'device', x: 30, y: 30, width: 130, height: 260, style: { rotation: -6, screenGradient: g } },
        { id: 'ep4-device2', type: 'device', x: 130, y: 50, width: 130, height: 260, style: { rotation: 6, screenGradient: g } },
        { id: 'ep4-text', type: 'text', x: 20, y: 340, width: 240, height: 120, content: 'Track\nprogress', style: { fontSize: 42, fontWeight: '900', align: 'left', color: '#ffffff' } },
      ],
    }),
    bs(5, {
      backgroundColor: '#2a2058',
      elements: [
        { id: 'ep5-blob', type: 'blob', x: 80, y: 50, width: 260, height: 260, style: { color: '#3a2a7a', opacity: 0.35 } },
        { id: 'ep5-text', type: 'text', x: 16, y: 40, width: 170, height: 120, content: 'Daily\ngoals', style: { fontSize: 44, fontWeight: '900', color: '#ffffff' } },
        { id: 'ep5-device', type: 'device', x: 100, y: 90, width: 160, height: 310, style: { rotation: 8, screenGradient: g } },
        { id: 'ep5-badge', type: 'badge', x: 16, y: 442, width: 80, height: 20, content: '🔥 STREAK', style: { bgColor: 'rgba(255,180,80,0.2)', color: '#ffcc88', fontSize: 8 } },
      ],
    }),
  ]
}

// ─── FINANCE YELLOW ──────────────────────────────────────────
export function buildFinanceYellow(t) {
  const g = 'linear-gradient(150deg, #1a1800 0%, #3a3500 50%, #1a1800 100%)'

  return [
    bs(1, {
      backgroundColor: '#facc15',
      elements: [
        { id: 'fy1-blob', type: 'blob', x: -40, y: 160, width: 320, height: 320, style: { color: '#e6b800', opacity: 0.35 } },
        { id: 'fy1-text', type: 'text', x: 16, y: 30, width: 180, height: 140, content: 'EARN\nCOINS\nDAILY', style: { fontSize: 42, fontWeight: '900', color: '#000000' } },
        { id: 'fy1-device', type: 'device', x: 115, y: 80, width: 145, height: 290, style: { rotation: -8, screenGradient: g } },
        { id: 'fy1-badge', type: 'badge', x: 16, y: 440, width: 100, height: 20, content: '💰 START FREE', style: { bgColor: 'rgba(0,0,0,0.12)', color: '#333300', fontSize: 8, fontWeight: '700' } },
      ],
    }),
    bs(2, {
      backgroundColor: '#f5c518',
      elements: [
        { id: 'fy2-blob', type: 'blob', x: 80, y: -60, width: 260, height: 260, style: { color: '#d4a900', opacity: 0.3 } },
        { id: 'fy2-device', type: 'device', x: 45, y: 30, width: 170, height: 330, style: { rotation: 0, screenGradient: g } },
        { id: 'fy2-text', type: 'text', x: 20, y: 380, width: 240, height: 80, content: 'MONEY\nMOVES', style: { fontSize: 44, fontWeight: '900', align: 'center', color: '#000000' } },
      ],
    }),
    bs(3, {
      backgroundColor: '#efc00e',
      elements: [
        { id: 'fy3-text', type: 'text', x: 16, y: 28, width: 240, height: 60, content: 'REAL VALUE', style: { fontSize: 36, fontWeight: '900', color: '#000000' } },
        { id: 'fy3-badge', type: 'badge', x: 16, y: 96, width: 80, height: 20, content: '↑ +12.4%', style: { bgColor: 'rgba(0,0,0,0.1)', color: '#1a4d00', fontSize: 10, fontWeight: '800' } },
        { id: 'fy3-device', type: 'device', x: 30, y: 130, width: 130, height: 260, style: { rotation: -5, screenGradient: g } },
        { id: 'fy3-device2', type: 'device', x: 125, y: 150, width: 130, height: 260, style: { rotation: 5, screenGradient: g } },
      ],
    }),
    bs(4, {
      backgroundColor: '#f0c800',
      elements: [
        { id: 'fy4-blob', type: 'blob', x: -20, y: 60, width: 300, height: 300, style: { color: '#d4a000', opacity: 0.3 } },
        { id: 'fy4-device', type: 'device', x: 40, y: 20, width: 185, height: 350, style: { rotation: 0, screenGradient: g } },
        { id: 'fy4-text', type: 'text', x: 20, y: 390, width: 240, height: 70, content: 'PROFIT\nTRACKER', style: { fontSize: 36, fontWeight: '900', color: '#000000' } },
      ],
    }),
    bs(5, {
      backgroundColor: '#facc15',
      elements: [
        { id: 'fy5-blob', type: 'blob', x: 90, y: 40, width: 260, height: 260, style: { color: '#d4a900', opacity: 0.3 } },
        { id: 'fy5-branding', type: 'branding', x: 16, y: 16, width: 100, height: 20, content: 'CoinApp', style: { color: '#000000', fontSize: 12, fontWeight: '700', iconColor: '#000000', iconStroke: '#facc15' } },
        { id: 'fy5-text', type: 'text', x: 16, y: 52, width: 170, height: 110, content: 'Smart\nInsights', style: { fontSize: 42, fontWeight: '900', color: '#000000' } },
        { id: 'fy5-device', type: 'device', x: 100, y: 100, width: 155, height: 310, style: { rotation: 8, screenGradient: g } },
        { id: 'fy5-badge', type: 'badge', x: 16, y: 442, width: 100, height: 20, content: '📊 AI POWERED', style: { bgColor: 'rgba(0,0,0,0.1)', color: '#444400', fontSize: 8 } },
      ],
    }),
  ]
}

// ─── SHOPPING WHITE ──────────────────────────────────────────
export function buildShoppingWhite(t) {
  const g = 'linear-gradient(150deg, #f0f0f0 0%, #e8e8e8 50%, #ddd 100%)'

  return [
    bs(1, {
      backgroundColor: '#f5f5f5',
      elements: [
        { id: 'sw1-blob', type: 'blob', x: -40, y: 180, width: 320, height: 320, style: { color: '#e8e8e8', opacity: 0.6 } },
        { id: 'sw1-branding', type: 'branding', x: 16, y: 18, width: 100, height: 20, content: 'ShopNow', style: { color: '#111111', fontSize: 12, fontWeight: '700', iconColor: '#111', iconStroke: '#fff' } },
        { id: 'sw1-text', type: 'text', x: 16, y: 60, width: 160, height: 130, content: 'Shop\nBetter.\nLive Better.', style: { fontSize: 32, fontWeight: '900', color: '#111111' } },
        { id: 'sw1-device', type: 'device', x: 115, y: 80, width: 145, height: 290, style: { rotation: -8, screenGradient: g } },
        { id: 'sw1-badge', type: 'badge', x: 16, y: 440, width: 100, height: 20, content: 'FREE SHIPPING', style: { bgColor: 'rgba(0,0,0,0.06)', color: '#555', fontSize: 8, fontWeight: '600', border: '1px solid rgba(0,0,0,0.08)' } },
      ],
    }),
    bs(2, {
      backgroundColor: '#ebebeb',
      elements: [
        { id: 'sw2-device', type: 'device', x: 45, y: 30, width: 170, height: 330, style: { rotation: 0, screenGradient: g } },
        { id: 'sw2-text', type: 'text', x: 20, y: 380, width: 240, height: 80, content: 'BEST\nPRICES', style: { fontSize: 44, fontWeight: '900', align: 'center', color: '#111111' } },
      ],
    }),
    bs(3, {
      backgroundColor: '#f5f5f5',
      elements: [
        { id: 'sw3-text', type: 'text', x: 16, y: 24, width: 240, height: 70, content: 'Fast\nDelivery', style: { fontSize: 38, fontWeight: '900', color: '#111111' } },
        { id: 'sw3-badge', type: 'badge', x: 16, y: 102, width: 80, height: 20, content: '⚡ SAME DAY', style: { bgColor: 'rgba(0,0,0,0.06)', color: '#444', fontSize: 8, border: '1px solid rgba(0,0,0,0.08)' } },
        { id: 'sw3-device', type: 'device', x: 70, y: 140, width: 140, height: 280, style: { rotation: 5, screenGradient: g } },
      ],
    }),
    bs(4, {
      backgroundColor: '#eeeeee',
      elements: [
        { id: 'sw4-blob', type: 'blob', x: -20, y: 60, width: 300, height: 300, style: { color: '#e0e0e0', opacity: 0.5 } },
        { id: 'sw4-device', type: 'device', x: 30, y: 25, width: 130, height: 260, style: { rotation: -5, screenGradient: g } },
        { id: 'sw4-device2', type: 'device', x: 125, y: 40, width: 130, height: 260, style: { rotation: 5, screenGradient: g } },
        { id: 'sw4-text', type: 'text', x: 20, y: 340, width: 240, height: 120, content: 'Top\nbrands', style: { fontSize: 44, fontWeight: '900', color: '#111111' } },
      ],
    }),
    bs(5, {
      backgroundColor: '#f5f5f5',
      elements: [
        { id: 'sw5-blob', type: 'blob', x: 80, y: 40, width: 260, height: 260, style: { color: '#e8e8e8', opacity: 0.5 } },
        { id: 'sw5-text', type: 'text', x: 16, y: 40, width: 170, height: 110, content: 'New\narrivals', style: { fontSize: 44, fontWeight: '900', color: '#111111' } },
        { id: 'sw5-device', type: 'device', x: 100, y: 90, width: 160, height: 310, style: { rotation: 8, screenGradient: g } },
        { id: 'sw5-badge', type: 'badge', x: 16, y: 442, width: 80, height: 20, content: '🔔 WEEKLY', style: { bgColor: 'rgba(0,0,0,0.05)', color: '#555', fontSize: 8, border: '1px solid rgba(0,0,0,0.08)' } },
      ],
    }),
  ]
}

// ─── HEALTH GREEN ────────────────────────────────────────────
export function buildHealthGreen(t) {
  const g = 'linear-gradient(150deg, #0a3d1a 0%, #166534 50%, #0a3d1a 100%)'

  return [
    bs(1, {
      backgroundColor: '#16a34a',
      elements: [
        { id: 'hg1-blob', type: 'blob', x: -40, y: 180, width: 330, height: 330, style: { color: '#0d8a3a', opacity: 0.4 } },
        { id: 'hg1-blob2', type: 'blob', x: 170, y: -20, width: 180, height: 180, style: { color: '#22c55e', opacity: 0.25 } },
        { id: 'hg1-branding', type: 'branding', x: 16, y: 16, width: 100, height: 20, content: 'HealthKit', style: { color: '#ffffff', fontSize: 11, fontWeight: '700' } },
        { id: 'hg1-text', type: 'text', x: 16, y: 55, width: 150, height: 130, content: 'Healthy\nhabits\nstart here', style: { fontSize: 34, fontWeight: '900', color: '#ffffff' } },
        { id: 'hg1-device', type: 'device', x: 115, y: 85, width: 145, height: 290, style: { rotation: -8, screenGradient: g } },
        { id: 'hg1-badge', type: 'badge', x: 16, y: 440, width: 100, height: 20, content: '🌿 FEEL BETTER', style: { bgColor: 'rgba(255,255,255,0.15)', color: '#c0ffd0', fontSize: 8 } },
      ],
    }),
    bs(2, {
      backgroundColor: '#15803d',
      elements: [
        { id: 'hg2-blob', type: 'blob', x: 60, y: -60, width: 280, height: 280, style: { color: '#1a9e48', opacity: 0.3 } },
        { id: 'hg2-device', type: 'device', x: 45, y: 30, width: 170, height: 330, style: { rotation: 0, screenGradient: g } },
        { id: 'hg2-text', type: 'text', x: 20, y: 380, width: 240, height: 80, content: 'Wellness\ndaily', style: { fontSize: 42, fontWeight: '900', align: 'center', color: '#ffffff' } },
      ],
    }),
    bs(3, {
      backgroundColor: '#16a34a',
      elements: [
        { id: 'hg3-text', type: 'text', x: 16, y: 24, width: 240, height: 60, content: 'Mind & body', style: { fontSize: 36, fontWeight: '900', color: '#ffffff' } },
        { id: 'hg3-badge', type: 'badge', x: 16, y: 92, width: 80, height: 20, content: '🧘 BALANCE', style: { bgColor: 'rgba(255,255,255,0.15)', color: '#d0ffd8', fontSize: 8 } },
        { id: 'hg3-device', type: 'device', x: 30, y: 130, width: 130, height: 260, style: { rotation: -6, screenGradient: g } },
        { id: 'hg3-device2', type: 'device', x: 130, y: 150, width: 130, height: 260, style: { rotation: 6, screenGradient: g } },
      ],
    }),
    bs(4, {
      backgroundColor: '#14532d',
      elements: [
        { id: 'hg4-blob', type: 'blob', x: -20, y: 60, width: 300, height: 300, style: { color: '#166534', opacity: 0.4 } },
        { id: 'hg4-device', type: 'device', x: 40, y: 20, width: 185, height: 350, style: { rotation: 0, screenGradient: g } },
        { id: 'hg4-text', type: 'text', x: 20, y: 390, width: 240, height: 70, content: 'Sleep\nbetter', style: { fontSize: 40, fontWeight: '900', color: '#ffffff' } },
      ],
    }),
    bs(5, {
      backgroundColor: '#16a34a',
      elements: [
        { id: 'hg5-blob', type: 'blob', x: 90, y: 50, width: 260, height: 260, style: { color: '#0d8a3a', opacity: 0.35 } },
        { id: 'hg5-text', type: 'text', x: 16, y: 40, width: 170, height: 120, content: 'Track\nsteps', style: { fontSize: 44, fontWeight: '900', color: '#ffffff' } },
        { id: 'hg5-device', type: 'device', x: 100, y: 90, width: 160, height: 310, style: { rotation: 8, screenGradient: g } },
        { id: 'hg5-badge', type: 'badge', x: 16, y: 442, width: 100, height: 20, content: '👟 10K STEPS/DAY', style: { bgColor: 'rgba(255,255,255,0.12)', color: '#c0ffd0', fontSize: 8 } },
      ],
    }),
  ]
}

// ─── TRAVEL ORANGE ───────────────────────────────────────────
export function buildTravelOrange(t) {
  const g = 'linear-gradient(150deg, #4a1a00 0%, #7a3000 50%, #4a1a00 100%)'

  return [
    bs(1, {
      backgroundColor: '#ea580c',
      elements: [
        { id: 'to1-blob', type: 'blob', x: -40, y: 180, width: 330, height: 330, style: { color: '#c44a08', opacity: 0.4 } },
        { id: 'to1-blob2', type: 'blob', x: 170, y: -20, width: 180, height: 180, style: { color: '#ff7a2e', opacity: 0.25 } },
        { id: 'to1-branding', type: 'branding', x: 16, y: 16, width: 100, height: 20, content: 'Wanderly', style: { color: '#ffffff', fontSize: 12, fontWeight: '700' } },
        { id: 'to1-text', type: 'text', x: 16, y: 55, width: 160, height: 130, content: 'Fly\naway\ntoday', style: { fontSize: 38, fontWeight: '900', color: '#ffffff' } },
        { id: 'to1-device', type: 'device', x: 115, y: 80, width: 145, height: 290, style: { rotation: -10, screenGradient: g } },
        { id: 'to1-badge', type: 'badge', x: 16, y: 440, width: 100, height: 20, content: '✈️ BOOK NOW', style: { bgColor: 'rgba(255,255,255,0.15)', color: '#ffe0c0', fontSize: 8 } },
      ],
    }),
    bs(2, {
      backgroundColor: '#c2410c',
      elements: [
        { id: 'to2-blob', type: 'blob', x: 60, y: -50, width: 280, height: 280, style: { color: '#e05a18', opacity: 0.3 } },
        { id: 'to2-device', type: 'device', x: 40, y: 30, width: 170, height: 330, style: { rotation: 0, screenGradient: g } },
        { id: 'to2-text', type: 'text', x: 20, y: 380, width: 240, height: 80, content: 'Weekend\ngetaways', style: { fontSize: 40, fontWeight: '900', align: 'center', color: '#ffffff' } },
      ],
    }),
    bs(3, {
      backgroundColor: '#ea580c',
      elements: [
        { id: 'to3-text', type: 'text', x: 16, y: 24, width: 240, height: 60, content: 'City guides', style: { fontSize: 38, fontWeight: '900', color: '#ffffff' } },
        { id: 'to3-badge', type: 'badge', x: 16, y: 92, width: 80, height: 20, content: '🗺️ 200+ CITIES', style: { bgColor: 'rgba(255,255,255,0.15)', color: '#ffe0c0', fontSize: 8 } },
        { id: 'to3-device', type: 'device', x: 70, y: 130, width: 140, height: 280, style: { rotation: 5, screenGradient: g } },
        { id: 'to3-desc', type: 'text', x: 16, y: 430, width: 200, height: 30, content: 'Curated by local experts.', style: { fontSize: 9, fontWeight: '400', color: '#ffcca0' } },
      ],
    }),
    bs(4, {
      backgroundColor: '#9a3412',
      elements: [
        { id: 'to4-blob', type: 'blob', x: -20, y: 60, width: 300, height: 300, style: { color: '#c2410c', opacity: 0.4 } },
        { id: 'to4-device', type: 'device', x: 40, y: 20, width: 185, height: 350, style: { rotation: 0, screenGradient: g } },
        { id: 'to4-text', type: 'text', x: 20, y: 390, width: 240, height: 70, content: 'Hidden\ngems', style: { fontSize: 40, fontWeight: '900', color: '#ffffff' } },
      ],
    }),
    bs(5, {
      backgroundColor: '#ea580c',
      elements: [
        { id: 'to5-blob', type: 'blob', x: 90, y: 50, width: 260, height: 260, style: { color: '#c44a08', opacity: 0.35 } },
        { id: 'to5-text', type: 'text', x: 16, y: 40, width: 170, height: 110, content: 'Travel\nlight', style: { fontSize: 44, fontWeight: '900', color: '#ffffff' } },
        { id: 'to5-device', type: 'device', x: 100, y: 90, width: 160, height: 310, style: { rotation: 8, screenGradient: g } },
        { id: 'to5-badge', type: 'badge', x: 16, y: 442, width: 100, height: 20, content: '🌍 EXPLORE', style: { bgColor: 'rgba(255,255,255,0.12)', color: '#ffe0c0', fontSize: 8 } },
      ],
    }),
  ]
}

// ─── FOOD RED ────────────────────────────────────────────────
export function buildFoodRed(t) {
  const g = 'linear-gradient(150deg, #3d0a0a 0%, #6b1515 50%, #3d0a0a 100%)'

  return [
    bs(1, {
      backgroundColor: '#b91c1c',
      elements: [
        { id: 'fr1-blob', type: 'blob', x: -40, y: 180, width: 330, height: 330, style: { color: '#991b1b', opacity: 0.4 } },
        { id: 'fr1-blob2', type: 'blob', x: 170, y: -20, width: 180, height: 180, style: { color: '#dc2626', opacity: 0.25 } },
        { id: 'fr1-branding', type: 'branding', x: 16, y: 16, width: 100, height: 20, content: 'FoodieApp', style: { color: '#ffffff', fontSize: 12, fontWeight: '700' } },
        { id: 'fr1-text', type: 'text', x: 16, y: 55, width: 160, height: 130, content: 'Street\nfood\nat home', style: { fontSize: 36, fontWeight: '900', color: '#ffffff' } },
        { id: 'fr1-device', type: 'device', x: 115, y: 80, width: 145, height: 290, style: { rotation: -8, screenGradient: g } },
        { id: 'fr1-badge', type: 'badge', x: 16, y: 440, width: 100, height: 20, content: '🔥 HOT DEALS', style: { bgColor: 'rgba(255,255,255,0.15)', color: '#ffc0c0', fontSize: 8 } },
      ],
    }),
    bs(2, {
      backgroundColor: '#991b1b',
      elements: [
        { id: 'fr2-blob', type: 'blob', x: 60, y: -50, width: 280, height: 280, style: { color: '#b91c1c', opacity: 0.3 } },
        { id: 'fr2-device', type: 'device', x: 40, y: 30, width: 170, height: 330, style: { rotation: 0, screenGradient: g } },
        { id: 'fr2-text', type: 'text', x: 20, y: 380, width: 240, height: 80, content: 'Hot\ndeals', style: { fontSize: 44, fontWeight: '900', align: 'center', color: '#ffffff' } },
      ],
    }),
    bs(3, {
      backgroundColor: '#b91c1c',
      elements: [
        { id: 'fr3-text', type: 'text', x: 16, y: 24, width: 240, height: 60, content: 'New flavors', style: { fontSize: 38, fontWeight: '900', color: '#ffffff' } },
        { id: 'fr3-badge', type: 'badge', x: 16, y: 92, width: 80, height: 20, content: '🍜 TRENDING', style: { bgColor: 'rgba(255,255,255,0.15)', color: '#ffd0d0', fontSize: 8 } },
        { id: 'fr3-device', type: 'device', x: 30, y: 130, width: 130, height: 260, style: { rotation: -5, screenGradient: g } },
        { id: 'fr3-device2', type: 'device', x: 125, y: 150, width: 130, height: 260, style: { rotation: 5, screenGradient: g } },
      ],
    }),
    bs(4, {
      backgroundColor: '#7f1d1d',
      elements: [
        { id: 'fr4-blob', type: 'blob', x: -20, y: 60, width: 300, height: 300, style: { color: '#991b1b', opacity: 0.4 } },
        { id: 'fr4-device', type: 'device', x: 40, y: 20, width: 185, height: 350, style: { rotation: 0, screenGradient: g } },
        { id: 'fr4-text', type: 'text', x: 20, y: 390, width: 240, height: 70, content: 'Chef\npicks', style: { fontSize: 42, fontWeight: '900', color: '#ffffff' } },
      ],
    }),
    bs(5, {
      backgroundColor: '#b91c1c',
      elements: [
        { id: 'fr5-blob', type: 'blob', x: 90, y: 50, width: 260, height: 260, style: { color: '#991b1b', opacity: 0.35 } },
        { id: 'fr5-text', type: 'text', x: 16, y: 40, width: 170, height: 110, content: 'Late night\nbites', style: { fontSize: 40, fontWeight: '900', color: '#ffffff' } },
        { id: 'fr5-device', type: 'device', x: 100, y: 90, width: 160, height: 310, style: { rotation: 8, screenGradient: g } },
        { id: 'fr5-badge', type: 'badge', x: 16, y: 442, width: 100, height: 20, content: '🌙 OPEN LATE', style: { bgColor: 'rgba(255,255,255,0.12)', color: '#ffc0c0', fontSize: 8 } },
      ],
    }),
  ]
}

// ─── ART GALLERY LIGHT ───────────────────────────────────────
export function buildArtGalleryLight(t) {
  const sl = t.slides
  const g = 'linear-gradient(150deg, #f0ece5 0%, #e8e0d5 50%, #f0ece5 100%)'

  return [
    bs(1, {
      backgroundColor: sl[0].backgroundColor,
      elements: [
        { id: 'ag1-blob', type: 'blob', x: -40, y: 200, width: 330, height: 330, style: { color: '#efe8dd', opacity: 0.5 } },
        { id: 'ag1-branding', type: 'branding', x: 16, y: 18, width: 100, height: 20, content: 'Artsy', style: { color: '#333', fontSize: 12, fontWeight: '700', iconColor: '#333', iconStroke: '#faf8f5' } },
        { id: 'ag1-text', type: 'text', x: 16, y: 60, width: 160, height: 100, content: 'Meet your\nnew art\nadvisor.', style: { fontSize: 28, fontWeight: '800', color: '#222222' } },
        { id: 'ag1-device-left', type: 'device', x: 60, y: 170, width: 90, height: 190, style: { rotation: -12, screenGradient: g } },
        { id: 'ag1-device', type: 'device', x: 110, y: 140, width: 110, height: 230, style: { rotation: 0, screenGradient: g } },
        { id: 'ag1-device-right', type: 'device', x: 170, y: 170, width: 90, height: 190, style: { rotation: 12, screenGradient: g } },
        { id: 'ag1-badge', type: 'badge', x: 16, y: 440, width: 100, height: 20, content: '🎨 CURATED ART', style: { bgColor: 'rgba(0,0,0,0.05)', color: '#666', fontSize: 8, border: '1px solid rgba(0,0,0,0.08)' } },
      ],
    }),
    bs(2, {
      backgroundColor: sl[1].backgroundColor,
      elements: [
        { id: 'ag2-blob', type: 'blob', x: 60, y: -50, width: 280, height: 280, style: { color: '#e88a78', opacity: 0.3 } },
        { id: 'ag2-device', type: 'device', x: 45, y: 30, width: 170, height: 330, style: { rotation: 0, screenGradient: 'linear-gradient(150deg, #f4a896 0%, #e88a78 100%)' } },
        { id: 'ag2-text', type: 'text', x: 20, y: 380, width: 240, height: 80, content: 'Buy artwork\nwith ease', style: { fontSize: 36, fontWeight: '900', align: 'center', color: '#3a1a0a' } },
      ],
    }),
    bs(3, {
      backgroundColor: sl[2].backgroundColor,
      elements: [
        { id: 'ag3-text', type: 'text', x: 16, y: 24, width: 240, height: 70, content: 'Bid in global\nauctions', style: { fontSize: 32, fontWeight: '900', color: '#1a3a1a' } },
        { id: 'ag3-badge', type: 'badge', x: 16, y: 102, width: 80, height: 20, content: '🏛️ LIVE', style: { bgColor: 'rgba(0,0,0,0.06)', color: '#2a5a2a', fontSize: 9, border: '1px solid rgba(0,0,0,0.08)' } },
        { id: 'ag3-device', type: 'device', x: 70, y: 140, width: 140, height: 280, style: { rotation: 5, screenGradient: 'linear-gradient(150deg, #c8d5b9 0%, #b0c0a0 100%)' } },
      ],
    }),
    bs(4, {
      backgroundColor: sl[3].backgroundColor,
      elements: [
        { id: 'ag4-blob', type: 'blob', x: -20, y: 60, width: 300, height: 300, style: { color: '#c0b0d0', opacity: 0.3 } },
        { id: 'ag4-device', type: 'device', x: 40, y: 20, width: 185, height: 350, style: { rotation: 0, screenGradient: 'linear-gradient(150deg, #d4c5e2 0%, #c0b0d0 100%)' } },
        { id: 'ag4-text', type: 'text', x: 20, y: 390, width: 240, height: 70, content: 'Research and\nvalidate prices', style: { fontSize: 30, fontWeight: '900', color: '#2a1a3a' } },
      ],
    }),
    bs(5, {
      backgroundColor: sl[4].backgroundColor,
      elements: [
        { id: 'ag5-blob', type: 'blob', x: 90, y: 50, width: 260, height: 260, style: { color: '#e8c0a8', opacity: 0.3 } },
        { id: 'ag5-text', type: 'text', x: 16, y: 40, width: 190, height: 100, content: 'Your art\ncollection\nawaits.', style: { fontSize: 32, fontWeight: '900', color: '#3a2010' } },
        { id: 'ag5-device', type: 'device', x: 100, y: 100, width: 155, height: 310, style: { rotation: 8, screenGradient: 'linear-gradient(150deg, #f5d5c0 0%, #e8c0a8 100%)' } },
        { id: 'ag5-badge', type: 'badge', x: 16, y: 442, width: 100, height: 20, content: '🖼️ START COLLECTING', style: { bgColor: 'rgba(0,0,0,0.05)', color: '#665544', fontSize: 7, border: '1px solid rgba(0,0,0,0.08)' } },
      ],
    }),
  ]
}

// ─── STREVO STREAMING ─────────────────────────────────────────
export function buildStrevoStreaming(t) {
  const sl = t.slides
  const bg = sl[0]?.backgroundColor || '#5a2a2a'
  const g = 'linear-gradient(160deg, #111 0%, #333 50%, #111 100%)'

  return [
    bs(1, {
      backgroundColor: bg,
      elements: [
        { id: 'st1-device', type: 'device', x: 110, y: 80, width: 140, height: 280, style: { rotation: -8, screenGradient: g }, screenType: 'app-store' },
        { id: 'st1-text', type: 'text', x: 16, y: 380, width: 240, height: 80, content: 'Watch Anywhere\nAnytime', style: { fontSize: 36, fontWeight: '900', align: 'center', color: '#ffffff', fontFamily: 'serif' } },
      ],
    }),
    bs(2, {
      backgroundColor: bg,
      elements: [
        { id: 'st2-badge', type: 'badge', x: 16, y: 18, width: 120, height: 24, content: 'App of the day', style: { bgColor: 'rgba(255,255,255,0.15)', color: '#ffffff', fontSize: 9, fontWeight: '700' } },
        { id: 'st2-device', type: 'device', x: 100, y: 60, width: 140, height: 280, style: { rotation: 8, screenGradient: g }, screenType: 'app-store' },
        { id: 'st2-text', type: 'text', x: 16, y: 380, width: 240, height: 80, content: 'Stories Worth\nWatching', style: { fontSize: 36, fontWeight: '900', align: 'center', color: '#ffffff', fontFamily: 'serif' } },
      ],
    }),
    bs(3, {
      backgroundColor: bg,
      elements: [
        { id: 'st3-branding', type: 'branding', x: 16, y: 20, width: 100, height: 24, content: 'Strevo', style: { color: '#ffffff', fontSize: 16, fontWeight: '700' } },
        { id: 'st3-badge', type: 'badge', x: 16, y: 50, width: 140, height: 24, content: 'Featured Choice', style: { bgColor: 'rgba(255,255,255,0.15)', color: '#ffffff', fontSize: 9, fontWeight: '700' } },
        { id: 'st3-rating', type: 'text', x: 16, y: 82, width: 200, height: 30, content: '★★★★★ 100k+ downloads • 4.5 Rating', style: { fontSize: 10, fontWeight: '600', color: '#ffffff' } },
        { id: 'st3-feature1', type: 'text', x: 16, y: 120, width: 200, height: 20, content: '↓ Download content', style: { fontSize: 9, fontWeight: '500', color: '#ffffff' } },
        { id: 'st3-feature2', type: 'text', x: 16, y: 145, width: 200, height: 20, content: '🖥️ Multiple device', style: { fontSize: 9, fontWeight: '500', color: '#ffffff' } },
        { id: 'st3-feature3', type: 'text', x: 16, y: 170, width: 200, height: 20, content: '🔊 Dolby atmos audio', style: { fontSize: 9, fontWeight: '500', color: '#ffffff' } },
        { id: 'st3-feature4', type: 'text', x: 16, y: 195, width: 200, height: 20, content: '🎬 4K content access', style: { fontSize: 9, fontWeight: '500', color: '#ffffff' } },
        { id: 'st3-device', type: 'device', x: 100, y: 100, width: 140, height: 280, style: { rotation: 8, screenGradient: g }, screenType: 'app-store' },
      ],
    }),
    bs(4, {
      backgroundColor: bg,
      elements: [
        { id: 'st4-device', type: 'device', x: 90, y: 60, width: 140, height: 280, style: { rotation: -8, screenGradient: g }, screenType: 'ecommerce' },
        { id: 'st4-text', type: 'text', x: 16, y: 360, width: 240, height: 60, content: 'Curated Picks\nFor Every Mood', style: { fontSize: 34, fontWeight: '900', align: 'center', color: '#ffffff', fontFamily: 'serif' } },
        { id: 'st4-desc', type: 'text', x: 16, y: 430, width: 240, height: 30, content: 'Experience storytelling without limits as Strevo connects you to the entertainment you love, anytime, anywhere, on any screen.', style: { fontSize: 8, fontWeight: '400', color: '#ffffff', align: 'center' } },
      ],
    }),
    bs(5, {
      backgroundColor: bg,
      elements: [
        { id: 'st5-device', type: 'device', x: 100, y: 80, width: 140, height: 280, style: { rotation: 8, screenGradient: g }, screenType: 'app-store' },
        { id: 'st5-text', type: 'text', x: 16, y: 380, width: 240, height: 80, content: 'Binge Watch\nFreely', style: { fontSize: 36, fontWeight: '900', align: 'center', color: '#ffffff', fontFamily: 'serif' } },
      ],
    }),
  ]
}

// ─── SOCIAL NEON — Centered hero with floating UI cards ──────
export function buildSocialNeon(t) {
  return [
    // Slide 1: Giant centered device with floating notification cards around it
    bs(1, {
      backgroundColor: '#0a0a0a', elements: [
        { id: 'sn1-blob', type: 'blob', x: 20, y: 50, width: 250, height: 400, style: { color: '#e040fb', opacity: 0.15 } },
        { id: 'sn1-device', type: 'device', x: 45, y: 40, width: 190, height: 380, style: { rotation: 0 }, screenType: 'social' },
        { id: 'sn1-badge', type: 'badge', x: 10, y: 10, width: 60, height: 22, content: '💬 12 NEW', style: { bgColor: '#e040fb', color: '#fff', fontSize: 8, fontWeight: '700', px: 8, py: 4, borderRadius: 12 } },
        { id: 'sn1-badge2', type: 'badge', x: 200, y: 60, width: 70, height: 22, content: '❤️ 2.4K', style: { bgColor: '#ff1744', color: '#fff', fontSize: 8, fontWeight: '700', px: 8, py: 4, borderRadius: 12 } },
        { id: 'sn1-text', type: 'text', x: 30, y: 435, width: 220, height: 40, content: 'Your social universe', style: { fontSize: 22, fontWeight: '800', align: 'center', color: '#ffffff' } },
      ]
    }),
    // Slide 2: Three stacked story-style frames
    bs(2, {
      backgroundColor: '#0d0d0d', elements: [
        { id: 'sn2-device1', type: 'device', x: 10, y: 30, width: 80, height: 160, style: { rotation: -3, borderRadius: 16 } },
        { id: 'sn2-device2', type: 'device', x: 100, y: 10, width: 80, height: 160, style: { rotation: 0, borderRadius: 16 } },
        { id: 'sn2-device3', type: 'device', x: 190, y: 30, width: 80, height: 160, style: { rotation: 3, borderRadius: 16 } },
        { id: 'sn2-text', type: 'text', x: 20, y: 210, width: 240, height: 100, content: 'Stories that\ndisappear.\nMemories\nthat don\'t.', style: { fontSize: 28, fontWeight: '900', align: 'center', color: '#ffffff', lineHeight: 34 } },
        { id: 'sn2-blob', type: 'blob', x: 60, y: 300, width: 160, height: 160, style: { color: '#536dfe', opacity: 0.2 } },
      ]
    }),
    // Slide 3: Full-screen device with overlay text
    bs(3, {
      backgroundColor: '#0a0a0a', elements: [
        { id: 'sn3-device', type: 'device', x: 20, y: 0, width: 240, height: 480, style: { rotation: 0 }, screenType: 'social' },
        { id: 'sn3-badge', type: 'badge', x: 30, y: 410, width: 220, height: 50, content: '🔥 Go viral instantly', style: { bgColor: 'rgba(224,64,251,0.85)', color: '#fff', fontSize: 16, fontWeight: '800', px: 20, py: 14, borderRadius: 14 } },
      ]
    }),
    // Slide 4: Side-by-side DM conversation style
    bs(4, {
      backgroundColor: '#111111', elements: [
        { id: 'sn4-blob1', type: 'blob', x: -30, y: 100, width: 200, height: 300, style: { color: '#e040fb', opacity: 0.1 } },
        { id: 'sn4-device', type: 'device', x: 55, y: 60, width: 170, height: 340, style: { rotation: 0 }, screenType: 'social' },
        { id: 'sn4-text', type: 'text', x: 40, y: 15, width: 200, height: 35, content: 'DMs redesigned', style: { fontSize: 20, fontWeight: '800', align: 'center', color: '#e040fb' } },
        { id: 'sn4-desc', type: 'text', x: 30, y: 415, width: 220, height: 40, content: 'Voice, video, text — all in one thread', style: { fontSize: 11, fontWeight: '400', align: 'center', color: '#888' } },
      ]
    }),
    // Slide 5: Stats/social proof centered layout
    bs(5, {
      backgroundColor: '#0a0a0a', elements: [
        { id: 'sn5-blob', type: 'blob', x: 40, y: 100, width: 200, height: 200, style: { color: '#e040fb', opacity: 0.2 } },
        { id: 'sn5-text', type: 'text', x: 20, y: 100, width: 240, height: 80, content: '500M+\nusers worldwide', style: { fontSize: 40, fontWeight: '900', align: 'center', color: '#ffffff', lineHeight: 48 } },
        { id: 'sn5-desc', type: 'text', x: 40, y: 200, width: 200, height: 30, content: 'Join the fastest-growing network', style: { fontSize: 12, fontWeight: '400', align: 'center', color: '#b388ff' } },
        { id: 'sn5-badge', type: 'badge', x: 70, y: 260, width: 140, height: 36, content: 'Download Free', style: { bgColor: '#e040fb', color: '#fff', fontSize: 14, fontWeight: '700', px: 24, py: 10, borderRadius: 100 } },
        { id: 'sn5-badge2', type: 'badge', x: 45, y: 320, width: 80, height: 22, content: '⭐ 4.9', style: { bgColor: 'rgba(255,255,255,0.08)', color: '#e040fb', fontSize: 10, fontWeight: '700', borderRadius: 8 } },
        { id: 'sn5-badge3', type: 'badge', x: 155, y: 320, width: 80, height: 22, content: '#1 Social', style: { bgColor: 'rgba(255,255,255,0.08)', color: '#e040fb', fontSize: 10, fontWeight: '700', borderRadius: 8 } },
      ]
    }),
  ]
}

// ─── FITNESS PRO — Fan of 3 tilted devices ───────────────────
export function buildFitnessPro(t) {
  return [
    // Slide 1: Three devices fanned out showing different screens
    bs(1, {
      backgroundColor: '#1a1a2e', elements: [
        { id: 'fp1-device1', type: 'device', x: -10, y: 60, width: 140, height: 280, style: { rotation: -12 }, screenType: 'fitness' },
        { id: 'fp1-device2', type: 'device', x: 65, y: 30, width: 150, height: 300, style: { rotation: 0 }, screenType: 'fitness' },
        { id: 'fp1-device3', type: 'device', x: 150, y: 60, width: 140, height: 280, style: { rotation: 12 }, screenType: 'fitness' },
        { id: 'fp1-text', type: 'text', x: 20, y: 380, width: 240, height: 50, content: 'Train. Track. Transform.', style: { fontSize: 22, fontWeight: '900', align: 'center', color: '#00e676' } },
        { id: 'fp1-desc', type: 'text', x: 30, y: 435, width: 220, height: 30, content: '500+ workouts • AI coaching • Meal plans', style: { fontSize: 9, fontWeight: '400', align: 'center', color: '#69f0ae' } },
      ]
    }),
    // Slide 2: Single large device with stat badges floating
    bs(2, {
      backgroundColor: '#16213e', elements: [
        { id: 'fp2-device', type: 'device', x: 30, y: 20, width: 220, height: 400, style: { rotation: 0 }, screenType: 'fitness' },
        { id: 'fp2-badge1', type: 'badge', x: 10, y: 80, width: 55, height: 55, content: '🔥\n320 cal', style: { bgColor: 'rgba(0,230,118,0.15)', color: '#00e676', fontSize: 8, fontWeight: '700', borderRadius: 14 } },
        { id: 'fp2-badge2', type: 'badge', x: 215, y: 160, width: 55, height: 55, content: '💪\n45 min', style: { bgColor: 'rgba(0,230,118,0.15)', color: '#00e676', fontSize: 8, fontWeight: '700', borderRadius: 14 } },
        { id: 'fp2-text', type: 'text', x: 20, y: 435, width: 240, height: 30, content: 'Real-time workout tracking', style: { fontSize: 14, fontWeight: '700', align: 'center', color: '#ffffff' } },
      ]
    }),
    // Slide 3: Text-dominant with device peeking from bottom
    bs(3, {
      backgroundColor: '#1a1a2e', elements: [
        { id: 'fp3-text', type: 'text', x: 20, y: 30, width: 240, height: 120, content: 'Your AI\ncoach is\nready', style: { fontSize: 38, fontWeight: '900', align: 'center', color: '#ffffff', lineHeight: 46 } },
        { id: 'fp3-blob', type: 'blob', x: 30, y: 140, width: 220, height: 200, style: { color: '#00e676', opacity: 0.08 } },
        { id: 'fp3-device', type: 'device', x: 50, y: 200, width: 180, height: 320, style: { rotation: 0 }, screenType: 'fitness' },
      ]
    }),
    // Slide 4: Progress ring / stats centered
    bs(4, {
      backgroundColor: '#16213e', elements: [
        { id: 'fp4-blob', type: 'blob', x: 40, y: 80, width: 200, height: 200, style: { color: '#00e676', opacity: 0.12, borderRadius: '50%' } },
        { id: 'fp4-text', type: 'text', x: 50, y: 100, width: 180, height: 80, content: '87%\nGoal reached', style: { fontSize: 44, fontWeight: '900', align: 'center', color: '#00e676', lineHeight: 50 } },
        { id: 'fp4-desc', type: 'text', x: 30, y: 200, width: 220, height: 30, content: 'Smart insights that keep you going', style: { fontSize: 12, fontWeight: '400', align: 'center', color: '#aaa' } },
        { id: 'fp4-device', type: 'device', x: 55, y: 250, width: 170, height: 220, style: { rotation: 0 } },
      ]
    }),
    // Slide 5: Community / before-after split
    bs(5, {
      backgroundColor: '#1a1a2e', elements: [
        { id: 'fp5-badge', type: 'badge', x: 65, y: 20, width: 150, height: 28, content: '🏆 #1 FITNESS APP', style: { bgColor: '#00e676', color: '#000', fontSize: 10, fontWeight: '800', px: 16, py: 6, borderRadius: 100 } },
        { id: 'fp5-device1', type: 'device', x: 10, y: 70, width: 130, height: 260, style: { rotation: -4 } },
        { id: 'fp5-device2', type: 'device', x: 140, y: 70, width: 130, height: 260, style: { rotation: 4 } },
        { id: 'fp5-text', type: 'text', x: 20, y: 350, width: 240, height: 60, content: 'Join 10M+\nfitness lovers', style: { fontSize: 26, fontWeight: '900', align: 'center', color: '#ffffff', lineHeight: 32 } },
        { id: 'fp5-desc', type: 'text', x: 40, y: 420, width: 200, height: 25, content: 'Free to download. No commitments.', style: { fontSize: 10, fontWeight: '400', align: 'center', color: '#69f0ae' } },
      ]
    }),
  ]
}

// ─── MUSIC VIBES — Vinyl/album art inspired ──────────────────
export function buildMusicVibes(t) {
  return [
    // Slide 1: Album art style — large circle blob, device centered
    bs(1, {
      backgroundColor: '#1a0033', elements: [
        { id: 'mv1-blob', type: 'blob', x: 30, y: 50, width: 220, height: 220, style: { color: '#aa00ff', opacity: 0.3, borderRadius: '50%' } },
        { id: 'mv1-blob2', type: 'blob', x: 130, y: 200, width: 180, height: 180, style: { color: '#ff6d00', opacity: 0.15, borderRadius: '50%' } },
        { id: 'mv1-device', type: 'device', x: 55, y: 20, width: 170, height: 340, style: { rotation: 0 }, screenType: 'music' },
        { id: 'mv1-text', type: 'text', x: 20, y: 380, width: 240, height: 50, content: '100M+ tracks.\nZero ads.', style: { fontSize: 22, fontWeight: '900', align: 'center', color: '#ffffff', lineHeight: 28 } },
        { id: 'mv1-desc', type: 'text', x: 50, y: 440, width: 180, height: 20, content: 'Pure music. Pure vibes.', style: { fontSize: 10, fontWeight: '400', align: 'center', color: '#ce93d8' } },
      ]
    }),
    // Slide 2: Waveform style — device tilted with gradient wave
    bs(2, {
      backgroundColor: '#220044', elements: [
        { id: 'mv2-blob', type: 'blob', x: -20, y: 200, width: 320, height: 120, style: { color: '#aa00ff', opacity: 0.2 } },
        { id: 'mv2-text', type: 'text', x: 20, y: 20, width: 240, height: 80, content: 'Discover\nnew sound', style: { fontSize: 36, fontWeight: '900', align: 'center', color: '#ffffff', lineHeight: 42 } },
        { id: 'mv2-device', type: 'device', x: 40, y: 120, width: 200, height: 350, style: { rotation: 5 }, screenType: 'music' },
      ]
    }),
    // Slide 3: Dual device — artist & playlist views
    bs(3, {
      backgroundColor: '#1a0033', elements: [
        { id: 'mv3-text', type: 'text', x: 30, y: 10, width: 220, height: 35, content: 'Offline anywhere', style: { fontSize: 22, fontWeight: '800', align: 'center', color: '#ffffff' } },
        { id: 'mv3-device1', type: 'device', x: 5, y: 60, width: 135, height: 270, style: { rotation: -3 } },
        { id: 'mv3-device2', type: 'device', x: 140, y: 80, width: 135, height: 270, style: { rotation: 3 } },
        { id: 'mv3-badge', type: 'badge', x: 75, y: 360, width: 130, height: 28, content: '📥 Downloaded', style: { bgColor: 'rgba(170,0,255,0.2)', color: '#ce93d8', fontSize: 10, fontWeight: '600', borderRadius: 8 } },
        { id: 'mv3-desc', type: 'text', x: 30, y: 400, width: 220, height: 30, content: 'Your music, even without signal', style: { fontSize: 11, fontWeight: '400', align: 'center', color: '#888' } },
      ]
    }),
    // Slide 4: AI playlist — device with sparkle badges
    bs(4, {
      backgroundColor: '#220044', elements: [
        { id: 'mv4-blob', type: 'blob', x: 50, y: 50, width: 180, height: 180, style: { color: '#ff6d00', opacity: 0.1, borderRadius: '50%' } },
        { id: 'mv4-device', type: 'device', x: 35, y: 50, width: 210, height: 380, style: { rotation: 0 }, screenType: 'music' },
        { id: 'mv4-badge', type: 'badge', x: 10, y: 15, width: 50, height: 50, content: '✨', style: { bgColor: 'rgba(255,109,0,0.2)', fontSize: 24, borderRadius: 100 } },
        { id: 'mv4-badge2', type: 'badge', x: 220, y: 15, width: 50, height: 50, content: '🎵', style: { bgColor: 'rgba(170,0,255,0.2)', fontSize: 24, borderRadius: 100 } },
        { id: 'mv4-text', type: 'text', x: 20, y: 440, width: 240, height: 25, content: 'AI knows your taste', style: { fontSize: 14, fontWeight: '700', align: 'center', color: '#ffffff' } },
      ]
    }),
    // Slide 5: CTA with Hi-Fi badge
    bs(5, {
      backgroundColor: '#1a0033', elements: [
        { id: 'mv5-text', type: 'text', x: 20, y: 60, width: 240, height: 100, content: 'Your\nsoundtrack\nawaits', style: { fontSize: 38, fontWeight: '900', align: 'center', color: '#ffffff', lineHeight: 44 } },
        { id: 'mv5-blob', type: 'blob', x: 50, y: 160, width: 180, height: 180, style: { color: '#aa00ff', opacity: 0.2, borderRadius: '50%' } },
        { id: 'mv5-badge', type: 'badge', x: 55, y: 200, width: 170, height: 40, content: '🎧 Try HI-FI Free', style: { bgColor: '#aa00ff', color: '#fff', fontSize: 14, fontWeight: '700', px: 24, py: 12, borderRadius: 100 } },
        { id: 'mv5-badge2', type: 'badge', x: 80, y: 260, width: 120, height: 22, content: '⭐ 4.8 • 50M+', style: { bgColor: 'rgba(255,255,255,0.06)', color: '#ce93d8', fontSize: 9, fontWeight: '600', borderRadius: 8 } },
      ]
    }),
  ]
}

// ─── CRYPTO DARK — Dashboard/chart-inspired ──────────────────
export function buildCryptoDark(t) {
  return [
    // Slide 1: Device with floating price ticker badges
    bs(1, {
      backgroundColor: '#0b0e11', elements: [
        { id: 'cd1-device', type: 'device', x: 45, y: 30, width: 190, height: 370, style: { rotation: 0 }, screenType: 'dashboard' },
        { id: 'cd1-badge1', type: 'badge', x: 8, y: 50, width: 60, height: 40, content: 'BTC\n+5.2%', style: { bgColor: 'rgba(0,200,83,0.15)', color: '#00c853', fontSize: 9, fontWeight: '700', borderRadius: 10 } },
        { id: 'cd1-badge2', type: 'badge', x: 212, y: 120, width: 60, height: 40, content: 'ETH\n+3.8%', style: { bgColor: 'rgba(0,200,83,0.15)', color: '#00c853', fontSize: 9, fontWeight: '700', borderRadius: 10 } },
        { id: 'cd1-badge3', type: 'badge', x: 8, y: 200, width: 60, height: 40, content: 'SOL\n+12%', style: { bgColor: 'rgba(240,185,11,0.15)', color: '#f0b90b', fontSize: 9, fontWeight: '700', borderRadius: 10 } },
        { id: 'cd1-text', type: 'text', x: 20, y: 420, width: 240, height: 40, content: 'Trade 500+ coins\nlike a pro', style: { fontSize: 18, fontWeight: '800', align: 'center', color: '#ffffff', lineHeight: 22 } },
      ]
    }),
    // Slide 2: Portfolio view — big number centered
    bs(2, {
      backgroundColor: '#0f1318', elements: [
        { id: 'cd2-text', type: 'text', x: 20, y: 30, width: 240, height: 50, content: '$124,839.52', style: { fontSize: 36, fontWeight: '900', align: 'center', color: '#f0b90b' } },
        { id: 'cd2-desc', type: 'text', x: 60, y: 80, width: 160, height: 20, content: 'Portfolio Value • +18.4%', style: { fontSize: 10, fontWeight: '600', align: 'center', color: '#00c853' } },
        { id: 'cd2-device', type: 'device', x: 40, y: 110, width: 200, height: 370, style: { rotation: 0 }, screenType: 'dashboard' },
      ]
    }),
    // Slide 3: Security focused — shield icon, minimal
    bs(3, {
      backgroundColor: '#0b0e11', elements: [
        { id: 'cd3-badge', type: 'badge', x: 95, y: 30, width: 90, height: 90, content: '🔒', style: { bgColor: 'rgba(240,185,11,0.1)', fontSize: 48, borderRadius: 100 } },
        { id: 'cd3-text', type: 'text', x: 20, y: 140, width: 240, height: 60, content: 'Bank-grade\nsecurity', style: { fontSize: 32, fontWeight: '900', align: 'center', color: '#ffffff', lineHeight: 38 } },
        { id: 'cd3-desc', type: 'text', x: 30, y: 210, width: 220, height: 25, content: 'Biometric • 2FA • Cold storage', style: { fontSize: 11, fontWeight: '400', align: 'center', color: '#888' } },
        { id: 'cd3-device', type: 'device', x: 50, y: 250, width: 180, height: 230, style: { rotation: 0 } },
      ]
    }),
    // Slide 4: Staking — split with yield badge
    bs(4, {
      backgroundColor: '#0f1318', elements: [
        { id: 'cd4-device', type: 'device', x: 10, y: 20, width: 160, height: 320, style: { rotation: -3 } },
        { id: 'cd4-text', type: 'text', x: 150, y: 50, width: 120, height: 80, content: 'Earn\nup to\n12% APY', style: { fontSize: 24, fontWeight: '900', align: 'left', color: '#f0b90b', lineHeight: 30 } },
        { id: 'cd4-desc', type: 'text', x: 150, y: 150, width: 120, height: 50, content: 'Stake and earn passive income on 50+ assets', style: { fontSize: 10, fontWeight: '400', align: 'left', color: '#888', lineHeight: 16 } },
        { id: 'cd4-badge', type: 'badge', x: 150, y: 220, width: 100, height: 30, content: 'Start earning', style: { bgColor: '#f0b90b', color: '#000', fontSize: 10, fontWeight: '700', px: 14, py: 8, borderRadius: 8 } },
      ]
    }),
    // Slide 5: Trust/social proof
    bs(5, {
      backgroundColor: '#0b0e11', elements: [
        { id: 'cd5-text', type: 'text', x: 20, y: 100, width: 240, height: 60, content: '$10B+\ndaily volume', style: { fontSize: 40, fontWeight: '900', align: 'center', color: '#ffffff', lineHeight: 46 } },
        { id: 'cd5-blob', type: 'blob', x: 40, y: 80, width: 200, height: 100, style: { color: '#f0b90b', opacity: 0.06 } },
        { id: 'cd5-badge1', type: 'badge', x: 15, y: 200, width: 85, height: 50, content: '🌍\n180 countries', style: { bgColor: 'rgba(240,185,11,0.08)', color: '#f0b90b', fontSize: 8, fontWeight: '600', borderRadius: 12 } },
        { id: 'cd5-badge2', type: 'badge', x: 107, y: 200, width: 65, height: 50, content: '🔐\nInsured', style: { bgColor: 'rgba(240,185,11,0.08)', color: '#f0b90b', fontSize: 8, fontWeight: '600', borderRadius: 12 } },
        { id: 'cd5-badge3', type: 'badge', x: 180, y: 200, width: 85, height: 50, content: '⚡\n0.01s trades', style: { bgColor: 'rgba(240,185,11,0.08)', color: '#f0b90b', fontSize: 8, fontWeight: '600', borderRadius: 12 } },
        { id: 'cd5-cta', type: 'badge', x: 55, y: 280, width: 170, height: 36, content: 'Start trading free', style: { bgColor: '#f0b90b', color: '#000', fontSize: 13, fontWeight: '700', px: 20, py: 10, borderRadius: 100 } },
      ]
    }),
  ]
}
// ─── WEATHER CALM — Panoramic sky, temperature hero ──────────
export function buildWeatherCalm(t) {
  return [
    // Slide 1: Big temperature number centered, device below
    bs(1, {
      backgroundColor: '#e3f2fd', elements: [
        { id: 'wc1-blob', type: 'blob', x: -20, y: -20, width: 320, height: 200, style: { color: '#90caf9', opacity: 0.3 } },
        { id: 'wc1-text', type: 'text', x: 40, y: 30, width: 200, height: 60, content: '72°', style: { fontSize: 72, fontWeight: '900', align: 'center', color: '#0d47a1' } },
        { id: 'wc1-desc', type: 'text', x: 50, y: 95, width: 180, height: 20, content: 'San Francisco • Sunny', style: { fontSize: 12, fontWeight: '500', align: 'center', color: '#42a5f5' } },
        { id: 'wc1-device', type: 'device', x: 45, y: 130, width: 190, height: 340, style: { rotation: 0 } },
      ]
    }),
    // Slide 2: Hourly timeline — device landscape-ish tilted
    bs(2, {
      backgroundColor: '#bbdefb', elements: [
        { id: 'wc2-text', type: 'text', x: 20, y: 20, width: 240, height: 40, content: 'Hour-by-hour precision', style: { fontSize: 22, fontWeight: '800', align: 'center', color: '#0d47a1' } },
        { id: 'wc2-device', type: 'device', x: 30, y: 80, width: 220, height: 380, style: { rotation: -3 } },
      ]
    }),
    // Slide 3: Radar map — full bleed device
    bs(3, {
      backgroundColor: '#e3f2fd', elements: [
        { id: 'wc3-device', type: 'device', x: 15, y: 10, width: 250, height: 440, style: { rotation: 0 } },
        { id: 'wc3-badge', type: 'badge', x: 25, y: 420, width: 230, height: 40, content: '🛰 Live radar & satellite maps', style: { bgColor: 'rgba(13,71,161,0.85)', color: '#fff', fontSize: 12, fontWeight: '700', px: 16, py: 10, borderRadius: 12 } },
      ]
    }),
    // Slide 4: Severe weather alert style
    bs(4, {
      backgroundColor: '#fff3e0', elements: [
        { id: 'wc4-badge', type: 'badge', x: 60, y: 30, width: 160, height: 30, content: '⚠️ SEVERE ALERT', style: { bgColor: '#ff6d00', color: '#fff', fontSize: 12, fontWeight: '800', px: 14, py: 8, borderRadius: 8 } },
        { id: 'wc4-text', type: 'text', x: 30, y: 80, width: 220, height: 60, content: 'Get warned\nbefore it hits', style: { fontSize: 28, fontWeight: '900', align: 'center', color: '#e65100', lineHeight: 34 } },
        { id: 'wc4-device', type: 'device', x: 50, y: 160, width: 180, height: 310, style: { rotation: 0 } },
      ]
    }),
    // Slide 5: Week view — minimal cards
    bs(5, {
      backgroundColor: '#e3f2fd', elements: [
        { id: 'wc5-badge1', type: 'badge', x: 10, y: 30, width: 55, height: 60, content: 'Mon\n☀️ 72°', style: { bgColor: '#fff', color: '#0d47a1', fontSize: 9, fontWeight: '600', borderRadius: 12 } },
        { id: 'wc5-badge2', type: 'badge', x: 72, y: 30, width: 55, height: 60, content: 'Tue\n⛅ 68°', style: { bgColor: '#fff', color: '#0d47a1', fontSize: 9, fontWeight: '600', borderRadius: 12 } },
        { id: 'wc5-badge3', type: 'badge', x: 134, y: 30, width: 55, height: 60, content: 'Wed\n🌧 61°', style: { bgColor: '#fff', color: '#0d47a1', fontSize: 9, fontWeight: '600', borderRadius: 12 } },
        { id: 'wc5-badge4', type: 'badge', x: 196, y: 30, width: 55, height: 60, content: 'Thu\n☀️ 70°', style: { bgColor: '#fff', color: '#0d47a1', fontSize: 9, fontWeight: '600', borderRadius: 12 } },
        { id: 'wc5-text', type: 'text', x: 20, y: 110, width: 240, height: 30, content: '10-day forecast at a glance', style: { fontSize: 14, fontWeight: '700', align: 'center', color: '#1565c0' } },
        { id: 'wc5-device', type: 'device', x: 50, y: 160, width: 180, height: 310, style: { rotation: 0 } },
      ]
    }),
  ]
}

// ─── MEDITATION ZEN — Breathing circle, serene ───────────────
export function buildMeditationZen(t) {
  return [
    // Slide 1: Large calming circle with text inside
    bs(1, {
      backgroundColor: '#f3e5f5', elements: [
        { id: 'mz1-blob', type: 'blob', x: 30, y: 80, width: 220, height: 220, style: { color: '#ce93d8', opacity: 0.3, borderRadius: '50%' } },
        { id: 'mz1-text', type: 'text', x: 50, y: 140, width: 180, height: 60, content: 'Breathe', style: { fontSize: 42, fontWeight: '300', align: 'center', color: '#6a1b9a', letterSpacing: 4 } },
        { id: 'mz1-desc', type: 'text', x: 50, y: 210, width: 180, height: 20, content: 'Find your inner calm', style: { fontSize: 12, fontWeight: '400', align: 'center', color: '#ab47bc' } },
        { id: 'mz1-device', type: 'device', x: 60, y: 280, width: 160, height: 200, style: { rotation: 0 } },
      ]
    }),
    // Slide 2: Full device with soft background
    bs(2, {
      backgroundColor: '#ede7f6', elements: [
        { id: 'mz2-blob', type: 'blob', x: -30, y: 50, width: 160, height: 400, style: { color: '#b39ddb', opacity: 0.15 } },
        { id: 'mz2-blob2', type: 'blob', x: 160, y: 100, width: 160, height: 300, style: { color: '#ce93d8', opacity: 0.12 } },
        { id: 'mz2-device', type: 'device', x: 40, y: 20, width: 200, height: 370, style: { rotation: 0 } },
        { id: 'mz2-text', type: 'text', x: 30, y: 405, width: 220, height: 50, content: 'Sleep stories\nfor deep rest', style: { fontSize: 20, fontWeight: '700', align: 'center', color: '#4a148c', lineHeight: 26 } },
      ]
    }),
    // Slide 3: Timer/breathing exercise — big numbers
    bs(3, {
      backgroundColor: '#f3e5f5', elements: [
        { id: 'mz3-text', type: 'text', x: 50, y: 50, width: 180, height: 70, content: '4-7-8', style: { fontSize: 64, fontWeight: '200', align: 'center', color: '#6a1b9a' } },
        { id: 'mz3-desc', type: 'text', x: 40, y: 130, width: 200, height: 40, content: 'Proven breathing\ntechniques', style: { fontSize: 16, fontWeight: '600', align: 'center', color: '#8e24aa', lineHeight: 22 } },
        { id: 'mz3-device', type: 'device', x: 50, y: 190, width: 180, height: 280, style: { rotation: 0 } },
      ]
    }),
    // Slide 4: Nature sounds — two devices
    bs(4, {
      backgroundColor: '#ede7f6', elements: [
        { id: 'mz4-text', type: 'text', x: 20, y: 15, width: 240, height: 30, content: 'Nature sounds', style: { fontSize: 20, fontWeight: '700', align: 'center', color: '#4a148c' } },
        { id: 'mz4-device1', type: 'device', x: 5, y: 60, width: 135, height: 270, style: { rotation: -3 } },
        { id: 'mz4-device2', type: 'device', x: 140, y: 60, width: 135, height: 270, style: { rotation: 3 } },
        { id: 'mz4-badge', type: 'badge', x: 80, y: 355, width: 120, height: 24, content: '🌿 50+ soundscapes', style: { bgColor: 'rgba(106,27,154,0.1)', color: '#8e24aa', fontSize: 10, fontWeight: '600', borderRadius: 100 } },
        { id: 'mz4-desc', type: 'text', x: 40, y: 395, width: 200, height: 30, content: 'Rain, ocean, forest & more', style: { fontSize: 11, fontWeight: '400', align: 'center', color: '#999' } },
      ]
    }),
    // Slide 5: CTA — serene, centered
    bs(5, {
      backgroundColor: '#f3e5f5', elements: [
        { id: 'mz5-blob', type: 'blob', x: 60, y: 60, width: 160, height: 160, style: { color: '#ce93d8', opacity: 0.25, borderRadius: '50%' } },
        { id: 'mz5-text', type: 'text', x: 30, y: 80, width: 220, height: 80, content: 'Start your\njourney within', style: { fontSize: 30, fontWeight: '700', align: 'center', color: '#4a148c', lineHeight: 38 } },
        { id: 'mz5-badge', type: 'badge', x: 55, y: 200, width: 170, height: 40, content: '🧘 Try 7 Days Free', style: { bgColor: '#8e24aa', color: '#fff', fontSize: 14, fontWeight: '700', px: 20, py: 12, borderRadius: 100 } },
        { id: 'mz5-badge2', type: 'badge', x: 75, y: 260, width: 130, height: 22, content: '⭐ 4.9 • 20M+ users', style: { bgColor: 'rgba(106,27,154,0.08)', color: '#8e24aa', fontSize: 9, fontWeight: '600', borderRadius: 8 } },
      ]
    }),
  ]
}

// ─── PODCAST STUDIO — Waveform, microphone themed ────────────
export function buildPodcastStudio(t) {
  return [
    // Slide 1: Device with audio waveform blob across middle
    bs(1, {
      backgroundColor: '#fff3e0', elements: [
        { id: 'ps1-blob', type: 'blob', x: -20, y: 180, width: 320, height: 80, style: { color: '#ff6d00', opacity: 0.15 } },
        { id: 'ps1-badge', type: 'badge', x: 80, y: 15, width: 120, height: 28, content: '🎙 PODCAST', style: { bgColor: '#e65100', color: '#fff', fontSize: 10, fontWeight: '700', px: 14, py: 6, borderRadius: 100 } },
        { id: 'ps1-device', type: 'device', x: 45, y: 55, width: 190, height: 360, style: { rotation: 0 } },
        { id: 'ps1-text', type: 'text', x: 30, y: 430, width: 220, height: 30, content: '2M+ episodes from top creators', style: { fontSize: 12, fontWeight: '600', align: 'center', color: '#bf360c' } },
      ]
    }),
    // Slide 2: Discovery — horizontal card layout feel
    bs(2, {
      backgroundColor: '#ffe0b2', elements: [
        { id: 'ps2-text', type: 'text', x: 20, y: 20, width: 240, height: 80, content: 'Discover\nyour next\nfavorite show', style: { fontSize: 30, fontWeight: '900', align: 'center', color: '#e65100', lineHeight: 32 } },
        { id: 'ps2-device', type: 'device', x: 30, y: 120, width: 220, height: 350, style: { rotation: 3 } },
      ]
    }),
    // Slide 3: Offline/download — Split
    bs(3, {
      backgroundColor: '#fff3e0', elements: [
        { id: 'ps3-device', type: 'device', x: 15, y: 30, width: 150, height: 300, style: { rotation: -2 } },
        { id: 'ps3-text', type: 'text', x: 150, y: 60, width: 120, height: 80, content: 'Listen\noffline.\nAnytime.', style: { fontSize: 22, fontWeight: '900', align: 'left', color: '#bf360c', lineHeight: 28 } },
        { id: 'ps3-badge', type: 'badge', x: 150, y: 170, width: 100, height: 26, content: '📥 Auto-sync', style: { bgColor: 'rgba(230,81,0,0.1)', color: '#e65100', fontSize: 10, fontWeight: '600', borderRadius: 8 } },
        { id: 'ps3-desc', type: 'text', x: 150, y: 210, width: 115, height: 40, content: 'Episodes downloaded for your commute', style: { fontSize: 9, fontWeight: '400', align: 'left', color: '#999', lineHeight: 14 } },
      ]
    }),
    // Slide 4: Create your show — centered with mic icon
    bs(4, {
      backgroundColor: '#ffe0b2', elements: [
        { id: 'ps4-badge', type: 'badge', x: 95, y: 30, width: 90, height: 90, content: '🎤', style: { bgColor: 'rgba(230,81,0,0.08)', fontSize: 48, borderRadius: 100 } },
        { id: 'ps4-text', type: 'text', x: 20, y: 140, width: 240, height: 60, content: 'Start your\nown show', style: { fontSize: 32, fontWeight: '900', align: 'center', color: '#bf360c', lineHeight: 36 } },
        { id: 'ps4-desc', type: 'text', x: 40, y: 210, width: 200, height: 25, content: 'Record, edit, and publish — all in-app', style: { fontSize: 11, fontWeight: '400', align: 'center', color: '#888' } },
        { id: 'ps4-device', type: 'device', x: 55, y: 250, width: 170, height: 220, style: { rotation: 0 } },
      ]
    }),
    // Slide 5: Trending — stacked cards
    bs(5, {
      backgroundColor: '#fff3e0', elements: [
        { id: 'ps5-badge1', type: 'badge', x: 20, y: 30, width: 240, height: 40, content: '🔥 #1  The Daily Tech Show', style: { bgColor: '#fff', color: '#bf360c', fontSize: 12, fontWeight: '700', px: 14, py: 10, borderRadius: 12 } },
        { id: 'ps5-badge2', type: 'badge', x: 20, y: 80, width: 240, height: 40, content: '📈 #2  Business Breakthrough', style: { bgColor: '#fff', color: '#bf360c', fontSize: 12, fontWeight: '700', px: 14, py: 10, borderRadius: 12 } },
        { id: 'ps5-badge3', type: 'badge', x: 20, y: 130, width: 240, height: 40, content: '🧠 #3  Mindful Morning', style: { bgColor: '#fff', color: '#bf360c', fontSize: 12, fontWeight: '700', px: 14, py: 10, borderRadius: 12 } },
        { id: 'ps5-text', type: 'text', x: 30, y: 190, width: 220, height: 25, content: 'Trending now • Updated daily', style: { fontSize: 11, fontWeight: '500', align: 'center', color: '#888' } },
        { id: 'ps5-device', type: 'device', x: 55, y: 230, width: 170, height: 240, style: { rotation: 0 } },
      ]
    }),
  ]
}

// ─── REAL ESTATE LUXURY — Split property showcase ────────────
export function buildRealEstateLuxury(t) {
  return [
    // Slide 1: Luxury split — text left, device right leaning
    bs(1, {
      backgroundColor: '#1b2838', elements: [
        { id: 're1-text', type: 'text', x: 10, y: 40, width: 130, height: 120, content: 'Find\nyour\ndream\nhome', style: { fontSize: 28, fontWeight: '900', align: 'left', color: '#ffffff', lineHeight: 34 } },
        { id: 're1-desc', type: 'text', x: 10, y: 175, width: 130, height: 40, content: 'Premium listings curated for you', style: { fontSize: 10, fontWeight: '400', align: 'left', color: '#c49b63', lineHeight: 16 } },
        { id: 're1-device', type: 'device', x: 140, y: 20, width: 145, height: 290, style: { rotation: 3 } },
        { id: 're1-badge', type: 'badge', x: 10, y: 230, width: 120, height: 28, content: '🏠 Browse homes', style: { bgColor: '#c49b63', color: '#000', fontSize: 10, fontWeight: '700', px: 12, py: 6, borderRadius: 8 } },
      ]
    }),
    // Slide 2: Virtual tour — immersive full device
    bs(2, {
      backgroundColor: '#0f1923', elements: [
        { id: 're2-text', type: 'text', x: 30, y: 10, width: 220, height: 30, content: '360° Virtual Tours', style: { fontSize: 18, fontWeight: '800', align: 'center', color: '#c49b63' } },
        { id: 're2-device', type: 'device', x: 20, y: 50, width: 240, height: 420, style: { rotation: 0 } },
      ]
    }),
    // Slide 3: Map search — device with location pins
    bs(3, {
      backgroundColor: '#1b2838', elements: [
        { id: 're3-device', type: 'device', x: 40, y: 20, width: 200, height: 370, style: { rotation: 0 } },
        { id: 're3-badge1', type: 'badge', x: 15, y: 100, width: 50, height: 50, content: '📍', style: { bgColor: 'rgba(196,155,99,0.15)', fontSize: 24, borderRadius: 100 } },
        { id: 're3-badge2', type: 'badge', x: 215, y: 180, width: 50, height: 50, content: '📍', style: { bgColor: 'rgba(196,155,99,0.15)', fontSize: 24, borderRadius: 100 } },
        { id: 're3-text', type: 'text', x: 20, y: 410, width: 240, height: 40, content: 'Search by neighborhood', style: { fontSize: 16, fontWeight: '700', align: 'center', color: '#ffffff' } },
      ]
    }),
    // Slide 4: Property stats — cards
    bs(4, {
      backgroundColor: '#0f1923', elements: [
        { id: 're4-badge1', type: 'badge', x: 15, y: 30, width: 120, height: 50, content: '🛏 3 Beds\nfrom $1.2M', style: { bgColor: 'rgba(196,155,99,0.08)', color: '#c49b63', fontSize: 9, fontWeight: '600', borderRadius: 12 } },
        { id: 're4-badge2', type: 'badge', x: 145, y: 30, width: 120, height: 50, content: '🏊 Pool\nWaterfront', style: { bgColor: 'rgba(196,155,99,0.08)', color: '#c49b63', fontSize: 9, fontWeight: '600', borderRadius: 12 } },
        { id: 're4-device', type: 'device', x: 45, y: 100, width: 190, height: 360, style: { rotation: 0 } },
      ]
    }),
    // Slide 5: CTA — Invest
    bs(5, {
      backgroundColor: '#1b2838', elements: [
        { id: 're5-text', type: 'text', x: 20, y: 80, width: 240, height: 80, content: 'Invest\nin your\nfuture', style: { fontSize: 36, fontWeight: '900', align: 'center', color: '#ffffff', lineHeight: 40 } },
        { id: 're5-blob', type: 'blob', x: 50, y: 100, width: 180, height: 100, style: { color: '#c49b63', opacity: 0.08 } },
        { id: 're5-badge', type: 'badge', x: 50, y: 200, width: 180, height: 40, content: 'Start browsing free', style: { bgColor: '#c49b63', color: '#000', fontSize: 13, fontWeight: '700', px: 20, py: 12, borderRadius: 100 } },
        { id: 're5-badge2', type: 'badge', x: 75, y: 260, width: 130, height: 22, content: '🏆 #1 HOMES APP', style: { bgColor: 'rgba(196,155,99,0.08)', color: '#c49b63', fontSize: 9, fontWeight: '600', borderRadius: 8 } },
      ]
    }),
  ]
}

// ─── BANKING SECURE — Split card, finance dashboard ──────────
export function buildBankingSecure(t) {
  return [
    // Slide 1: Card balance hero — big amount centered, device below
    bs(1, {
      backgroundColor: '#0a1628', elements: [
        { id: 'bs1-badge', type: 'badge', x: 75, y: 20, width: 130, height: 28, content: '💳 NEOBANK', style: { bgColor: 'rgba(0,176,255,0.15)', color: '#00b0ff', fontSize: 10, fontWeight: '700', borderRadius: 100 } },
        { id: 'bs1-text', type: 'text', x: 20, y: 60, width: 240, height: 50, content: '$23,482.90', style: { fontSize: 40, fontWeight: '900', align: 'center', color: '#ffffff' } },
        { id: 'bs1-desc', type: 'text', x: 60, y: 110, width: 160, height: 20, content: 'Your balance • Updated live', style: { fontSize: 10, fontWeight: '400', align: 'center', color: '#00b0ff' } },
        { id: 'bs1-device', type: 'device', x: 45, y: 145, width: 190, height: 330, style: { rotation: 0 } },
      ]
    }),
    // Slide 2: Instant transfers — device with speed lines
    bs(2, {
      backgroundColor: '#0d1f3c', elements: [
        { id: 'bs2-blob', type: 'blob', x: -20, y: 180, width: 320, height: 60, style: { color: '#00b0ff', opacity: 0.1 } },
        { id: 'bs2-text', type: 'text', x: 20, y: 20, width: 240, height: 60, content: 'Send money\nin 0.5 seconds', style: { fontSize: 26, fontWeight: '900', align: 'center', color: '#ffffff', lineHeight: 32 } },
        { id: 'bs2-device', type: 'device', x: 40, y: 100, width: 200, height: 370, style: { rotation: 0 } },
      ]
    }),
    // Slide 3: Global — map pins, centered device
    bs(3, {
      backgroundColor: '#0a1628', elements: [
        { id: 'bs3-badge', type: 'badge', x: 95, y: 20, width: 90, height: 28, content: '🌍 GLOBAL', style: { bgColor: 'rgba(0,176,255,0.12)', color: '#00b0ff', fontSize: 10, fontWeight: '700', borderRadius: 100 } },
        { id: 'bs3-text', type: 'text', x: 20, y: 60, width: 240, height: 30, content: 'Zero fees, 180 countries', style: { fontSize: 16, fontWeight: '600', align: 'center', color: '#ffffff' } },
        { id: 'bs3-device', type: 'device', x: 55, y: 110, width: 170, height: 340, style: { rotation: 0 } },
      ]
    }),
    // Slide 4: Budget insights — device left, text right
    bs(4, {
      backgroundColor: '#0d1f3c', elements: [
        { id: 'bs4-device', type: 'device', x: 5, y: 20, width: 155, height: 310, style: { rotation: -2 } },
        { id: 'bs4-text', type: 'text', x: 145, y: 40, width: 125, height: 90, content: 'Know\nwhere\nyour\nmoney\ngoes', style: { fontSize: 20, fontWeight: '900', align: 'left', color: '#ffffff', lineHeight: 22 } },
        { id: 'bs4-badge', type: 'badge', x: 145, y: 155, width: 110, height: 24, content: '📊 Smart budgets', style: { bgColor: 'rgba(0,176,255,0.1)', color: '#00b0ff', fontSize: 9, fontWeight: '600', borderRadius: 8 } },
      ]
    }),
    // Slide 5: Security trust
    bs(5, {
      backgroundColor: '#0a1628', elements: [
        { id: 'bs5-badge', type: 'badge', x: 95, y: 40, width: 90, height: 90, content: '🔐', style: { bgColor: 'rgba(0,176,255,0.08)', fontSize: 48, borderRadius: 100 } },
        { id: 'bs5-text', type: 'text', x: 20, y: 150, width: 240, height: 50, content: 'Bank-level\nencryption', style: { fontSize: 28, fontWeight: '900', align: 'center', color: '#ffffff', lineHeight: 32 } },
        { id: 'bs5-badge1', type: 'badge', x: 20, y: 230, width: 75, height: 45, content: 'FDIC\nInsured', style: { bgColor: 'rgba(0,176,255,0.08)', color: '#00b0ff', fontSize: 8, fontWeight: '600', borderRadius: 10 } },
        { id: 'bs5-badge2', type: 'badge', x: 103, y: 230, width: 75, height: 45, content: '2FA\nEnabled', style: { bgColor: 'rgba(0,176,255,0.08)', color: '#00b0ff', fontSize: 8, fontWeight: '600', borderRadius: 10 } },
        { id: 'bs5-badge3', type: 'badge', x: 186, y: 230, width: 75, height: 45, content: 'Face ID\nReady', style: { bgColor: 'rgba(0,176,255,0.08)', color: '#00b0ff', fontSize: 8, fontWeight: '600', borderRadius: 10 } },
        { id: 'bs5-cta', type: 'badge', x: 50, y: 300, width: 180, height: 36, content: 'Open an account', style: { bgColor: '#00b0ff', color: '#000', fontSize: 13, fontWeight: '700', px: 20, py: 10, borderRadius: 100 } },
      ]
    }),
  ]
}

// ─── PHOTOGRAPHY MINIMAL — Film grid, gallery style ──────────
export function buildPhotographyMinimal(t) {
  return [
    // Slide 1: Clean white — centered device, minimal text
    bs(1, {
      backgroundColor: '#fafafa', elements: [
        { id: 'pm1-device', type: 'device', x: 50, y: 30, width: 180, height: 350, style: { rotation: 0 } },
        { id: 'pm1-text', type: 'text', x: 20, y: 400, width: 240, height: 40, content: 'Capture. Edit. Share.', style: { fontSize: 22, fontWeight: '800', align: 'center', color: '#212121' } },
        { id: 'pm1-desc', type: 'text', x: 40, y: 445, width: 200, height: 20, content: 'Pro tools in your pocket', style: { fontSize: 11, fontWeight: '400', align: 'center', color: '#999' } },
      ]
    }),
    // Slide 2: Tilted to show editing — dynamic angle
    bs(2, {
      backgroundColor: '#f5f5f5', elements: [
        { id: 'pm2-text', type: 'text', x: 20, y: 15, width: 240, height: 30, content: 'AI-powered editing', style: { fontSize: 20, fontWeight: '800', align: 'center', color: '#212121' } },
        { id: 'pm2-device', type: 'device', x: 25, y: 55, width: 230, height: 420, style: { rotation: -5 } },
      ]
    }),
    // Slide 3: Grid of three small devices — before/after style
    bs(3, {
      backgroundColor: '#fafafa', elements: [
        { id: 'pm3-text', type: 'text', x: 20, y: 15, width: 240, height: 25, content: '100+ filters & presets', style: { fontSize: 18, fontWeight: '800', align: 'center', color: '#212121' } },
        { id: 'pm3-device1', type: 'device', x: 5, y: 55, width: 85, height: 170, style: { rotation: 0, borderRadius: 10 } },
        { id: 'pm3-device2', type: 'device', x: 97, y: 55, width: 85, height: 170, style: { rotation: 0, borderRadius: 10 } },
        { id: 'pm3-device3', type: 'device', x: 189, y: 55, width: 85, height: 170, style: { rotation: 0, borderRadius: 10 } },
        { id: 'pm3-desc', type: 'text', x: 30, y: 240, width: 220, height: 20, content: 'From subtle to dramatic, one tap', style: { fontSize: 11, fontWeight: '400', align: 'center', color: '#999' } },
      ]
    }),
    // Slide 4: Export — 4K badge, clean
    bs(4, {
      backgroundColor: '#f5f5f5', elements: [
        { id: 'pm4-badge', type: 'badge', x: 85, y: 30, width: 110, height: 55, content: '4K\nEXPORT', style: { bgColor: '#212121', color: '#fff', fontSize: 18, fontWeight: '900', borderRadius: 14 } },
        { id: 'pm4-text', type: 'text', x: 30, y: 105, width: 220, height: 40, content: 'Share in stunning\nresolution', style: { fontSize: 18, fontWeight: '700', align: 'center', color: '#212121', lineHeight: 22 } },
        { id: 'pm4-device', type: 'device', x: 50, y: 160, width: 180, height: 310, style: { rotation: 0 } },
      ]
    }),
    // Slide 5: Minimal CTA
    bs(5, {
      backgroundColor: '#fafafa', elements: [
        { id: 'pm5-text', type: 'text', x: 20, y: 120, width: 240, height: 60, content: 'Studio quality.\nFree.', style: { fontSize: 34, fontWeight: '900', align: 'center', color: '#212121', lineHeight: 40 } },
        { id: 'pm5-badge', type: 'badge', x: 65, y: 210, width: 150, height: 38, content: 'Get the app', style: { bgColor: '#212121', color: '#fff', fontSize: 14, fontWeight: '700', px: 24, py: 10, borderRadius: 100 } },
        { id: 'pm5-badge2', type: 'badge', x: 75, y: 270, width: 130, height: 22, content: '⭐ Editor\'s Choice', style: { bgColor: 'rgba(33,33,33,0.06)', color: '#616161', fontSize: 10, fontWeight: '600', borderRadius: 8 } },
      ]
    }),
  ]
}


// ─── NEWS FLASH — Breaking news ticker style ─────────────────
export function buildNewsFlash(t) {
  return [
    bs(1, {
      backgroundColor: '#b71c1c', elements: [
        { id: 'nf1-badge', type: 'badge', x: 30, y: 15, width: 220, height: 32, content: '⚡ BREAKING NEWS', style: { bgColor: '#ffffff', color: '#b71c1c', fontSize: 14, fontWeight: '900', px: 20, py: 8, borderRadius: 6 } },
        { id: 'nf1-device', type: 'device', x: 45, y: 60, width: 190, height: 370, style: { rotation: 0 } },
        { id: 'nf1-desc', type: 'text', x: 30, y: 445, width: 220, height: 20, content: 'Real-time updates from 10K+ sources', style: { fontSize: 10, fontWeight: '400', align: 'center', color: '#ffcdd2' } },
      ]
    }),
    bs(2, {
      backgroundColor: '#c62828', elements: [
        { id: 'nf2-badge1', type: 'badge', x: 15, y: 30, width: 250, height: 50, content: '📰 Tech giant unveils new AI chip', style: { bgColor: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 12, fontWeight: '700', px: 14, py: 14, borderRadius: 10 } },
        { id: 'nf2-badge2', type: 'badge', x: 15, y: 90, width: 250, height: 50, content: '🌍 Climate summit reaches agreement', style: { bgColor: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 12, fontWeight: '700', px: 14, py: 14, borderRadius: 10 } },
        { id: 'nf2-badge3', type: 'badge', x: 15, y: 150, width: 250, height: 50, content: '📈 Markets surge to all-time highs', style: { bgColor: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 12, fontWeight: '700', px: 14, py: 14, borderRadius: 10 } },
        { id: 'nf2-text', type: 'text', x: 30, y: 220, width: 220, height: 30, content: 'Personalized feed for you', style: { fontSize: 14, fontWeight: '600', align: 'center', color: '#ffcdd2' } },
        { id: 'nf2-device', type: 'device', x: 55, y: 265, width: 170, height: 210, style: { rotation: 0 } },
      ]
    }),
    bs(3, {
      backgroundColor: '#b71c1c', elements: [
        { id: 'nf3-badge', type: 'badge', x: 95, y: 20, width: 90, height: 90, content: '🤖', style: { bgColor: 'rgba(255,255,255,0.08)', fontSize: 48, borderRadius: 100 } },
        { id: 'nf3-text', type: 'text', x: 20, y: 125, width: 240, height: 50, content: 'AI sorts\\nthe noise', style: { fontSize: 30, fontWeight: '900', align: 'center', color: '#ffffff', lineHeight: 34 } },
        { id: 'nf3-device', type: 'device', x: 50, y: 195, width: 180, height: 280, style: { rotation: 0 } },
      ]
    }),
    bs(4, {
      backgroundColor: '#c62828', elements: [
        { id: 'nf4-text', type: 'text', x: 20, y: 20, width: 240, height: 40, content: 'Video news in 60 seconds', style: { fontSize: 22, fontWeight: '800', align: 'center', color: '#ffffff' } },
        { id: 'nf4-device', type: 'device', x: 30, y: 80, width: 220, height: 390, style: { rotation: 4 } },
      ]
    }),
    bs(5, {
      backgroundColor: '#b71c1c', elements: [
        { id: 'nf5-text', type: 'text', x: 20, y: 100, width: 240, height: 60, content: 'News from\\n180 countries', style: { fontSize: 32, fontWeight: '900', align: 'center', color: '#ffffff', lineHeight: 36 } },
        { id: 'nf5-badge', type: 'badge', x: 55, y: 190, width: 170, height: 38, content: 'Read free', style: { bgColor: '#ffffff', color: '#b71c1c', fontSize: 14, fontWeight: '700', px: 24, py: 10, borderRadius: 100 } },
        { id: 'nf5-badge2', type: 'badge', x: 55, y: 250, width: 75, height: 22, content: '🌍 Global', style: { bgColor: 'rgba(255,255,255,0.08)', color: '#ffcdd2', fontSize: 9, fontWeight: '600', borderRadius: 8 } },
        { id: 'nf5-badge3', type: 'badge', x: 148, y: 250, width: 75, height: 22, content: '⚡ Real-time', style: { bgColor: 'rgba(255,255,255,0.08)', color: '#ffcdd2', fontSize: 9, fontWeight: '600', borderRadius: 8 } },
      ]
    }),
  ]
}

// ─── RIDE GO — Map-first, route-inspired ──────────────────────
export function buildRideGo(t) {
  return [
    bs(1, {
      backgroundColor: '#000000', elements: [
        { id: 'rg1-device', type: 'device', x: 20, y: 10, width: 240, height: 430, style: { rotation: 0 }, screenType: 'dashboard' },
        { id: 'rg1-badge', type: 'badge', x: 60, y: 380, width: 160, height: 50, content: '🚗 ETA: 3 min\\n$8.50', style: { bgColor: '#76ff03', color: '#000', fontSize: 12, fontWeight: '800', px: 16, py: 10, borderRadius: 12 } },
      ]
    }),
    bs(2, {
      backgroundColor: '#0a0a0a', elements: [
        { id: 'rg2-device', type: 'device', x: 10, y: 30, width: 150, height: 300, style: { rotation: -2 } },
        { id: 'rg2-text', type: 'text', x: 150, y: 50, width: 120, height: 80, content: 'Track\\nyour\\ndriver\\nlive', style: { fontSize: 22, fontWeight: '900', align: 'left', color: '#ffffff', lineHeight: 24 } },
        { id: 'rg2-badge', type: 'badge', x: 150, y: 160, width: 110, height: 24, content: '📍 Real-time GPS', style: { bgColor: 'rgba(118,255,3,0.1)', color: '#76ff03', fontSize: 9, fontWeight: '600', borderRadius: 8 } },
      ]
    }),
    bs(3, {
      backgroundColor: '#000000', elements: [
        { id: 'rg3-text', type: 'text', x: 30, y: 15, width: 220, height: 30, content: 'Split the fare', style: { fontSize: 22, fontWeight: '800', align: 'center', color: '#76ff03' } },
        { id: 'rg3-device1', type: 'device', x: 5, y: 60, width: 130, height: 260, style: { rotation: -3 } },
        { id: 'rg3-device2', type: 'device', x: 145, y: 60, width: 130, height: 260, style: { rotation: 3 } },
        { id: 'rg3-desc', type: 'text', x: 30, y: 340, width: 220, height: 30, content: 'Share rides, share costs, share fun', style: { fontSize: 11, fontWeight: '400', align: 'center', color: '#888' } },
      ]
    }),
    bs(4, {
      backgroundColor: '#0a0a0a', elements: [
        { id: 'rg4-badge', type: 'badge', x: 95, y: 20, width: 90, height: 90, content: '📅', style: { bgColor: 'rgba(118,255,3,0.08)', fontSize: 48, borderRadius: 100 } },
        { id: 'rg4-text', type: 'text', x: 20, y: 125, width: 240, height: 50, content: 'Schedule rides\\nahead of time', style: { fontSize: 24, fontWeight: '900', align: 'center', color: '#ffffff', lineHeight: 28 } },
        { id: 'rg4-device', type: 'device', x: 55, y: 195, width: 170, height: 280, style: { rotation: 0 } },
      ]
    }),
    bs(5, {
      backgroundColor: '#000000', elements: [
        { id: 'rg5-text', type: 'text', x: 20, y: 100, width: 240, height: 60, content: '500+ cities.\\nOne tap away.', style: { fontSize: 32, fontWeight: '900', align: 'center', color: '#ffffff', lineHeight: 36 } },
        { id: 'rg5-badge', type: 'badge', x: 55, y: 190, width: 170, height: 40, content: 'Ride now', style: { bgColor: '#76ff03', color: '#000', fontSize: 14, fontWeight: '700', px: 24, py: 12, borderRadius: 100 } },
      ]
    }),
  ]
}

// ─── RECIPE KITCHEN — Step cards, ingredient focus ────────────
export function buildRecipeKitchen(t) {
  return [
    bs(1, {
      backgroundColor: '#fce4ec', elements: [
        { id: 'rk1-blob', type: 'blob', x: 30, y: 30, width: 220, height: 220, style: { color: '#e91e63', opacity: 0.1, borderRadius: '50%' } },
        { id: 'rk1-device', type: 'device', x: 45, y: 20, width: 190, height: 370, style: { rotation: 0 }, screenType: 'ecommerce' },
        { id: 'rk1-badge', type: 'badge', x: 60, y: 400, width: 160, height: 50, content: '🍳 50K+ recipes\\nfrom world-class chefs', style: { bgColor: '#c2185b', color: '#fff', fontSize: 10, fontWeight: '700', px: 14, py: 10, borderRadius: 12 } },
      ]
    }),
    bs(2, {
      backgroundColor: '#f8bbd0', elements: [
        { id: 'rk2-badge1', type: 'badge', x: 15, y: 20, width: 250, height: 40, content: '① Prep your ingredients', style: { bgColor: '#fff', color: '#880e4f', fontSize: 13, fontWeight: '700', px: 14, py: 10, borderRadius: 10 } },
        { id: 'rk2-badge2', type: 'badge', x: 15, y: 70, width: 250, height: 40, content: '② Follow the video guide', style: { bgColor: '#fff', color: '#880e4f', fontSize: 13, fontWeight: '700', px: 14, py: 10, borderRadius: 10 } },
        { id: 'rk2-badge3', type: 'badge', x: 15, y: 120, width: 250, height: 40, content: '③ Plate & enjoy!', style: { bgColor: '#fff', color: '#880e4f', fontSize: 13, fontWeight: '700', px: 14, py: 10, borderRadius: 10 } },
        { id: 'rk2-device', type: 'device', x: 55, y: 185, width: 170, height: 280, style: { rotation: 0 }, screenType: 'ecommerce' },
      ]
    }),
    bs(3, {
      backgroundColor: '#fce4ec', elements: [
        { id: 'rk3-text', type: 'text', x: 20, y: 15, width: 240, height: 35, content: 'Weekly meal planner', style: { fontSize: 20, fontWeight: '800', align: 'center', color: '#880e4f' } },
        { id: 'rk3-device1', type: 'device', x: 5, y: 65, width: 135, height: 270, style: { rotation: -3 } },
        { id: 'rk3-device2', type: 'device', x: 140, y: 65, width: 135, height: 270, style: { rotation: 3 } },
      ]
    }),
    bs(4, {
      backgroundColor: '#f8bbd0', elements: [
        { id: 'rk4-text', type: 'text', x: 20, y: 20, width: 240, height: 60, content: 'Smart\\nshopping list', style: { fontSize: 30, fontWeight: '900', align: 'center', color: '#880e4f', lineHeight: 34 } },
        { id: 'rk4-device', type: 'device', x: 40, y: 100, width: 200, height: 370, style: { rotation: 0 }, screenType: 'ecommerce' },
      ]
    }),
    bs(5, {
      backgroundColor: '#fce4ec', elements: [
        { id: 'rk5-text', type: 'text', x: 20, y: 80, width: 240, height: 80, content: 'Cooking made\\njoyful', style: { fontSize: 34, fontWeight: '900', align: 'center', color: '#880e4f', lineHeight: 40 } },
        { id: 'rk5-badge', type: 'badge', x: 55, y: 200, width: 170, height: 40, content: '👨‍🍳 Start cooking', style: { bgColor: '#c2185b', color: '#fff', fontSize: 14, fontWeight: '700', px: 20, py: 12, borderRadius: 100 } },
        { id: 'rk5-badge2', type: 'badge', x: 80, y: 260, width: 120, height: 22, content: '⭐ 4.8 • 5M chefs', style: { bgColor: 'rgba(194,24,91,0.08)', color: '#c2185b', fontSize: 9, fontWeight: '600', borderRadius: 8 } },
      ]
    }),
  ]
}

// ─── LANGUAGE LEARN — Streak counter, gamified ───────────────
export function buildLanguageLearn(t) {
  return [
    bs(1, {
      backgroundColor: '#e8f5e9', elements: [
        { id: 'll1-badge1', type: 'badge', x: 10, y: 30, width: 45, height: 45, content: '🇫🇷', style: { bgColor: '#fff', fontSize: 22, borderRadius: 100 } },
        { id: 'll1-badge2', type: 'badge', x: 65, y: 15, width: 45, height: 45, content: '🇯🇵', style: { bgColor: '#fff', fontSize: 22, borderRadius: 100 } },
        { id: 'll1-badge3', type: 'badge', x: 170, y: 15, width: 45, height: 45, content: '🇪🇸', style: { bgColor: '#fff', fontSize: 22, borderRadius: 100 } },
        { id: 'll1-badge4', type: 'badge', x: 225, y: 30, width: 45, height: 45, content: '🇩🇪', style: { bgColor: '#fff', fontSize: 22, borderRadius: 100 } },
        { id: 'll1-device', type: 'device', x: 50, y: 80, width: 180, height: 340, style: { rotation: 0 }, screenType: 'app-store' },
        { id: 'll1-text', type: 'text', x: 20, y: 435, width: 240, height: 25, content: '40+ languages. 5 min a day.', style: { fontSize: 14, fontWeight: '700', align: 'center', color: '#1b5e20' } },
      ]
    }),
    bs(2, {
      backgroundColor: '#c8e6c9', elements: [
        { id: 'll2-blob', type: 'blob', x: 40, y: 60, width: 200, height: 200, style: { color: '#4caf50', opacity: 0.15, borderRadius: '50%' } },
        { id: 'll2-text', type: 'text', x: 30, y: 70, width: 220, height: 80, content: '🔥 127\\nday streak', style: { fontSize: 44, fontWeight: '900', align: 'center', color: '#1b5e20', lineHeight: 50 } },
        { id: 'll2-desc', type: 'text', x: 40, y: 170, width: 200, height: 25, content: 'Gamified learning keeps you going', style: { fontSize: 12, fontWeight: '400', align: 'center', color: '#43a047' } },
        { id: 'll2-device', type: 'device', x: 55, y: 220, width: 170, height: 250, style: { rotation: 0 } },
      ]
    }),
    bs(3, {
      backgroundColor: '#e8f5e9', elements: [
        { id: 'll3-text', type: 'text', x: 30, y: 20, width: 220, height: 30, content: 'Your AI tutor', style: { fontSize: 22, fontWeight: '800', align: 'center', color: '#1b5e20' } },
        { id: 'll3-device', type: 'device', x: 35, y: 65, width: 210, height: 400, style: { rotation: 0 } },
      ]
    }),
    bs(4, {
      backgroundColor: '#c8e6c9', elements: [
        { id: 'll4-device', type: 'device', x: 15, y: 20, width: 155, height: 310, style: { rotation: -2 } },
        { id: 'll4-text', type: 'text', x: 155, y: 40, width: 115, height: 80, content: 'See your\\nprogress\\ngrow', style: { fontSize: 20, fontWeight: '900', align: 'left', color: '#1b5e20', lineHeight: 24 } },
        { id: 'll4-badge1', type: 'badge', x: 155, y: 140, width: 100, height: 24, content: '📊 B2 Level', style: { bgColor: 'rgba(46,125,50,0.1)', color: '#2e7d32', fontSize: 10, fontWeight: '600', borderRadius: 8 } },
        { id: 'll4-badge2', type: 'badge', x: 155, y: 175, width: 100, height: 24, content: '✅ 2,400 words', style: { bgColor: 'rgba(46,125,50,0.1)', color: '#2e7d32', fontSize: 10, fontWeight: '600', borderRadius: 8 } },
      ]
    }),
    bs(5, {
      backgroundColor: '#e8f5e9', elements: [
        { id: 'll5-text', type: 'text', x: 20, y: 90, width: 240, height: 70, content: 'Learn for free.\\nForever.', style: { fontSize: 32, fontWeight: '900', align: 'center', color: '#1b5e20', lineHeight: 36 } },
        { id: 'll5-badge', type: 'badge', x: 55, y: 190, width: 170, height: 40, content: '🎓 Start learning', style: { bgColor: '#2e7d32', color: '#fff', fontSize: 14, fontWeight: '700', px: 20, py: 12, borderRadius: 100 } },
      ]
    }),
  ]
}

// ─── TASK PLANNER — Kanban board, productivity ───────────────
export function buildTaskPlanner(t) {
  return [
    bs(1, {
      backgroundColor: '#263238', elements: [
        { id: 'tp1-badge1', type: 'badge', x: 10, y: 20, width: 80, height: 30, content: '📋 To Do', style: { bgColor: 'rgba(255,110,64,0.15)', color: '#ff6e40', fontSize: 10, fontWeight: '700', borderRadius: 8 } },
        { id: 'tp1-badge2', type: 'badge', x: 100, y: 20, width: 80, height: 30, content: '🔨 Doing', style: { bgColor: 'rgba(255,167,38,0.15)', color: '#ffa726', fontSize: 10, fontWeight: '700', borderRadius: 8 } },
        { id: 'tp1-badge3', type: 'badge', x: 190, y: 20, width: 80, height: 30, content: '✅ Done', style: { bgColor: 'rgba(102,187,106,0.15)', color: '#66bb6a', fontSize: 10, fontWeight: '700', borderRadius: 8 } },
        { id: 'tp1-device', type: 'device', x: 35, y: 65, width: 210, height: 400, style: { rotation: 0 }, screenType: 'dashboard' },
      ]
    }),
    bs(2, {
      backgroundColor: '#37474f', elements: [
        { id: 'tp2-text', type: 'text', x: 20, y: 15, width: 240, height: 30, content: 'Team collaboration', style: { fontSize: 20, fontWeight: '800', align: 'center', color: '#ffffff' } },
        { id: 'tp2-device1', type: 'device', x: 10, y: 60, width: 130, height: 260, style: { rotation: -4 } },
        { id: 'tp2-device2', type: 'device', x: 140, y: 60, width: 130, height: 260, style: { rotation: 4 } },
        { id: 'tp2-badge', type: 'badge', x: 75, y: 340, width: 130, height: 26, content: '⚡ Real-time sync', style: { bgColor: 'rgba(255,110,64,0.15)', color: '#ff6e40', fontSize: 10, fontWeight: '600', borderRadius: 8 } },
      ]
    }),
    bs(3, {
      backgroundColor: '#263238', elements: [
        { id: 'tp3-badge', type: 'badge', x: 95, y: 20, width: 90, height: 90, content: '🔔', style: { bgColor: 'rgba(255,110,64,0.08)', fontSize: 48, borderRadius: 100 } },
        { id: 'tp3-text', type: 'text', x: 20, y: 125, width: 240, height: 50, content: 'Never miss\\na deadline', style: { fontSize: 28, fontWeight: '900', align: 'center', color: '#ffffff', lineHeight: 30 } },
        { id: 'tp3-device', type: 'device', x: 55, y: 195, width: 170, height: 280, style: { rotation: 0 } },
      ]
    }),
    bs(4, {
      backgroundColor: '#37474f', elements: [
        { id: 'tp4-text', type: 'text', x: 20, y: 15, width: 240, height: 30, content: 'Plan your day, week, month', style: { fontSize: 16, fontWeight: '700', align: 'center', color: '#ff8a65' } },
        { id: 'tp4-device', type: 'device', x: 20, y: 55, width: 240, height: 420, style: { rotation: 0 } },
      ]
    }),
    bs(5, {
      backgroundColor: '#263238', elements: [
        { id: 'tp5-text', type: 'text', x: 20, y: 80, width: 240, height: 70, content: 'Ship faster.\\nStress less.', style: { fontSize: 30, fontWeight: '900', align: 'center', color: '#ffffff', lineHeight: 36 } },
        { id: 'tp5-badge1', type: 'badge', x: 20, y: 180, width: 120, height: 40, content: '📈 3x more\\nproductive', style: { bgColor: 'rgba(255,110,64,0.08)', color: '#ff6e40', fontSize: 9, fontWeight: '600', borderRadius: 10 } },
        { id: 'tp5-badge2', type: 'badge', x: 150, y: 180, width: 110, height: 40, content: '🔄 Integrates\\n50+ tools', style: { bgColor: 'rgba(255,110,64,0.08)', color: '#ff6e40', fontSize: 9, fontWeight: '600', borderRadius: 10 } },
        { id: 'tp5-cta', type: 'badge', x: 50, y: 250, width: 180, height: 38, content: '🚀 Try free', style: { bgColor: '#ff6e40', color: '#000', fontSize: 14, fontWeight: '700', px: 20, py: 10, borderRadius: 100 } },
      ]
    }),
  ]
}

import { MOCKUP_BUILDERS } from './mockupBuilders'

export const BUILDERS = {
  'social-neon': buildSocialNeon,
  'fitness-pro': buildFitnessPro,
  'music-vibes': buildMusicVibes,
  'crypto-dark': buildCryptoDark,
  'weather-calm': buildWeatherCalm,
  'meditation-zen': buildMeditationZen,
  'podcast-studio': buildPodcastStudio,
  'real-estate-luxury': buildRealEstateLuxury,
  'banking-secure': buildBankingSecure,
  'photography-minimal': buildPhotographyMinimal,
  'news-flash': buildNewsFlash,
  'ride-go': buildRideGo,
  'recipe-kitchen': buildRecipeKitchen,
  'language-learn': buildLanguageLearn,
  'task-planner': buildTaskPlanner,
  ...MOCKUP_BUILDERS,
}

