import shimizuLogo from '../assets/ShimizuTechnologyLogo.jpg';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-3">
            <img
              src={shimizuLogo}
              alt="Shimizu Technology Logo"
              className="h-9 w-9 object-contain rounded-full cursor-pointer"
              onClick={scrollToTop}
            />
            <div>
              <span className="font-semibold block">Shimizu Technology</span>
              <span className="text-sm text-slate-400">Building the future in Guam</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <a href="#services" className="text-slate-400 hover:text-white transition-colors">Services</a>
            <a href="#projects" className="text-slate-400 hover:text-white transition-colors">Projects</a>
            <a href="#about" className="text-slate-400 hover:text-white transition-colors">About</a>
            <a href="#contact" className="text-slate-400 hover:text-white transition-colors">Contact</a>
          </div>

          <div className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Shimizu Technology
          </div>
        </div>
      </div>
    </footer>
  );
}
