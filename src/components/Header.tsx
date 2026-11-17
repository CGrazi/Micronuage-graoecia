import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { SmartLink } from "@/components/SmartLink";
import { ButtonLink } from "@/components/ui/button";
import { useCart } from "@/components/CartContext";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();
  const close = () => setOpen(false);

  return (
    <header className={cn("z-40 border-b border-current/10 bg-background/90 backdrop-blur", site.header.sticky && "sticky top-0")}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <SmartLink href="/" className="flex items-center gap-2 font-heading text-lg font-semibold" onClick={close}>
          {site.logo ? <img src={site.logo} alt={site.name} className="h-8 w-auto" /> : site.name}
        </SmartLink>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {site.navigation.map((item) => (
            <SmartLink key={item.label} href={item.href} className="rounded-site px-3 py-2 text-[15px] opacity-80 hover:opacity-100">
              {item.label}
            </SmartLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/carrinho" className="relative rounded-site p-2 hover:bg-current/5" aria-label={`Carrinho com ${itemCount} itens`}>
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-white">
                {itemCount}
              </span>
            )}
          </Link>
          {site.header.ctaText && (
            <ButtonLink href={site.header.ctaUrl} className="hidden h-10 px-4 text-sm sm:inline-flex">
              {site.header.ctaText}
            </ButtonLink>
          )}
          <button type="button" className="rounded-site p-2 md:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-current/10 px-5 py-4 md:hidden" aria-label="Menu móvel">
          {site.navigation.map((item) => (
            <SmartLink key={item.label} href={item.href} className="block py-2 text-base font-medium" onClick={close}>
              {item.label}
            </SmartLink>
          ))}
          {site.header.ctaText && (
            <ButtonLink href={site.header.ctaUrl} className="mt-3 w-full">
              {site.header.ctaText}
            </ButtonLink>
          )}
        </nav>
      )}
    </header>
  );
}
