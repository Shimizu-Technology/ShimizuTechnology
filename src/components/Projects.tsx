import { usePostHog } from 'posthog-js/react';
import { ArrowUpRight, CheckCircle, Wrench } from 'lucide-react';
import { projects, projectGroups, internalTools, Project } from '../data';

const statusStyles: Record<NonNullable<Project['status']>, string> = {
  Live: 'bg-emerald-600 text-white',
  Seasonal: 'bg-blue-700 text-white',
  'In Development': 'bg-amber-500 text-slate-950',
  Paused: 'bg-slate-600 text-white',
};

const selectedProjects = projects.filter((project) => project.isFeatured).slice(0, 3);

function SelectedProject({ project, index }: { project: Project; index: number }) {
  const posthog = usePostHog();
  const isPaused = project.status === 'Paused';

  return (
    <article className={`group grid overflow-hidden rounded-xl border border-slate-200 bg-white lg:grid-cols-[1.08fr_0.92fr] ${isPaused ? 'opacity-80' : ''}`}>
      <div className={`relative min-h-64 overflow-hidden bg-slate-100 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
        {project.image ? (
          <img src={project.image} alt={project.title} loading="lazy" decoding="async" className={`h-full min-h-64 w-full transition duration-700 group-hover:scale-[1.025] ${project.imageStyle || 'object-cover'}`} />
        ) : (
          <div className={`flex h-full min-h-64 items-center justify-center bg-gradient-to-br ${project.gradientBg || 'from-blue-500 to-indigo-700'} text-white`}>{project.icon}</div>
        )}
        <div className="absolute left-4 top-4 flex gap-2">
          {project.status && <span className={`font-mono-label rounded px-2.5 py-1 text-[10px] shadow-sm ${statusStyles[project.status]}`}>{project.status}</span>}
          <span className="font-mono-label rounded bg-[#07101f]/90 px-2.5 py-1 text-[10px] text-white backdrop-blur">Selected work</span>
        </div>
      </div>

      <div className={`flex flex-col justify-center p-6 sm:p-8 lg:p-10 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
        <div className="font-mono-label text-[10px] text-blue-600">{project.subtitle}</div>
        <h3 className="mt-3 text-2xl font-bold text-slate-950 md:text-3xl">{project.title}</h3>
        <p className="mt-4 leading-relaxed text-slate-600">{project.description}</p>
        <ul className="mt-6 space-y-2.5">
          {project.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-600"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500" /><span>{feature}</span></li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold text-slate-400">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          {project.link && !isPaused && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" onClick={() => posthog.capture('project_link_clicked', { project_title: project.title, url: project.link })} className="ml-auto inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-500">
              Visit product <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {isPaused && <span className="ml-auto text-sm italic text-slate-400">Currently on hold</span>}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const totalProjects = projects.length;

  return (
    <section id="projects" className="bg-white py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div><p className="font-mono-label text-xs text-blue-600">Selected work</p><h2 className="mt-4 text-3xl font-bold text-slate-950 md:text-5xl">Products with real users and measurable stakes.</h2></div>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-600 lg:justify-self-end">From payroll and education to ordering and live events, our work replaces fragmented processes with software teams can rely on.</p>
        </div>
        <div className="mt-10 space-y-5 md:mt-12 md:space-y-6">{selectedProjects.map((project, index) => <SelectedProject key={project.title} project={project} index={index} />)}</div>

        <div className="mt-16 grid gap-8 rounded-xl border border-slate-200 bg-[#f7f8fa] p-6 sm:p-8 lg:grid-cols-[0.75fr_1.25fr] lg:p-10">
          <div><p className="font-mono-label text-xs text-slate-500">Complete portfolio</p><h3 className="mt-3 text-2xl font-bold text-slate-950">{totalProjects} production and community projects</h3><p className="mt-3 text-sm leading-relaxed text-slate-600">A broader body of work across AI, business operations, commerce, education, sports, and public events.</p></div>
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {projectGroups.map((group) => (
              <div key={group.title} className="border-t border-slate-300 pt-3"><div className="flex items-center justify-between gap-3"><h4 className="font-bold text-slate-900">{group.title}</h4><span className="font-mono-label text-[10px] text-slate-400">{group.projects.length}</span></div><p className="mt-1 text-xs leading-relaxed text-slate-500">{group.projects.map((project) => project.title).join(' · ')}</p></div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-10">
          <div className="flex items-center gap-3"><Wrench className="h-5 w-5 text-blue-600" /><h3 className="text-xl font-bold text-slate-950">Tools we build for ourselves</h3></div>
          <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-4">
            {internalTools.map((tool) => (
              <div key={tool.title} className="bg-white p-5"><div className="flex items-start justify-between gap-3"><h4 className="font-bold text-slate-900">{tool.title}</h4>{tool.link && <a href={tool.link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${tool.title}`}><ArrowUpRight className="h-4 w-4 text-slate-400 hover:text-blue-600" /></a>}</div><p className="mt-2 text-sm leading-relaxed text-slate-500">{tool.description}</p></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
