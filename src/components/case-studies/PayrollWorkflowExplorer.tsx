import { useRef, useState, type KeyboardEvent } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import SectionMark from '../SectionMark';
import { payrollWorkflowSteps } from '../../data/caseStudies';

export default function PayrollWorkflowExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeStep = payrollWorkflowSteps[activeIndex];
  const progressScale = activeIndex / (payrollWorkflowSteps.length - 1);

  const selectStep = (nextIndex: number, moveFocus = false) => {
    const clamped = Math.max(0, Math.min(payrollWorkflowSteps.length - 1, nextIndex));
    setActiveIndex(clamped);
    if (moveFocus) {
      requestAnimationFrame(() => {
        tabRefs.current[clamped]?.focus();
      });
    }
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      selectStep((index + 1) % payrollWorkflowSteps.length, true);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      selectStep((index - 1 + payrollWorkflowSteps.length) % payrollWorkflowSteps.length, true);
    } else if (event.key === 'Home') {
      event.preventDefault();
      selectStep(0, true);
    } else if (event.key === 'End') {
      event.preventDefault();
      selectStep(payrollWorkflowSteps.length - 1, true);
    }
  };

  return (
    <section
      id="workflow-explorer"
      className="cs-section cs-dark-band"
      aria-labelledby="workflow-explorer-heading"
    >
      <div className="site-container">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono-label cs-eyebrow">
            <SectionMark />
            See how it connects
          </p>
          <span className="font-mono-label inline-flex items-center rounded-sm border border-[#3a4f66] bg-[#162230] px-3 py-1 text-[11px] text-[#b8dfe5]">
            Illustrative workflow
          </span>
        </div>

        <h2 id="workflow-explorer-heading" className="cs-section-heading max-w-[22ch] text-white">
          From daily shift punches to archived payroll records.
        </h2>
        <p className="cs-lead mt-4">
          This illustrative 4-step workflow shows how a Guam workforce time clock (such as AIRE Services) connects into a structured payroll run (such as Cornerstone Payroll). Select any step or use the arrow keys to trace each handoff.
        </p>

        <div className="cs-workflow-shell">
          <div className="cs-workflow-track-wrap">
            <div className="cs-workflow-rail" aria-hidden="true">
              <div
                className="cs-workflow-rail-fill"
                style={{ transform: `scaleX(${progressScale})` }}
              />
            </div>

            <div
              role="tablist"
              aria-label="Illustrative operations workflow steps"
              className="cs-workflow-tabs"
            >
              {payrollWorkflowSteps.map((step, index) => {
                const isSelected = index === activeIndex;
                return (
                  <button
                    key={step.id}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`workflow-tab-${step.id}`}
                    aria-selected={isSelected}
                    aria-controls={`workflow-panel-${step.id}`}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => selectStep(index)}
                    onKeyDown={(event) => onTabKeyDown(event, index)}
                    className="cs-step-btn"
                  >
                    <span className="font-mono-label cs-step-num">{step.number}</span>
                    <span className="cs-step-title">{step.shortTitle}</span>
                    <span className="cs-step-sub">{step.stageLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            key={activeStep.id}
            role="tabpanel"
            id={`workflow-panel-${activeStep.id}`}
            aria-labelledby={`workflow-tab-${activeStep.id}`}
            tabIndex={0}
            className="cs-workflow-panel"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono-label text-xs text-[#b8dfe5]">
                Step {activeStep.number} of 0{payrollWorkflowSteps.length} · {activeStep.stageLabel}
              </span>
              <span className="text-xs text-[#b8c4d4]">
                Illustrative example · not a live client record
              </span>
            </div>

            <h3 className="mt-3 text-xl font-extrabold tracking-tight text-white sm:text-2xl">
              {activeStep.title}
            </h3>
            <p className="mt-3 max-w-[64ch] text-base leading-relaxed text-[#d4dde8]">
              {activeStep.summary}
            </p>

            <dl className="cs-workflow-meta">
              <div className="cs-workflow-meta-card">
                <dt className="font-mono-label">Who runs this step</dt>
                <dd>{activeStep.actor}</dd>
              </div>
              <div className="cs-workflow-meta-card">
                <dt className="font-mono-label">System role</dt>
                <dd>{activeStep.systemRole}</dd>
              </div>
              <div className="cs-workflow-meta-card">
                <dt className="font-mono-label">Handed off next</dt>
                <dd>{activeStep.handoff}</dd>
              </div>
            </dl>

            <div className="cs-workflow-schematic" aria-label="Illustrative 4-step handoff overview">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#b8c4d4]">
                <span className="font-mono-label text-[#b8dfe5]">Connected handoff path</span>
                <span>Illustrative workflow</span>
              </div>
              <ol className="cs-workflow-nodes">
                {payrollWorkflowSteps.map((step, index) => {
                  const isActive = index === activeIndex;
                  const isComplete = index < activeIndex;
                  return (
                    <li
                      key={step.id}
                      className={`cs-flow-node ${isActive ? 'is-active' : ''} ${isComplete ? 'is-complete' : ''}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono-label text-[11px] text-[#b8dfe5]">
                          {step.number}
                        </span>
                        {isComplete && (
                          <Check className="h-3.5 w-3.5 text-[#b8dfe5]" aria-hidden="true" />
                        )}
                        {isActive && (
                          <span className="font-mono-label text-[10px] text-[#b8dfe5]">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-sm font-bold text-white">{step.shortTitle}</p>
                      <p className="mt-1 text-xs text-[#b8c4d4]">{step.diagramNote}</p>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="cs-workflow-controls">
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => selectStep(activeIndex - 1)}
                  disabled={activeIndex === 0}
                  className="cs-btn cs-btn-outline-dark cs-btn-compact"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Previous step
                </button>
                <button
                  type="button"
                  onClick={() => selectStep(activeIndex + 1)}
                  disabled={activeIndex === payrollWorkflowSteps.length - 1}
                  className="cs-btn cs-btn-on-dark cs-btn-compact"
                >
                  Next step
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <p className="font-mono-label text-xs text-[#b8c4d4]" aria-live="polite">
                Showing step {activeIndex + 1} of {payrollWorkflowSteps.length}: {activeStep.shortTitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
