"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const allProps = {
    ...props,
    // Add the custom theme names to the provider
    themes: ["light", "dark", "default", "jungle", "ocean", "galaxy", "sunset"],
  };
  return (
      <NextThemesProvider {...allProps}>
        {children}
      </NextThemesProvider>
  );
}
