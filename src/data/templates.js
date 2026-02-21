export const TEMPLATE_CATEGORIES = {
  ALL: 'all',
  MOCKUPS: 'mockups',
  LANDSCAPE: 'landscape',
  HANDHELD: 'handheld-devices',
  THREE_D: '3d-devices',
  TWO_D: '2d-devices',
  COLORFUL: 'colorful-devices',
  MINIMAL: 'minimalistic',
  DARK: 'dark',
  ILLUSTRATIONS: 'illustrations',
}

export const templates = [
  // ─── MOCKUP TEMPLATES (with real builders) ─────────────────────
  {
    id: 'mockup-iphone14-pro',
    name: 'iPhone 14 Pro Mockups',
    type: 'mockup',
    badge: 'Figma',
    slideCount: 1,
    backgroundColor: '#2D2D2D',
    categories: [
      TEMPLATE_CATEGORIES.ALL,
      TEMPLATE_CATEGORIES.MOCKUPS,
      TEMPLATE_CATEGORIES.DARK,
      TEMPLATE_CATEGORIES.HANDHELD,
    ],
    slides: [
      { title: 'Free and updated', subtitle: 'Very clean and easy to use' },
    ],
  },
  {
    id: 'mockup-clean-cover',
    name: 'Clean Cover',
    type: 'mockup',
    badge: 'New',
    slideCount: 1,
    backgroundColor: '#1C1C1C',
    categories: [
      TEMPLATE_CATEGORIES.ALL,
      TEMPLATE_CATEGORIES.MOCKUPS,
      TEMPLATE_CATEGORIES.DARK,
      TEMPLATE_CATEGORIES.MINIMAL,
    ],
    slides: [
      { title: 'Free and updated', subtitle: 'Very clean and easy to use' },
    ],
  },
  {
    id: 'mockup-premium-reviews',
    name: 'Premium Reviews',
    type: 'mockup',
    badge: 'Pro',
    slideCount: 1,
    backgroundColor: '#0F172A',
    categories: [
      TEMPLATE_CATEGORIES.ALL,
      TEMPLATE_CATEGORIES.MOCKUPS,
      TEMPLATE_CATEGORIES.DARK,
    ],
    slides: [
      { title: 'Loved by thousands.', subtitle: 'The highest rated app in its category.' },
    ],
  },
  {
    id: 'mockup-trusted-elegance',
    name: 'Trusted Elegance',
    type: 'mockup',
    badge: 'New',
    slideCount: 1,
    backgroundColor: '#F8FAFC',
    categories: [
      TEMPLATE_CATEGORIES.ALL,
      TEMPLATE_CATEGORIES.MOCKUPS,
      TEMPLATE_CATEGORIES.MINIMAL,
    ],
    slides: [
      { title: 'Industry Leading Experience', subtitle: 'Join the community of satisfied professionals.' },
    ],
  },
  {
    id: 'mockup-vibrant-success',
    name: 'Vibrant Success',
    type: 'mockup',
    badge: 'Hot',
    slideCount: 1,
    backgroundColor: '#FF6B6B',
    categories: [
      TEMPLATE_CATEGORIES.ALL,
      TEMPLATE_CATEGORIES.MOCKUPS,
      TEMPLATE_CATEGORIES.COLORFUL,
    ],
    slides: [
      { title: 'The #1 Choice', subtitle: 'RATED 5 OUT OF 5' },
    ],
  },
  {
    id: 'mockup-dating-app',
    name: 'Match Made',
    type: 'mockup',
    badge: 'Trending',
    slideCount: 1,
    backgroundColor: '#FFEBEE',
    categories: [
      TEMPLATE_CATEGORIES.ALL,
      TEMPLATE_CATEGORIES.MOCKUPS,
      TEMPLATE_CATEGORIES.COLORFUL,
    ],
    slides: [
      { title: 'Find your perfect match.', subtitle: 'Join millions of users finding love every single day.' },
    ],
  },
  {
    id: 'mockup-ecommerce-app',
    name: 'Shop Seamless',
    type: 'mockup',
    badge: 'Pro',
    slideCount: 1,
    backgroundColor: '#F0F4F8',
    categories: [
      TEMPLATE_CATEGORIES.ALL,
      TEMPLATE_CATEGORIES.MOCKUPS,
      TEMPLATE_CATEGORIES.MINIMAL,
    ],
    slides: [
      { title: 'Shop the latest trends.', subtitle: 'Fast checkout, secure payments, and global shipping.' },
    ],
  },
  {
    id: 'mockup-shop-filmstrip',
    name: 'Shop Filmstrip',
    type: 'mockup',
    badge: 'New',
    slideCount: 5,
    backgroundColor: '#4A3B6B',
    primaryColor: '#FFFFFF',
    thumbnailColors: ['#4A3B6B', '#4A3B6B', '#F5F0E8', '#F5F0E8', '#F5F0E8'],
    categories: [
      TEMPLATE_CATEGORIES.ALL,
      TEMPLATE_CATEGORIES.MOCKUPS,
      TEMPLATE_CATEGORIES.COLORFUL,
    ],
    slides: [
      { title: 'Shop Better Save More', subtitle: 'Your safe place to shop online anytime.' },
      { title: '#fastfashion #zeeb', subtitle: 'Trending styles daily.' },
      { title: 'Easy Buying', subtitle: 'Best prices guaranteed.' },
      { title: 'Fast Delivery', subtitle: 'Efficient and reliable.' },
      { title: 'Trusted Brands', subtitle: 'Only verified sellers.' },
    ],
  },

  // ─── 10 NEW ALGORITHMIC TEMPLATES ───────────────────────────
  // 1. Dark Theme: Dark Glow
  {
    id: 'mockup-dark-glow',
    name: 'Dark Glow',
    type: 'mockup',
    badge: 'Pro',
    slideCount: 1,
    backgroundColor: '#0a0a14',
    categories: [
      TEMPLATE_CATEGORIES.ALL,
      TEMPLATE_CATEGORIES.MOCKUPS,
      TEMPLATE_CATEGORIES.DARK,
    ],
    slides: [{ title: 'Illuminate your app.', subtitle: 'Next-gen design.' }],
  },
  // 2. Dark Theme: Midnight Tech
  {
    id: 'mockup-midnight-tech',
    name: 'Midnight Tech',
    type: 'mockup',
    badge: 'Hot',
    slideCount: 1,
    backgroundColor: '#121212',
    categories: [
      TEMPLATE_CATEGORIES.ALL,
      TEMPLATE_CATEGORIES.MOCKUPS,
      TEMPLATE_CATEGORIES.DARK,
    ],
    slides: [{ title: 'Powerful & Secure.', subtitle: 'The industry standard.' }],
  },
  // 3. Minimalistic: Pure White
  {
    id: 'mockup-pure-white',
    name: 'Pure White',
    type: 'mockup',
    badge: 'New',
    slideCount: 1,
    backgroundColor: '#ffffff',
    categories: [
      TEMPLATE_CATEGORIES.ALL,
      TEMPLATE_CATEGORIES.MOCKUPS,
      TEMPLATE_CATEGORIES.MINIMAL,
    ],
    slides: [{ title: 'Simplicity is key.', subtitle: 'Less is more.' }],
  },
  // 4. Minimalistic: Soft Gray
  {
    id: 'mockup-soft-gray',
    name: 'Soft Gray',
    type: 'mockup',
    badge: 'Free',
    slideCount: 1,
    backgroundColor: '#f3f4f6',
    categories: [
      TEMPLATE_CATEGORIES.ALL,
      TEMPLATE_CATEGORIES.MOCKUPS,
      TEMPLATE_CATEGORIES.MINIMAL,
    ],
    slides: [{ title: 'Elegance in gray.', subtitle: 'Clean and modern.' }],
  },
  // 5. Colorful: Vibrant Sunset
  {
    id: 'mockup-vibrant-sunset',
    name: 'Vibrant Sunset',
    type: 'mockup',
    badge: 'Pro',
    slideCount: 1,
    backgroundColor: '#ff7e5f',
    categories: [
      TEMPLATE_CATEGORIES.ALL,
      TEMPLATE_CATEGORIES.MOCKUPS,
      TEMPLATE_CATEGORIES.COLORFUL,
    ],
    slides: [{ title: 'Stand out daily.', subtitle: 'Vibrant and alive.' }],
  },
  // 6. Colorful: Ocean Breeze
  {
    id: 'mockup-ocean-breeze',
    name: 'Ocean Breeze',
    type: 'mockup',
    badge: 'Hot',
    slideCount: 1,
    backgroundColor: '#00c6ff',
    categories: [
      TEMPLATE_CATEGORIES.ALL,
      TEMPLATE_CATEGORIES.MOCKUPS,
      TEMPLATE_CATEGORIES.COLORFUL,
    ],
    slides: [{ title: 'Cool and refreshing.', subtitle: 'Ride the wave.' }],
  },
  // 7. 3D Device: Dynamic Tilt
  {
    id: 'mockup-dynamic-tilt',
    name: 'Dynamic Tilt',
    type: 'mockup',
    badge: 'Pro',
    slideCount: 1,
    backgroundColor: '#2b2b2b',
    categories: [
      TEMPLATE_CATEGORIES.ALL,
      TEMPLATE_CATEGORIES.MOCKUPS,
      TEMPLATE_CATEGORIES.THREE_D,
    ],
    slides: [{ title: 'Feel the depth.', subtitle: 'Incredible 3D realism.' }],
  },
  // 8. 3D Device: Float Perspective
  {
    id: 'mockup-float-perspective',
    name: 'Float Perspective',
    type: 'mockup',
    badge: 'New',
    slideCount: 1,
    backgroundColor: '#1e3a8a',
    categories: [
      TEMPLATE_CATEGORIES.ALL,
      TEMPLATE_CATEGORIES.MOCKUPS,
      TEMPLATE_CATEGORIES.THREE_D,
    ],
    slides: [{ title: 'Above the clouds.', subtitle: 'Stunning floating angles.' }],
  },
  // 9. Illustration: Geometric Pop
  {
    id: 'mockup-geometric-pop',
    name: 'Geometric Pop',
    type: 'mockup',
    badge: 'Trending',
    slideCount: 1,
    backgroundColor: '#fef3c7',
    categories: [
      TEMPLATE_CATEGORIES.ALL,
      TEMPLATE_CATEGORIES.MOCKUPS,
      TEMPLATE_CATEGORIES.ILLUSTRATIONS,
    ],
    slides: [{ title: 'Playful designs.', subtitle: 'Geometry meets art.' }],
  },
  // 10. Illustration: Abstract Waves
  {
    id: 'mockup-abstract-waves',
    name: 'Abstract Waves',
    type: 'mockup',
    badge: 'Pro',
    slideCount: 1,
    backgroundColor: '#e0e7ff',
    categories: [
      TEMPLATE_CATEGORIES.ALL,
      TEMPLATE_CATEGORIES.MOCKUPS,
      TEMPLATE_CATEGORIES.ILLUSTRATIONS,
    ],
    slides: [{ title: 'Smooth sailing.', subtitle: 'Abstract and beautiful.' }],
  },

  // ─── SCREENSHOT TEMPLATES (quality, with unique layouts) ──────
  {
    id: 'social-neon', name: 'Social Neon', type: 'screenshot', badge: 'Pro', slideCount: 5, backgroundColor: '#0a0a0a',
    categories: [TEMPLATE_CATEGORIES.ALL, TEMPLATE_CATEGORIES.DARK, TEMPLATE_CATEGORIES.COLORFUL],
    slides: [{ title: 'Connect with everyone', subtitle: 'Stories, reels, and more.' }, { title: 'Share your moments' }, { title: 'Go viral instantly' }, { title: 'DMs that deliver' }, { title: 'Your feed your way' }],
  },
  {
    id: 'fitness-pro', name: 'Fitness Pro', type: 'screenshot', badge: 'Pro', slideCount: 5, backgroundColor: '#1a1a2e',
    categories: [TEMPLATE_CATEGORIES.ALL, TEMPLATE_CATEGORIES.DARK],
    slides: [{ title: 'Train smarter not harder', subtitle: 'Personalized workouts & meal plans.' }, { title: 'Track your progress' }, { title: '500+ workout routines' }, { title: 'Nutrition insights' }, { title: 'Join the community' }],
  },
  {
    id: 'music-vibes', name: 'Music Vibes', type: 'screenshot', badge: 'Pro', slideCount: 5, backgroundColor: '#1a0033',
    categories: [TEMPLATE_CATEGORIES.ALL, TEMPLATE_CATEGORIES.DARK, TEMPLATE_CATEGORIES.COLORFUL],
    slides: [{ title: 'Feel the beat drop', subtitle: '100M+ tracks. Zero ads.' }, { title: 'Discover new artists' }, { title: 'Offline mode everywhere' }, { title: 'AI-curated playlists' }, { title: 'Your soundtrack' }],
  },
  {
    id: 'crypto-dark', name: 'Crypto Dark', type: 'screenshot', badge: 'Pro', slideCount: 5, backgroundColor: '#0b0e11',
    categories: [TEMPLATE_CATEGORIES.ALL, TEMPLATE_CATEGORIES.DARK],
    slides: [{ title: 'Trade crypto like a pro', subtitle: 'Buy, sell, and stake 500+ coins.' }, { title: 'Real-time portfolio' }, { title: 'Bank-grade security' }, { title: 'Staking rewards' }, { title: 'DeFi made easy' }],
  },
  {
    id: 'weather-calm', name: 'Weather Calm', type: 'screenshot', badge: 'New', slideCount: 5, backgroundColor: '#e3f2fd',
    categories: [TEMPLATE_CATEGORIES.ALL, TEMPLATE_CATEGORIES.MINIMAL],
    slides: [{ title: 'Know your weather', subtitle: 'Accurate forecasts, beautiful design.' }, { title: 'Hourly forecasts' }, { title: 'Severe weather alerts' }, { title: 'Radar maps' }, { title: 'Plan your day' }],
  },
  {
    id: 'meditation-zen', name: 'Meditation Zen', type: 'screenshot', badge: 'New', slideCount: 5, backgroundColor: '#f3e5f5',
    categories: [TEMPLATE_CATEGORIES.ALL, TEMPLATE_CATEGORIES.COLORFUL],
    slides: [{ title: 'Find your calm', subtitle: 'Guided meditations & sleep stories.' }, { title: 'Sleep better' }, { title: 'Breathing exercises' }, { title: 'Daily mindfulness' }, { title: 'Inner peace' }],
  },
  {
    id: 'podcast-studio', name: 'Podcast Studio', type: 'screenshot', badge: 'Pro', slideCount: 5, backgroundColor: '#fff3e0',
    categories: [TEMPLATE_CATEGORIES.ALL, TEMPLATE_CATEGORIES.COLORFUL],
    slides: [{ title: 'Listen to the world', subtitle: '2M+ episodes from top creators.' }, { title: 'Discover shows' }, { title: 'Download & go' }, { title: 'Create your show' }, { title: 'Trending now' }],
  },
  {
    id: 'real-estate-luxury', name: 'Real Estate Luxury', type: 'screenshot', badge: 'Pro', slideCount: 5, backgroundColor: '#1b2838',
    categories: [TEMPLATE_CATEGORIES.ALL, TEMPLATE_CATEGORIES.DARK],
    slides: [{ title: 'Find your dream home', subtitle: 'Premium listings in your area.' }, { title: 'Virtual tours' }, { title: 'Smart search' }, { title: 'Schedule viewings' }, { title: 'Invest smarter' }],
  },
  {
    id: 'banking-secure', name: 'Banking Secure', type: 'screenshot', badge: 'Pro', slideCount: 5, backgroundColor: '#0a1628',
    categories: [TEMPLATE_CATEGORIES.ALL, TEMPLATE_CATEGORIES.DARK],
    slides: [{ title: 'Banking made modern', subtitle: 'Send, save, and invest in seconds.' }, { title: 'Instant transfers' }, { title: 'Zero fees globally' }, { title: 'Budget insights' }, { title: 'Your money app' }],
  },
  {
    id: 'photography-minimal', name: 'Photography Minimal', type: 'screenshot', badge: 'New', slideCount: 5, backgroundColor: '#fafafa',
    categories: [TEMPLATE_CATEGORIES.ALL, TEMPLATE_CATEGORIES.MINIMAL],
    slides: [{ title: 'Capture every detail', subtitle: 'Pro editing tools in your pocket.' }, { title: 'AI-powered editing' }, { title: '100+ filters & presets' }, { title: 'Share in 4K' }, { title: 'Studio quality' }],
  },
  {
    id: 'news-flash', name: 'News Flash', type: 'screenshot', badge: 'Pro', slideCount: 5, backgroundColor: '#b71c1c',
    categories: [TEMPLATE_CATEGORIES.ALL, TEMPLATE_CATEGORIES.DARK, TEMPLATE_CATEGORIES.COLORFUL],
    slides: [{ title: 'News that matters', subtitle: 'Real-time updates from trusted sources.' }, { title: 'Stay informed' }, { title: 'AI-curated feed' }, { title: 'Video news' }, { title: 'World at a tap' }],
  },
  {
    id: 'ride-go', name: 'Ride Go', type: 'screenshot', badge: 'Pro', slideCount: 5, backgroundColor: '#000000',
    categories: [TEMPLATE_CATEGORIES.ALL, TEMPLATE_CATEGORIES.DARK],
    slides: [{ title: 'Get there faster', subtitle: 'Rides in minutes. Fair prices always.' }, { title: 'Track your ride' }, { title: 'Split fare with friends' }, { title: 'Schedule ahead' }, { title: 'Go anywhere' }],
  },
  {
    id: 'recipe-kitchen', name: 'Recipe Kitchen', type: 'screenshot', badge: 'New', slideCount: 5, backgroundColor: '#fce4ec',
    categories: [TEMPLATE_CATEGORIES.ALL, TEMPLATE_CATEGORIES.COLORFUL],
    slides: [{ title: 'Cook like a chef', subtitle: '50K+ recipes from world-class chefs.' }, { title: 'Step by step' }, { title: 'Meal planner' }, { title: 'Shopping list' }, { title: 'Bon appetit!' }],
  },
  {
    id: 'language-learn', name: 'Language Learn', type: 'screenshot', badge: 'New', slideCount: 5, backgroundColor: '#e8f5e9',
    categories: [TEMPLATE_CATEGORIES.ALL, TEMPLATE_CATEGORIES.COLORFUL],
    slides: [{ title: 'Speak any language', subtitle: '40+ languages. 5 min a day.' }, { title: 'Fun daily lessons' }, { title: 'AI tutor for you' }, { title: 'Track streaks' }, { title: 'Learn for free' }],
  },
  {
    id: 'task-planner', name: 'Task Planner', type: 'screenshot', badge: 'Pro', slideCount: 5, backgroundColor: '#263238',
    categories: [TEMPLATE_CATEGORIES.ALL, TEMPLATE_CATEGORIES.DARK],
    slides: [{ title: 'Get stuff done', subtitle: 'Organize projects, tasks, and life.' }, { title: 'Kanban boards' }, { title: 'Team collaboration' }, { title: 'Smart reminders' }, { title: 'Plan your day' }],
  },
]

