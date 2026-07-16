import { useState, useEffect } from "react";
import { getTheme, setTheme } from "../localstorage";

export function useDark() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const theme = getTheme("theme");
    return theme === "true" || theme === true;
  });
  useEffect(() => {
    setTheme("theme", isDark);
  }, [isDark]);

  return {
    setIsDark,
    isDark,
  };
}
