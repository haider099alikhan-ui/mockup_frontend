/**
 * Project data for the Projects / Case Studies page.
 *
 * Each project renders as a full-width alternating banner section.
 * Replace with your real projects.
 */

const sampleProjects = [
    {
        id: 1,
        title: 'FitTrack Pro',
        tagline: 'Your AI-powered fitness companion',
        description:
            'Comprehensive workout tracking with smart recommendations, real-time heart-rate analytics, and personalised progress dashboards.',
        image: '/projects/fittrack.png',
        tags: ['React Native', 'Node.js', 'Firebase'],
        link: '#',
        gradient: 'from-blue-50 via-indigo-50 to-purple-50',
        accent: 'blue',
    },
    {
        id: 2,
        title: 'ShopEase',
        tagline: 'E-commerce, reimagined',
        description:
            'Beautifully curated storefronts with one-tap checkout, live inventory sync, and conversion-optimised product pages.',
        image: '/projects/shopease.png',
        tags: ['Next.js', 'Stripe', 'PostgreSQL'],
        link: '#',
        gradient: 'from-orange-50 via-rose-50 to-pink-50',
        accent: 'rose',
    },
    {
        id: 3,
        title: 'TaskFlow',
        tagline: 'Project management that flows',
        description:
            'Visual kanban boards, automated workflows, and real-time team collaboration — built for modern agile teams.',
        image: '/projects/taskflow.png',
        tags: ['React', 'GraphQL', 'MongoDB'],
        link: '#',
        gradient: 'from-emerald-50 via-teal-50 to-cyan-50',
        accent: 'emerald',
    },
    {
        id: 4,
        title: 'MealMate',
        tagline: 'Smart meals, zero effort',
        description:
            'AI-generated weekly meal plans with grocery integration, macro tracking, and 10,000+ chef-curated recipes.',
        image: '/projects/mealmate.png',
        tags: ['Flutter', 'Python', 'OpenAI'],
        link: '#',
        gradient: 'from-green-50 via-lime-50 to-yellow-50',
        accent: 'green',
    },
    {
        id: 5,
        title: 'LearnLingo',
        tagline: 'Languages learned, gamified',
        description:
            'Spaced-repetition flash cards, voice recognition drills, and achievement badges that make learning addictive.',
        image: '/projects/learnlingo.png',
        tags: ['Vue.js', 'Django', 'AWS'],
        link: '#',
        gradient: 'from-amber-50 via-yellow-50 to-orange-50',
        accent: 'amber',
    },
    {
        id: 6,
        title: 'CloudVault',
        tagline: 'Your files. Encrypted. Everywhere.',
        description:
            'Military-grade E2E encryption, smart versioning, and seamless team sharing — all in a gorgeous dark-mode UI.',
        image: '/projects/cloudvault.png',
        tags: ['React', 'Go', 'S3'],
        link: '#',
        gradient: 'from-slate-100 via-gray-50 to-blue-50',
        accent: 'slate',
    },
]

export default sampleProjects
