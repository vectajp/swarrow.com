import svgPaths from "./svg-mwki1hrt9b";

function Heading() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_JP:Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#1a1a1a] text-[14px] top-0 tracking-[-0.1504px]">スケジュールタイプ</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p3610ce00} id="Vector" stroke="var(--stroke-0, #7C5CFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1e08a620} id="Vector_2" stroke="var(--stroke-0, #7C5CFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3931fd80} id="Vector_3" stroke="var(--stroke-0, #7C5CFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1c172000} id="Vector_4" stroke="var(--stroke-0, #7C5CFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[19.5px] left-[38.5px] not-italic text-[#7c5cfc] text-[13px] text-center top-0 tracking-[-0.0762px]">繰り返し</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[16.5px] left-[38px] not-italic text-[#9ca3af] text-[11px] text-center top-0 tracking-[0.0645px]">毎週火曜日など</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[36px] relative shrink-0 w-[77px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#fafafe] col-1 content-stretch flex flex-col gap-[8px] h-[79px] items-center justify-center justify-self-stretch p-[2px] relative rounded-[14px] row-1 self-start shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#7c5cfc] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Icon />
      <Container3 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M6.66667 1.66667V5" id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 1.66667V5" id="Vector_2" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1da67b80} id="Vector_3" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M2.5 8.33333H17.5" id="Vector_4" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[19.5px] left-[38.5px] not-italic text-[#1a1a1a] text-[13px] text-center top-0 tracking-[-0.0762px]">特定日のみ</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[16.5px] left-[38px] not-italic text-[#9ca3af] text-[11px] text-center top-0 tracking-[0.0645px]">日付を個別指定</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[36px] relative shrink-0 w-[77px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph2 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white col-2 content-stretch flex flex-col gap-[8px] h-[79px] items-center justify-center justify-self-stretch p-[2px] relative rounded-[14px] row-1 shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Icon1 />
      <Container4 />
    </div>
  );
}

function Container2() {
  return (
    <div className="gap-x-[12px] gap-y-[12px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,fit-content(100%))] relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start pt-[16px] relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Container2 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_JP:Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#1a1a1a] text-[14px] top-0 tracking-[-0.1504px]">繰り返し実行</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#9ca3af] text-[12px] top-0">定期的にスケジュールを実行</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col h-[39px] items-start relative shrink-0 w-[154.328px]" data-name="Container">
      <Heading1 />
      <Paragraph4 />
    </div>
  );
}

function Text() {
  return <div className="bg-white rounded-[33554400px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 size-[20px]" data-name="Text" />;
}

function Toggle() {
  return (
    <div className="bg-[#3b82f6] content-stretch flex h-[28px] items-center pl-[24px] relative rounded-[33554400px] shrink-0 w-[48px]" data-name="Toggle">
      <Text />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Toggle />
    </div>
  );
}

function Label() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#3b82f6] text-[11px] top-0 tracking-[0.0645px]">頻度</p>
    </div>
  );
}

function IconChevronDown() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon/chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon/chevron-down">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #1E1F24)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TrailingDisclosure() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Trailing - Disclosure">
      <IconChevronDown />
    </div>
  );
}

function Select() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Select">
      <div aria-hidden="true" className="absolute border border-[#cdced7] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Noto_Sans_JP:Regular',sans-serif] font-normal leading-none min-h-px min-w-px overflow-hidden relative text-[#1a1a1a] text-[14px] text-ellipsis tracking-[0.35px] whitespace-nowrap">毎週</p>
          <TrailingDisclosure />
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-full items-start min-h-px min-w-px relative" data-name="Container">
      <Label />
      <Select />
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#3b82f6] text-[11px] top-0 tracking-[0.0645px]">間隔</p>
    </div>
  );
}

function IconChevronDown1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon/chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon/chevron-down">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #1E1F24)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TrailingDisclosure1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Trailing - Disclosure">
      <IconChevronDown1 />
    </div>
  );
}

