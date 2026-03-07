import { BackgroundArc } from "./BackgroundArc";
import { SwarrowLogoMark } from "./SwarrowLogo";

interface CTASectionProps {
  onDownloadClick: () => void;
}

export function CTASection({ onDownloadClick }: CTASectionProps) {
  return (
    <section id="cta" className="relative bg-sc-bg-light py-24 lg:py-32 overflow-hidden">
      <BackgroundArc
        color="var(--sc-navy)"
        opacity={0.03}
        className="w-[700px] h-[700px] -left-[200px] -bottom-[200px]"
      />
      <BackgroundArc
        color="var(--sc-navy)"
        opacity={0.02}
        className="w-[500px] h-[500px] right-[-100px] -top-[100px]"
        flip
      />

      <div className="max-w-[800px] mx-auto px-6 lg:px-8 text-center relative z-10">
        {/* Logo icon */}
        <div className="flex justify-center mb-8">
          <div className="w-[64px] h-[64px] bg-sc-navy/8 rounded-full flex items-center justify-center">
            <SwarrowLogoMark color="var(--sc-navy)" size={28} />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-sc-navy text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.2] mb-6 font-black">
          まずは、資料をご覧ください。
        </h2>

        {/* Sub copy */}
        <p className="text-sc-text-secondary text-[15px] lg:text-[17px] leading-[1.8] mb-12">
          サービスの詳細や導入事例をまとめた資料を
          <br />
          無料でダウンロードいただけます。
        </p>

        {/* CTA Button */}
        <button
          onClick={onDownloadClick}
          className="bg-sc-orange hover:bg-sc-orange-hover text-white px-12 py-4 rounded-full transition-all duration-300 hover:shadow-[0_8px_30px_rgba(232,123,53,0.4)] text-[16px] sm:text-[18px] font-bold cursor-pointer"
        >
          資料をダウンロードする
        </button>

        {/* Trust note */}
        <p className="text-sc-text-muted text-[13px] mt-8">
          無料でダウンロードできます。営業電話はいたしません。
        </p>
      </div>
    </section>
  );
}
