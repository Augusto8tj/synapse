"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Compass,
  BookHeart,
  Users,
  Settings,
  GraduationCap,
} from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const navItems = [
  { href: "/dashboard", label: "Início", Icon: Home },
  { href: "/explore", label: "Explorar", Icon: Compass },
  { href: "/story-studio", label: "Estúdio", Icon: BookHeart },
  { href: "/tutor", label: "Professor", Icon: GraduationCap },
  { href: "/projects", label: "Projetos", Icon: Users },
  { href: "/settings", label: "Painel dos Pais", Icon: Settings },
];

export function MainNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const profile = searchParams.get("profile");

  return (
    <SidebarMenu>
      {navItems.map((item) => {
        // Only show Story Studio for the narrator profile
        if (item.href === "/story-studio" && profile !== "narrador") {
          return null;
        }

        // Hide some items for now
        if (["/explore", "/projects", "/settings"].includes(item.href)) {
          return null;
        }
        
        const hrefWithProfile = `${item.href}?profile=${profile}`;
        const isActive = pathname === item.href;

        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              tooltip={{ children: item.label, side: "right" }}
            >
              <Link href={hrefWithProfile}>
                <item.Icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