function Select1() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Select">
      <div aria-hidden="true" className="absolute border border-[#cdced7] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Noto_Sans_JP:Regular',sans-serif] font-normal leading-none min-h-px min-w-px overflow-hidden relative text-[#1a1a1a] text-[14px] text-ellipsis tracking-[0.35px] whitespace-nowrap">2週ごと</p>
          <TrailingDisclosure1 />
        </div>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-full items-start min-h-px min-w-px relative" data-name="Container">
      <Label1 />
      <Select1 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[12px] h-[63.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container9 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_JP:Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#1a1a1a] text-[14px] top-0 tracking-[-0.1504px]">曜日</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[33554400px] shrink-0 size-[40px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[19.5px] not-italic relative shrink-0 text-[#6b7280] text-[13px] text-center tracking-[-0.0762px]">月</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-0 size-[12px] top-[3.75px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M10 3L4.5 8.5L2 6" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[27px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon2 />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[19.5px] left-[20.5px] not-italic text-[13px] text-center text-white top-0 tracking-[-0.0762px]">火</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#22c55e] relative rounded-[33554400px] shrink-0 size-[40px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Text1 />
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[33554400px] shrink-0 size-[40px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[19.5px] not-italic relative shrink-0 text-[#6b7280] text-[13px] text-center tracking-[-0.0762px]">水</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[33554400px] shrink-0 size-[40px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[19.5px] not-italic relative shrink-0 text-[#6b7280] text-[13px] text-center tracking-[-0.0762px]">木</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[33554400px] shrink-0 size-[40px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[19.5px] not-italic relative shrink-0 text-[#6b7280] text-[13px] text-center tracking-[-0.0762px]">金</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[33554400px] shrink-0 size-[40px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[19.5px] not-italic relative shrink-0 text-[#6b7280] text-[13px] text-center tracking-[-0.0762px]">土</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[33554400px] shrink-0 size-[40px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[19.5px] not-italic relative shrink-0 text-[#6b7280] text-[13px] text-center tracking-[-0.0762px]">日</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[8px] h-[40px] items-start relative shrink-0 w-full" data-name="Container">
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
      <Button6 />
      <Button7 />
      <Button8 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_6_1704)" id="Icon">
          <path d={svgPaths.pc012c00} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M7 9.33333V7" id="Vector_2" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M7 4.66667H7.00583" id="Vector_3" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_6_1704">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[18px] relative shrink-0 w-[82.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#9ca3af] text-[12px] top-0">2週ごと 火曜日</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[6px] h-[18px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon3 />
      <Text2 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[99px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Container11 />
      <Container12 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-0 size-[20px] top-[2px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_6_1720)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.66667 10H13.3333" id="Vector_2" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 6.66667V13.3333" id="Vector_3" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_6_1720">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_JP:Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#1a1a1a] text-[14px] top-0 tracking-[-0.1504px]">特定日</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#9ca3af] text-[12px] top-0">繰り返しとは別に、この日付にも実行</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex flex-col h-[39px] items-start left-[28px] top-0 w-[204px]" data-name="Container">
      <Heading3 />
      <Paragraph5 />
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[39px] relative shrink-0 w-[232px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon4 />
        <Container16 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-0 size-[14px] top-[2.75px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M2.91667 7H11.0833" id="Vector" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M7 2.91667V11.0833" id="Vector_2" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[44px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon5 />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[19.5px] left-[31px] not-italic text-[#3b82f6] text-[13px] text-center top-0 tracking-[-0.0762px]">追加</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex h-[39px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container15 />
      <Button9 />
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[155.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#9ca3af] text-[13px] top-0 tracking-[-0.0762px]">日付が設定されていません</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-[#f9fafb] h-[51.5px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pr-[0.016px] relative size-full">
          <Text3 />
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[98.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container17 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-0 size-[20px] top-[2px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_6_1681)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.66667 10H13.3333" id="Vector_2" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_6_1681">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_JP:Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#1a1a1a] text-[14px] top-0 tracking-[-0.1504px]">除外日</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#9ca3af] text-[12px] top-0">繰り返しに該当してもこの日付は実行しない</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex flex-col h-[39px] items-start left-[28px] top-0 w-[239.281px]" data-name="Container">
      <Heading4 />
      <Paragraph6 />
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[39px] relative shrink-0 w-[267.281px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon6 />
        <Container21 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute left-0 size-[14px] top-[2.75px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M2.91667 7H11.0833" id="Vector" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M7 2.91667V11.0833" id="Vector_2" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[44px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon7 />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[19.5px] left-[31px] not-italic text-[#3b82f6] text-[13px] text-center top-0 tracking-[-0.0762px]">追加</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex h-[39px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <Button10 />
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[155.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#9ca3af] text-[13px] top-0 tracking-[-0.0762px]">日付が設定されていません</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="bg-[#f9fafb] h-[51.5px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pr-[0.016px] relative size-full">
          <Text4 />
        </div>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[98.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container19 />
      <Container22 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M5.33333 1.33333V4" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 1.33333V4" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3ee34580} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 6.66667H14" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container25() {
  return (
    <div className="bg-[#f97316] relative rounded-[33554400px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute h-[18px] left-0 top-[24px] w-[238.203px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#9ca3af] text-[12px] top-0">組織の休日カレンダーに登録された日を除外</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="flex-[1_0_0] h-[42px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_JP:Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#f97316] text-[14px] top-px tracking-[-0.1504px]">祝日をスキップ</p>
        <Paragraph7 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex gap-[12px] h-[42px] items-center relative shrink-0 w-[282.203px]" data-name="Container">
      <Container25 />
      <Container26 />
    </div>
  );
}

function Text5() {
  return <div className="bg-white rounded-[33554400px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 size-[20px]" data-name="Text" />;
}

function Toggle1() {
  return (
    <div className="bg-[#f97316] content-stretch flex h-[28px] items-center pl-[24px] relative rounded-[33554400px] shrink-0 w-[48px]" data-name="Toggle">
      <Text5 />
    </div>
  );
}

function Container23() {
  return (
    <div className="bg-[#fff7ed] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[14px] relative w-full">
          <Container24 />
          <Toggle1 />
        </div>
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_JP:Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#1a1a1a] text-[14px] top-0 tracking-[-0.1504px]">実行時間帯</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#9ca3af] text-[12px] top-0">この時間帯内でのみ実行します</p>
    </div>
  );
}

function Label2() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#3b82f6] text-[11px] top-0 tracking-[0.0645px]">開始</p>
    </div>
  );
}

function IconChevronDown2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon/chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon/chevron-down">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #1E1F24)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TrailingDisclosure2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Trailing - Disclosure">
      <IconChevronDown2 />
    </div>
  );
}

function Select2() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Select">
      <div aria-hidden="true" className="absolute border border-[#cdced7] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Noto_Sans_JP:Regular',sans-serif] font-normal leading-none min-h-px min-w-px overflow-hidden relative text-[#1a1a1a] text-[14px] text-ellipsis tracking-[0.35px] whitespace-nowrap">09:00</p>
          <TrailingDisclosure2 />
        </div>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-full items-start min-h-px min-w-px relative" data-name="Container">
      <Label2 />
      <Select2 />
    </div>
  );
}

function Label3() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#3b82f6] text-[11px] top-0 tracking-[0.0645px]">終了</p>
    </div>
  );
}

function IconChevronDown3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon/chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon/chevron-down">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #1E1F24)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TrailingDisclosure3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Trailing - Disclosure">
      <IconChevronDown3 />
    </div>
  );
}

function Select3() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Select">
      <div aria-hidden="true" className="absolute border border-[#cdced7] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Noto_Sans_JP:Regular',sans-serif] font-normal leading-none min-h-px min-w-px overflow-hidden relative text-[#1a1a1a] text-[14px] text-ellipsis tracking-[0.35px] whitespace-nowrap">18:00</p>
          <TrailingDisclosure3 />
        </div>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-full items-start min-h-px min-w-px relative" data-name="Container">
      <Label3 />
      <Select3 />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex gap-[12px] h-[63.5px] items-center relative shrink-0 w-full" data-name="Container">
      <Container29 />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none">
          <p className="font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal h-[42px] leading-[21px] not-italic relative text-[#9ca3af] text-[14px] tracking-[-0.1504px] w-[14px] whitespace-pre-wrap">～</p>
        </div>
      </div>
      <Container30 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Heading5 />
      <Paragraph8 />
      <Container28 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_JP:Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#1a1a1a] text-[14px] top-0 tracking-[-0.1504px]">実行制御</p>
    </div>
  );
}

function Label4() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#ef4444] text-[11px] top-0 tracking-[0.0645px]">同時発信数</p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="bg-[#f9fafb] h-[43px] relative rounded-[10px] shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[12px] py-[10px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] tracking-[-0.1504px]">5</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container33() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[4px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Label4 />
      <TextInput />
    </div>
  );
}

