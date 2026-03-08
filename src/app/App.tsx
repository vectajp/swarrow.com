import { useState } from 'react'
import { CTASection } from './components/CTASection'
import { DownloadFormModal } from './components/DownloadFormModal'
import { FAQSection } from './components/FAQSection'
import { FeaturesSection } from './components/FeaturesSection'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { HowItWorksSection } from './components/HowItWorksSection'
import { ProblemSection } from './components/ProblemSection'
import { ScrollFadeIn } from './components/ScrollFadeIn'
import { SolutionSection } from './components/SolutionSection'

export default function App() {
  const [isDownloadFormOpen, setIsDownloadFormOpen] = useState(false)
  const openDownloadForm = () => setIsDownloadFormOpen(true)

  return (
    <div className="w-full min-h-screen" style={{ scrollBehavior: 'smooth' }}>
      <Header onDownloadClick={openDownloadForm} />
      <main>
        <HeroSection onDownloadClick={openDownloadForm} />
        <ScrollFadeIn>
          <ProblemSection />
        </ScrollFadeIn>
        <ScrollFadeIn>
          <SolutionSection />
        </ScrollFadeIn>
        <ScrollFadeIn>
          <FeaturesSection />
        </ScrollFadeIn>
        <ScrollFadeIn>
          <HowItWorksSection />
        </ScrollFadeIn>
        <ScrollFadeIn>
          <FAQSection />
        </ScrollFadeIn>
        <ScrollFadeIn>
          <CTASection onDownloadClick={openDownloadForm} />
        </ScrollFadeIn>
      </main>
      <Footer />
      <DownloadFormModal isOpen={isDownloadFormOpen} onClose={() => setIsDownloadFormOpen(false)} />
    </div>
  )
}
