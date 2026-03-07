import svgPaths from "./svg-yprmfi97n4";

function Group1() {
  return (
    <div className="col-1 h-[44px] ml-0 mt-0 relative row-1 w-[41.122px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41.1219 44">
        <g id="Group 1">
          <path d={svgPaths.p3046a680} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p30e83b40} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="aspect-[9/9] bg-[#d9d9d9] col-1 ml-0 mt-0 opacity-0 rounded-[15px] row-1 w-[44px]" />
      <Group1 />
    </div>
  );
}

function SwarrowCall() {
  return (
    <div className="h-[23.904px] relative shrink-0 w-[200.039px]" data-name="Swarrow Call">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 200.04 23.904">
        <g id="Swarrow Call">
          <path d={svgPaths.p23d4d900} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p34ec2f80} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p340c9100} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p639b00} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPaths.p347af300} fill="var(--fill-0, white)" id="Vector_5" />
          <path d={svgPaths.p18f1ba00} fill="var(--fill-0, white)" id="Vector_6" />
          <path d={svgPaths.p18bdc000} fill="var(--fill-0, white)" id="Vector_7" />
          <path d={svgPaths.p1471d5f0} fill="var(--fill-0, white)" id="Vector_8" />
          <path d={svgPaths.p91f7df0} fill="var(--fill-0, white)" id="Vector_9" />
          <path d={svgPaths.p438bc80} fill="var(--fill-0, white)" id="Vector_10" />
          <path d={svgPaths.p2dcf6cc0} fill="var(--fill-0, white)" id="Vector_11" />
        </g>
      </svg>
    </div>
  );
}

export default function Logo() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative size-full" data-name="Logo">
      <Group />
      <SwarrowCall />
    </div>
  );
}