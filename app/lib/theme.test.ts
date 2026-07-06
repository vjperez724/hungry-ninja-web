import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  applyTheme,
  getStoredTheme,
  getSystemTheme,
  resolveTheme,
  setStoredTheme,
  THEME_STORAGE_KEY,
} from "./theme";

function mockMatchMedia(matches: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockReturnValue({
      matches,
      media: "(prefers-color-scheme: dark)",
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }),
  );
}

describe("theme utilities", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("resolves to the system theme when the system prefers dark", () => {
    mockMatchMedia(true);

    expect(getSystemTheme()).toBe("dark");
    expect(resolveTheme("system")).toBe("dark");
  });

  it("resolves to the system theme when the system prefers light", () => {
    mockMatchMedia(false);

    expect(getSystemTheme()).toBe("light");
    expect(resolveTheme("system")).toBe("light");
  });

  it("resolves to light when light mode is explicitly selected, regardless of system", () => {
    mockMatchMedia(true);

    expect(resolveTheme("light")).toBe("light");
  });

  it("resolves to dark when dark mode is explicitly selected, regardless of system", () => {
    mockMatchMedia(false);

    expect(resolveTheme("dark")).toBe("dark");
  });

  it("applies the dark class to the document when the resolved theme is dark", () => {
    mockMatchMedia(false);

    applyTheme("dark");

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("removes the dark class from the document when the resolved theme is light", () => {
    document.documentElement.classList.add("dark");
    mockMatchMedia(true);

    applyTheme("light");

    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("persists and retrieves the stored theme preference", () => {
    setStoredTheme("dark");

    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(getStoredTheme()).toBe("dark");
  });

  it("defaults to system when no theme has been stored", () => {
    expect(getStoredTheme()).toBe("system");
  });

  it("defaults to system when the stored value is invalid", () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, "blue");

    expect(getStoredTheme()).toBe("system");
  });
});
