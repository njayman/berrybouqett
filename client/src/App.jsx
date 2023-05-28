import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "@theme";

import { AuthProvider } from "react-auth-kit";
import Router from "./Router";
// import Admin from "scenes/admin";
// import Performance from "scenes/performance";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider authType={"localstorage"} authName={"_auth"}>
          <Router />
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
