import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface OrientationHeaderProps {
  onToggleContrast: () => void;
  isHighContrast: boolean;
}

interface NavItem {
  label: string;
  href?: string;
  external?: boolean;
  download?: boolean;
  variant: "ghost";
  subItems?: {
    label: string;
    href: string;
    external?: boolean;
  }[];
}

export const OrientationHeader = ({ onToggleContrast, isHighContrast }: OrientationHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: NavItem[] = [
    {
      label: "The Sun Lab",
      href: "https://sites.google.com/view/xinsun",
      external: true,
      variant: "ghost"
    },
    {
      label: "The Paper",
      variant: "ghost",
      subItems: [
        {
          label: "Full Paper",
          href: "https://www.pnas.org/doi/epdf/10.1073/pnas.2417421121",
          external: true
        },
        {
          label: "Summary",
          href: "https://www.us-ocb.org/how-do-ocean-microbes-share-the-job-of-denitrification/",
          external: true
        }
      ]
    },
    {
      label: "Worksheet",
      href: "/files/MicrobeRelay_Worksheet.docx",
      download: true,
      variant: "ghost"
    },
    {
      label: "Teachers Guide",
      href: "/files/MicrobeRelay_TeachersGuide.docx",
      download: true,
      variant: "ghost"
    },
    {
      label: "Feedback",
      href: "https://forms.gle/eEg63676BXoVa2By7",
      external: true,
      variant: "ghost"
    }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || isMobileMenuOpen
          ? "glass-intense border-b border-white/20 shadow-sm"
          : "bg-transparent border-b border-transparent py-2"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 group z-50">
            <span className="font-display font-bold text-xl tracking-tight text-white drop-shadow-sm">
              Microbe Relay
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              if (item.subItems) {
                return (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant={item.variant}
                        size="sm"
                        className="h-9 px-4 rounded-full transition-all font-medium text-muted-foreground hover:text-foreground hover:bg-white/10 gap-1"
                      >
                        {item.label}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      {item.subItems.map((subItem) => (
                        <DropdownMenuItem key={subItem.label} asChild>
                          <a
                            href={subItem.href}
                            target={subItem.external ? "_blank" : undefined}
                            rel={subItem.external ? "noopener noreferrer" : undefined}
                            className="cursor-pointer"
                          >
                            {subItem.label}
                          </a>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <Button
                  key={item.label}
                  variant={item.variant}
                  size="sm"
                  asChild
                  className="h-9 px-4 rounded-full transition-all font-medium text-muted-foreground hover:text-foreground hover:bg-white/10"
                >
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    download={item.download}
                    className="flex items-center gap-2"
                  >
                    {item.label}
                  </a>
                </Button>
              );
            })}

            {/* Separator */}
            <div className="w-px h-6 bg-white/10 mx-2" />

          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden hover:bg-white/10 h-10 w-10 rounded-full transition-all z-50 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
      >
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-16 left-0 right-0 glass-intense border-b border-white/20 p-6 transition-all duration-300 transform ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
            }`}
        >
          <div className="flex flex-col gap-3">
            {navItems.map((item) => {
              if (item.subItems) {
                return (
                  <div key={item.label} className="flex flex-col gap-2 p-4 rounded-2xl bg-white/5">
                    <span className="font-medium text-foreground px-2">
                      {item.label}
                    </span>
                    <div className="flex flex-col pl-4 gap-2">
                      {item.subItems.map((subItem) => (
                        <a
                          key={subItem.label}
                          href={subItem.href}
                          target={subItem.external ? "_blank" : undefined}
                          rel={subItem.external ? "noopener noreferrer" : undefined}
                          className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 active:bg-white/10 transition-colors text-sm text-muted-foreground hover:text-foreground"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  download={item.download}
                  className="flex items-center gap-3 p-4 rounded-2xl hover:bg-white/5 active:bg-white/10 transition-colors group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">
                      {item.label}
                    </span>
                    {item.download && <span className="text-xs text-muted-foreground">Download .docx</span>}
                    {item.external && <span className="text-xs text-muted-foreground">Opens in new tab</span>}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
