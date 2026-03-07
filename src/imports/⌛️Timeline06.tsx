import svgPaths from "./svg-v3zhu5s46j";

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
    <div className="absolute bg-white h-[1080px] left-0 overflow-clip top-0 w-[1920px]" data-name="BG">
      <Frame />
    </div>
  );
}

function NavigationNumber() {
  return (
    <div className="absolute bg-white bottom-[32.08%] content-stretch flex flex-col items-end justify-center right-[106px] top-[32.08%]" data-name="Navigation number">
      <p className="font-['Helvetica_Neue:Bold',sans-serif] leading-[38px] not-italic relative shrink-0 text-[#6e6c83] text-[28px]">09</p>
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
      <p className="font-['Helvetica_Neue:Bold',sans-serif] leading-[38px] not-italic relative shrink-0 text-[#092045] text-[28px]">Timeline</p>
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

function TextTop() {
  return (
    <div className="content-stretch flex flex-col gap-[28px] items-start relative shrink-0" data-name="Text Top">
      <p className="font-['Helvetica_Neue:Bold','Noto_Sans_JP:Bold',sans-serif] leading-[95px] relative shrink-0 text-[#1e1b39] text-[88px] text-center" style={{ fontVariationSettings: "\'wght\' 700" }}>
        お申込み後の流れ
      </p>
    </div>
  );
}

function TextWrapper() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col gap-[20px] items-start justify-center left-[calc(50%-502px)] top-[calc(50%-53px)]" data-name="Text Wrapper">
      <TextTop />
      <p className="font-['Helvetica_Neue:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[42px] relative shrink-0 text-[#6e6c83] text-[24px] w-[675.563px] whitespace-pre-wrap" style={{ fontVariationSettings: "\'wght\' 400" }}>
        最短1ヶ月で公開可能。まずは、お気軽にご相談ください。
      </p>
    </div>
  );
}

function Content() {
  return (
    <div className="absolute contents left-0 top-[408.5px]" data-name="Content">
      <BottomNavigation />
      <TextWrapper />
    </div>
  );
}

function Timeline06Content() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Timeline - 06 Content">
      <div className="absolute bg-white h-[1080px] left-0 top-0 w-[1920px]" data-name="Background" />
      <Bg />
      <Content />
    </div>
  );
}

function Number() {
  return (
    <div className="bg-[#f0f0f6] content-stretch flex flex-col items-center justify-center p-[32px] relative rounded-[999px] shrink-0" data-name="Number">
      <p className="font-['Helvetica_Neue:Bold',sans-serif] leading-[72px] not-italic relative shrink-0 text-[#092045] text-[64px] text-center">01</p>
    </div>
  );
}

function TextWrapper1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Text Wrapper">
      <p className="font-['Helvetica_Neue:Bold','Noto_Sans_JP:Bold',sans-serif] leading-[54px] relative shrink-0 text-[#1e1b39] text-[42px]" style={{ fontVariationSettings: "\'wght\' 700" }}>{`Q&Aデータを用意`}</p>
      <p className="font-['Helvetica_Neue:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[42px] relative shrink-0 text-[#6e6c83] text-[24px]" style={{ fontVariationSettings: "\'wght\' 400" }}>
        専任チームが作成をサポート
      </p>
    </div>
  );
}

function ItemTimeline() {
  return (
    <div className="content-stretch flex gap-[72px] items-center relative shrink-0" data-name="Item - Timeline 7">
      <Number />
      <TextWrapper1 />
    </div>
  );
}

function Number1() {
  return (
    <div className="bg-[#f0f0f6] content-stretch flex flex-col items-center justify-center p-[32px] relative rounded-[999px] shrink-0" data-name="Number">
      <p className="font-['Helvetica_Neue:Bold',sans-serif] leading-[72px] not-italic relative shrink-0 text-[#092045] text-[64px] text-center">02</p>
    </div>
  );
}

function TextWrapper2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Text Wrapper">
      <p className="font-['Helvetica_Neue:Bold','Noto_Sans_JP:Bold',sans-serif] leading-[54px] relative shrink-0 text-[#1e1b39] text-[42px]" style={{ fontVariationSettings: "\'wght\' 700" }}>
        チャットボット作成
      </p>
      <p className="font-['Helvetica_Neue:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[42px] relative shrink-0 text-[#6e6c83] text-[24px]" style={{ fontVariationSettings: "\'wght\' 400" }}>
        当社が構築を代行
      </p>
    </div>
  );
}

function ItemTimeline1() {
  return (
    <div className="content-stretch flex gap-[72px] items-center relative shrink-0 w-full" data-name="Item - Timeline 8">
      <Number1 />
      <TextWrapper2 />
    </div>
  );
}

function Number2() {
  return (
    <div className="bg-[#f0f0f6] content-stretch flex flex-col items-center justify-center p-[32px] relative rounded-[999px] shrink-0" data-name="Number">
      <p className="font-['Helvetica_Neue:Bold',sans-serif] leading-[72px] not-italic relative shrink-0 text-[#092045] text-[64px] text-center">03</p>
    </div>
  );
}

function TextWrapper3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Text Wrapper">
      <p className="font-['Helvetica_Neue:Bold','Noto_Sans_JP:Bold',sans-serif] leading-[54px] relative shrink-0 text-[#1e1b39] text-[42px]" style={{ fontVariationSettings: "\'wght\' 700" }}>
        運用説明会
      </p>
      <p className="font-['Helvetica_Neue:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[42px] relative shrink-0 text-[#6e6c83] text-[24px]" style={{ fontVariationSettings: "\'wght\' 400" }}>
        担当者様向けにご説明
      </p>
    </div>
  );
}

function ItemTimeline2() {
  return (
    <div className="content-stretch flex gap-[72px] items-center relative shrink-0 w-full" data-name="Item - Timeline 9">
      <Number2 />
      <TextWrapper3 />
    </div>
  );
}

function Number3() {
  return (
    <div className="bg-[#f0f0f6] content-stretch flex flex-col items-center justify-center p-[32px] relative rounded-[999px] shrink-0" data-name="Number">
      <p className="font-['Helvetica_Neue:Bold',sans-serif] leading-[72px] not-italic relative shrink-0 text-[#092045] text-[64px] text-center">04</p>
    </div>
  );
}

function TextWrapper4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Text Wrapper">
      <p className="font-['Helvetica_Neue:Bold','Noto_Sans_JP:Bold',sans-serif] leading-[54px] relative shrink-0 text-[#1e1b39] text-[42px]" style={{ fontVariationSettings: "\'wght\' 700" }}>{`リリース&継続改善`}</p>
      <p className="font-['Helvetica_Neue:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[42px] relative shrink-0 text-[#6e6c83] text-[24px]" style={{ fontVariationSettings: "\'wght\' 400" }}>
        公開後も改善をサポート
      </p>
    </div>
  );
}

function ItemTimeline3() {
  return (
    <div className="content-stretch flex gap-[72px] items-center relative shrink-0 w-full" data-name="Item - Timeline 10">
      <Number3 />
      <TextWrapper4 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col gap-[32px] items-start left-[1040px] top-1/2 w-[644px]">
      <ItemTimeline />
      <ItemTimeline1 />
      <ItemTimeline2 />
      <ItemTimeline3 />
    </div>
  );
}

export default function Timeline() {
  return (
    <div className="bg-white relative size-full" data-name="⌛️ Timeline - 06">
      <Timeline06Content />
      <Frame1 />
    </div>
  );
}