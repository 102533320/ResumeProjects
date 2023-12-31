import { ColorSchemeName, useColorScheme as _useColorScheme } from 'react-native';
import { DarkModeContext } from '../context/DarkModeContext';
import {useContext}from "react"
// The useColorScheme value is always either light or dark, but the built-in
// type suggests that it can be null. This will not happen in practice, so this
// makes it a bit easier to work with.
export default function useColorScheme(): NonNullable<ColorSchemeName> {
  const theme = useContext(DarkModeContext);
  return theme['darkMode'] ? "dark" : "light";
}
