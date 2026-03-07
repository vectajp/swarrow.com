import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ProblemSection } from "./components/ProblemSection";
import { SolutionSection } from "./components/SolutionSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { FAQSection } from "./components/FAQSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { ScrollFadeIn } from "./components/ScrollFadeIn";

export default function App() {
  return (
    <div className="w-full min-h-screen" style={{ scrollBehavior: "smooth" }}>
      <Header />
      <main>
        <HeroSection />
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
          <CTASection />
        </ScrollFadeIn>
      </main>
      <Footer />
    </div>
  );
}