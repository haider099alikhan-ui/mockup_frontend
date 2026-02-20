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

import { MOCKUP_BUILDERS } from './mockupBuilders'

export const BUILDERS = {
  'sports-blue': buildSportsBlue,
  'streaming-dark': buildStreamingDark,
  'education-purple': buildEducationPurple,
  'finance-yellow': buildFinanceYellow,
  'shopping-white': buildShoppingWhite,
  'health-green': buildHealthGreen,
  'travel-orange': buildTravelOrange,
  'food-red': buildFoodRed,
  'art-gallery-light': buildArtGalleryLight,
  'strevo-streaming': buildStrevoStreaming,
  ...MOCKUP_BUILDERS,
}
