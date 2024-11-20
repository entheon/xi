import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

import { Themes } from "./types.js";
import { buttonStyle } from "../styles/index.js";

export const ThemeIcon = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const darkIconClass = classNames("h-6 w-6 flex dark:hidden");
  const lightIconClass = classNames("h-6 w-6 hidden dark:flex");

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  }

  useEffect(() => {
    const storedTheme = localStorage.getItem(Themes.theme) || Themes.dark
    setDarkMode(storedTheme == Themes.dark);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(Themes.theme, Themes.dark);
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(Themes.theme, Themes.light);
    }
  }, [darkMode]);

  return (
    <button onClick={toggleTheme} className={buttonStyle}>
      <SunIcon id="themeLightIcon" className={darkIconClass} />
      <MoonIcon id="themeDarkIcon" className={lightIconClass} />
    </button>
  )
}
