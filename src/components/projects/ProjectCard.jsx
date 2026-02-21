import { ExternalLink } from 'lucide-react'

function ProjectCard({ project }) {
    const {
        title,
        description,
        image,
        tags = [],
        link,
    } = project

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-gray-200/60">
            {/* Image / Mockup Area */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <div className="flex flex-col items-center gap-3 text-gray-300">
                            <svg
                                className="h-12 w-12"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
                                />
                            </svg>
                            <span className="text-xs font-medium">Project Preview</span>
                        </div>
                    </div>
                )}

                {/* Hover overlay with link */}
                {link && (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/30 group-hover:opacity-100"
                    >
                        <span className="flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-lg backdrop-blur-sm transition-transform duration-300 hover:scale-105">
                            <ExternalLink className="h-4 w-4" />
                            View Project
                        </span>
                    </a>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-blue-600">
                    {title}
                </h3>

                {description && (
                    <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">
                        {description}
                    </p>
                )}

                {/* Tags */}
                {tags.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500 ring-1 ring-gray-100 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:ring-blue-100"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProjectCard
