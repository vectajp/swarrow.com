import { SwarrowLogo } from "./SwarrowLogo";

export function Footer() {
  return (
    <footer className="bg-[#EDEDF0] py-12 lg:py-16">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Logo + Company */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <SwarrowLogo color="#092045" markSize={24} />
            <a
              href="https://www.vecta.co.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#52506B] text-[14px] hover:text-[#E87B35] transition-colors duration-200"
              style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 400 }}
            >
              株式会社Vecta
            </a>
          </div>

          {/* Links */}
          <div className="flex gap-8">
            <div className="flex flex-col gap-3">
              {["プライバシーポリシー", "利用規約", "特定商取引法に基づく表記"].map(
                (link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-[#52506B] hover:text-[#092045] text-[13px] transition-colors"
                    style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 400 }}
                  >
                    {link}
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-[#092045]/10 my-8" />

        {/* Copyright */}
        <p
          className="text-[#636180] text-[12px] text-center"
          style={{ fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 400 }}
        >
          &copy; 2026 Vecta Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}