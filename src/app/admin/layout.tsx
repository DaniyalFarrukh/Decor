"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Package, 
  List, 
  Layers, 
  ShoppingCart, 
  Users, 
  Star, 
  Tags, 
  BarChart, 
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";

const ADMIN_LINKS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Categories", href: "/admin/categories", icon: List },
  { name: "Collections", href: "/admin/collections", icon: Layers },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Reviews", href: "/admin/reviews", icon: Star },
  { name: "Coupons", href: "/admin/coupons", icon: Tags },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#111111] text-[#F8F6F2] dark">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] border-r border-[#333333] flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-[#333333]">
          <Link href="/admin" className="font-heading text-2xl tracking-tight uppercase text-white">
            Decornish
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <p className="px-2 text-xs font-semibold text-[#a3a3a3] uppercase tracking-wider mb-4">
            Management
          </p>
          <nav className="space-y-1">
            {ADMIN_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-[#a3a3a3] hover:bg-[#333333] hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 border-t border-[#333333]">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-[#a3a3a3] hover:bg-[#333333] hover:text-white transition-colors w-full">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          
          {/* Drawer content */}
          <aside className="relative w-64 bg-[#1a1a1a] border-r border-[#333333] flex flex-col h-full transform transition-transform duration-300 ease-in-out z-50 translate-x-0">
            <div className="h-16 flex items-center justify-between px-6 border-b border-[#333333]">
              <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="font-heading text-2xl tracking-tight uppercase text-white">
                Decornish
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-[#a3a3a3] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-6 px-4">
              <p className="px-2 text-xs font-semibold text-[#a3a3a3] uppercase tracking-wider mb-4">
                Management
              </p>
              <nav className="space-y-1">
                {ADMIN_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-[#a3a3a3] hover:bg-[#333333] hover:text-white transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
            
            <div className="p-4 border-t border-[#333333]">
              <button className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-[#a3a3a3] hover:bg-[#333333] hover:text-white transition-colors w-full">
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 bg-[#1a1a1a] border-b border-[#333333]">
          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-[#a3a3a3] hover:text-white transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link href="/admin" className="font-heading text-xl uppercase text-white">
              Decornish
            </Link>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-[#B08D57] flex items-center justify-center text-white font-medium text-sm">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#111111]">
          {children}
        </main>
      </div>
    </div>
  );
}
