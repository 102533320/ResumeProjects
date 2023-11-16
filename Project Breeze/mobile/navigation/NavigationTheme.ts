import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import Colors from "../constants/Colors";
const defaultTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.light.background,
    primary: Colors.light.primary,
    text: Colors.light.text,
  },
};
const darkTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    background: Colors.dark.background,
    primary: Colors.dark.primary,
    text: Colors.dark.text,
  },
};

export default { lightTheme: defaultTheme, darkTheme };
