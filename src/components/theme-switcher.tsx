"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Paintbrush, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const themes = [
  { value: "default", label: "Padrão" },
  { value: "jungle", label: "Selva" },
  { value: "ocean", label: "Oceano" },
  { value: "galaxy", label: "Galáxia" },
  { value: "sunset", label: "Pôr do Sol" },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
          <Paintbrush className="h-5 w-5" />
          <span className="sr-only">Mudar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((t) => (
          <DropdownMenuItem key={t.value} onClick={() => setTheme(t.value)}>
            <div className="flex items-center gap-2">
              <span>{t.label}</span>
              {theme === t.value && <Check className="h-4 w-4" />}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
