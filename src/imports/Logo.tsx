import svgPaths from "./svg-yk1lcwxbj8";

function Group1() {
  return (
    <div className="col-1 h-[44px] ml-0 mt-0 relative row-1 w-[41.122px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41.1219 44">
        <g id="Group 1">
          <path d={svgPaths.p3046a680} fill="var(--fill-0, #092045)" id="Vector" />
          <path d={svgPaths.p30e83b40} fill="var(--fill-0, #092045)" id="Vector_2" />
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

export default function Logo() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shadow-[0px_5.591px_3.253px_0px_rgba(37,19,120,0.02),0px_12.441px_10.912px_0px_rgba(37,19,120,0.03),0px_50.897px_48.866px_0px_rgba(37,19,120,0.06)] size-full" data-name="Logo">
      <Group />
      <p className="font-['Helvetica_Neue:Bold',sans-serif] leading-[48px] not-italic relative shrink-0 text-[32px] text-black">Swarrow Call</p>
    </div>
  );
}