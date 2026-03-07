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
    <section id="how-it-works" className="relative bg-[#F5F5F7] py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16 lg:mb-20">
          <p
            className="text-[#E87B35] text-[14px] tracking-wider mb-4"
            style={{ fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700 }}
          >
            HOW IT WORKS
          </p>
          <h2
            className="text-[#1D1D1F] text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.2]"
            style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 900 }}
          >
            3ステップで、すぐに始められます。
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[16.67%] right-[16.67%] h-[2px] bg-[#DEDEE9]" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="flex flex-col items-center text-center relative">
                  {/* Number circle */}
                  <div className="relative z-10 w-[120px] h-[120px] bg-white rounded-full flex items-center justify-center mb-8 shadow-[0_4px_16px_rgba(13,10,44,0.08)] border border-[#DEDEE9]">
                    <span
                      className="text-[#092045] text-[40px]"
                      style={{ fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700 }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-[48px] h-[48px] bg-[#092045] rounded-full flex items-center justify-center mb-5">
                    <Icon size={22} className="text-white" strokeWidth={2} />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-[#1D1D1F] text-[20px] lg:text-[24px] mb-3"
                    style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 700 }}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-[#52506B] text-[14px] lg:text-[15px] leading-[1.8] max-w-[300px]"
                    style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 400 }}
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