"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  React.useEffect(() => {
    const themes = ["jungle", "ocean", "galaxy", "sunset", "default"];
    document.body.classList.remove(...themes.map((t) => `theme-${t}`));
    if (theme && theme !== "default") {
        document.body.classList.add(`theme-${theme}`);
    } else {
        document.body.classList.add('theme-default');
    }
  }, [theme]);

  return <>{children}</>;
}


export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
      <NextThemesProvider {...props}>
        <ThemeWrapper>{children}</ThemeWrapper>
      </NextThemesProvider>
  );
}
