import shimizuLogo from '../assets/ShimizuTechnologyLogo.jpg';

export default function Footer() {
  const isWorkPage = window.location.pathname.replace(/\/$/, '') === '/work';

  return (
    <footer className="bg-[#07101f] py-10 text-white">
      <div className="site-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-3">
            <a href="/" aria-label="Shimizu Technology home" className="inline-flex min-h-11 min-w-11 items-center justify-center"><img
              src={shimizuLogo}
              alt=""
              width="36" height="36" className="h-9 w-9 rounded-full object-contain"
            /></a>
            <div>
              <span className="block font-semibold">Shimizu Technology</span>
              <span className="text-sm text-slate-400">Websites, software &amp; automation · Guam</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-sm">
            <a href={isWorkPage ? '/#services' : '#services'} className="inline-flex min-h-11 items-center px-2 text-slate-300 hover:text-white active:text-white">Services</a>
            <a href="/work/" aria-current={isWorkPage ? 'page' : undefined} className="inline-flex min-h-11 items-center px-2 text-slate-300 hover:text-white active:text-white">Portfolio</a>
            <a href={isWorkPage ? '/#about' : '#about'} className="inline-flex min-h-11 items-center px-2 text-slate-300 hover:text-white active:text-white">About</a>
            <a href="#contact" className="inline-flex min-h-11 items-center px-2 text-slate-300 hover:text-white active:text-white">Contact</a>
          </div>

          <div className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Shimizu Technology
          </div>
        </div>
      </div>
    </footer>
  );
}
