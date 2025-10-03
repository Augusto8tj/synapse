"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { activities } from "@/lib/data";
import type { ProfileId } from "@/lib/types";
import { Home } from "lucide-react";
import React from 'react';


export function MainNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const profile = searchParams.get("profile") as ProfileId | null;
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);


  if (!profile || !mounted) {
    return null; // Or a default menu
  }

  const navItems = activities.filter(activity => activity.profiles.includes(profile));

  return (
    <SidebarMenu>
       <SidebarMenuItem key="/">
            <SidebarMenuButton
              asChild
              isActive={pathname === '/'}
              tooltip={{ children: "Início", side: "right" }}
            >
              <Link href={`/`}>
                <Home />
                <span>Início</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

      {navItems.map((item) => {
        const hrefWithProfile = `${item.href}?profile=${profile}`;
        const isActive = pathname === item.href;
        const isDisabled = item.href === "#";

        return (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              disabled={isDisabled}
              tooltip={{ children: item.title, side: "right" }}
            >
              <Link href={isDisabled ? "#" : hrefWithProfile} aria-disabled={isDisabled} tabIndex={isDisabled ? -1 : undefined}>
                <item.Icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
