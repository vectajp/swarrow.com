import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export const faqs = [
  {
    question: 'どのチャネルに対応していますか？',
    answer: 'WEBサイト、LINE、電話、アプリなど幅広いチャネルに対応しています。',
  },
  {
    question: 'AIが対応できない質問はどうなりますか？',
    answer:
      'AIで対応しきれない問い合わせは、自動で担当者に引き継がれます。会話の流れもそのまま共有されるため、スムーズに対応を再開できます。',
  },
  {
    question: '会話データがAI学習に使われることはありますか？',
    answer: 'ありません。文書・会話データは外部AI学習には一切使用せず、安全に保護しています。',
  },
  {
    question: '導入にどのくらい時間がかかりますか？',
    answer: '最短2週間で運用開始が可能です。データ量や連携先に応じてご案内します。',
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-sc-border last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-6 lg:py-7 text-left cursor-pointer group"
      >
        <span className="text-sc-text-primary text-[16px] lg:text-[18px] pr-8 group-hover:text-sc-navy transition-colors">
          {question}
        </span>
        <ChevronDown
          size={20}
          className={`text-sc-text-secondary transition-transform duration-300 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[200px] pb-6' : 'max-h-0'}`}>
        <p className="text-sc-text-secondary text-[14px] lg:text-[16px] leading-[1.8]">{answer}</p>
      </div>
    </div>
  )
}

export function FAQSection() {
  return (
    <section id="faq" className="relative bg-white py-24 lg:py-32">
      <div className="max-w-[800px] mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16">
          <p className="text-sc-orange text-[14px] tracking-wider mb-4">FAQ</p>
          <h2 className="text-sc-text-primary text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.2]">
            よくあるご質問
          </h2>
        </div>

        {/* FAQ items */}
        <div className="bg-white rounded-[24px] px-6 lg:px-10 border border-sc-border shadow-[0px_4px_12px_0px_rgba(13,10,44,0.06)]">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  )
}
