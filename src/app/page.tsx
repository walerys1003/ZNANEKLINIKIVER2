import { TopNav } from '@/components/ui/TopNav';
import { Footer } from '@/components/ui/Footer';
import { HeroHome } from '@/components/sections/HeroHome';
import { FeaturedSurgeons } from '@/components/sections/FeaturedSurgeons';
import { MagazineSection } from '@/components/sections/MagazineSection';
import { AIMatcherCTA } from '@/components/sections/AIMatcherCTA';
import { CategoriesGrid } from '@/components/sections/CategoriesGrid';
import { BeforeAfterPreview } from '@/components/sections/BeforeAfterPreview';

export default function HomePage() {
  return (
    <>
      <TopNav />
      <main>
        <HeroHome />
        <FeaturedSurgeons />
        <CategoriesGrid />
        <AIMatcherCTA />
        <BeforeAfterPreview />
        <MagazineSection />
      </main>
      <Footer />
    </>
  );
}
