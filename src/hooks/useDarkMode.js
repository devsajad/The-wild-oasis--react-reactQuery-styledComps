import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

export default function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (!context)
    throw new Error("Dark mode context was used outside of the provider");

  const { isDarkMode, toggleDarkMode } = context;

  return { isDarkMode, toggleDarkMode };
}
