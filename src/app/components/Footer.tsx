import { SwarrowLogo } from "./SwarrowLogo";

export function Footer() {
  return (
    <footer className="bg-sc-bg-footer py-12 lg:py-16">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Logo + Company */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <SwarrowLogo color="var(--sc-navy)" markSize={24} />
            <a
              href="https://www.vecta.co.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sc-text-secondary text-[14px] hover:text-sc-orange transition-colors duration-200"
              
>
              株式会社Vecta
            </a>
          </div>

          {/* Links - ページ準備ができたら復活させる
          <div className="flex gap-8">
            <div className="flex flex-col gap-3">
              {["プライバシーポリシー", "利用規約", "特定商取引法に基づく表記"].map(
                (link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-sc-text-secondary hover:text-sc-navy text-[13px] transition-colors"
                  >
                    {link}
                  </a>
                )
              )}
            </div>
          </div>
          */}
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-sc-navy/10 my-8" />

        {/* Copyright */}
        <p
          className="text-sc-text-muted text-[12px] text-center"
          
>
          &copy; 2026 Vecta Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}