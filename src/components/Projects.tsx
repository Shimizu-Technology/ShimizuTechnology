import type React from 'react';
import { ArrowUpRight, LockKeyhole, Wrench } from 'lucide-react';
import { projects, projectGroups, internalTools, portfolioCounts, type Project, type ProjectStatus } from '../data';
import { track } from '../lib/analytics';

// Every badge keeps at least 4.5:1 contrast for its small text.
const statusStyles: Record<ProjectStatus, string> = {
  Live: 'bg-emerald-700 text-white',
  'Live pilot': 'bg-teal-700 text-white',
  'Live demo': 'bg-cyan-700 text-white',
  Seasonal: 'bg-blue-700 text-white',
  Prototype: 'bg-violet-700 text-white',
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

function StatusBadge({ status, size = 'md' }: { status: ProjectStatus; size?: 'sm' | 'md' }) {
  return (
    <span className={`font-mono-label inline-block shrink-0 whitespace-nowrap rounded-sm ${size === 'sm' ? 'px-2 py-1 text-[11px]' : 'px-2.5 py-1 text-xs'} ${statusStyles[status]}`}>
      {status}
    </span>
  );
}

function CaseImage({ project }: { project: Project }) {
  const image = project.caseImage;
  if (image) {
    return (
      <picture>
        {/* Tablet: the card is full width, so show the whole page. Phone and desktop: the product crop. */}
        <source media="(min-width: 640px) and (max-width: 1023.98px)" srcSet={`${image.wide.small} 800w, ${image.wide.large} 1600w`} sizes="100vw" width={image.wide.width} height={image.wide.height} />
        <img
          src={image.focus.small}
          srcSet={`${image.focus.small} 560w, ${image.focus.large} 1120w`}
          sizes="(min-width: 1024px) 480px, 100vw"
          alt={image.alt}
          width={image.focus.width}
          height={image.focus.height}
          loading="lazy"
          decoding="async"
          className="case-screenshot"
        />
      </picture>
    );
  }
  if (project.image) {
    return <img src={project.image} alt={project.title} loading="lazy" decoding="async" width="640" height="360" className={`case-logo ${project.imageStyle || 'object-cover'}`} />;
  }
  return (
    <div className={`flex h-full min-h-64 items-center justify-center bg-linear-to-br ${project.gradientBg || 'from-blue-500 to-indigo-700'} text-white [&_svg]:h-16 [&_svg]:w-16`}>
      {project.icon}
    </div>
  );
}

function SelectedProject({ project }: { project: Project }) {
  const isPaused = project.status === 'Paused';
  const story = caseStudies[project.title];

  return (
    <article className={`case-study ${isPaused ? 'opacity-80' : ''}`}>
      <div className="case-image relative overflow-hidden">
        <CaseImage project={project} />
      </div>

      <div className="case-copy flex flex-col justify-center">
        <div className="flex flex-wrap items-center gap-2">
          {project.status && <StatusBadge status={project.status} />}
          <span className="font-mono-label min-w-0 text-xs text-blue-700">{project.subtitle}</span>
        </div>
        <h3 className="mt-3 text-2xl font-bold text-slate-950 md:text-3xl">{project.title}</h3>
        <p className="mt-4 leading-relaxed text-slate-600">{project.description}</p>
        {story && <details className="case-details">
          <summary>Read the case study</summary>
          <dl className="mt-2 space-y-3 text-sm leading-relaxed">
          <div><dt className="font-semibold text-slate-900">The challenge</dt><dd className="text-slate-600">{story.challenge}</dd></div>
          <div><dt className="font-semibold text-slate-900">What we built</dt><dd className="text-slate-600">{story.built}</dd></div>
          <div><dt className="font-semibold text-slate-900">The result</dt><dd className="text-slate-600">{story.result}</dd></div>
          </dl>
        </details>}
        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
          <div className="flex min-w-0 flex-1 flex-wrap gap-x-3 gap-y-1 text-xs font-semibold text-slate-600">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          {project.link && !isPaused && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" onClick={() => track('project_link_clicked', { project_title: project.title, url: project.link })} className="text-link ml-auto inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-bold text-blue-700">
              Visit product <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          {!project.link && project.status === 'Private deployment' && (
            <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-slate-600"><LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" /> Private client deployment</span>
          )}
          {isPaused && <span className="ml-auto text-sm italic text-slate-600">Currently on hold</span>}
        </div>
      </div>
    </article>
  );
}

function PortfolioProjectCard({ project }: { project: Project }) {
  const canVisit = Boolean(project.link) && project.status !== 'Paused';
  const appStoreLink = project.status !== 'Paused' ? project.appStoreLink : undefined;

  return (
    <article className={`portfolio-card group relative rounded-xl border border-slate-200 bg-white p-5 ${canVisit ? 'is-linked' : ''}`}>
      <div className="flex items-start gap-4">
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg ${project.image ? `border p-2 ${project.logoTileClass || 'border-slate-200 bg-white'}` : `bg-linear-to-br ${project.gradientBg || 'from-slate-700 to-slate-950'} text-white [&_svg]:h-7 [&_svg]:w-7`}`}>
          {project.image ? <img src={project.image} alt="" loading="lazy" decoding="async" width="56" height="56" className="h-full w-full object-contain" /> : project.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h4 className="min-w-0 text-base font-bold leading-tight text-slate-950">
              {canVisit && project.link ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer" onClick={() => track('portfolio_card_clicked', { project_title: project.title, url: project.link })} className="card-link">
                  {project.title}<span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : project.title}
            </h4>
            {project.status && <StatusBadge status={project.status} size="sm" />}
          </div>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-blue-700">{project.subtitle}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-600">{project.description}</p>
      <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-3">
        <div className="flex min-w-0 flex-1 flex-wrap gap-x-2.5 gap-y-1 text-[11px] font-semibold text-slate-600">{project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
        {appStoreLink && (
          <a href={appStoreLink} target="_blank" rel="noopener noreferrer" onClick={() => track('portfolio_card_clicked', { project_title: project.title, url: appStoreLink })} className="text-link relative z-10 inline-flex min-h-11 shrink-0 items-center gap-1 text-xs font-bold text-blue-700">
            App Store <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /><span className="sr-only"> for {project.title} (opens in a new tab)</span>
          </a>
        )}
        {canVisit && <ArrowUpRight className="card-arrow h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />}
        {!project.link && project.status === 'Private deployment' && <LockKeyhole className="h-4 w-4 shrink-0 text-slate-500" aria-label="Private deployment" />}
      </div>
    </article>
  );
}

export default function Projects({ showSelected = true, showArchive = false }: { showSelected?: boolean; showArchive?: boolean }) {
  return (
    <section id="projects" className="site-section bg-white">
      <div className="site-container">
        {showSelected && <>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div><p className="font-mono-label section-label">Selected work</p><h2 className="section-title mt-4">Products with real users and measurable stakes.</h2></div>
          <p className="section-intro lg:justify-self-end">From Guam payroll and education to civic operations and international events, our work turns complicated rules and workflows into software people can use.</p>
        </div>
        <div className="mt-9 space-y-5">{selectedProjects.map((project) => <SelectedProject key={project.title} project={project} />)}</div>

        <a href="/work/" className="button-secondary mt-7">Explore all {portfolioCounts.total} projects <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
        </>}

        {showArchive && <>
        <h2 className="sr-only">Projects by area</h2>
        <div className="space-y-12">
          {projectGroups.map((group) => {
            const id = `portfolio-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
            return (
              <section key={group.title} aria-labelledby={id}>
                <div className="grid gap-3 border-b border-slate-300 pb-4 md:grid-cols-[0.8fr_1.2fr] md:items-end">
                  <div className="flex items-center gap-3"><h3 id={id} className="text-xl font-bold text-slate-950">{group.title}</h3><span className="font-mono-label rounded-sm bg-slate-100 px-2 py-1 text-xs text-slate-600">{group.projects.length}</span></div>
                  <p className="text-sm leading-relaxed text-slate-600 md:text-right">{group.description}</p>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2">{group.projects.map((project) => <PortfolioProjectCard key={project.title} project={project} />)}</div>
              </section>
            );
          })}
        </div>

        <div className="mt-12 border-t border-slate-200 pt-10">
          <div className="flex items-center gap-3"><Wrench className="h-5 w-5 text-blue-600" aria-hidden="true" /><h2 className="text-xl font-bold text-slate-950">Tools we build for ourselves</h2></div>
          <ul className="tools-grid mt-6" style={{ '--tool-columns': Math.min(internalTools.length, 4) } as React.CSSProperties}>
            {internalTools.map((tool) => (
              <li key={tool.title} className="tool-cell relative">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-bold text-slate-900">
                    {tool.link ? (
                      <a href={tool.link} {...(tool.link.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="card-link">
                        {tool.title}{tool.link.startsWith('http') && <span className="sr-only"> (opens in a new tab)</span>}
                      </a>
                    ) : tool.title}
                  </h3>
                  {tool.link && <ArrowUpRight className="card-arrow h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{tool.description}</p>
              </li>
            ))}
          </ul>
        </div>
        </>}
      </div>
    </section>
  );
}
