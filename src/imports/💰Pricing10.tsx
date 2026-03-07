import svgPaths from "./svg-728pi47404";
import imgImage from "figma:asset/bfb3eefc1fc671934a1779d236c3d038364502d4.png";
import imgScCover from "figma:asset/8cd8abb5515b16bea34c0912cfda7297aebb9458.png";

function ScCover() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[1080px] left-1/2 top-1/2 w-[1920px]" data-name="SC Cover">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgScCover} />
    </div>
  );
}

function ImageReplacePricing() {
  return (
    <div className="absolute bg-white h-[1080px] left-0 overflow-clip top-0 w-[912px]" data-name="Image (Replace) - Pricing 10">
      <div className="absolute h-[1423.147px] left-[-174.22px] top-[-252.41px] w-[1138.518px]" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} />
      </div>
      <ScCover />
    </div>
  );
}

function NavigationNumber() {
  return (
    <div className="absolute bg-white bottom-[32.08%] content-stretch flex flex-col items-end justify-center right-[106px] top-[32.08%]" data-name="Navigation number">
      <p className="font-['Helvetica_Neue:Bold',sans-serif] leading-[38px] not-italic relative shrink-0 text-[#6e6c83] text-[28px]">08</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute bottom-[25.73%] left-1/4 right-[28.27%] top-[24.27%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.4301 24">
        <g id="Group 1">
          <path d={svgPaths.pc4a1980} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p309c8100} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute bottom-[25.73%] contents left-1/4 right-1/4 top-[24.27%]">
      <div className="absolute aspect-[9/9] bg-[#d9d9d9] left-1/4 opacity-0 right-1/4 rounded-[12px] top-[11.65px]" />
      <Group1 />
    </div>
  );
}

function LogoIcon() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Logo Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <circle cx="24" cy="24" fill="var(--fill-0, #092045)" id="Circle" r="24" />
      </svg>
      <Group />
    </div>
  );
}

function BrandIndex() {
  return (
    <div className="absolute bg-white bottom-[27.36%] content-stretch flex gap-[14px] items-center left-[106px] top-[27.36%]" data-name="Brand & Index">
      <LogoIcon />
      <div className="h-0 relative shrink-0 w-[31.646px]" data-name="Divider">
        <div className="absolute inset-[-2px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.6465 2">
            <line id="Divider" stroke="var(--stroke-0, #B0B0C1)" strokeWidth="2" x2="31.6465" y1="1" y2="1" />
          </svg>
        </div>
      </div>
      <p className="font-['Helvetica_Neue:Bold',sans-serif] leading-[38px] not-italic relative shrink-0 text-[#092045] text-[28px]">Pricing</p>
    </div>
  );
}

function BottomNavigation() {
  return (
    <div className="absolute h-[106px] left-0 top-[974px] w-[1920px]" data-name="Bottom Navigation">
      <div className="absolute bg-white inset-0" data-name="Background" />
      <NavigationNumber />
      <BrandIndex />
      <div className="absolute inset-[1.07%_5.52%_98.93%_5.52%]" data-name="Divider">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1708 1">
            <line id="Divider" stroke="var(--stroke-0, #DEDEE9)" x2="1708" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TextWrapper() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[1018px] top-[106px]" data-name="Text Wrapper">
      <p className="font-['Noto_Sans_CJK_JP:Bold',sans-serif] leading-[95px] not-italic relative shrink-0 text-[#1e1b39] text-[88px]">ご導入費用</p>
    </div>
  );
}

function ContentRight() {
  return (
    <div className="absolute contents left-[1018px] top-[106px]" data-name="Content Right">
      <TextWrapper />
    </div>
  );
}

function Content() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Content">
      <ImageReplacePricing />
      <BottomNavigation />
      <ContentRight />
    </div>
  );
}

function Pricing10Content() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Pricing - 10 Content">
      <div className="absolute bg-white h-[1080px] left-0 top-0 w-[1920px]" data-name="Background" />
      <Content />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-end not-italic relative shrink-0 text-[#1e1b39] text-right w-[289px]">
      <p className="font-['Helvetica_Neue:Bold',sans-serif] leading-[32px] relative shrink-0 text-[30px]">50,000</p>
      <p className="font-['Noto_Sans_CJK_JP:Medium',sans-serif] leading-[20px] relative shrink-0 text-[18px]">円</p>
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex items-center justify-between py-[32px] relative shrink-0 w-full" data-name="Component 2">
      <div aria-hidden="true" className="absolute border-[#dedee9] border-b-[1.5px] border-solid border-t-[1.5px] inset-[-0.75px_0] pointer-events-none" />
      <p className="font-['Noto_Sans_CJK_JP:Bold',sans-serif] leading-[32px] not-italic opacity-70 relative shrink-0 text-[#1e1b39] text-[30px]">環境構築・初期設定・導入サポート</p>
      <Frame />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <p className="font-['Noto_Sans_CJK_JP:Bold',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#092045] text-[30px] w-full whitespace-pre-wrap">初期費用</p>
      <Component />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-end not-italic relative shrink-0 text-[#1e1b39] text-right w-[289px]">
      <p className="font-['Helvetica_Neue:Bold',sans-serif] leading-[32px] relative shrink-0 text-[30px]">80,000</p>
      <p className="font-['Noto_Sans_CJK_JP:Medium',sans-serif] leading-[20px] relative shrink-0 text-[18px]">円/月</p>
    </div>
  );
}

