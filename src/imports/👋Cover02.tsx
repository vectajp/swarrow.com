import svgPaths from "./svg-iyg7m8rqdg";
import imgImage from "figma:asset/a058f57676ecd0616ea7d476125e07f048b132b4.png";
import imgScCover from "figma:asset/8cd8abb5515b16bea34c0912cfda7297aebb9458.png";
import { imgImageReplaceCover02 } from "./svg-1f15v";

function Group1() {
  return (
    <div className="col-1 h-[50.637px] ml-0 mt-0 relative row-1 w-[47.325px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47.325 50.6373">
        <g id="Group 1">
          <path d={svgPaths.p1793080} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p24bd5700} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="aspect-[9/9] bg-[#d9d9d9] col-1 ml-0 mt-0 opacity-0 rounded-[17.263px] row-1 w-[50.637px]" />
      <Group1 />
    </div>
  );
}

function Logo() {
  return (
    <div className="absolute content-stretch flex gap-[18.414px] items-start left-[1085.62px] top-[263.5px]" data-name="Logo">
      <Group />
      <p className="font-['Helvetica_Neue:Bold',sans-serif] leading-[55.241px] not-italic relative shrink-0 text-[36.827px] text-white">Swarrow Call</p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[1085.62px] not-italic top-[360.5px] whitespace-pre-wrap" data-name="Text">
      <p className="font-['Noto_Sans_CJK_JP:Bold',sans-serif] leading-[120px] relative shrink-0 text-[116px] text-white w-[728.378px]">製品概要</p>
      <p className="font-['Noto_Sans_CJK_JP:Medium',sans-serif] leading-[58px] relative shrink-0 text-[36px] text-white w-[713.991px]">AIチャット × AIサポートセンター</p>
      <p className="font-['Noto_Sans_CJK_JP:Medium',sans-serif] leading-[58px] relative shrink-0 text-[#dedee9] text-[36px] w-[713.991px]">WEBサイト・LINE・電話などあらゆる媒体で、まるで人間のように自然に会話します。</p>
    </div>
  );
}

function TextContent() {
  return (
    <div className="absolute contents left-[1085.62px] top-[263.5px]" data-name="Text Content">
      <Logo />
      <p className="absolute font-['Helvetica_Neue:Bold',sans-serif] leading-[32px] left-[1085.62px] not-italic text-[30px] text-white top-[942px]">www.swarrow.com</p>
      <Text />
    </div>
  );
}

function ScCover() {
  return (
    <div className="absolute h-[1080px] left-[-533px] top-[-106px] w-[1920px]" data-name="SC Cover">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgScCover} />
    </div>
  );
}

function ImageReplaceCover() {
  return (
    <div className="absolute bg-white h-[868px] left-[106px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[854px_868px] top-[106px] w-[854px]" data-name="Image (Replace) - Cover 02" style={{ maskImage: `url('${imgImageReplaceCover02}')` }}>
      <div className="absolute h-[868px] left-[-241px] top-0 w-[1335.585px]" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} />
      </div>
      <ScCover />
    </div>
  );
}

function MaskImage() {
  return (
    <div className="absolute contents left-[106px] top-[106px]" data-name="Mask Image">
      <ImageReplaceCover />
    </div>
  );
}

function Cover02Content() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Cover - 02 Content">
      <div className="absolute bg-[#092045] h-[1080px] left-0 top-0 w-[1920px]" data-name="Background" />
      <TextContent />
      <MaskImage />
    </div>
  );
}

export default function Cover() {
  return (
    <div className="bg-white relative size-full" data-name="👋 Cover - 02">
      <Cover02Content />
    </div>
  );
}