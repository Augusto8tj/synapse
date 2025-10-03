"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { profiles } from "@/lib/data";
import type { ProfileId } from "@/lib/types";
import { Users } from "lucide-react";
import * as React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export function ProfileMenu() {
  const searchParams = useSearchParams();
  const currentProfileId =
    (searchParams.get("profile") as ProfileId) || "engenheiro";
  const currentProfile = profiles[currentProfileId];
  const otherProfiles = Object.values(profiles).filter(p => p.id !== currentProfileId);

  const [isOpen, setIsOpen] = React.useState(true);

  if (!currentProfile) return null;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="w-full pr-8">
            <Users />
            <span>Perfis</span>
          </SidebarMenuButton>
        </CollapsibleTrigger>
      </SidebarMenuItem>
      <CollapsibleContent>
        <SidebarMenuSub>
          <SidebarMenuItem>
              <SidebarMenuSubButton asChild isActive={true}>
                <Link href={`/dashboard?profile=${currentProfile.id}`}>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={currentProfile.avatar} alt={currentProfile.name} />
                    <AvatarFallback>{currentProfile.initials}</AvatarFallback>
                  </Avatar>
                  <span className="truncate">{currentProfile.name}</span>
                </Link>
              </SidebarMenuSubButton>
          </SidebarMenuItem>
          {otherProfiles.map((profile) => (
            <SidebarMenuItem key={profile.id}>
                <SidebarMenuSubButton asChild isActive={false}>
                  <Link href={`/dashboard?profile=${profile.id}`}>
                    <Avatar className="h-6 w-6 opacity-70 group-hover:opacity-100">
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback>{profile.initials}</AvatarFallback>
                    </Avatar>
                    <span className="truncate">{profile.name}</span>
                  </Link>
                </SidebarMenuSubButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  );
}
