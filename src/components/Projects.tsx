import { usePostHog } from 'posthog-js/react';
import {
  CheckCircle,
  Star,
  ExternalLink,
  Smartphone,
  Wrench,
  Clock,
} from 'lucide-react';
import { projects, internalTools, Project, InternalTool } from '../data';

function ProjectCard({ project }: { project: Project }) {
  const posthog = usePostHog();

  return (
    <div
      className={`group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col h-full ${project.isPaused ? 'opacity-75' : ''}`}
    >
      {/* Image Header */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full ${project.imageStyle || 'object-cover'} group-hover:scale-105 transition-transform duration-500`}
          />
        ) : project.gradientBg ? (
          <div className={`w-full h-full bg-gradient-to-br ${project.gradientBg} flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}>
            <div className="text-white/90 [&_svg]:w-16 [&_svg]:h-16">
              {project.icon}
            </div>
          </div>
        ) : null}
        {project.image && project.imageStyle?.includes('object-cover') && !project.imageStyle?.includes('object-contain') && (
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
        )}

        {/* Status badges */}
        <div className="absolute top-3 left-3 flex gap-1.5 z-10">
          {project.isNew && !project.isComingSoon && (
            <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-semibold rounded shadow-sm">
              NEW
            </span>
          )}
          {project.isComingSoon && (
            <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-semibold rounded shadow-sm flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {project.isComingSoon}
            </span>
          )}
          {project.isFeatured && (
            <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-semibold rounded flex items-center gap-1 shadow-sm">
              <Star className="w-3 h-3" /> FEATURED
            </span>
          )}
          {project.isPaused && (
            <span className="px-2 py-0.5 bg-slate-500 text-white text-xs font-semibold rounded shadow-sm">
              PAUSED
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <div className={`p-1.5 ${project.accentColor} rounded-md text-white flex-shrink-0`}>
            {project.icon}
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-slate-900 truncate">{project.title}</h3>
            <p className="text-slate-500 text-xs truncate">{project.subtitle}</p>
          </div>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-3">
          {project.description}
        </p>

        <ul className="space-y-1.5 mb-3 flex-grow">
          {project.features.map((feature, idx) => (
            <li key={idx} className="flex items-start text-sm text-slate-600">
              <CheckCircle className="w-3.5 h-3.5 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1 mb-3">
          {project.tags.map((tag, idx) => (
            <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-auto pt-2 border-t border-slate-100">
          {project.isComingSoon ? (
            <span className="text-sm text-slate-400 italic">{project.isComingSoon}</span>
          ) : (
            <>
              {project.link && !project.isPaused && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    posthog.capture('project_link_clicked', {
                      project_title: project.title,
                      url: project.link
                    });
                  }}
                  className={`inline-flex items-center px-3 py-1.5 ${project.accentColor} text-white rounded-md hover:opacity-90 transition-all text-sm font-medium`}
                >
                  Visit Site
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              )}
              {project.appStoreLink && (
                <a
                  href={project.appStoreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    posthog.capture('app_store_clicked', {
                      project_title: project.title
                    });
                  }}
                  className="inline-flex items-center px-3 py-1.5 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-all text-sm font-medium"
                >
                  <Smartphone className="w-3 h-3 mr-1" />
                  App Store
                </a>
              )}
              {project.isPaused && !project.appStoreLink && (
                <span className="text-sm text-slate-400 italic">Currently on hold</span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function InternalToolCard({ tool }: { tool: InternalTool }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2.5 ${tool.accentColor} rounded-lg text-white`}>
          {tool.icon}
        </div>
        <h4 className="text-lg font-bold text-slate-900">{tool.title}</h4>
      </div>

      <p className="text-slate-600 text-sm mb-4 leading-relaxed">
        {tool.description}
      </p>

      <ul className="space-y-1.5 mb-4">
        {tool.features.map((feature, idx) => (
          <li key={idx} className="flex items-start text-sm text-slate-600">
            <CheckCircle className="w-3.5 h-3.5 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="flex flex-wrap gap-1">
          {tool.tags.map((tag, idx) => (
            <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">
              {tag}
            </span>
          ))}
        </div>
        {tool.link && (
          <a
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center px-3 py-1.5 ${tool.accentColor} text-white rounded-md hover:opacity-90 transition-all text-sm font-medium`}
          >
            Try It
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-20 -left-32 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-20 -right-32 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-50" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-medium mb-2">Our Work</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Real solutions we've built for real businesses in Guam and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        {/* Internal Tools Section */}
        <div className="mt-20 pt-16 border-t border-slate-200">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-sm font-medium text-slate-600 mb-4">
              <Wrench className="w-4 h-4" />
              Built for Us
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Tools We Build for Ourselves
            </h3>
            <p className="text-slate-600 max-w-xl mx-auto">
              When we have a problem, we solve it with code. These internal tools help us work smarter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {internalTools.map((tool, index) => (
              <InternalToolCard key={index} tool={tool} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
