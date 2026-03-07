import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "どのチャネルに対応していますか？",
    answer:
      "WEBサイト、LINE、電話、アプリなど幅広いチャネルに対応しています。",
  },
  {
    question: "AIが対応できない質問はどうなりますか？",
    answer:
      "対応が困難な問い合わせは自動で担当者にエスカレーションされます。会話の文脈も引き継がれるため、スムーズに対応を再開できます。",
  },
  {
    question: "会話データがAI学習に使われることはありますか？",
    answer:
      "ありません。文書・会話データは外部AI学習には一切使用せず、安全に保護しています。",
  },
  {
    question: "費用はどのくらいですか？",
    answer:
      "初期費用50,000円、月額はチャットボット80,000円〜、電話対応80,000円〜（税別）です。規模に応じたエンタープライズプランもご用意しています。",
  },
  {
    question: "導入にどのくらい時間がかかりますか？",
    answer:
      "最短2週間で運用開始が可能です。データ量や連携先に応じてご案内します。",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#DEDEE9] last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-6 lg:py-7 text-left cursor-pointer group"
      >
        <span
          className="text-[#1D1D1F] text-[16px] lg:text-[18px] pr-8 group-hover:text-[#092045] transition-colors"
          style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 700 }}
        >
          {question}
        </span>
        <ChevronDown
          size={20}
          className={`text-[#52506B] transition-transform duration-300 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[200px] pb-6" : "max-h-0"
        }`}
      >
        <p
          className="text-[#52506B] text-[14px] lg:text-[16px] leading-[1.8]"
          style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 400 }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
}

export function FAQSection() {
  return (
    <section id="faq" className="relative bg-white py-24 lg:py-32">
      <div className="max-w-[800px] mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16">
          <p
            className="text-[#E87B35] text-[14px] tracking-wider mb-4"
            style={{ fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700 }}
          >
            FAQ
          </p>
          <h2
            className="text-[#1D1D1F] text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.2]"
            style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 900 }}
          >
            よくあるご質問
          </h2>
        </div>

        {/* FAQ items */}
        <div className="bg-white rounded-[24px] px-6 lg:px-10 border border-[#DEDEE9] shadow-[0px_4px_12px_0px_rgba(13,10,44,0.06)]">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}