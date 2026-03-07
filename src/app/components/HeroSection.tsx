import { SwarrowLogo } from "./SwarrowLogo";
import { BackgroundArc } from "./BackgroundArc";

export function HeroSection() {
  const scrollToCTA = () => {
    document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative bg-sc-bg-light min-h-screen flex items-center overflow-hidden">
      {/* Background arcs */}
      <BackgroundArc
        color="var(--sc-navy)"
        opacity={0.03}
        className="w-[800px] h-[800px] -left-[200px] -top-[100px]"
      />
      <BackgroundArc
        color="var(--sc-navy)"
        opacity={0.02}
        className="w-[600px] h-[600px] right-[-150px] bottom-[-100px]"
        flip
      />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 w-full py-32 lg:py-40">
        <div className="flex flex-col items-center text-center">
          {/* Logo badge */}
          <div className="flex items-center gap-2 mb-8 opacity-70">
            <SwarrowLogo color="var(--sc-navy)" markSize={20} />
          </div>

          {/* Main heading */}
          <h1
            className="text-sc-navy text-[36px] sm:text-[48px] lg:text-[64px] leading-[1.2] mb-6"
            
>
            問い合わせ対応を、
            <br />
            <span className="text-sc-orange">AIが自動化</span>します。
          </h1>

          {/* Sub copy */}
          <p
            className="text-sc-navy/60 text-[16px] sm:text-[18px] lg:text-[20px] leading-[1.8] mb-12 max-w-[640px]"
            
>
            SwarrowCallは、WEBサイト・LINE・電話などあらゆる媒体で、まるで人間のように自然に会話するAIカスタマーサポートです。
          </p>

          {/* CTA */}
          <button
            onClick={scrollToCTA}
            className="bg-sc-orange hover:bg-sc-orange-hover text-white px-10 py-4 rounded-full transition-all duration-300 hover:shadow-[0_8px_30px_rgba(232,123,53,0.4)] text-[16px] sm:text-[18px] cursor-pointer"
            
>
            まずは無料で相談する
          </button>
        </div>
      </div>
    </section>
  );
}