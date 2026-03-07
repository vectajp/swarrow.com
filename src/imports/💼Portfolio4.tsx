import svgPaths from "./svg-qs4lra2eqe";
import imgImage from "figma:asset/a01a4f7b61d634ce17fc7e3e09b6fcf547eb56b8.png";
import imgImage1 from "figma:asset/aef4996cd805e77c36d496ddb79706b6df135f14.png";
import imgImage2 from "figma:asset/75d8b9bff38b5bf121be44878a2ff8a313c3b372.png";

function Group1() {
  return (
    <div className="absolute inset-[0_6.54%_0_0] opacity-8">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1487.86 1592">
        <g id="Group 1">
          <path d={svgPaths.p4210700} fill="var(--fill-0, #092045)" id="Vector" />
          <path d={svgPaths.p1edcb380} fill="var(--fill-0, #092045)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-0 right-0 top-0">
      <div className="absolute aspect-[9/9] left-0 opacity-0 right-0 rounded-[15px] top-0" />
      <Group1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute left-[-632px] size-[1592px] top-[284px]">
      <Group />
    </div>
  );
}

function Bg() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-white h-[1080px] left-1/2 overflow-clip top-1/2 w-[1920px]" data-name="BG">
      <Frame />
    </div>
  );
}

function NavigationNumber() {
  return (
    <div className="absolute bg-white bottom-[32.08%] content-stretch flex flex-col items-end justify-center right-[106px] top-[32.08%]" data-name="Navigation number">
      <p className="font-['Helvetica_Neue:Bold',sans-serif] leading-[38px] not-italic relative shrink-0 text-[#6e6c83] text-[28px]">06</p>
    </div>
  );
}

function Group3() {
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

function Group2() {
  return (
    <div className="absolute bottom-[25.73%] contents left-1/4 right-1/4 top-[24.27%]">
      <div className="absolute aspect-[9/9] bg-[#d9d9d9] left-1/4 opacity-0 right-1/4 rounded-[12px] top-[11.65px]" />
      <Group3 />
    </div>
  );
}

function LogoIcon() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Logo Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <circle cx="24" cy="24" fill="var(--fill-0, #092045)" id="Circle" r="24" />
      </svg>
      <Group2 />
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
      <p className="font-['Helvetica_Neue:Bold',sans-serif] leading-[38px] not-italic relative shrink-0 text-[#092045] text-[28px]">Feature</p>
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

function Frame2() {
  return (
    <div className="content-stretch flex flex-col font-['Noto_Sans_CJK_JP:Bold',sans-serif] gap-[8px] items-start not-italic relative shrink-0 text-[#1e1b39] whitespace-pre-wrap">
      <p className="leading-[95px] relative shrink-0 text-[88px] w-[1710.252px]">管理機能</p>
      <p className="leading-[38px] relative shrink-0 text-[28px] w-[1710.252px]">エスカレーション・会話フロー作成・データ保護を一元管理。安心して運用できます。</p>
    </div>
  );
}

function Home() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[40.78px] shadow-[0px_4px_34px_0px_rgba(0,0,0,0.3)] top-[40.08px] w-[459.448px]" data-name="Home">
      <div className="h-[414.369px] relative rounded-tl-[15px] rounded-tr-[15px] shrink-0 w-full" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-tl-[15px] rounded-tr-[15px] size-full" src={imgImage} />
      </div>
    </div>
  );
}

function ImageReplacePortfolio2() {
  return (
    <div className="bg-white h-[367px] overflow-clip relative shrink-0 w-[541px]" data-name="Image (Replace) - Portfolio 02 - 1">
      <div className="absolute h-[367px] left-0 top-0 w-[541px]" data-name="Background">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 541 367">
          <path d="M0 0H541V367H0V0Z" fill="var(--fill-0, #F0F0F7)" id="Background" />
        </svg>
      </div>
      <Home />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0 w-full whitespace-pre-wrap" data-name="Text">
      <p className="font-['Noto_Sans_CJK_JP:Bold',sans-serif] leading-[50px] relative shrink-0 text-[#1e1b39] text-[38px] w-full">スマートエスカレーション</p>
      <p className="font-['Noto_Sans_CJK_JP:Medium',sans-serif] leading-[42px] relative shrink-0 text-[#6e6c83] text-[24px] w-full">AI対応困難な問合せを自動検知し、担当者へ引き継ぎ。</p>
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white relative rounded-[32px] self-stretch shrink-0 w-[541.417px]" data-name="Card">
      <div className="content-stretch flex flex-col gap-[24px] items-center overflow-clip pb-[40px] px-[40px] relative rounded-[inherit] size-full">
        <ImageReplacePortfolio2 />
        <Text />
      </div>
      <div aria-hidden="true" className="absolute border border-[#dedee9] border-solid inset-0 pointer-events-none rounded-[32px] shadow-[0px_4px_12px_0px_rgba(13,10,44,0.06)]" />
    </div>
  );
}

