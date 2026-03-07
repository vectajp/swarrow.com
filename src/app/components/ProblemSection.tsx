import { TrendingUp, Clock, Frown } from "lucide-react";
import { BackgroundArc } from "./BackgroundArc";

const problems = [
  {
    icon: TrendingUp,
    title: "コストの増大",
    description: "問い合わせ件数の増加に比例して人件費が膨らみ、採用・教育コストも継続的に発生し続ける。",
    featured: false,
  },
  {
    icon: Clock,
    title: "機会損失",
    description: "24時間365日対応できず、顧客満足度が低下。単純作業に追われ、本来注力すべき業務に時間を割けない。",
    featured: true,
  },
  {
    icon: Frown,
    title: "従業員満足度の低下",
    description: "類似・定型的な問い合わせ対応による疲弊。社内での情報探しに時間がかかり、生産性が低下。",
    featured: false,
  },
];

export function ProblemSection() {
  return (
    <section id="problem" className="relative bg-white py-24 lg:py-32 overflow-hidden">
      <BackgroundArc
        color="#092045"
        opacity={0.03}
        className="w-[700px] h-[700px] -left-[300px] top-[-200px]"
      />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <h2
          className="text-[#1D1D1F] text-[32px] sm:text-[40px] lg:text-[52px] leading-[1.2] text-center mb-16 lg:mb-20"
          style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 900 }}
        >
          問い合わせ対応で
          <br className="sm:hidden" />
          疲弊していませんか？
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.title}
                className="relative rounded-[32px] p-8 lg:p-10 transition-all duration-300 bg-[#F5F5F7] border border-[#DEDEE9] shadow-[0px_4px_12px_0px_rgba(13,10,44,0.06)]"
              >
                {/* Icon */}
                <div className="w-[64px] h-[64px] rounded-full flex items-center justify-center mb-6 bg-[#092045]">
                  <Icon
                    size={28}
                    className="text-white"
                    strokeWidth={2}
                  />
                </div>

                {/* Title */}
                <h3
                  className="text-[#1D1D1F] text-[22px] lg:text-[26px] mb-4"
                  style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 700 }}
                >
                  {problem.title}
                </h3>

                {/* Description */}
                <p
                  className="text-[#52506B] text-[15px] lg:text-[16px] leading-[1.8]"
                  style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 400 }}
                >
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}