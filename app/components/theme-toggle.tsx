import { useTheme } from "~/hooks/use-theme";
import { THEMES, type Theme } from "~/lib/theme";

const LABELS: Record<Theme, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="inline-flex rounded-full border border-border bg-surface p-1"
    >
      {THEMES.map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={theme === option}
          onClick={() => setTheme(option)}
          className={`rounded-full px-3 py-1 text-sm transition-colors ${
            theme === option
              ? "bg-accent text-white"
              : "text-foreground hover:opacity-75"
          }`}
        >
          {LABELS[option]}
        </button>
      ))}
    </div>
  );
}
