import svgPaths from "./svg-qi2anyemt1";
import imgImage from "figma:asset/c017a7da5914fe917ff6f68deb906b547827d483.png";
import imgScCover from "figma:asset/8cd8abb5515b16bea34c0912cfda7297aebb9458.png";

function ScCover() {
  return (
    <div className="-translate-x-1/2 absolute h-[1080px] left-1/2 top-0 w-[1920px]" data-name="SC Cover">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgScCover} />
    </div>
  );
}

function ImageReplaceEnding() {
  return (
    <div className="absolute bg-white h-[1080px] left-0 overflow-clip top-0 w-[912px]" data-name="Image (Replace) - Ending 04">
      <div className="absolute h-[1408.276px] left-0 top-[-264.12px] w-[2112.415px]" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} />
      </div>
      <ScCover />
    </div>
  );
}

function TextWrapper() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Text Wrapper">
      <p className="font-['Noto_Sans_CJK_JP:Bold',sans-serif] leading-[72px] not-italic relative shrink-0 text-[#1e1b39] text-[64px] w-[677.314px] whitespace-pre-wrap">お問い合わせ窓口</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-full">
      <p className="font-['Helvetica_Neue:Bold','Noto_Sans_JP:Bold',sans-serif] leading-[22px] relative shrink-0 text-[#6e6c83] text-[20px] w-full" style={{ fontVariationSettings: "\'wght\' 700" }}>
        担当者
      </p>
      <p className="font-['Helvetica_Neue:Bold',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#092045] text-[30px] w-full">***</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col font-['Helvetica_Neue:Bold',sans-serif] gap-[8px] items-center justify-center not-italic relative shrink-0 w-full">
      <p className="leading-[22px] relative shrink-0 text-[#6e6c83] text-[20px] w-full">MAIL</p>
      <p className="leading-[32px] relative shrink-0 text-[#092045] text-[30px] w-full">***@vecta.co.jp</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col font-['Helvetica_Neue:Bold',sans-serif] gap-[8px] items-center justify-center not-italic relative shrink-0 w-full">
      <p className="leading-[22px] relative shrink-0 text-[#6e6c83] text-[20px] w-full">HP</p>
      <p className="leading-[32px] relative shrink-0 text-[#092045] text-[30px] w-full">https://www.vecta.co.jp/</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame />
      <Frame3 />
      <Frame1 />
    </div>
  );
}

function ContactInfo() {
  return (
    <div className="content-stretch flex flex-col gap-[34px] items-start relative shrink-0 w-[352px] whitespace-pre-wrap" data-name="Contact Info">
      <p className="font-['Helvetica_Neue:Bold',sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1b39] text-[0px] text-[42px] w-full">
        <span className="font-['Noto_Sans_CJK_JP:Bold',sans-serif] leading-[54px]">株式会社</span>
        <span className="leading-[54px]">Vecta</span>
      </p>
      <Frame2 />
    </div>
  );
}

function ContentRight() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[79px] items-start left-[1018px] top-[106px] w-[677.314px]" data-name="Content Right">
      <TextWrapper />
      <ContactInfo />
      <p className="font-['Noto_Sans_CJK_JP:Medium',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#1e1b39] text-[18px] w-[677.314px] whitespace-pre-wrap">システムデモやお見積りのご依頼など、お気軽にお問い合わせください。</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute bottom-[25.73%] left-1/4 right-[28.27%] top-[24.27%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42.0565 45">
        <g id="Group 1">
          <path d={svgPaths.p86bf280} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p110bf970} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute bottom-[25.73%] contents left-1/4 right-1/4 top-[24.27%]">
      <div className="absolute aspect-[9/9] bg-[#d9d9d9] left-1/4 opacity-0 right-1/4 rounded-[22.5px] top-[21.85px]" />
      <Group1 />
    </div>
  );
}

function LogoIcon() {
  return (
    <div className="absolute left-[1724px] size-[90px] top-[884px]" data-name="Logo Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 90 90">
        <circle cx="45" cy="45" fill="var(--fill-0, #092045)" id="Circle" r="45" />
      </svg>
      <Group />
    </div>
  );
}

function Ending04Content() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Ending - 04 Content">
      <div className="absolute bg-white h-[1080px] left-0 top-0 w-[1920px]" data-name="Background" />
      <ImageReplaceEnding />
      <ContentRight />
      <LogoIcon />
    </div>
  );
}

export default function Ending() {
  return (
    <div className="bg-white relative size-full" data-name="📬 Ending - 04">
      <Ending04Content />
    </div>
  );
}