import shimizuLogo from '../../assets/ShimizuTechnologyLogo.jpg';

export default function CaseStudyFooter() {
  return (
    <footer className="bg-[#07101f] py-10 text-white">
      <div className="site-container">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <a
              href="/"
              aria-label="Shimizu Technology home"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full"
            >
              <img
                src={shimizuLogo}
                alt=""
                width="36"
                height="36"
                className="h-9 w-9 rounded-full object-contain"
              />
            </a>
            <div>
              <span className="block font-semibold">Shimizu Technology</span>
              <span className="text-sm text-slate-300">Websites, software &amp; automation · Guam</span>
            </div>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm">
            <a href="/#services" className="inline-flex min-h-11 items-center px-2 text-slate-300 hover:text-white active:text-white">
              Services
            </a>
            <a href="/work/" className="inline-flex min-h-11 items-center px-2 text-slate-300 hover:text-white active:text-white">
              Portfolio
            </a>
            <a href="/#about" className="inline-flex min-h-11 items-center px-2 text-slate-300 hover:text-white active:text-white">
              About
            </a>
            <a href="/#contact" className="inline-flex min-h-11 items-center px-2 text-slate-300 hover:text-white active:text-white">
              Contact
            </a>
            <a
              href="https://codeschoolofguam.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center px-2 text-slate-300 hover:text-white active:text-white"
            >
              Code School of Guam ↗
            </a>
          </nav>

          <div className="text-sm text-slate-300">
            © {new Date().getFullYear()} Shimizu Technology
          </div>
        </div>
      </div>
    </footer>
  );
}
