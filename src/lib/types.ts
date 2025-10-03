import type { LucideIcon } from "lucide-react";

export type ProfileId = "engenheiro" | "narrador";

export type Profile = {
  id: ProfileId;
  name: string;
  age: number;
  description: string;
  avatar: string;
  avatarHint: string;
  initials: string;
};

export type Activity = {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  href: string;
  profiles: Array<Profile["id"]>;
  image: string;
  imageHint: string;
};
