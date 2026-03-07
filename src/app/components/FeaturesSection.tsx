import { MessageSquare, Phone, Settings } from "lucide-react";
import { BackgroundArc } from "./BackgroundArc";
import imgFeature1 from "figma:asset/feature-inquiry.png";
import imgFeature2 from "figma:asset/feature-calling.png";
import imgFeature3 from "figma:asset/feature-management.png";

const features = [
  {
    icon: MessageSquare,
    number: "01",
    title: "問合せ対応機能",
    description:
      "AIがチャット・電話で24時間自動対応。資料をもとに適切な回答を案内し、会話データの収集、SMS送信や外部システム連携まで自動で実行します。",
    image: imgFeature1,
    maskedImage: true,
  },
  {
    icon: Phone,
    number: "02",
    title: "架電機能",
    description:
      "スケジュール設定に基づきAIが自動架電。安否確認・督促・リマインド連絡を大量処理。数百〜数千件の一括発信も、用途別の会話フローで確実に対応します。",
    image: imgFeature2,
    maskedImage: true,
  },
  {
    icon: Settings,
    number: "03",
    title: "管理機能",
    description:
      "ノーコードで会話フローを作成・編集でき、会話データは外部AI学習に一切使用せず、安全に保護。AI対応が困難な問い合わせは担当者へ自動エスカレーションします。",
    image: imgFeature3,
    maskedImage: true,
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative bg-white py-24 lg:py-32 overflow-hidden">
      <BackgroundArc
        color="var(--sc-navy)"
        opacity={0.02}
        className="w-[600px] h-[600px] right-[-200px] top-[100px]"
        flip
      />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-16 lg:mb-20">
          <p
            className="text-sc-orange text-[14px] tracking-wider mb-4"
            
>
            FEATURES
          </p>
          <h2
            className="text-sc-text-primary text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.2]"
            
>
            3つの機能で、
            <br />
            対応業務を<span className="text-sc-orange">まるごと変える。</span>
          </h2>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.number}
                className="bg-white rounded-[24px] overflow-hidden border border-sc-border shadow-[0px_4px_12px_0px_rgba(13,10,44,0.06)] group hover:shadow-[0_12px_40px_rgba(13,10,44,0.1)] transition-all duration-300"
>
                {/* Image */}
                <div className="h-[200px] lg:h-[220px] bg-sc-bg-card overflow-hidden">
                  {feature.maskedImage ? (
                    <div className="w-full h-full flex justify-center px-5 pt-4">
                      <div className="w-full h-full rounded-t-[12px] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-b-0 border-sc-border-light">
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                  ) : (
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="relative p-6 lg:p-8 overflow-hidden">
                  {/* Large decorative number */}
                  <span
                    className="absolute top-3 right-5 text-[72px] lg:text-[80px] leading-none text-sc-text-primary opacity-[0.10] select-none pointer-events-none"
                    
>
                    {feature.number}
                  </span>

                  {/* Icon */}
                  <div className="w-[40px] h-[40px] bg-sc-navy rounded-[12px] flex items-center justify-center mb-5">
                    <Icon size={18} className="text-white" strokeWidth={2} />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-sc-text-primary text-[20px] lg:text-[24px] mb-3"
                    
>
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sc-text-secondary text-[14px] lg:text-[15px] leading-[1.8]"
                    
>
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}