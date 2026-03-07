import svgPaths from "./svg-eo9uuwi3tt";

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
      <div className="absolute aspect-[9/9] bg-[#092045] left-0 opacity-0 right-0 rounded-[15px] top-0" />
      <Group1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute left-[-525px] size-[1592px] top-[-1054px]">
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
      <p className="font-['Helvetica_Neue:Bold',sans-serif] leading-[38px] not-italic relative shrink-0 text-[#6e6c83] text-[28px]">01</p>
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
      <p className="font-['Helvetica_Neue:Bold',sans-serif] leading-[38px] not-italic relative shrink-0 text-[#092045] text-[28px]">Our services</p>
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

function Text() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[12px] items-center left-[calc(50%-0.5px)] top-[106px]" data-name="Text">
      <p className="font-['Noto_Sans_CJK_JP:Bold',sans-serif] leading-[95px] not-italic relative shrink-0 text-[#1e1b39] text-[88px] text-center">問い合わせ対応で疲弊していませんか？</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[100px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 100">
        <g id="Icon">
          <circle cx="50" cy="50" fill="var(--fill-0, #092045)" id="Icon Background" r="50" />
          <g id="icon/bar-chart-4">
            <path d="M26 25.7358V73.7358H74" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
            <path d="M52.6667 63.0692V41.7358" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
            <path d="M66 63.0692V31.0692" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
            <path d="M39.3333 63.0692V55.0692" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0" data-name="Text">
      <p className="font-['Noto_Sans_CJK_JP:Bold',sans-serif] leading-[54px] relative shrink-0 text-[#1e1b39] text-[42px]">コストの増大</p>
      <ul className="block font-['Helvetica_Neue:Regular',sans-serif] leading-[0] list-disc relative shrink-0 text-[#6e6c83] text-[24px] w-[447.689px] whitespace-pre-wrap">
        <li className="mb-0 ms-[36px]">
          <span className="leading-[42px]">
            問い合わせ件数の増加に比例して
            <br aria-hidden="true" />
            {`人件費が膨らむ `}
          </span>
        </li>
        <li className="ms-[36px]">
          <span className="leading-[42px]">採用・教育コストが継続的に発生</span>
        </li>
      </ul>
    </div>
  );
}

function Content1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] items-start left-[154px] top-[430.26px]" data-name="Content">
      <Icon />
      <Text1 />
    </div>
  );
}

function Card() {
  return (
    <div className="absolute contents left-[106px] top-[347.72px]" data-name="Card">
      <div className="absolute bg-white border border-[#dedee9] border-solid h-[520.46px] left-[106px] rounded-[56px] shadow-[0px_4px_12px_0px_rgba(13,10,44,0.06)] top-[347.72px] w-[537.355px]" data-name="Card Background" />
      <Content1 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[100px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 100">
        <g id="Icon">
          <circle cx="50" cy="50" fill="var(--fill-0, white)" id="Icon Background" r="50" />
          <g id="icon/clock">
            <path d={svgPaths.pb3155a0} id="Vector" stroke="var(--stroke-0, #092045)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
            <path d={svgPaths.p1e784500} id="Vector_2" stroke="var(--stroke-0, #092045)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0 text-white" data-name="Text">
      <p className="font-['Noto_Sans_CJK_JP:Bold',sans-serif] leading-[54px] relative shrink-0 text-[42px]">機会損失</p>
      <ul className="block font-['Helvetica_Neue:Regular',sans-serif] leading-[0] list-disc opacity-80 relative shrink-0 text-[24px] w-[447.689px] whitespace-pre-wrap">
        <li className="mb-0 ms-[36px]">
          <span className="leading-[42px]">24時間365日対応できず、顧客満足度が低下</span>
        </li>
        <li className="ms-[36px]">
          <span className="leading-[42px]">単純作業に追われ、本来注力すべき業務に時間を割けない</span>
        </li>
      </ul>
    </div>
  );
}

function Content2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] items-start left-[739.32px] top-[430.26px]" data-name="Content">
      <Icon1 />
      <Text2 />
    </div>
  );
}

function CardFeatured() {
  return (
    <div className="absolute contents left-[691.32px] top-[347.72px]" data-name="Card Featured">
      <div className="absolute bg-[#092045] border border-[#dedee9] border-solid h-[520.46px] left-[691.32px] rounded-[56px] shadow-[0px_4px_12px_0px_rgba(13,10,44,0.06)] top-[347.72px] w-[537.355px]" data-name="Card Background" />
      <Content2 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[100px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 100">
        <g id="Icon">
          <circle cx="50" cy="50" fill="var(--fill-0, #092045)" id="Icon Background" r="50" />
          <g id="icon/frown">
            <path d={svgPaths.p33880c00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
            <path d={svgPaths.p26f51380} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
            <path d="M42.3555 41.7358H42.3821" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
            <path d="M58.3555 41.7358H58.3821" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0" data-name="Text">
      <p className="font-['Noto_Sans_CJK_JP:Bold',sans-serif] leading-[54px] relative shrink-0 text-[#1e1b39] text-[42px]">従業員満足度の低下</p>
      <ul className="block font-['Helvetica_Neue:Regular',sans-serif] leading-[0] list-disc relative shrink-0 text-[#6e6c83] text-[24px] w-[447.689px] whitespace-pre-wrap">
        <li className="mb-0 ms-[36px]">
          <span className="leading-[42px]">{`類似・定型的な問い合わせ対応による疲弊 `}</span>
        </li>
        <li className="ms-[36px]">
          <span className="leading-[42px]">社内での情報探しに時間がかかり、生産性が低下</span>
        </li>
      </ul>
    </div>
  );
}

function Content3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] items-start left-[1324.64px] top-[430.26px]" data-name="Content">
      <Icon2 />
      <Text3 />
    </div>
  );
}

function Card1() {
  return (
    <div className="absolute contents left-[1276.64px] top-[347.72px]" data-name="Card">
      <div className="absolute bg-white border border-[#dedee9] border-solid h-[520.46px] left-[1276.64px] rounded-[56px] shadow-[0px_4px_12px_0px_rgba(13,10,44,0.06)] top-[347.72px] w-[537.355px]" data-name="Card Background" />
      <Content3 />
    </div>
  );
}

function Content() {
  return (
    <div className="absolute contents left-[106px] top-[106px]" data-name="Content">
      <Text />
      <Card />
      <CardFeatured />
      <Card1 />
    </div>
  );
}

function Services05Content() {
  return (
    <div className="absolute contents left-0 top-[106px]" data-name="Services - 05 Content">
      <BottomNavigation />
      <Content />
    </div>
  );
}

export default function Services() {
  return (
    <div className="bg-white relative size-full" data-name="⭐️ Services - 05">
      <Bg />
      <Services05Content />
    </div>
  );
}