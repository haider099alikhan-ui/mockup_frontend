const bs = (id, overrides = {}) => ({
  id,
  backgroundColor: '#1b00f6',
  elements: [],
  ...overrides,
})

// ─── CLEAN COVER ────────────────────────────────────────────────
export function buildMockupCleanCover(t) {
  return [
    bs(1, {
      backgroundColor: '#1C1C1C',
      width: 1440,
      height: 900,
      elements: [
        // Left column - Button: mt-[83px] mr-[60px] mb-[77px] bg-[#0065FF] text-[41px]
        { id: 'cc1-button', type: 'badge', x: 253, y: 140, width: 350, height: 95, content: 'Free and updated', style: { bgColor: '#0065FF', color: '#ffffff', fontSize: 41, fontWeight: '700', borderRadius: 23, px: 34, py: 22, textTransform: 'none', letterSpacing: '0' } },

        // Mockup Image: w-[765px] h-[321px]
        { id: 'cc1-image-1', type: 'image', x: 253, y: 311, width: 765, height: 321, src: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/AhF12Z083b/d0j8m3mm_expires_30_days.png', style: { objectFit: 'fill' } },

        // Text below image: text-[#666666] text-[39px]
        { id: 'cc1-text', type: 'text', x: 253, y: 656, width: 600, height: 50, content: 'Very clean and easy to use', style: { fontSize: 39, fontWeight: '400', color: '#666666', align: 'left' } },

        // Smaller bottom image: w-[254px] h-[43px]
        { id: 'cc1-image-2', type: 'image', x: 253, y: 782, width: 254, height: 43, src: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/AhF12Z083b/3psvwg21_expires_30_days.png', style: { objectFit: 'fill' } },

        // Vertical lines (Right side) - w-[3px] bg-[#C8C9C4]
        { id: 'cc1-line1', type: 'blob', x: 1078, y: 249, width: 3, height: 32, style: { color: '#C8C9C4', opacity: 1, borderRadius: '1px' } },
        { id: 'cc1-line2', type: 'blob', x: 1078, y: 306, width: 3, height: 60, style: { color: '#C8C9C4', opacity: 1, borderRadius: '1px' } },
        { id: 'cc1-line3', type: 'blob', x: 1078, y: 380, width: 3, height: 60, style: { color: '#C8C9C4', opacity: 1, borderRadius: '1px' } },
        { id: 'cc1-line4', type: 'blob', x: 1480, y: 56, width: 3, height: 101, style: { color: '#C8C9C4', opacity: 1, borderRadius: '1px' } },

        // Floating Dots - right area
        { id: 'cc1-dot1', type: 'blob', x: 1085, y: 174, width: 5, height: 6, style: { color: '#E4E4E3', opacity: 0.64 } },
        { id: 'cc1-dot2', type: 'blob', x: 1085, y: 180, width: 5, height: 4, style: { color: '#9AA8B1', opacity: 0.5 } },
        { id: 'cc1-dot3', type: 'blob', x: 1078, y: 792, width: 5, height: 5, style: { color: '#E4E4E3', opacity: 0.64 } },
        { id: 'cc1-dot4', type: 'blob', x: 1078, y: 808, width: 5, height: 4, style: { color: '#9AA8B1', opacity: 0.5 } },

        // Store App Logo & Layout
        { id: 'cc1-store-bg', type: 'image', x: 1078, y: 184, width: 300, height: 607, src: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/AhF12Z083b/z97z7fs2_expires_30_days.png', style: { objectFit: 'fill' } },
        { id: 'cc1-store-bottom', type: 'image', x: 749, y: 754, width: 300, height: 150, src: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/AhF12Z083b/zfhejqrs_expires_30_days.png', style: { objectFit: 'fill' } },
        { id: 'cc1-store-rating', type: 'image', x: 887, y: 799, width: 91, height: 25, src: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/AhF12Z083b/u88u89rk_expires_30_days.png', style: { objectFit: 'fill' } },
        { id: 'cc1-store-icon', type: 'image', x: 1229, y: 224, width: 27, height: 27, src: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/AhF12Z083b/yvrjw79e_expires_30_days.png', style: { objectFit: 'fill' } },
        { id: 'cc1-store-name', type: 'image', x: 1272, y: 266, width: 14, height: 21, src: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/AhF12Z083b/gxgaoa7e_expires_30_days.png', style: { objectFit: 'fill' } },
      ],
    }),
  ]
}

// ─── IPHONE 14 PRO MOCKUPS (from Figma) ───────────────────────
export function buildMockupIphone14Pro(t) {
  return [
    bs(1, {
      backgroundColor: '#2D2D2D',
      width: 1440,
      height: 900,
      elements: [
        // Left: Blue CTA button
        { id: 'ip14-button', type: 'badge', x: 120, y: 200, width: 320, height: 70, content: 'Free and updated', style: { bgColor: '#0065FF', color: '#ffffff', fontSize: 28, fontWeight: '700', borderRadius: 23, px: 34, py: 20, textTransform: 'none', letterSpacing: '0' } },
        // Left: Tagline
        { id: 'ip14-text', type: 'text', x: 120, y: 320, width: 420, height: 56, content: 'Very clean and easy to use', style: { fontSize: 26, fontWeight: '400', color: '#B0B0B0', align: 'left' } },
        // Left: 5-star rating hint
        { id: 'ip14-stars', type: 'text', x: 120, y: 400, width: 200, height: 40, content: '⭐⭐⭐⭐⭐', style: { fontSize: 28, align: 'left' } },
        // Right: Two device mockups (angled, overlapping) – iPhone 14 Pro style
        { id: 'ip14-device1', type: 'device', x: 680, y: 80, width: 280, height: 580, style: { rotation: -8 }, screenType: 'music' },
        { id: 'ip14-device2', type: 'device', x: 880, y: 160, width: 260, height: 540, style: { rotation: 6 }, screenType: 'music' },
      ],
    }),
  ]
}

// ─── PREMIUM REVIEWS (DARK) ───────────────────────────────────
export function buildMockupPremiumReviews(t) {
  return [
    bs(1, {
      backgroundColor: '#0F172A', // Deep slate blue/black
      width: 1440,
      height: 900,
      elements: [
        // Glowing background blobs
        { id: 'pr-blob1', type: 'blob', x: -100, y: -100, width: 600, height: 600, style: { color: '#3B82F6', opacity: 0.15 } },
        { id: 'pr-blob2', type: 'blob', x: 900, y: 500, width: 800, height: 800, style: { color: '#8B5CF6', opacity: 0.15 } },

        // Text Content (Left side)
        { id: 'pr-badge', type: 'badge', x: 200, y: 260, width: 280, height: 46, content: 'TRUSTED BY 100K+ USERS', style: { bgColor: 'rgba(56, 189, 248, 0.1)', color: '#38BDF8', fontSize: 14, fontWeight: '700', borderRadius: 100, px: 20, py: 10 } },
        { id: 'pr-title', type: 'text', x: 200, y: 340, width: 600, height: 200, content: 'Loved by\nthousands.', style: { fontSize: 82, fontWeight: '800', color: '#FFFFFF', align: 'left', lineHeight: 110 } },
        { id: 'pr-subtitle', type: 'text', x: 200, y: 560, width: 500, height: 60, content: 'The highest rated app in its category.', style: { fontSize: 24, fontWeight: '400', color: '#94A3B8', align: 'left' } },

        // 5-Star Rating Visual
        { id: 'pr-stars', type: 'text', x: 200, y: 640, width: 300, height: 60, content: '⭐⭐⭐⭐⭐', style: { fontSize: 48, align: 'left' } },
        { id: 'pr-rating-text', type: 'text', x: 440, y: 650, width: 200, height: 40, content: '5.0 Rating', style: { fontSize: 24, fontWeight: '700', color: '#FCD34D', align: 'left' } },

        // Device Mockup (Right side)
        { id: 'pr-device', type: 'device', x: 800, y: 120, width: 320, height: 660, style: { rotation: -5 } },
      ],
    }),
  ]
}

// ─── TRUSTED ELEGANCE (LIGHT) ─────────────────────────────────
export function buildMockupTrustedElegance(t) {
  return [
    bs(1, {
      backgroundColor: '#F8FAFC', // Off-white/light-grey
      width: 1440,
      height: 900,
      elements: [
        // Clean geometric accents
        { id: 'te-blob1', type: 'blob', x: 1100, y: -200, width: 600, height: 600, style: { color: '#E2E8F0', opacity: 0.5 } },
        { id: 'te-blob2', type: 'blob', x: -50, y: 600, width: 400, height: 400, style: { color: '#F1F5F9', opacity: 0.8 } },

        // Text Content (Centered/Top)
        { id: 'te-title', type: 'text', x: 420, y: 120, width: 600, height: 100, content: 'Industry Leading Experience', style: { fontSize: 46, fontWeight: '800', color: '#0F172A', align: 'center' } },
        { id: 'te-subtitle', type: 'text', x: 420, y: 220, width: 600, height: 60, content: 'Join the community of satisfied professionals.', style: { fontSize: 22, fontWeight: '400', color: '#64748B', align: 'center' } },

        // Central 5-Star Rating Box
        { id: 'te-box', type: 'badge', x: 520, y: 300, width: 400, height: 90, content: '⭐⭐⭐⭐⭐ 5.0 out of 5', style: { bgColor: '#FFFFFF', color: '#0F172A', fontSize: 24, fontWeight: '700', borderRadius: 24, px: 30, py: 20 } },

        // Device Mockups (Side by side below)
        { id: 'te-device1', type: 'device', x: 280, y: 460, width: 300, height: 620, style: { rotation: -3 } },
        { id: 'te-device2', type: 'device', x: 860, y: 480, width: 300, height: 620, style: { rotation: 4 } },
      ],
    }),
  ]
}

// ─── VIBRANT SUCCESS (GRADIENT) ───────────────────────────────
export function buildMockupVibrantSuccess(t) {
  return [
    bs(1, {
      backgroundColor: '#FF6B6B', // This will be overridden by elements, but serves as fallback
      width: 1440,
      height: 900,
      elements: [
        // Full screen vibrant gradient blobs to simulate gradient background
        { id: 'vs-bg1', type: 'blob', x: -200, y: -200, width: 1800, height: 1300, style: { color: '#FF416C', opacity: 1, borderRadius: '0px' } },
        { id: 'vs-bg2', type: 'blob', x: 600, y: -100, width: 1200, height: 1200, style: { color: '#FF4B2B', opacity: 1 } },

        // Floating decorative elements
        { id: 'vs-dec1', type: 'badge', x: 100, y: 150, width: 60, height: 60, content: '✨', style: { bgColor: 'rgba(255,255,255,0.2)', fontSize: 30, borderRadius: 100 } },
        { id: 'vs-dec2', type: 'badge', x: 1250, y: 700, width: 80, height: 80, content: '🔥', style: { bgColor: 'rgba(255,255,255,0.2)', fontSize: 40, borderRadius: 100 } },

        // Big Text (Left)
        { id: 'vs-title', type: 'text', x: 160, y: 280, width: 500, height: 180, content: 'The #1\nChoice', style: { fontSize: 96, fontWeight: '900', color: '#FFFFFF', align: 'left', lineHeight: 100 } },

        // Massive 5-Star Block
        { id: 'vs-stars', type: 'text', x: 160, y: 500, width: 400, height: 80, content: '⭐⭐⭐⭐⭐', style: { fontSize: 64, align: 'left' } },
        { id: 'vs-rating-text', type: 'text', x: 165, y: 600, width: 400, height: 60, content: 'RATED 5 OUT OF 5', style: { fontSize: 32, fontWeight: '800', color: '#FFFFFF', align: 'left' } },

        // Device Mockup (Right)
        { id: 'vs-device', type: 'device', x: 850, y: 80, width: 360, height: 740, style: { rotation: 0 } },
      ],
    }),
  ]
}

// ─── DATING APP (MATCH MADE) ──────────────────────────────────
export function buildMockupDatingApp(t) {
  return [
    bs(1, {
      backgroundColor: '#FFEBEE', // Soft pink background
      width: 1440,
      height: 900,
      elements: [
        // Romantic gradient background blob
        { id: 'da-blob1', type: 'blob', x: -100, y: -200, width: 800, height: 800, style: { color: '#FF758C', opacity: 0.3 } },
        { id: 'da-blob2', type: 'blob', x: 800, y: 300, width: 900, height: 900, style: { color: '#FF7EB3', opacity: 0.25 } },

        // Floating decorative badges (hearts/matches)
        { id: 'da-dec1', type: 'badge', x: 150, y: 200, width: 70, height: 70, content: '💖', style: { bgColor: '#FFFFFF', fontSize: 36, borderRadius: 100 } },
        { id: 'da-dec2', type: 'badge', x: 600, y: 700, width: 80, height: 80, content: '🔥', style: { bgColor: '#FFFFFF', fontSize: 40, borderRadius: 100 } },
        { id: 'da-badge', type: 'badge', x: 180, y: 320, width: 200, height: 46, content: 'NEW MATCHES DAILY', style: { bgColor: '#FF4B2B', color: '#FFFFFF', fontSize: 13, fontWeight: '700', borderRadius: 100, px: 20, py: 10 } },

        // Text Content (Left side)
        { id: 'da-title', type: 'text', x: 180, y: 390, width: 600, height: 160, content: 'Find your\nperfect match.', style: { fontSize: 72, fontWeight: '900', color: '#333333', align: 'left', lineHeight: 90 } },
        { id: 'da-subtitle', type: 'text', x: 180, y: 580, width: 450, height: 80, content: 'Join millions of users finding love every single day.', style: { fontSize: 24, fontWeight: '400', color: '#666666', align: 'left', lineHeight: 36 } },

        // Device Mockups (Overlap on the right)
        { id: 'da-device1', type: 'device', x: 820, y: 150, width: 340, height: 680, style: { rotation: -6 } },
        { id: 'da-device2', type: 'device', x: 1040, y: 220, width: 320, height: 640, style: { rotation: 8 } },
      ],
    }),
  ]
}

// ─── E-COMMERCE (SHOP SEAMLESS) ───────────────────────────────
export function buildMockupEcommerceApp(t) {
  return [
    bs(1, {
      backgroundColor: '#F0F4F8', // Crisp cool light-gray
      width: 1440,
      height: 900,
      elements: [
        // Architectural/minimal background shapes
        { id: 'ec-blob1', type: 'blob', x: -300, y: 400, width: 1000, height: 1000, style: { color: '#E2E8F0', opacity: 0.6, borderRadius: '40px' } },
        { id: 'ec-blob2', type: 'badge', x: 900, y: -200, width: 800, height: 800, content: '', style: { bgColor: '#FFFFFF', borderRadius: 999, opacity: 0.4 } },

        // E-commerce floating tags
        { id: 'ec-tag1', type: 'badge', x: 680, y: 240, width: 140, height: 50, content: '🏷️ SALE 50%', style: { bgColor: '#10B981', color: '#FFFFFF', fontSize: 16, fontWeight: '700', borderRadius: 12, px: 18, py: 12 } },
        { id: 'ec-tag2', type: 'badge', x: 1220, y: 650, width: 160, height: 50, content: '📦 FREE SHIP', style: { bgColor: '#3B82F6', color: '#FFFFFF', fontSize: 16, fontWeight: '700', borderRadius: 12, px: 20, py: 12 } },

        // Text Content (Centered, pushing left)
        { id: 'ec-title', type: 'text', x: 150, y: 320, width: 550, height: 180, content: 'Shop the\nlatest trends.', style: { fontSize: 80, fontWeight: '800', color: '#111827', align: 'left', lineHeight: 90 } },
        { id: 'ec-subtitle', type: 'text', x: 150, y: 520, width: 500, height: 80, content: 'Fast checkout, secure payments, and global shipping to your door.', style: { fontSize: 24, fontWeight: '400', color: '#4B5563', align: 'left', lineHeight: 36 } },

        // Prominent Single Device Mockup (Product Page focus)
        { id: 'ec-device', type: 'device', x: 780, y: 80, width: 380, height: 780, style: { rotation: 0 } },
      ],
    }),
  ]
}

// ─── SHOP FILMSTRIP (5-PANEL E-COMMERCE) ──────────────────────
// Inspired by a horizontal filmstrip of App Store screenshots:
// Slide 1–2: Dark purple bg  |  Slide 3–5: Cream/beige bg
// Each slide has bold headlines + device mockup(s) + decorative accents
export function buildMockupShopFilmstrip(t) {
  const DARK = '#4A3B6B'   // muted purple
  const CREAM = '#F5F0E8'  // warm beige
  const W = 1290
  const H = 2796

  return [
    // ── SLIDE 1: "Shop Better Save More" ─────────────────────
    bs(1, {
      backgroundColor: DARK,
      width: W,
      height: H,
      elements: [
        // App icon (top-left)
        { id: 'sf1-icon', type: 'badge', x: 100, y: 200, width: 90, height: 90, content: '🛍️', style: { bgColor: 'rgba(255,255,255,0.15)', fontSize: 42, borderRadius: 22, px: 20, py: 20 } },
        // Main headline
        { id: 'sf1-title', type: 'text', x: 100, y: 380, width: 650, height: 420, content: 'Shop\nBetter\nSave More', style: { fontSize: 130, fontWeight: '900', color: '#FFFFFF', align: 'left', lineHeight: 140 } },
        // Subtext
        { id: 'sf1-sub', type: 'text', x: 100, y: 850, width: 500, height: 120, content: 'Your safe place to\nshop online anytime.', style: { fontSize: 42, fontWeight: '400', color: 'rgba(255,255,255,0.7)', align: 'left', lineHeight: 56 } },
        // Rating badge (bottom-left)
        { id: 'sf1-rating-bg', type: 'badge', x: 100, y: 2300, width: 260, height: 220, content: '', style: { bgColor: 'rgba(255,255,255,0.08)', borderRadius: 30, px: 0, py: 0 } },
        { id: 'sf1-rating-num', type: 'text', x: 130, y: 2320, width: 200, height: 80, content: '4.8', style: { fontSize: 64, fontWeight: '900', color: '#FFFFFF', align: 'center' } },
        { id: 'sf1-rating-label', type: 'text', x: 130, y: 2400, width: 200, height: 50, content: 'Rating', style: { fontSize: 36, fontWeight: '600', color: 'rgba(255,255,255,0.7)', align: 'center' } },
        { id: 'sf1-stars', type: 'text', x: 130, y: 2450, width: 200, height: 50, content: '⭐⭐⭐⭐⭐', style: { fontSize: 28, align: 'center' } },
        // Device mockup (right side, tilted)
        { id: 'sf1-device', type: 'device', x: 600, y: 600, width: 620, height: 1300, style: { rotation: -8 } },
        // Decorative laurel accents
        { id: 'sf1-dec1', type: 'text', x: 80, y: 2250, width: 60, height: 60, content: '🌿', style: { fontSize: 36, align: 'left' } },
        { id: 'sf1-dec2', type: 'text', x: 300, y: 2250, width: 60, height: 60, content: '🌿', style: { fontSize: 36, align: 'right' } },
      ],
    }),

    // ── SLIDE 2: "#fastfashion" ────────────────────────────────
    bs(2, {
      backgroundColor: DARK,
      width: W,
      height: H,
      elements: [
        // Hashtag headline
        { id: 'sf2-hash', type: 'text', x: 100, y: 200, width: 800, height: 200, content: '#fastfashion\n#zeeb', style: { fontSize: 96, fontWeight: '900', color: '#FFFFFF', align: 'left', lineHeight: 110 } },
        // Two overlapping device mockups
        { id: 'sf2-device1', type: 'device', x: 80, y: 550, width: 560, height: 1180, style: { rotation: -5 } },
        { id: 'sf2-device2', type: 'device', x: 480, y: 700, width: 560, height: 1180, style: { rotation: 6 } },
        // Third device peeking from right
        { id: 'sf2-device3', type: 'device', x: 800, y: 900, width: 480, height: 1000, style: { rotation: 12 } },
        // Decorative blob
        { id: 'sf2-blob', type: 'blob', x: 900, y: 100, width: 400, height: 400, style: { color: '#6B4FA0', opacity: 0.3 } },
      ],
    }),

    // ── SLIDE 3: "Best Prices Easy Buying" ────────────────────
    bs(3, {
      backgroundColor: CREAM,
      width: W,
      height: H,
      elements: [
        // Decorative 3D star badge (top-right)
        { id: 'sf3-badge', type: 'badge', x: 800, y: 200, width: 200, height: 200, content: '⭐⭐⭐⭐', style: { bgColor: 'rgba(218,165,32,0.15)', fontSize: 36, borderRadius: 24, px: 30, py: 40 } },
        // Subtitle
        { id: 'sf3-sub', type: 'text', x: 100, y: 400, width: 700, height: 80, content: 'BEST PRICES', style: { fontSize: 52, fontWeight: '600', color: '#888888', align: 'left', letterSpacing: 6 } },
        // Main headline (bold serif style)
        { id: 'sf3-title', type: 'text', x: 100, y: 490, width: 800, height: 300, content: 'EASY\nBUYING', style: { fontSize: 150, fontWeight: '900', color: '#1A1A1A', align: 'left', lineHeight: 155 } },
        // Device mockup (center-bottom)
        { id: 'sf3-device', type: 'device', x: 300, y: 1000, width: 580, height: 1220, style: { rotation: 0 } },
        // Shopping cart icon (bottom-left decorative)
        { id: 'sf3-cart', type: 'text', x: 80, y: 2200, width: 120, height: 120, content: '🛒', style: { fontSize: 80, align: 'center' } },
        // Subtle blob accent
        { id: 'sf3-blob', type: 'blob', x: -100, y: 1800, width: 400, height: 400, style: { color: '#E8DFD0', opacity: 0.5 } },
      ],
    }),

    // ── SLIDE 4: "Fast Delivery" ──────────────────────────────
    bs(4, {
      backgroundColor: CREAM,
      width: W,
      height: H,
      elements: [
        // Subtitle
        { id: 'sf4-sub', type: 'text', x: 100, y: 300, width: 700, height: 80, content: 'EFFICIENT', style: { fontSize: 52, fontWeight: '600', color: '#888888', align: 'left', letterSpacing: 6 } },
        // Main headline
        { id: 'sf4-title', type: 'text', x: 100, y: 400, width: 900, height: 300, content: 'FAST\nDELIVERY', style: { fontSize: 150, fontWeight: '900', color: '#1A1A1A', align: 'left', lineHeight: 155 } },
        // Device mockup (right side)
        { id: 'sf4-device', type: 'device', x: 580, y: 800, width: 560, height: 1180, style: { rotation: 3 } },
        // Package/box decorative elements (bottom-right)
        { id: 'sf4-pkg1', type: 'badge', x: 700, y: 2100, width: 300, height: 180, content: '📦', style: { bgColor: 'rgba(139,119,90,0.1)', fontSize: 90, borderRadius: 20, px: 60, py: 30 } },
        { id: 'sf4-pkg2', type: 'badge', x: 900, y: 2000, width: 220, height: 140, content: '📦', style: { bgColor: 'rgba(139,119,90,0.08)', fontSize: 60, borderRadius: 16, px: 50, py: 25 } },
        // Delivery person accent
        { id: 'sf4-person', type: 'text', x: 600, y: 2300, width: 100, height: 100, content: '🚚', style: { fontSize: 60, align: 'center' } },
        // Subtle blob
        { id: 'sf4-blob', type: 'blob', x: -50, y: 700, width: 300, height: 300, style: { color: '#E0D8C9', opacity: 0.4 } },
      ],
    }),

    // ── SLIDE 5: "Trusted Brands" ─────────────────────────────
    bs(5, {
      backgroundColor: CREAM,
      width: W,
      height: H,
      elements: [
        // Subtitle
        { id: 'sf5-sub', type: 'text', x: 100, y: 300, width: 700, height: 80, content: 'ONLY', style: { fontSize: 52, fontWeight: '600', color: '#888888', align: 'left', letterSpacing: 6 } },
        // Main headline
        { id: 'sf5-title', type: 'text', x: 100, y: 400, width: 1000, height: 300, content: 'TRUSTED\nBRANDS', style: { fontSize: 150, fontWeight: '900', color: '#1A1A1A', align: 'left', lineHeight: 155 } },
        // Device mockup (center)
        { id: 'sf5-device', type: 'device', x: 350, y: 900, width: 560, height: 1180, style: { rotation: -2 } },
        // Hanger / clothing decorative element (right)
        { id: 'sf5-dec1', type: 'text', x: 950, y: 900, width: 120, height: 120, content: '👔', style: { fontSize: 80, align: 'center' } },
        { id: 'sf5-dec2', type: 'text', x: 980, y: 1100, width: 120, height: 120, content: '👗', style: { fontSize: 80, align: 'center' } },
        // Trust badge
        { id: 'sf5-trust', type: 'badge', x: 100, y: 2300, width: 380, height: 90, content: '✅ 100% Verified Sellers', style: { bgColor: 'rgba(16,185,129,0.1)', color: '#047857', fontSize: 28, fontWeight: '700', borderRadius: 20, px: 24, py: 22 } },
        // Decorative blob
        { id: 'sf5-blob', type: 'blob', x: 900, y: 2000, width: 500, height: 500, style: { color: '#DED5C4', opacity: 0.4 } },
      ],
    }),
  ]
}

// ─── 10 NEW ALGORITHMIC TEMPLATES ───────────────────────────

// 1. DARK GLOW
export function buildMockupDarkGlow(t) {
  return [
    bs(1, {
      backgroundColor: '#0a0a14',
      width: 1440, height: 900,
      elements: [
        { id: 'dg-glow', type: 'blob', x: -100, y: -200, width: 800, height: 800, style: { color: '#8B5CF6', opacity: 0.2, borderRadius: '400px' } },
        { id: 'dg-title', type: 'text', x: 200, y: 300, width: 600, height: 120, content: 'Illuminate\nyour app.', style: { fontSize: 82, fontWeight: '800', color: '#FFFFFF', align: 'left', lineHeight: 90 } },
        { id: 'dg-sub', type: 'text', x: 200, y: 520, width: 500, height: 60, content: 'Next-gen design starts here.', style: { fontSize: 24, fontWeight: '400', color: '#94A3B8', align: 'left' } },
        { id: 'dg-device', type: 'device', x: 850, y: 150, width: 320, height: 660, style: { rotation: -12 } }
      ]
    })
  ]
}

// 2. MIDNIGHT TECH
export function buildMockupMidnightTech(t) {
  return [
    bs(1, {
      backgroundColor: '#121212',
      width: 1440, height: 900,
      elements: [
        { id: 'mt-title', type: 'text', x: 200, y: 300, width: 600, height: 120, content: 'Powerful & Secure.', style: { fontSize: 82, fontWeight: '800', color: '#FFFFFF', align: 'left', lineHeight: 90 } },
        { id: 'mt-sub', type: 'text', x: 200, y: 520, width: 500, height: 60, content: 'Built for scale and performance.', style: { fontSize: 24, fontWeight: '400', color: '#94A3B8', align: 'left' } },
        { id: 'mt-device1', type: 'device', x: 800, y: 150, width: 280, height: 580, style: { rotation: 5 }, screenType: 'music' },
        { id: 'mt-device2', type: 'device', x: 1050, y: 200, width: 280, height: 580, style: { rotation: -5 }, screenType: 'music' }
      ]
    })
  ]
}

// 3. PURE WHITE
export function buildMockupPureWhite(t) {
  return [
    bs(1, {
      backgroundColor: '#ffffff',
      width: 1440, height: 900,
      elements: [
        { id: 'pw-title', type: 'text', x: 420, y: 150, width: 600, height: 100, content: 'Simplicity is key.', style: { fontSize: 56, fontWeight: '800', color: '#111827', align: 'center' } },
        { id: 'pw-sub', type: 'text', x: 420, y: 260, width: 600, height: 60, content: 'Less is more.', style: { fontSize: 28, fontWeight: '400', color: '#6B7280', align: 'center' } },
        { id: 'pw-device', type: 'device', x: 520, y: 400, width: 400, height: 820, style: { rotation: 0 } }
      ]
    })
  ]
}

// 4. SOFT GRAY
export function buildMockupSoftGray(t) {
  return [
    bs(1, {
      backgroundColor: '#f3f4f6',
      width: 1440, height: 900,
      elements: [
        { id: 'sg-blob', type: 'blob', x: -50, y: 500, width: 600, height: 600, style: { color: '#e5e7eb', opacity: 1, borderRadius: '40px' } },
        { id: 'sg-title', type: 'text', x: 200, y: 350, width: 600, height: 120, content: 'Elegance in gray.', style: { fontSize: 72, fontWeight: '800', color: '#111827', align: 'left', lineHeight: 85 } },
        { id: 'sg-sub', type: 'text', x: 200, y: 560, width: 500, height: 60, content: 'Clean and modern aesthetics.', style: { fontSize: 24, fontWeight: '400', color: '#6B7280', align: 'left' } },
        { id: 'sg-device', type: 'device', x: 900, y: 120, width: 340, height: 700, style: { rotation: -3 } }
      ]
    })
  ]
}

// 5. VIBRANT SUNSET
export function buildMockupVibrantSunset(t) {
  return [
    bs(1, {
      backgroundColor: '#ff7e5f',
      width: 1440, height: 900,
      elements: [
        { id: 'vs2-bg1', type: 'blob', x: -200, y: -200, width: 1200, height: 1200, style: { color: '#feb47b', opacity: 0.8 } },
        { id: 'vs2-title', type: 'text', x: 200, y: 320, width: 600, height: 180, content: 'Stand out daily.', style: { fontSize: 88, fontWeight: '900', color: '#FFFFFF', align: 'left', lineHeight: 95 } },
        { id: 'vs2-sub', type: 'text', x: 200, y: 560, width: 500, height: 60, content: 'Vibrant and fully alive.', style: { fontSize: 32, fontWeight: '700', color: '#FFFFFF', align: 'left' } },
        { id: 'vs2-device', type: 'device', x: 800, y: 100, width: 380, height: 780, style: { rotation: 0 } }
      ]
    })
  ]
}

// 6. OCEAN BREEZE
export function buildMockupOceanBreeze(t) {
  return [
    bs(1, {
      backgroundColor: '#00c6ff',
      width: 1440, height: 900,
      elements: [
        { id: 'ob-bg', type: 'blob', x: 600, y: 0, width: 1000, height: 1000, style: { color: '#0072ff', opacity: 0.6 } },
        { id: 'ob-badge', type: 'badge', x: 200, y: 220, width: 150, height: 40, content: 'SUMMER VIBRES', style: { bgColor: '#FFFFFF', color: '#0072ff', fontSize: 13, fontWeight: '800', borderRadius: 20, px: 20, py: 8 } },
        { id: 'ob-title', type: 'text', x: 200, y: 340, width: 600, height: 180, content: 'Cool and\nrefreshing.', style: { fontSize: 88, fontWeight: '900', color: '#FFFFFF', align: 'left', lineHeight: 95 } },
        { id: 'ob-device', type: 'device', x: 850, y: 120, width: 340, height: 700, style: { rotation: 10 } }
      ]
    })
  ]
}

// 7. DYNAMIC TILT
export function buildMockupDynamicTilt(t) {
  return [
    bs(1, {
      backgroundColor: '#2b2b2b',
      width: 1440, height: 900,
      elements: [
        { id: 'dt-title', type: 'text', x: 150, y: 150, width: 800, height: 100, content: 'Feel the depth.', style: { fontSize: 72, fontWeight: '900', color: '#FFFFFF', align: 'left' } },
        { id: 'dt-device1', type: 'device', x: 150, y: 350, width: 280, height: 580, style: { rotation: -15 }, screenType: 'music' },
        { id: 'dt-device2', type: 'device', x: 550, y: 200, width: 320, height: 660, style: { rotation: 0 }, screenType: 'music' },
        { id: 'dt-device3', type: 'device', x: 1000, y: 400, width: 280, height: 580, style: { rotation: 15 }, screenType: 'music' }
      ]
    })
  ]
}

// 8. FLOAT PERSPECTIVE
export function buildMockupFloatPerspective(t) {
  return [
    bs(1, {
      backgroundColor: '#1e3a8a',
      width: 1440, height: 900,
      elements: [
        { id: 'fp-globe', type: 'badge', x: 1100, y: -200, width: 600, height: 600, content: '', style: { bgColor: 'rgba(255,255,255,0.05)', borderRadius: 999 } },
        { id: 'fp-title', type: 'text', x: 200, y: 300, width: 600, height: 120, content: 'Above the clouds.', style: { fontSize: 80, fontWeight: '800', color: '#FFFFFF', align: 'left', lineHeight: 90 } },
        { id: 'fp-sub', type: 'text', x: 200, y: 500, width: 500, height: 60, content: 'Stunning floating angles.', style: { fontSize: 28, fontWeight: '400', color: '#bfdbfe', align: 'left' } },
        { id: 'fp-device', type: 'device', x: 800, y: 80, width: 400, height: 820, style: { rotation: -8 } }
      ]
    })
  ]
}

// 9. GEOMETRIC POP
export function buildMockupGeometricPop(t) {
  return [
    bs(1, {
      backgroundColor: '#fef3c7',
      width: 1440, height: 900,
      elements: [
        { id: 'gp-circle', type: 'badge', x: 800, y: 200, width: 400, height: 400, content: '', style: { bgColor: '#fcd34d', borderRadius: 999 } },
        { id: 'gp-rect', type: 'blob', x: -100, y: -100, width: 500, height: 500, style: { color: '#fbbf24', opacity: 1, borderRadius: '20px' } },
        { id: 'gp-title', type: 'text', x: 150, y: 450, width: 600, height: 120, content: 'Playful designs.', style: { fontSize: 80, fontWeight: '900', color: '#111827', align: 'left' } },
        { id: 'gp-device', type: 'device', x: 700, y: 150, width: 340, height: 700, style: { rotation: 5 } }
      ]
    })
  ]
}

// 10. ABSTRACT WAVES
export function buildMockupAbstractWaves(t) {
  return [
    bs(1, {
      backgroundColor: '#e0e7ff',
      width: 1440, height: 900,
      elements: [
        { id: 'aw-wave1', type: 'blob', x: -200, y: 600, width: 1800, height: 400, style: { color: '#c7d2fe', opacity: 1, borderRadius: '100% 100% 0 0' } },
        { id: 'aw-title', type: 'text', x: 300, y: 200, width: 840, height: 100, content: 'Smooth sailing.', style: { fontSize: 80, fontWeight: '900', color: '#312e81', align: 'center' } },
        { id: 'aw-sub', type: 'text', x: 300, y: 350, width: 840, height: 60, content: 'Abstract and beautiful simplicity.', style: { fontSize: 28, fontWeight: '400', color: '#4f46e5', align: 'center' } },
        { id: 'aw-device', type: 'device', x: 520, y: 450, width: 400, height: 820, style: { rotation: 0 } }
      ]
    })
  ]
}

// ─── GOOGLE PLAY 3D TEMPLATES ──────────────────────────────────
// 1. Isometric Android (Stacked left to right)
export function buildPlay3DIsometric(t) {
  const bg = '#121212'
  const W = 1080
  const H = 1920

  return [
    bs(1, {
      backgroundColor: bg,
      width: W, height: H,
      elements: [
        { id: 'iso1-blob', type: 'blob', x: -200, y: 1200, width: 800, height: 800, style: { color: '#00D2FF', opacity: 0.15, borderRadius: '400px' } },
        { id: 'iso1-title', type: 'text', x: 80, y: 200, width: 920, height: 200, content: 'Isometric\n3D Mockups', style: { fontSize: 80, fontWeight: '900', color: '#FFFFFF', align: 'left', lineHeight: 95 } },
        { id: 'iso1-device3', type: 'device', x: 500, y: 900, width: 440, height: 920, style: { rotateX: 25, rotateY: -35, rotation: -5 }, platform: 'android' },
        { id: 'iso1-device2', type: 'device', x: 280, y: 700, width: 440, height: 920, style: { rotateX: 25, rotateY: -35, rotation: -5 }, platform: 'android' },
        { id: 'iso1-device1', type: 'device', x: 60, y: 500, width: 440, height: 920, style: { rotateX: 25, rotateY: -35, rotation: -5 }, platform: 'android' }
      ]
    }),
    bs(2, {
      backgroundColor: bg,
      width: W, height: H,
      elements: [
        { id: 'iso2-title', type: 'text', x: 80, y: 200, width: 920, height: 200, content: 'Stand out on\nGoogle Play', style: { fontSize: 80, fontWeight: '900', color: '#FFFFFF', align: 'left', lineHeight: 95 } },
        { id: 'iso2-device', type: 'device', x: 120, y: 600, width: 840, height: 1760, style: { rotateX: 30, rotateY: -15, rotation: 0 }, platform: 'android' }
      ]
    })
  ]
}

// 2. Panoramic Split
export function buildPlay3DPanoramic(t) {
  const bg = '#f4f4f5'
  const W = 1080
  const H = 1920

  // The device is positioned halfway off the screen on Slide 1, and halfway on Slide 2
  const deviceWidth = 840
  const deviceHeight = 1760
  const yPos = 400

  return [
    bs(1, {
      backgroundColor: bg,
      width: W, height: H,
      elements: [
        { id: 'pan1-title', type: 'text', x: 100, y: 200, width: 880, height: 100, content: 'A truly immersive', style: { fontSize: 72, fontWeight: '800', color: '#18181b', align: 'left' } },
        // Right side of slide 1, rotated away
        { id: 'pan1-device', type: 'device', x: W - (deviceWidth / 2), y: yPos, width: deviceWidth, height: deviceHeight, style: { rotateX: 10, rotateY: -30, rotation: 0 }, platform: 'android' }
      ]
    }),
    bs(2, {
      backgroundColor: bg,
      width: W, height: H,
      elements: [
        { id: 'pan2-title', type: 'text', x: 100, y: 200, width: 880, height: 100, content: 'panoramic spread.', style: { fontSize: 72, fontWeight: '800', color: '#18181b', align: 'right' } },
        // Left side of slide 2, facing slightly inward
        { id: 'pan2-device', type: 'device', x: -(deviceWidth / 2), y: yPos, width: deviceWidth, height: deviceHeight, style: { rotateX: 10, rotateY: 15, rotation: 0 }, platform: 'android' }
      ]
    })
  ]
}

// ─── 3D DARK FLOAT KIT ─────────────────────────────────────────
export function buildMockupDarkFloat(t) {
  const bg = '#0a0a0a'
  const W = 1080
  const H = 1920

  return [
    bs(1, {
      backgroundColor: bg, width: W, height: H,
      elements: [
        { id: 'df1-glow', type: 'blob', x: -200, y: 800, width: 1400, height: 1400, style: { color: '#8b5cf6', opacity: 0.15, borderRadius: '50%' } },
        { id: 'df1-title', type: 'text', x: 80, y: 200, width: 920, height: 120, content: 'Experience\nThe Future', style: { fontSize: 90, fontWeight: '900', color: '#ffffff', align: 'center', lineHeight: 100 } },
        { id: 'df1-sub', type: 'text', x: 80, y: 440, width: 920, height: 60, content: 'Designed for those who demand the best', style: { fontSize: 36, fontWeight: '400', color: '#a3a3a3', align: 'center' } },
        { id: 'df1-device1', type: 'device', x: 120, y: 650, width: 440, height: 920, style: { rotateX: 15, rotateY: -10, rotation: -15 }, platform: 'ios' },
        { id: 'df1-device2', type: 'device', x: 500, y: 750, width: 460, height: 960, style: { rotateX: 10, rotateY: 15, rotation: 10 }, platform: 'ios' },
        { id: 'df1-badge', type: 'badge', x: 390, y: 1750, width: 300, height: 70, content: 'Download on App Store', style: { bgColor: '#ffffff', color: '#000000', fontSize: 18, fontWeight: '700', borderRadius: 35 } }
      ]
    }),
    bs(2, {
      backgroundColor: bg, width: W, height: H,
      elements: [
        { id: 'df2-title', type: 'text', x: 100, y: 220, width: 880, height: 100, content: 'Powerful Features', style: { fontSize: 80, fontWeight: '900', color: '#ffffff', align: 'center' } },
        { id: 'df2-sub', type: 'text', x: 100, y: 340, width: 880, height: 60, content: 'Everything built for you', style: { fontSize: 36, color: '#a3a3a3', align: 'center' } },
        { id: 'df2-device', type: 'device', x: 340, y: 550, width: 520, height: 1090, style: { rotateX: 15, rotateY: -10, rotation: -8 }, platform: 'ios' },
        { id: 'df2-f1', type: 'badge', x: 80, y: 700, width: 220, height: 70, content: '✨ Blazing Fast', style: { bgColor: '#1f1f1f', color: '#ffffff', fontSize: 20, fontWeight: '600', borderRadius: 20 } },
        { id: 'df2-f2', type: 'badge', x: 50, y: 920, width: 200, height: 70, content: '🔒 100% Secure', style: { bgColor: '#1f1f1f', color: '#ffffff', fontSize: 20, fontWeight: '600', borderRadius: 20 } },
        { id: 'df2-f3', type: 'badge', x: 100, y: 1140, width: 200, height: 70, content: '🎨 Beautiful UI', style: { bgColor: '#1f1f1f', color: '#ffffff', fontSize: 20, fontWeight: '600', borderRadius: 20 } }
      ]
    }),
    bs(3, {
      backgroundColor: bg, width: W, height: H,
      elements: [
        { id: 'df3-title', type: 'text', x: 80, y: 220, width: 920, height: 100, content: 'Loved By Millions', style: { fontSize: 80, fontWeight: '900', color: '#ffffff', align: 'center' } },
        { id: 'df3-laurel', type: 'text', x: 80, y: 340, width: 920, height: 60, content: '🌿    🌿', style: { fontSize: 50, color: '#8b5cf6', align: 'center', letterSpacing: 80 } },
        { id: 'df3-device1', type: 'device', x: 120, y: 600, width: 440, height: 920, style: { rotateX: 10, rotateY: 15, rotation: -4 }, platform: 'ios' },
        { id: 'df3-device2', type: 'device', x: 520, y: 650, width: 440, height: 920, style: { rotateX: 10, rotateY: -15, rotation: 5 }, platform: 'ios' },
        { id: 'df3-rating', type: 'badge', x: 390, y: 1650, width: 300, height: 120, content: '4.9 ★', style: { bgColor: '#8b5cf6', color: '#ffffff', fontSize: 60, fontWeight: '900', borderRadius: 40 } }
      ]
    }),
    bs(4, {
      backgroundColor: bg, width: W, height: H,
      elements: [
        { id: 'df4-title', type: 'text', x: 80, y: 200, width: 920, height: 100, content: 'Simple To Use', style: { fontSize: 80, fontWeight: '900', color: '#ffffff', align: 'center' } },
        { id: 'df4-sub', type: 'text', x: 80, y: 320, width: 920, height: 60, content: 'Get started in seconds', style: { fontSize: 36, color: '#a3a3a3', align: 'center' } },
        // Three perspective phones
        { id: 'df4-device1', type: 'device', x: 50, y: 600, width: 300, height: 630, style: { rotateX: 20, rotateY: 30, rotation: 0 }, platform: 'ios' },
        { id: 'df4-device2', type: 'device', x: 310, y: 550, width: 400, height: 840, style: { rotateX: 15, rotateY: 10, rotation: 0 }, platform: 'ios' },
        { id: 'df4-device3', type: 'device', x: 670, y: 500, width: 460, height: 960, style: { rotateX: 10, rotateY: -20, rotation: 0 }, platform: 'ios' },
        { id: 'df4-s1', type: 'badge', x: 160, y: 1550, width: 80, height: 80, content: '1', style: { bgColor: '#8b5cf6', color: '#ffffff', fontSize: 40, fontWeight: '800', borderRadius: 40 } },
        { id: 'df4-s2', type: 'badge', x: 470, y: 1550, width: 80, height: 80, content: '2', style: { bgColor: '#8b5cf6', color: '#ffffff', fontSize: 40, fontWeight: '800', borderRadius: 40 } },
        { id: 'df4-s3', type: 'badge', x: 860, y: 1550, width: 80, height: 80, content: '3', style: { bgColor: '#8b5cf6', color: '#ffffff', fontSize: 40, fontWeight: '800', borderRadius: 40 } }
      ]
    }),
    bs(5, {
      backgroundColor: bg, width: W, height: H,
      elements: [
        { id: 'df5-glow', type: 'blob', x: -100, y: 400, width: 1280, height: 1280, style: { color: '#8b5cf6', opacity: 0.25, borderRadius: '50%' } },
        { id: 'df5-title', type: 'text', x: 80, y: 250, width: 920, height: 100, content: 'Download Now', style: { fontSize: 90, fontWeight: '900', color: '#ffffff', align: 'center' } },
        { id: 'df5-sub', type: 'text', x: 80, y: 370, width: 920, height: 60, content: 'Free to get started', style: { fontSize: 36, color: '#a3a3a3', align: 'center' } },
        { id: 'df5-device', type: 'device', x: 280, y: 550, width: 520, height: 1090, style: { rotateX: -5, rotateY: 0, rotation: 0 }, platform: 'ios' },
        { id: 'df5-app', type: 'badge', x: 280, y: 1720, width: 240, height: 75, content: 'App Store', style: { bgColor: '#ffffff', color: '#000000', fontSize: 22, fontWeight: '700', borderRadius: 20 } },
        { id: 'df5-gp', type: 'badge', x: 550, y: 1720, width: 240, height: 75, content: 'Google Play', style: { bgColor: '#ffffff', color: '#000000', fontSize: 22, fontWeight: '700', borderRadius: 20 } }
      ]
    })
  ]
}

// ─── 3D PERSPECTIVE NAVY KIT ──────────────────────────────────
export function buildMockupPerspectiveNavy(t) {
  const bg = '#0f172a'
  const W = 1080
  const H = 1920

  return [
    bs(1, {
      backgroundColor: bg, width: W, height: H,
      elements: [
        { id: 'pn1-title', type: 'text', x: 80, y: 220, width: 920, height: 100, content: 'Everything You Need', style: { fontSize: 80, fontWeight: '900', color: '#ffffff', align: 'center' } },
        { id: 'pn1-sub', type: 'text', x: 80, y: 340, width: 920, height: 60, content: 'One app for everything', style: { fontSize: 36, color: '#94a3b8', align: 'center' } },
        { id: 'pn1-device1', type: 'device', x: -50, y: 650, width: 400, height: 840, style: { rotateX: 10, rotateY: 35, rotation: 5 }, platform: 'ios' },
        { id: 'pn1-device2', type: 'device', x: 730, y: 650, width: 400, height: 840, style: { rotateX: 10, rotateY: -35, rotation: -5 }, platform: 'ios' },
        { id: 'pn1-device3', type: 'device', x: 280, y: 500, width: 520, height: 1090, style: { rotateX: 0, rotateY: 0, rotation: 0 }, platform: 'ios' },
        { id: 'pn1-star', type: 'badge', x: 120, y: 1650, width: 80, height: 80, content: '★', style: { bgColor: '#fbbf24', color: '#fff', fontSize: 40, borderRadius: 40 } }
      ]
    }),
    bs(2, {
      backgroundColor: bg, width: W, height: H,
      elements: [
        { id: 'pn2-grid', type: 'blob', x: 100, y: 100, width: 880, height: 1720, style: { color: '#06b6d4', opacity: 0.05, borderRadius: '20px' } },
        { id: 'pn2-title', type: 'text', x: 80, y: 250, width: 920, height: 100, content: 'Discover More', style: { fontSize: 84, fontWeight: '900', color: '#ffffff', align: 'center' } },
        { id: 'pn2-sub', type: 'text', x: 80, y: 370, width: 920, height: 60, content: 'Curated just for you', style: { fontSize: 36, color: '#06b6d4', align: 'center' } },
        { id: 'pn2-device1', type: 'device', x: 180, y: 600, width: 460, height: 960, style: { rotateX: 10, rotateY: 20, rotation: -6 }, platform: 'ios' },
        { id: 'pn2-device2', type: 'device', x: 440, y: 700, width: 480, height: 1000, style: { rotateX: 15, rotateY: -15, rotation: 8 }, platform: 'ios' }
      ]
    }),
    bs(3, {
      backgroundColor: bg, width: W, height: H,
      elements: [
        { id: 'pn3-glow', type: 'blob', x: 140, y: 550, width: 800, height: 800, style: { color: '#06b6d4', opacity: 0.2, borderRadius: '50%' } },
        { id: 'pn3-title', type: 'text', x: 80, y: 200, width: 920, height: 100, content: 'Trusted Worldwide', style: { fontSize: 80, fontWeight: '900', color: '#ffffff', align: 'center' } },
        { id: 'pn3-b1', type: 'badge', x: 150, y: 340, width: 350, height: 80, content: '10M+ Users', style: { bgColor: '#1e293b', color: '#06b6d4', fontSize: 26, fontWeight: '800', borderRadius: 20 } },
        { id: 'pn3-b2', type: 'badge', x: 550, y: 340, width: 350, height: 80, content: '500K+ Reviews', style: { bgColor: '#1e293b', color: '#06b6d4', fontSize: 26, fontWeight: '800', borderRadius: 20 } },
        { id: 'pn3-device', type: 'device', x: 260, y: 500, width: 560, height: 1180, style: { rotateX: 20, rotateY: 0, rotation: 0 }, platform: 'ios' }
      ]
    }),
    bs(4, {
      backgroundColor: bg, width: W, height: H,
      elements: [
        { id: 'pn4-title', type: 'text', x: 80, y: 240, width: 920, height: 100, content: 'Blazing Fast', style: { fontSize: 90, fontWeight: '900', color: '#ffffff', align: 'center' } },
        { id: 'pn4-sub', type: 'text', x: 80, y: 360, width: 920, height: 60, content: 'Zero lag. Pure performance.', style: { fontSize: 36, color: '#94a3b8', align: 'center' } },
        { id: 'pn4-bolt', type: 'text', x: 490, y: 100, width: 100, height: 100, content: '⚡', style: { fontSize: 60, align: 'center' } },
        { id: 'pn4-device1', type: 'device', x: 380, y: 450, width: 440, height: 920, style: { rotateX: 25, rotateY: 10, rotation: 0 }, platform: 'ios' },
        { id: 'pn4-device2', type: 'device', x: 240, y: 700, width: 600, height: 1260, style: { rotateX: 15, rotateY: -10, rotation: 0 }, platform: 'ios' }
      ]
    }),
    bs(5, {
      backgroundColor: bg, width: W, height: H,
      elements: [
        { id: 'pn5-glow', type: 'blob', x: -100, y: 800, width: 1280, height: 1280, style: { color: '#06b6d4', opacity: 0.2, borderRadius: '50%' } },
        { id: 'pn5-title', type: 'text', x: 80, y: 250, width: 920, height: 100, content: 'Join Millions Today', style: { fontSize: 80, fontWeight: '900', color: '#ffffff', align: 'center' } },
        { id: 'pn5-device', type: 'device', x: 280, y: 480, width: 520, height: 1090, style: { rotateX: 5, rotateY: 0, rotation: 0 }, platform: 'ios' },
        { id: 'pn5-av', type: 'badge', x: 390, y: 1650, width: 300, height: 60, content: '👥 10M+ users', style: { bgColor: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 20, borderRadius: 30 } },
        { id: 'pn5-app', type: 'badge', x: 280, y: 1750, width: 240, height: 75, content: 'App Store', style: { bgColor: '#06b6d4', color: '#000000', fontSize: 22, fontWeight: '700', borderRadius: 20 } },
        { id: 'pn5-gp', type: 'badge', x: 550, y: 1750, width: 240, height: 75, content: 'Google Play', style: { bgColor: '#06b6d4', color: '#000000', fontSize: 22, fontWeight: '700', borderRadius: 20 } }
      ]
    })
  ]
}

// ─── 3D COLORFUL BLAST KIT ────────────────────────────────────
export function buildMockupColorfulBlast(t) {
  const bg = '#ec4899' // fallback, using big blob for gradient
  const W = 1080
  const H = 1920

  return [
    bs(1, {
      backgroundColor: bg, width: W, height: H,
      elements: [
        { id: 'cb1-bg', type: 'blob', x: -500, y: -500, width: 2080, height: 2920, style: { color: '#7c3aed', opacity: 1, borderRadius: '0px' } }, // Gradient effect layer
        { id: 'cb1-conf1', type: 'badge', x: 150, y: 150, width: 50, height: 50, content: '', style: { bgColor: '#fcd34d', borderRadius: 25 } },
        { id: 'cb1-conf2', type: 'badge', x: 850, y: 350, width: 40, height: 40, content: '', style: { bgColor: '#38bdf8', borderRadius: 20 } },
        { id: 'cb1-title', type: 'text', x: 80, y: 220, width: 920, height: 100, content: 'Your Life. Simplified.', style: { fontSize: 84, fontWeight: '900', color: '#ffffff', align: 'center' } },
        { id: 'cb1-device1', type: 'device', x: 100, y: 800, width: 440, height: 920, style: { rotateX: 10, rotateY: 25, rotation: -10 }, platform: 'ios' },
        { id: 'cb1-device2', type: 'device', x: 400, y: 500, width: 560, height: 1180, style: { rotateX: 25, rotateY: -15, rotation: 8 }, platform: 'ios' },
        { id: 'cb1-badge', type: 'badge', x: 700, y: 1600, width: 240, height: 160, content: '🏆\nEditors\nChoice', style: { bgColor: '#fff', color: '#7c3aed', fontSize: 24, fontWeight: '800', borderRadius: 30 } }
      ]
    }),
    bs(2, {
      backgroundColor: bg, width: W, height: H,
      elements: [
        { id: 'cb2-bg', type: 'blob', x: -500, y: -500, width: 2080, height: 2920, style: { color: '#7c3aed', opacity: 1, borderRadius: '0px' } },
        { id: 'cb2-title', type: 'text', x: 80, y: 200, width: 920, height: 100, content: 'Packed With Features', style: { fontSize: 80, fontWeight: '900', color: '#ffffff', align: 'center' } },
        { id: 'cb2-sub', type: 'text', x: 80, y: 320, width: 920, height: 60, content: 'You asked. We built it.', style: { fontSize: 36, color: '#fbcfe8', align: 'center' } },
        { id: 'cb2-device1', type: 'device', x: 120, y: 650, width: 500, height: 1050, style: { rotateX: -15, rotateY: 25, rotation: -12 }, platform: 'ios' },
        { id: 'cb2-device2', type: 'device', x: 480, y: 550, width: 500, height: 1050, style: { rotateX: 15, rotateY: -25, rotation: 12 }, platform: 'ios' },
        { id: 'cb2-pill1', type: 'badge', x: 150, y: 450, width: 180, height: 60, content: 'Fast 🚀', style: { bgColor: '#fcd34d', color: '#000', fontSize: 20, fontWeight: '700', borderRadius: 30 } },
        { id: 'cb2-pill2', type: 'badge', x: 750, y: 900, width: 180, height: 60, content: 'Secure 🔒', style: { bgColor: '#38bdf8', color: '#fff', fontSize: 20, fontWeight: '700', borderRadius: 30 } }
      ]
    }),
    bs(3, {
      backgroundColor: bg, width: W, height: H,
      elements: [
        { id: 'cb3-bg', type: 'blob', x: -500, y: -500, width: 2080, height: 2920, style: { color: '#7c3aed', opacity: 1, borderRadius: '0px' } },
        { id: 'cb3-title', type: 'text', x: 80, y: 220, width: 920, height: 100, content: 'Join The Community', style: { fontSize: 80, fontWeight: '900', color: '#ffffff', align: 'center' } },
        { id: 'cb3-sub', type: 'badge', x: 340, y: 360, width: 400, height: 75, content: '2M+ Active Users', style: { bgColor: '#fff', color: '#ec4899', fontSize: 24, fontWeight: '800', borderRadius: 40 } },
        { id: 'cb3-device1', type: 'device', x: 80, y: 700, width: 400, height: 840, style: { rotateX: 15, rotateY: 20, rotation: -8 }, platform: 'ios' },
        { id: 'cb3-device2', type: 'device', x: 600, y: 700, width: 400, height: 840, style: { rotateX: 15, rotateY: -20, rotation: 8 }, platform: 'ios' },
        { id: 'cb3-device3', type: 'device', x: 300, y: 500, width: 480, height: 1000, style: { rotateX: 5, rotateY: 0, rotation: 0 }, platform: 'ios' },
        { id: 'cb3-av1', type: 'badge', x: 150, y: 500, width: 80, height: 80, content: '👱‍♀️', style: { bgColor: '#fcd34d', fontSize: 40, borderRadius: 40 } },
        { id: 'cb3-av2', type: 'badge', x: 850, y: 500, width: 80, height: 80, content: '👨🏽', style: { bgColor: '#38bdf8', fontSize: 40, borderRadius: 40 } }
      ]
    }),
    bs(4, {
      backgroundColor: bg, width: W, height: H,
      elements: [
        { id: 'cb4-bg', type: 'blob', x: -500, y: -500, width: 2080, height: 2920, style: { color: '#7c3aed', opacity: 1, borderRadius: '0px' } },
        { id: 'cb4-conf1', type: 'text', x: 100, y: 500, width: 880, height: 880, content: '🎉', style: { fontSize: 400, align: 'center' } },
        { id: 'cb4-title', type: 'text', x: 80, y: 220, width: 920, height: 100, content: 'Deals Every Day', style: { fontSize: 84, fontWeight: '900', color: '#ffffff', align: 'center' } },
        { id: 'cb4-badge', type: 'badge', x: 290, y: 350, width: 500, height: 90, content: 'UP TO 70% OFF', style: { bgColor: '#facc15', color: '#000', fontSize: 36, fontWeight: '900', borderRadius: 20 } },
        { id: 'cb4-device', type: 'device', x: 240, y: 550, width: 600, height: 1260, style: { rotateX: 15, rotateY: 0, rotation: 0 }, platform: 'ios' }
      ]
    }),
    bs(5, {
      backgroundColor: bg, width: W, height: H,
      elements: [
        { id: 'cb5-bg', type: 'blob', x: -500, y: -500, width: 2080, height: 2920, style: { color: '#7c3aed', opacity: 1, borderRadius: '0px' } },
        { id: 'cb5-title', type: 'text', x: 80, y: 250, width: 920, height: 100, content: 'Get Started Free', style: { fontSize: 84, fontWeight: '900', color: '#ffffff', align: 'center' } },
        { id: 'cb5-sub', type: 'text', x: 80, y: 370, width: 920, height: 60, content: 'No credit card needed', style: { fontSize: 36, color: '#fbcfe8', align: 'center' } },
        { id: 'cb5-arr', type: 'text', x: 490, y: 460, width: 100, height: 100, content: '⬇️', style: { fontSize: 60, align: 'center' } },
        { id: 'cb5-device1', type: 'device', x: 150, y: 650, width: 440, height: 920, style: { rotateX: 10, rotateY: 15, rotation: -8 }, platform: 'ios' },
        { id: 'cb5-device2', type: 'device', x: 490, y: 800, width: 460, height: 960, style: { rotateX: 10, rotateY: -15, rotation: 8 }, platform: 'ios' },
        { id: 'cb5-app', type: 'badge', x: 150, y: 1720, width: 360, height: 90, content: 'App Store', style: { bgColor: '#ffffff', color: '#7c3aed', fontSize: 26, fontWeight: '800', borderRadius: 24 } },
        { id: 'cb5-gp', type: 'badge', x: 570, y: 1720, width: 360, height: 90, content: 'Google Play', style: { bgColor: '#ffffff', color: '#7c3aed', fontSize: 26, fontWeight: '800', borderRadius: 24 } }
      ]
    })
  ]
}

// ─── 3D GLASS MORPHISM KIT ────────────────────────────────────
export function buildMockupGlassMorphism(t) {
  const bg = '#e0f2fe'
  const W = 1080
  const H = 1920

  return [
    bs(1, {
      backgroundColor: bg, width: W, height: H,
      elements: [
        { id: 'gm1-blob', type: 'blob', x: -100, y: -100, width: 1200, height: 1200, style: { color: '#ffffff', opacity: 0.8, borderRadius: '50%' } },
        { id: 'gm1-card', type: 'badge', x: 240, y: 700, width: 600, height: 900, content: '', style: { bgColor: 'rgba(255,255,255,0.4)', borderRadius: 40 } },
        { id: 'gm1-title', type: 'text', x: 80, y: 220, width: 920, height: 100, content: 'Pure. Simple. Powerful.', style: { fontSize: 72, fontWeight: '800', color: '#1e293b', align: 'center' } },
        { id: 'gm1-sub', type: 'text', x: 80, y: 340, width: 920, height: 60, content: 'The app everyone is talking about', style: { fontSize: 32, color: '#475569', align: 'center' } },
        { id: 'gm1-device', type: 'device', x: 300, y: 550, width: 480, height: 1000, style: { rotateX: 5, rotateY: -15, rotation: 0 }, platform: 'ios' }
      ]
    }),
    bs(2, {
      backgroundColor: bg, width: W, height: H,
      elements: [
        { id: 'gm2-title', type: 'text', x: 80, y: 220, width: 920, height: 100, content: 'Beautiful By Design', style: { fontSize: 80, fontWeight: '800', color: '#1e293b', align: 'center' } },
        { id: 'gm2-sub', type: 'text', x: 80, y: 340, width: 920, height: 60, content: 'Every pixel. Perfected.', style: { fontSize: 36, color: '#475569', align: 'center' } },
        { id: 'gm2-card1', type: 'badge', x: 100, y: 700, width: 280, height: 280, content: '✨ UI', style: { bgColor: 'rgba(255,255,255,0.6)', color: '#1e293b', fontSize: 36, fontWeight: '700', borderRadius: 40 } },
        { id: 'gm2-card2', type: 'badge', x: 700, y: 1000, width: 280, height: 280, content: '🚀 UX', style: { bgColor: 'rgba(255,255,255,0.6)', color: '#1e293b', fontSize: 36, fontWeight: '700', borderRadius: 40 } },
        { id: 'gm2-device', type: 'device', x: 340, y: 550, width: 400, height: 840, style: { rotateX: 10, rotateY: 10, rotation: 0 }, platform: 'ios' }
      ]
    }),
    bs(3, {
      backgroundColor: bg, width: W, height: H,
      elements: [
        { id: 'gm3-blob', type: 'blob', x: 200, y: 500, width: 680, height: 680, style: { color: '#bae6fd', opacity: 0.8, borderRadius: '50%' } },
        { id: 'gm3-title', type: 'text', x: 80, y: 200, width: 920, height: 100, content: 'Your Privacy Matters', style: { fontSize: 76, fontWeight: '800', color: '#1e293b', align: 'center' } },
        { id: 'gm3-sub', type: 'text', x: 80, y: 320, width: 920, height: 60, content: '100% secure. Always encrypted.', style: { fontSize: 32, color: '#475569', align: 'center' } },
        { id: 'gm3-icon', type: 'text', x: 490, y: 400, width: 100, height: 100, content: '🔒', style: { fontSize: 60, align: 'center' } },
        { id: 'gm3-card', type: 'badge', x: 290, y: 1100, width: 500, height: 160, content: 'Shield Protected', style: { bgColor: 'rgba(255,255,255,0.7)', color: '#0f172a', fontSize: 36, fontWeight: '800', borderRadius: 30 } },
        { id: 'gm3-device', type: 'device', x: 300, y: 500, width: 480, height: 1000, style: { rotateX: 0, rotateY: 0, rotation: 0 }, platform: 'ios' }
      ]
    }),
    bs(4, {
      backgroundColor: bg, width: W, height: H,
      elements: [
        { id: 'gm4-title', type: 'text', x: 80, y: 220, width: 920, height: 100, content: 'Works Everywhere', style: { fontSize: 80, fontWeight: '800', color: '#1e293b', align: 'center' } },
        { id: 'gm4-sub', type: 'text', x: 80, y: 340, width: 920, height: 60, content: 'Syncs across all your devices', style: { fontSize: 36, color: '#475569', align: 'center' } },
        { id: 'gm4-line', type: 'blob', x: 340, y: 950, width: 400, height: 10, style: { color: '#0ea5e9', opacity: 0.5, borderRadius: '5px' } },
        { id: 'gm4-icon', type: 'text', x: 490, y: 420, width: 100, height: 100, content: '☁️', style: { fontSize: 60, align: 'center' } },
        { id: 'gm4-device1', type: 'device', x: 120, y: 600, width: 380, height: 780, style: { rotateX: 5, rotateY: 15, rotation: 0 }, platform: 'ios' },
        { id: 'gm4-device2', type: 'device', x: 580, y: 600, width: 380, height: 780, style: { rotateX: 5, rotateY: -15, rotation: 0 }, platform: 'ios' }
      ]
    }),
    bs(5, {
      backgroundColor: bg, width: W, height: H,
      elements: [
        { id: 'gm5-blob', type: 'blob', x: 240, y: 650, width: 600, height: 600, style: { color: '#e0f2fe', opacity: 1, borderRadius: '50%', filter: 'blur(50px)' } },
        { id: 'gm5-title', type: 'text', x: 80, y: 200, width: 920, height: 100, content: 'Download For Free', style: { fontSize: 80, fontWeight: '800', color: '#1e293b', align: 'center' } },
        { id: 'gm5-sub', type: 'text', x: 80, y: 320, width: 920, height: 60, content: 'Available on iOS and Android', style: { fontSize: 36, color: '#475569', align: 'center' } },
        { id: 'gm5-device', type: 'device', x: 290, y: 450, width: 500, height: 1050, style: { rotateX: 10, rotateY: 0, rotation: 0 }, platform: 'ios' },
        { id: 'gm5-card', type: 'badge', x: 240, y: 1550, width: 600, height: 250, content: '', style: { bgColor: 'rgba(255,255,255,0.5)', borderRadius: 40 } },
        { id: 'gm5-app', type: 'badge', x: 290, y: 1600, width: 500, height: 75, content: 'Get it on App Store', style: { bgColor: '#1e293b', color: '#ffffff', fontSize: 24, fontWeight: '700', borderRadius: 24 } },
        { id: 'gm5-gp', type: 'badge', x: 290, y: 1700, width: 500, height: 75, content: 'Get it on Google Play', style: { bgColor: '#1e293b', color: '#ffffff', fontSize: 24, fontWeight: '700', borderRadius: 24 } }
      ]
    })
  ]
}

export const MOCKUP_BUILDERS = {
  'mockup-clean-cover': buildMockupCleanCover,
  'mockup-iphone14-pro': buildMockupIphone14Pro,
  'mockup-premium-reviews': buildMockupPremiumReviews,
  'mockup-trusted-elegance': buildMockupTrustedElegance,
  'mockup-vibrant-success': buildMockupVibrantSuccess,
  'mockup-dating-app': buildMockupDatingApp,
  'mockup-ecommerce-app': buildMockupEcommerceApp,
  'mockup-shop-filmstrip': buildMockupShopFilmstrip,
  'mockup-dark-glow': buildMockupDarkGlow,
  'mockup-midnight-tech': buildMockupMidnightTech,
  'mockup-pure-white': buildMockupPureWhite,
  'mockup-soft-gray': buildMockupSoftGray,
  'mockup-vibrant-sunset': buildMockupVibrantSunset,
  'mockup-ocean-breeze': buildMockupOceanBreeze,
  'mockup-dynamic-tilt': buildMockupDynamicTilt,
  'mockup-float-perspective': buildMockupFloatPerspective,
  'mockup-geometric-pop': buildMockupGeometricPop,
  'mockup-abstract-waves': buildMockupAbstractWaves,
  'play-3d-isometric': buildPlay3DIsometric,
  'play-3d-panoramic': buildPlay3DPanoramic,
  'mockup-dark-float': buildMockupDarkFloat,
  'mockup-perspective-navy': buildMockupPerspectiveNavy,
  'mockup-colorful-blast': buildMockupColorfulBlast,
  'mockup-glass-morphism': buildMockupGlassMorphism,
}