function Component2() {
  return (
    <div className="content-stretch flex items-center justify-between py-[32px] relative shrink-0 w-full" data-name="Component 4">
      <div aria-hidden="true" className="absolute border-[#dedee9] border-solid border-t-[1.5px] inset-[-0.75px_0_0_0] pointer-events-none" />
      <p className="font-['Noto_Sans_CJK_JP:Bold',sans-serif] leading-[32px] not-italic opacity-70 relative shrink-0 text-[#1e1b39] text-[30px]">チャットボット</p>
      <Frame5 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-end not-italic relative shrink-0 text-[#1e1b39] text-right w-[289px]">
      <p className="font-['Noto_Sans_CJK_JP:Medium',sans-serif] leading-[20px] relative shrink-0 text-[18px]">（1回線あたり）</p>
      <p className="font-['Helvetica_Neue:Bold',sans-serif] leading-[32px] relative shrink-0 text-[30px]">80,000</p>
      <p className="font-['Noto_Sans_CJK_JP:Medium',sans-serif] leading-[20px] relative shrink-0 text-[18px]">円/月</p>
    </div>
  );
}

function Component1() {
  return (
    <div className="content-stretch flex items-center justify-between py-[32px] relative shrink-0 w-full" data-name="Component 3">
      <div aria-hidden="true" className="absolute border-[#dedee9] border-b-[1.5px] border-dashed border-t-[1.5px] inset-[-0.75px_0] pointer-events-none" />
      <p className="font-['Noto_Sans_CJK_JP:Bold',sans-serif] leading-[32px] not-italic opacity-70 relative shrink-0 text-[#1e1b39] text-[30px]">{`電話対応（AI音声） `}</p>
      <Frame6 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-end not-italic relative shrink-0 text-[#1e1b39] text-right w-[289px]">
      <p className="font-['Helvetica_Neue:Bold',sans-serif] leading-[32px] relative shrink-0 text-[30px]">150,000</p>
      <p className="font-['Noto_Sans_CJK_JP:Medium',sans-serif] leading-[20px] relative shrink-0 text-[18px]">円/月</p>
    </div>
  );
}

function Component3() {
  return (
    <div className="content-stretch flex items-center justify-between py-[32px] relative shrink-0 w-full" data-name="Component 5">
      <div aria-hidden="true" className="absolute border-[#dedee9] border-b-[1.5px] border-solid inset-[0_0_-0.75px_0] pointer-events-none" />
      <p className="font-['Noto_Sans_CJK_JP:Bold',sans-serif] leading-[32px] not-italic opacity-70 relative shrink-0 text-[#1e1b39] text-[30px]">チャット + 電話セット</p>
      <Frame7 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Component2 />
      <Component1 />
      <Component3 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <p className="font-['Noto_Sans_CJK_JP:Bold',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#092045] text-[30px] w-full whitespace-pre-wrap">月額利用料</p>
      <Frame3 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[1018px] top-[252px] w-[796px]">
      <Frame1 />
      <Frame2 />
      <p className="font-['Noto_Sans_CJK_JP:Medium',sans-serif] leading-[42px] not-italic opacity-80 relative shrink-0 text-[#6e6c83] text-[24px] text-right w-full whitespace-pre-wrap">（全て税別）</p>
      <div className="font-['Noto_Sans_CJK_JP:Medium',sans-serif] leading-[42px] not-italic opacity-80 relative shrink-0 text-[#6e6c83] text-[24px] w-full whitespace-pre-wrap">
        <p className="mb-0">利用状況や規模に応じたエンタープライズプランもご用意しています。</p>
        <p>詳細はお問い合わせください。</p>
      </div>
    </div>
  );
}

export default function Pricing() {
  return (
    <div className="bg-white relative size-full" data-name="💰 Pricing - 10">
      <Pricing10Content />
      <Frame4 />
    </div>
  );
}