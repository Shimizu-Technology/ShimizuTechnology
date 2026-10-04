import { usePostHog } from 'posthog-js/react';
import { ArrowUpRight, LockKeyhole, Wrench } from 'lucide-react';
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

const caseStudies: Record<string, { challenge: string; built: string; result: string }> = {
  'Hafaloha Orders': {
    challenge: 'Handle a high-volume concert VIP launch and its fulfillment without losing orders.',
    built: 'A custom ordering, payments, shipping, and event fulfillment platform.',
    result: '850+ VIP orders processed, complete fulfillment, and zero event-day downtime.',
  },
  'Cornerstone Payroll': {
    challenge: 'Make Guam payroll and filing workflows dependable for a local accounting firm.',
    built: 'Payroll calculations, approvals, check printing, tax summaries, and audit history.',
    result: 'A production system used by Cornerstone Accounting.',
  },
  'CSG Learning Hub': {
    challenge: 'Keep course content, student progress, reviews, and cohort work in one place.',
    built: 'A private learning platform for lessons, recordings, grading, and instructor workflows.',
    result: 'The live platform powering Code School of Guam.',
  },
  'Marianas Open': {
    challenge: 'Serve competitors and fans across several countries during live events.',
    built: 'A multilingual platform for schedules, profiles, rankings, streams, and results.',
    result: 'A live tournament site for competitors, fans, and event operations.',
  },
};

