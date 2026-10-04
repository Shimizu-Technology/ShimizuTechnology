import shimizuLogo from '../assets/ShimizuTechnologyLogo.jpg';

export default function Footer() {
  const isWorkPage = window.location.pathname.replace(/\/$/, '') === '/work';

  return (
    <footer className="bg-[#07101f] py-10 text-white">
      <div className="site-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-3">
            <a href="/" aria-label="Shimizu Technology home"><img
              src={shimizuLogo}
              alt=""
              width="36" height="36" className="h-9 w-9 rounded-full object-contain"
            /></a>
            <div>
              <span className="block font-semibold">Shimizu Technology</span>
              <span className="text-sm text-slate-400">Websites, software &amp; automation · Guam</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-5 text-sm">
            <a href={isWorkPage ? '/#services' : '#services'} className="text-slate-300 hover:text-white transition-colors">Services</a>
            <a href="/work/" aria-current={isWorkPage ? 'page' : undefined} className="text-slate-300 hover:text-white transition-colors">Portfolio</a>
            <a href={isWorkPage ? '/#about' : '#about'} className="text-slate-300 hover:text-white transition-colors">About</a>
            <a href="#contact" className="text-slate-300 hover:text-white transition-colors">Contact</a>
          </div>

          <div className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Shimizu Technology
          </div>
        </div>
      </div>
    </footer>
  );
}
