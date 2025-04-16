import React from 'react';
import Navigation from './Navigation';
import { createTheme, ThemeProvider } from "@rneui/themed";


export default function App() {
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
      <Navigation />
    </ThemeProvider>
  );
}
