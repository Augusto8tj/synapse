"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { profiles } from "@/lib/data";
import type { ProfileId } from "@/lib/types";

export function ProfileMenu() {
  const searchParams = useSearchParams();
  const currentProfileId = (searchParams.get("profile") as ProfileId) || "engenheiro";

  return (
    <SidebarMenu>
      {Object.values(profiles).map((profile) => {
        const isActive = profile.id === currentProfileId;
        return (
          <SidebarMenuItem key={profile.id}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              tooltip={{ children: profile.name, side: "right" }}
              className="justify-center"
            >
              <Link href={`/dashboard?profile=${profile.id}`}>
                <Avatar className="h-8 w-8 border-2 border-transparent data-[active=true]:border-primary transition-all">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback>{profile.initials}</AvatarFallback>
                </Avatar>
                <span className="truncate">{profile.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
