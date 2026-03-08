import imgPhoneMockup from 'figma:asset/phone-mockup.png'
import { BackgroundArc } from './BackgroundArc'

export function SolutionSection() {
  return (
    <section id="solution" className="relative bg-sc-bg-light py-24 lg:py-32 overflow-hidden">
      <BackgroundArc
        color="var(--sc-navy)"
        opacity={0.03}
        className="w-[800px] h-[800px] right-[-300px] top-[-200px]"
        flip
      />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <div>
            <h2 className="text-sc-navy text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.2] mb-8">
              SwarrowCallが、
              <br />
              問い合わせ対応を
              <br />
              自動化します。
            </h2>

            <p className="text-sc-text-secondary text-[15px] lg:text-[17px] leading-[2] mb-10">
              PDF・画像・動画・データベース ―
              社内眠るあらゆる形式の「知識」をAIが取り込み、WEBサイト・LINE・電話などあらゆる媒体で、まるで人間のように自然に回答します。
            </p>

            <p className="text-sc-text-secondary text-[15px] lg:text-[17px] leading-[2]">
              チャットでの自動応答はもちろん、AIによる自動架電にも対応。「受ける対応」も「かける対応」も、これひとつで完結します。
            </p>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              <div>
                <p className="text-sc-orange text-[36px] lg:text-[42px]">24/365</p>
                <p className="text-sc-text-secondary text-[13px] mt-1">年中無休対応</p>
              </div>
              <div>
                <p className="text-sc-orange text-[36px] lg:text-[42px]">70%</p>
                <p className="text-sc-text-secondary text-[13px] mt-1">問い合わせ削減</p>
              </div>
            </div>
          </div>

          {/* Product UI mockup */}
          <div className="relative flex justify-center -mb-24 lg:-mb-32">
            <div className="relative w-[280px] sm:w-[320px] lg:w-[360px]">
              {/* Phone frame */}
              <div
                className="overflow-hidden"
                style={{
                  /** Trim control: adjust height to crop bottom. Use "auto" to show full image. */
                  height: 'auto',
                  maxHeight: '440px',
                }}
              >
                <img
                  src={imgPhoneMockup}
                  alt="Swarrow Call チャット画面"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Floating badge */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
