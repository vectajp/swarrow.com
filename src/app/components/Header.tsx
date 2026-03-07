import { useState, useEffect } from "react";
import { SwarrowLogo } from "./SwarrowLogo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY> 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-sc-navy/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <button onClick={() => scrollToSection("hero")} className="flex items-center cursor-pointer">
            <SwarrowLogo color={scrolled ? "white" : "var(--sc-navy)"} markSize={26} />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "課題", id: "problem" },
              { label: "機能", id: "features" },
              { label: "導入の流れ", id: "how-it-works" },
              { label: "FAQ", id: "faq" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors text-[14px] cursor-pointer ${
                  scrolled ? "text-white/70 hover:text-white" : "text-sc-navy/60 hover:text-sc-navy"
                }`}
                
>
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("cta")}
              className="bg-sc-orange hover:bg-sc-orange-hover text-white px-5 py-2.5 rounded-full transition-colors text-[14px] cursor-pointer"
              
>
              無料相談
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 cursor-pointer transition-colors ${scrolled ? "text-white" : "text-sc-navy"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-sc-navy/98 backdrop-blur-md border-t border-white/10">
          <div className="px-6 py-4 flex flex-col gap-3">
            {[
              { label: "課題", id: "problem" },
              { label: "機能", id: "features" },
              { label: "導入の流れ", id: "how-it-works" },
              { label: "FAQ", id: "faq" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white/70 hover:text-white transition-colors text-[15px] py-2 text-left cursor-pointer"
                
>
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("cta")}
              className="bg-sc-orange hover:bg-sc-orange-hover text-white px-5 py-3 rounded-full transition-colors text-[15px] mt-2 cursor-pointer"
              
>
              無料相談
            </button>
          </div>
        </div>
      )}
    </header>
  );
}