function SelectedProject({ project, index }: { project: Project; index: number }) {
  const posthog = usePostHog();
  const isPaused = project.status === 'Paused';
  const story = caseStudies[project.title];

  return (
    <article className={`group grid overflow-hidden rounded-xl border border-slate-200 bg-white lg:grid-cols-[1.08fr_0.92fr] ${isPaused ? 'opacity-80' : ''}`}>
      <div className={`relative min-h-64 overflow-hidden bg-slate-100 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
        {project.image ? (
          <img src={project.image} alt={project.title} loading="lazy" decoding="async" className={`h-full min-h-64 w-full transition duration-700 group-hover:scale-[1.025] ${project.imageStyle || 'object-cover'}`} />
        ) : (
          <div className={`flex h-full min-h-64 items-center justify-center bg-linear-to-br ${project.gradientBg || 'from-blue-500 to-indigo-700'} text-white [&_svg]:h-16 [&_svg]:w-16`}>
            {project.icon}
          </div>
        )}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {project.status && <span className={`font-mono-label rounded-sm px-2.5 py-1 text-xs shadow-xs ${statusStyles[project.status]}`}>{project.status}</span>}
          <span className="font-mono-label rounded-sm bg-[#07101f]/90 px-2.5 py-1 text-xs text-white backdrop-blur-sm">Selected work</span>
        </div>
      </div>

      <div className={`flex flex-col justify-center p-6 sm:p-8 lg:p-10 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
        <div className="font-mono-label text-xs text-blue-700">{project.subtitle}</div>
        <h3 className="mt-3 text-2xl font-bold text-slate-950 md:text-3xl">{project.title}</h3>
        <p className="mt-4 leading-relaxed text-slate-600">{project.description}</p>
        {story && <dl className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-sm leading-relaxed">
          <div><dt className="font-semibold text-slate-900">The challenge</dt><dd className="text-slate-600">{story.challenge}</dd></div>
          <div><dt className="font-semibold text-slate-900">What we built</dt><dd className="text-slate-600">{story.built}</dd></div>
          <div><dt className="font-semibold text-slate-900">The result</dt><dd className="text-slate-600">{story.result}</dd></div>
        </dl>}
        <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold text-slate-600">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
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
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg ${project.image ? 'border border-slate-200 bg-white p-2' : `bg-linear-to-br ${project.gradientBg || 'from-slate-700 to-slate-950'} text-white [&_svg]:h-7 [&_svg]:w-7`}`}>
          {project.image ? <img src={project.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain" /> : project.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h4 className="text-base font-bold leading-tight text-slate-950">{project.title}</h4>
            {project.status && <span className={`font-mono-label rounded-sm px-2 py-1 text-[10px] ${statusStyles[project.status]}`}>{project.status}</span>}
          </div>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-blue-600">{project.subtitle}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-600">{project.description}</p>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-3 border-t border-slate-100 pt-3">
        <div className="flex flex-wrap gap-x-2.5 gap-y-1 text-[11px] font-semibold text-slate-500">{project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
        {canVisit && <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-blue-600" />}
        {!project.link && project.status === 'Private deployment' && <LockKeyhole className="h-4 w-4 shrink-0 text-slate-400" />}
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

export default function Projects({ showSelected = true, showArchive = false }: { showSelected?: boolean; showArchive?: boolean }) {
  const totalProjects = projects.length;
  const liveProjects = projects.filter((project) => ['Live', 'Seasonal', 'Private deployment'].includes(project.status || '')).length;
  const liveDemos = projects.filter((project) => project.status === 'Live demo').length;

  return (
    <section id="projects" className="scroll-mt-20 bg-white py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {showSelected && <>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div><p className="font-mono-label text-xs text-blue-600">Selected work</p><h2 className="mt-4 text-3xl font-bold text-slate-950 md:text-5xl">Products with real users and measurable stakes.</h2></div>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-600 lg:justify-self-end">From Guam payroll and education to civic operations and international events, our work turns complicated rules and workflows into software people can use.</p>
        </div>
        <div className="mt-10 space-y-5 md:mt-12 md:space-y-6">{selectedProjects.map((project, index) => <SelectedProject key={project.title} project={project} index={index} />)}</div>

        <a href="/work/" className="mt-9 inline-flex items-center gap-2 rounded-md border border-slate-300 px-5 py-3 font-semibold text-slate-900 transition hover:border-blue-500 hover:text-blue-700">Explore more projects <ArrowUpRight className="h-4 w-4" /></a>
        </>}

        {showArchive && <>
        <div className="rounded-2xl border border-slate-200 bg-[#f7f8fa] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 border-b border-slate-200 pb-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="font-mono-label text-xs text-slate-500">Selected portfolio</p>
              <h2 className="mt-3 text-2xl font-bold text-slate-950 md:text-3xl">{totalProjects} selected products, pilots, and production systems</h2>
            </div>
            <div>
              <p className="text-sm leading-relaxed text-slate-600">A status-aware view of our work across AI, education, operations, finance, civic engagement, commerce, community, sports, and public events.</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-emerald-800">{liveProjects} live, seasonal, or private deployments</span>
                <span className="rounded-full bg-cyan-100 px-3 py-1.5 text-cyan-800">{liveDemos} live {liveDemos === 1 ? 'demo' : 'demos'}</span>
                <span className="rounded-full bg-white px-3 py-1.5 text-slate-600">Clear status on every project</span>
              </div>
            </div>
          </div>

          <div className="mt-9 space-y-10">
            {projectGroups.map((group) => (
              <section key={group.title} aria-labelledby={`portfolio-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                <div className="grid gap-3 border-b border-slate-300 pb-4 md:grid-cols-[0.8fr_1.2fr] md:items-end">
                  <div className="flex items-center gap-3"><h3 id={`portfolio-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="text-xl font-bold text-slate-950">{group.title}</h3><span className="font-mono-label rounded-sm bg-white px-2 py-1 text-xs text-slate-600">{group.projects.length}</span></div>
                  <p className="text-sm leading-relaxed text-slate-500 md:text-right">{group.description}</p>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2">{group.projects.map((project) => <PortfolioProjectCard key={project.title} project={project} />)}</div>
              </section>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-10">
          <div className="flex items-center gap-3"><Wrench className="h-5 w-5 text-blue-600" /><h2 className="text-xl font-bold text-slate-950">Tools we build for ourselves</h2></div>
          <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-4">
            {internalTools.map((tool) => (
              <div key={tool.title} className="bg-white p-5"><div className="flex items-start justify-between gap-3"><h3 className="font-bold text-slate-900">{tool.title}</h3>{tool.link && <a href={tool.link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${tool.title}`}><ArrowUpRight className="h-4 w-4 text-slate-400 hover:text-blue-600" /></a>}</div><p className="mt-2 text-sm leading-relaxed text-slate-500">{tool.description}</p></div>
            ))}
          </div>
        </div>
        </>}
      </div>
    </section>
  );
}
