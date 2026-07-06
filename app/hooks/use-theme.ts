import { useCallback, useEffect, useState } from "react";

import {
  applyTheme,
  getStoredTheme,
  resolveTheme,
  setStoredTheme,
  type Theme,
} from "~/lib/theme";

export function useTheme() {
  // Always start from "system" so the very first client render matches the
  // server-rendered markup; the real stored preference is read after mount.
  const [theme, setThemeState] = useState<Theme>("system");

  useEffect(() => {
    setThemeState(getStoredTheme());
  }, []);

  useEffect(() => {
    applyTheme(theme);

    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setStoredTheme(next);
    setThemeState(next);
  }, []);

  return { theme, resolvedTheme: resolveTheme(theme), setTheme };
}
