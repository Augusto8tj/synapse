"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  React.useEffect(() => {
    const themes = ["jungle", "ocean", "galaxy", "sunset", "default"];
    // Remove any existing theme classes
    document.body.classList.remove(...themes.map((t) => `theme-${t}`));
    
    // Add the class for the currently selected theme
    if (theme) {
        document.body.classList.add(`theme-${theme}`);
    } else {
        document.body.classList.add('theme-default');
    }
  }, [theme]);

  return <>{children}</>;
}


export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const allProps = {
    ...props,
    // Add the custom theme names to the provider
    themes: ["light", "dark", "jungle", "ocean", "galaxy", "sunset", "default"],
  };
  return (
      <NextThemesProvider {...allProps}>
        <ThemeWrapper>{children}</ThemeWrapper>
      </NextThemesProvider>
  );
}
