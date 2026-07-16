import { usePostHog } from 'posthog-js/react';
import { ArrowUpRight, CheckCircle, LockKeyhole, Wrench } from 'lucide-react';
import { projects, projectGroups, internalTools, Project } from '../data';

const statusStyles: Record<NonNullable<Project['status']>, string> = {
  Live: 'bg-emerald-600 text-white',
  'Live pilot': 'bg-teal-700 text-white',
  'Live demo': 'bg-cyan-700 text-white',
  Seasonal: 'bg-blue-700 text-white',
  'In development': 'bg-amber-500 text-slate-950',
  'Private deployment': 'bg-indigo-800 text-white',
  Paused: 'bg-slate-600 text-white',
};

const selectedProjects = projects
  .filter((project) => project.selectedOrder !== undefined)
  .sort((a, b) => (a.selectedOrder ?? 0) - (b.selectedOrder ?? 0));

function SelectedProject({ project, index }: { project: Project; index: number }) {
  const posthog = usePostHog();
  const isPaused = project.status === 'Paused';

  return (
    <article className={`group grid overflow-hidden rounded-xl border border-slate-200 bg-white lg:grid-cols-[1.08fr_0.92fr] ${isPaused ? 'opacity-80' : ''}`}>
      <div className={`relative min-h-64 overflow-hidden bg-slate-100 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
        {project.image ? (
          <img src={project.image} alt={project.title} loading="lazy" decoding="async" className={`h-full min-h-64 w-full transition duration-700 group-hover:scale-[1.025] ${project.imageStyle || 'object-cover'}`} />
        ) : (
          <div className={`flex h-full min-h-64 items-center justify-center bg-gradient-to-br ${project.gradientBg || 'from-blue-500 to-indigo-700'} text-white [&_svg]:h-16 [&_svg]:w-16`}>
            {project.icon}
          </div>
        )}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
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
          {!project.link && project.status === 'Private deployment' && (
            <span className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500"><LockKeyhole className="h-3.5 w-3.5" /> Private client deployment</span>
          )}
          {isPaused && <span className="ml-auto text-sm italic text-slate-400">Currently on hold</span>}
        </div>
      </div>
    </article>
  );
}

function PortfolioProjectCard({ project }: { project: Project }) {
  const posthog = usePostHog();
  const canVisit = Boolean(project.link) && project.status !== 'Paused';

  const content = (
    <>
      <div className="flex items-start gap-4">
        <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg ${project.image ? 'border border-slate-200 bg-white p-2' : `bg-gradient-to-br ${project.gradientBg || 'from-slate-700 to-slate-950'} text-white [&_svg]:h-7 [&_svg]:w-7`}`}>
          {project.image ? <img src={project.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain" /> : project.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h5 className="text-base font-bold leading-tight text-slate-950">{project.title}</h5>
            {project.status && <span className={`font-mono-label rounded px-2 py-1 text-[10px] ${statusStyles[project.status]}`}>{project.status}</span>}
          </div>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-blue-600">{project.subtitle}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-600">{project.description}</p>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-3 border-t border-slate-100 pt-3">
        <div className="flex flex-wrap gap-x-2.5 gap-y-1 text-[11px] font-semibold text-slate-500">{project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
        {canVisit && <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-slate-400 transition group-hover:text-blue-600" />}
        {!project.link && project.status === 'Private deployment' && <LockKeyhole className="h-4 w-4 flex-shrink-0 text-slate-400" />}
      </div>
    </>
  );

  if (canVisit && project.link) {
    return (
      <a href={project.link} target="_blank" rel="noopener noreferrer" onClick={() => posthog.capture('portfolio_card_clicked', { project_title: project.title, url: project.link })} className="group block rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg">
        {content}
      </a>
    );
  }

  return <article className="group rounded-xl border border-slate-200 bg-white p-5">{content}</article>;
}

export default function Projects() {
  const totalProjects = projects.length;
  const liveProjects = projects.filter((project) => ['Live', 'Seasonal', 'Private deployment'].includes(project.status || '')).length;
  const pilotsAndDemos = projects.filter((project) => ['Live pilot', 'Live demo'].includes(project.status || '')).length;

  return (
    <section id="projects" className="bg-white py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div><p className="font-mono-label text-xs text-blue-600">Selected work</p><h2 className="mt-4 text-3xl font-bold text-slate-950 md:text-5xl">Products with real users and measurable stakes.</h2></div>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-600 lg:justify-self-end">From Guam payroll and education to civic operations and international events, our work turns complicated rules and workflows into software people can use.</p>
        </div>
        <div className="mt-10 space-y-5 md:mt-12 md:space-y-6">{selectedProjects.map((project, index) => <SelectedProject key={project.title} project={project} index={index} />)}</div>

        <div className="mt-16 rounded-2xl border border-slate-200 bg-[#f7f8fa] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 border-b border-slate-200 pb-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="font-mono-label text-xs text-slate-500">Complete portfolio</p>
              <h3 className="mt-3 text-2xl font-bold text-slate-950 md:text-3xl">{totalProjects} products, pilots, and production systems</h3>
            </div>
            <div>
              <p className="text-sm leading-relaxed text-slate-600">A status-aware view of our work across AI, education, operations, finance, civic engagement, commerce, community, sports, and public events.</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-emerald-800">{liveProjects} live, seasonal, or private deployments</span>
                <span className="rounded-full bg-cyan-100 px-3 py-1.5 text-cyan-800">{pilotsAndDemos} live pilots or demos</span>
                <span className="rounded-full bg-white px-3 py-1.5 text-slate-600">Clear status on every project</span>
              </div>
            </div>
          </div>

          <div className="mt-9 space-y-10">
            {projectGroups.map((group) => (
              <section key={group.title} aria-labelledby={`portfolio-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                <div className="grid gap-3 border-b border-slate-300 pb-4 md:grid-cols-[0.8fr_1.2fr] md:items-end">
                  <div className="flex items-center gap-3"><h4 id={`portfolio-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="text-xl font-bold text-slate-950">{group.title}</h4><span className="font-mono-label rounded bg-white px-2 py-1 text-[9px] text-slate-500">{group.projects.length}</span></div>
                  <p className="text-sm leading-relaxed text-slate-500 md:text-right">{group.description}</p>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2">{group.projects.map((project) => <PortfolioProjectCard key={project.title} project={project} />)}</div>
              </section>
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