function Label5() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#ef4444] text-[11px] top-0 tracking-[0.0645px]">発信/分</p>
    </div>
  );
}

function TextInput1() {
  return (
    <div className="bg-[#f9fafb] h-[43px] relative rounded-[10px] shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[12px] py-[10px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] tracking-[-0.1504px]">20</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container34() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[4px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Label5 />
      <TextInput1 />
    </div>
  );
}

function Container32() {
  return (
    <div className="gap-x-[12px] gap-y-[12px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[63.5px] relative shrink-0 w-full" data-name="Container">
      <Container33 />
      <Container34 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[96.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading6 />
      <Container32 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_JP:Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#1a1a1a] text-[14px] top-0 tracking-[-0.1504px]">リトライポリシー</p>
    </div>
  );
}

function Label6() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#ef4444] text-[11px] top-0 tracking-[0.0645px]">最大試行回数</p>
    </div>
  );
}

function TextInput2() {
  return (
    <div className="bg-[#f9fafb] h-[43px] relative rounded-[10px] shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[12px] py-[10px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] tracking-[-0.1504px]">3</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[63.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Label6 />
      <TextInput2 />
    </div>
  );
}

function Label7() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#ef4444] text-[11px] top-0 tracking-[0.0645px]">リトライ間隔（分）</p>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6.66667 1.33333H9.33333" id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 9.33333L10 7.33333" id="Vector_2" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1a6375c0} id="Vector_3" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[21px] relative shrink-0 w-[72.531px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#1a1a1a] text-[14px] top-0 tracking-[-0.1504px]">30, 60, 120</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="bg-[#f9fafb] h-[43px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[13px] pr-px py-px relative size-full">
          <Icon9 />
          <Text6 />
        </div>
      </div>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#9ca3af] text-[11px] top-0 tracking-[0.0645px]">カンマ区切りで各試行後の待機時間を指定</p>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[84px] items-start relative shrink-0 w-full" data-name="Container">
      <Label7 />
      <Container38 />
      <Paragraph9 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_6_1676)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 10.6667V8" id="Vector_2" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 5.33333H8.00667" id="Vector_3" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_6_1676">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute h-[18px] left-[36px] top-[10px] w-[372px]" data-name="Text">
      <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#3b82f6] text-[12px] top-0">リトライは「応答なし」「話中」「留守電」の場合に自動実行されます</p>
    </div>
  );
}