function Home1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[40.78px] overflow-clip rounded-[24px] shadow-[0px_4px_34px_0px_rgba(0,0,0,0.3)] top-[40.08px] w-[459.448px]" data-name="Home">
      <div className="h-[414.369px] relative shrink-0 w-full" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
    </div>
  );
}

function ImageReplacePortfolio() {
  return (
    <div className="bg-white h-[367px] overflow-clip relative shrink-0 w-[541px]" data-name="Image (Replace) - Portfolio 02 - 1">
      <div className="absolute h-[367px] left-0 top-0 w-[541px]" data-name="Background">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 541 367">
          <path d="M0 0H541V367H0V0Z" fill="var(--fill-0, #F0F0F7)" id="Background" />
        </svg>
      </div>
      <Home1 />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0 w-full whitespace-pre-wrap" data-name="Text">
      <p className="font-['Noto_Sans_CJK_JP:Bold',sans-serif] leading-[50px] relative shrink-0 text-[#1e1b39] text-[38px] w-full">ノーコードで会話フローを作成</p>
      <p className="font-['Noto_Sans_CJK_JP:Medium',sans-serif] leading-[42px] relative shrink-0 text-[#6e6c83] text-[24px] w-full">対話シナリオを画面上で簡単に設計・編集。</p>
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-white relative rounded-[32px] self-stretch shrink-0 w-[541.417px]" data-name="Card">
      <div className="content-stretch flex flex-col gap-[24px] items-center overflow-clip pb-[40px] px-[40px] relative rounded-[inherit] size-full">
        <ImageReplacePortfolio />
        <Text1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#dedee9] border-solid inset-0 pointer-events-none rounded-[32px] shadow-[0px_4px_12px_0px_rgba(13,10,44,0.06)]" />
    </div>
  );
}

function Home2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[40.78px] shadow-[0px_4px_34px_0px_rgba(0,0,0,0.3)] top-[40.08px] w-[459.448px]" data-name="Home">
      <div className="h-[414.369px] relative rounded-tl-[15px] rounded-tr-[15px] shrink-0 w-full" data-name="Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-tl-[15px] rounded-tr-[15px]">
          <img alt="" className="absolute h-full left-[-0.1%] max-w-none top-[-9.68%] w-[100.21%]" src={imgImage2} />
        </div>
      </div>
    </div>
  );
}

function ImageReplacePortfolio1() {
  return (
    <div className="bg-white h-[367px] overflow-clip relative shrink-0 w-[541px]" data-name="Image (Replace) - Portfolio 02 - 1">
      <div className="absolute h-[367px] left-0 top-0 w-[541px]" data-name="Background">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 541 367">
          <path d="M0 0H541V367H0V0Z" fill="var(--fill-0, #F0F0F7)" id="Background" />
        </svg>
      </div>
      <Home2 />
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0 w-full whitespace-pre-wrap" data-name="Text">
      <p className="font-['Noto_Sans_CJK_JP:Bold',sans-serif] leading-[50px] relative shrink-0 text-[#1e1b39] text-[38px] w-full">AI学習に使用しません</p>
      <p className="font-['Noto_Sans_CJK_JP:Medium',sans-serif] leading-[42px] relative shrink-0 text-[#6e6c83] text-[24px] w-full">文書・会話データは外部AI学習には一切使用せず安全に保護。</p>
    </div>
  );
}

function Card2() {
  return (
    <div className="bg-white relative rounded-[32px] self-stretch shrink-0 w-[541.417px]" data-name="Card">
      <div className="content-stretch flex flex-col gap-[24px] items-center overflow-clip pb-[40px] px-[40px] relative rounded-[inherit] size-full">
        <ImageReplacePortfolio1 />
        <Text2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#dedee9] border-solid inset-0 pointer-events-none rounded-[32px] shadow-[0px_4px_12px_0px_rgba(13,10,44,0.06)]" />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[43px] items-start relative shrink-0 w-full">
      <Card />
      <Card1 />
      <Card2 />
    </div>
  );
}

function Content() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[34px] items-start left-[103.91px] top-[106px] w-[1710.252px]" data-name="Content">
      <Frame2 />
      <Frame1 />
    </div>
  );
}

function Portfolio02Content() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Portfolio - 02 Content">
      <div className="absolute bg-white h-[1080px] left-0 top-0 w-[1920px]" data-name="Background" />
      <Bg />
      <BottomNavigation />
      <Content />
    </div>
  );
}

export default function Portfolio() {
  return (
    <div className="bg-white relative size-full" data-name="💼 Portfolio - 4">
      <Portfolio02Content />
    </div>
  );
}