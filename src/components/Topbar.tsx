'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { Settings, Tv, Menu, X } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


export default function Topbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: '/main-display-screen', label: 'Pantalla TV', icon: Tv },
    { href: '/content-management-panel', label: 'Gestión', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[hsl(var(--border))] bg-[hsl(var(--background)/0.95)] backdrop-blur-sm">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-12 2xl:px-16 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AppLogo size={36} />
          <span className="font-bold text-xl tracking-tight text-[hsl(var(--foreground))]">
            Voz de Potrero
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono font-semibold bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary))] border border-[hsl(var(--primary)/0.3)]">
            EN VIVO
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems?.map((item) => {
            const Icon = item?.icon;
            const active = pathname === item?.href;
            return (
              <Link
                key={`nav-${item?.href}`}
                href={item?.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  active
                    ? 'bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary))] border border-[hsl(var(--primary)/0.3)]'
                    : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--surface-elevated))]'
                }`}
              >
                <Icon size={16} />
                {item?.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--surface-elevated))] transition-all duration-150"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menú"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-4 py-3 flex flex-col gap-1">
          {navItems?.map((item) => {
            const Icon = item?.icon;
            const active = pathname === item?.href;
            return (
              <Link
                key={`mobile-nav-${item?.href}`}
                href={item?.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-150 ${
                  active
                    ? 'bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary))]'
                    : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--surface-elevated))]'
                }`}
              >
                <Icon size={20} />
                {item?.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}