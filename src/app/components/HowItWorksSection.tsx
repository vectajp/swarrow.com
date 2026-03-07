import { Headphones, Database, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Headphones,
    title: "ヒアリング",
    description: "現在の課題・対応フロー・ご要望をお伺いします。",
  },
  {
    number: "02",
    icon: Database,
    title: "データ連携・セットアップ",
    description: "社内資料を取り込み、会話フローを構築。ノーコードで簡単に設定できます。",
  },
  {
    number: "03",
    icon: Rocket,
    title: "運用開始",
    description: "WEBサイト・LINE・電話など、ご希望のチャネルで即日運用可能。",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative bg-sc-bg-light py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16 lg:mb-20">
          <p
            className="text-sc-orange text-[14px] tracking-wider mb-4"
            
>
            HOW IT WORKS
          </p>
          <h2
            className="text-sc-text-primary text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.2]"
            
>
            3ステップで、すぐに始められます。
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[16.67%] right-[16.67%] h-[2px] bg-sc-border" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="flex flex-col items-center text-center relative">
                  {/* Number circle */}
                  <div className="relative z-10 w-[120px] h-[120px] bg-white rounded-full flex items-center justify-center mb-8 shadow-[0_4px_16px_rgba(13,10,44,0.08)] border border-sc-border">
                    <span
                      className="text-sc-navy text-[40px]"
                      
>
                      {step.number}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-[48px] h-[48px] bg-sc-navy rounded-full flex items-center justify-center mb-5">
                    <Icon size={22} className="text-white" strokeWidth={2} />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-sc-text-primary text-[20px] lg:text-[24px] mb-3"
                    
>
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sc-text-secondary text-[14px] lg:text-[15px] leading-[1.8] max-w-[300px]"
                    
>
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}