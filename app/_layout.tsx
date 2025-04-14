import UniversalAdd from "@/components/UniversalAdd";
import { createTheme, ThemeProvider } from "@rneui/themed";
import { Stack } from "expo-router";

export default function RootLayout() {
  const theme = createTheme({
    lightColors: {
      primary: 'orange',
    },
    darkColors: {
      primary: 'blue',
    },
    components: {
      Button: {
        raised: true,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Stack />
      <UniversalAdd />
    </ThemeProvider>
  );
}
