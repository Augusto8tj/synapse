"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { profiles } from "@/lib/data";
import type { ProfileId } from "@/lib/types";

export function UserNav() {
  const searchParams = useSearchParams();
  const profileId = (searchParams.get("profile") as ProfileId) || "engenheiro";
  const currentProfile = profiles[profileId];
  const otherProfileId: ProfileId =
    profileId === "engenheiro" ? "narrador" : "engenheiro";
  const otherProfile = profiles[otherProfileId];

  if (!currentProfile) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border-2 border-primary">
            <AvatarImage
              src={currentProfile.avatar}
              alt={currentProfile.name}
              data-ai-hint={currentProfile.avatarHint}
            />
            <AvatarFallback>{currentProfile.initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none font-headline">
              {currentProfile.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {`Idade: ${currentProfile.age} anos`}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs">Mudar Perfil</DropdownMenuLabel>
          <Link href={`/dashboard?profile=${otherProfile.id}`}>
            <DropdownMenuItem>
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={otherProfile.avatar} alt={otherProfile.name} />
                <AvatarFallback>{otherProfile.initials}</AvatarFallback>
              </Avatar>
              <span>{otherProfile.name}</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link href="/">
          <DropdownMenuItem>Sair</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