function Container39() {
  return (
    <div className="bg-[#eff6ff] h-[38px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <Icon10 />
      <Text7 />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[242.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading7 />
      <Container36 />
      <Container37 />
      <Container39 />
    </div>
  );
}

function Button11() {
  return (
    <div className="h-[43px] relative rounded-[10px] shrink-0 w-[151.453px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[21px] left-[76px] not-italic text-[#6b7280] text-[14px] text-center top-[11px] tracking-[-0.1504px]">キャンセル</p>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="bg-[#1e293b] h-[43px] relative rounded-[10px] shrink-0 w-[140px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[21px] left-[70px] not-italic text-[14px] text-center text-white top-[11px] tracking-[-0.1504px]">作成</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex gap-[12px] h-[59px] items-start justify-center pr-[0.016px] pt-[16px] relative shrink-0 w-[590px]" data-name="Container">
      <Button11 />
      <Button12 />
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[8px] items-start px-[24px] relative w-full">
        <Container1 />
        <Container5 />
        <Container7 />
        <Container10 />
        <Container13 />
        <Container18 />
        <Container23 />
        <Container27 />
        <Container31 />
        <Container35 />
        <Container40 />
      </div>
    </div>
  );
}

function ScheduleSettings() {
  return (
    <div className="bg-white h-[1544px] relative rounded-[16px] shrink-0 w-full" data-name="ScheduleSettings">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-px relative size-full">
          <Container />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

export default function CardUiDesign() {
  return (
    <div className="bg-[#f5f5f7] content-stretch flex flex-col items-center pb-[16px] pt-[40px] px-[16px] relative size-full" data-name="Card UI Design">
      <ScheduleSettings />
    </div>
  );
}