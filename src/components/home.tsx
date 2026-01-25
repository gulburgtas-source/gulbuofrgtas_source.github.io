import Hero from './portfolio/Hero';
import ProjectGrid from './portfolio/ProjectGrid';
import ImpactSection from './portfolio/ImpactSection';
import Header from './portfolio/Header';
import GlobeFooter from './portfolio/GlobeFooter';
import FeaturedWork from './portfolio/FeaturedWork';
import CompleteBranding from './portfolio/CompleteBranding';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <Header />
      <div className="pt-20">
        <Hero />
        <FeaturedWork />
        <CompleteBranding />
        <ProjectGrid />
        <ImpactSection />
      </div>
      <GlobeFooter />
    </div>
  );
}