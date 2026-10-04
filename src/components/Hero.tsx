import { ArrowRight, ArrowUpRight } from 'lucide-react';
import desktopProduct from '../assets/hafaloha-orders-hero.webp';
import mobileProduct from '../assets/hafaloha-orders-mobile.webp';

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="site-container">
        <div className="hero-layout">
          <div>
            <p className="font-mono-label section-label mb-5">Guam-built software studio</p>
            <h1 className="hero-title">Technology built for how your business actually works.</h1>
            <p className="hero-copy">Improve your online presence and make everyday work easier through websites, software, and automation. We start with your needs, then improve the tools you have or build something new.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#contact" className="button-primary">Start a conversation <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
              <a href="#projects" className="button-secondary">Explore selected work <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-slate-600">A 20–30-minute call or meeting to explore where we can help.</p>
          </div>
          <figure className="product-preview" aria-label="Hafaloha Orders desktop and mobile product interfaces">
            <div className="product-window">
              <div className="flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-slate-600"><span>Hafaloha Orders</span><span>Desktop &amp; mobile</span></div>
              <img src={desktopProduct} alt="Hafaloha Orders desktop interface" width="1600" height="903" fetchPriority="high" className="aspect-video w-full rounded-sm object-cover object-top" />
            </div>
            <div className="absolute bottom-0 right-0 w-[23%] overflow-hidden rounded-[1rem] border-[4px] border-slate-800 bg-slate-800 shadow-lg">
              <img src={mobileProduct} alt="Hafaloha Orders mobile interface" width="720" height="1561" decoding="async" className="aspect-9/18 w-full object-cover object-top" />
            </div>
            <figcaption className="mt-4 pr-[27%] text-xs text-slate-600"><strong className="text-slate-900">Live-event reliability</strong><br />850+ orders · Zero downtime</figcaption>
          </figure>
        </div>
        <div className="hero-proof">
          {[
            ['20', 'Products & platforms'],
            ['4', 'AI systems live'],
            ['2', 'App Store launches'],
          ].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
      </div>
    </section>
  );
}
