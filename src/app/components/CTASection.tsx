import { BackgroundArc } from "./BackgroundArc";
import { SwarrowLogoMark } from "./SwarrowLogo";

export function CTASection() {
  return (
    <section id="cta" className="relative bg-[#F5F5F7] py-24 lg:py-32 overflow-hidden">
      <BackgroundArc
        color="#092045"
        opacity={0.03}
        className="w-[700px] h-[700px] -left-[200px] -bottom-[200px]"
      />
      <BackgroundArc
        color="#092045"
        opacity={0.02}
        className="w-[500px] h-[500px] right-[-100px] -top-[100px]"
        flip
      />

      <div className="max-w-[800px] mx-auto px-6 lg:px-8 text-center relative z-10">
        {/* Logo icon */}
        <div className="flex justify-center mb-8">
          <div className="w-[64px] h-[64px] bg-[#092045]/8 rounded-full flex items-center justify-center">
            <SwarrowLogoMark color="#092045" size={28} />
          </div>
        </div>

        {/* Heading */}
        <h2
          className="text-[#092045] text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.2] mb-6"
          style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 900 }}
        >
          まずは、お気軽にご相談ください。
        </h2>

        {/* Sub copy */}
        <p
          className="text-[#52506B] text-[15px] lg:text-[17px] leading-[1.8] mb-12"
          style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 400 }}
        >
          システムデモやお見積りのご依頼など、
          <br />
          どんなことでもお気軽にお問い合わせください。
        </p>

        {/* CTA Button */}
        <button
          className="bg-[#E87B35] hover:bg-[#d46a28] text-white px-12 py-4 rounded-full transition-all duration-300 hover:shadow-[0_8px_30px_rgba(232,123,53,0.4)] text-[16px] sm:text-[18px] cursor-pointer"
          style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 700 }}
        >
          無料相談を予約する
        </button>

        {/* Trust note */}
        <p
          className="text-[#636180] text-[13px] mt-8"
          style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 400 }}
        >
          まずは無料相談から。契約の義務はありません。
        </p>
      </div>
    </section>
  );
}