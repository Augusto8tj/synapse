'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { activities } from '@/lib/data';
import type { ProfileId } from '@/lib/types';
import { Home } from 'lucide-react';
import React from 'react';

export function MainNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const profile = searchParams.get('profile') as ProfileId | null;
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // On initial load, profile is null on the server, so we wait for mount
  // to get it from client-side searchParams
  if (!mounted) {
    // You can return a loading state or null
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={pathname === '/'}
            tooltip={{ children: 'Início', side: 'right' }}
          >
            <Link href={`/`}>
              <Home />
              <span>Início</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }
  
  if (!profile) {
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
       </SidebarMenu>
    );
  }

  const navItems = activities.filter(activity =>
    activity.profiles.includes(profile)
  );

  return (
    <SidebarMenu>
      <SidebarMenuItem key="/">
        <SidebarMenuButton
          asChild
          isActive={pathname === '/dashboard'}
          tooltip={{ children: 'Dashboard', side: 'right' }}
        >
          <Link href={`/dashboard?profile=${profile}`}>
            <Home />
            <span>Dashboard</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>

      {navItems.map(item => {
        const hrefWithProfile = `${item.href}?profile=${profile}`;
        const isActive = pathname === item.href;
        const isDisabled = item.href === '#';

        return (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              disabled={isDisabled}
              tooltip={{ children: item.title, side: 'right' }}
            >
              <Link
                href={isDisabled ? '#' : hrefWithProfile}
                aria-disabled={isDisabled}
                tabIndex={isDisabled ? -1 : undefined}
              >
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
