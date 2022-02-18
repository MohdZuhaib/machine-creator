import { useMemo, useState } from "react";
import Router from "./routes";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Button} from "@mui/material";
// import { useEffect } from "react";
// import jwtDecode from "jwt-decode";
import getDesignTokens from "./Theme/Theme";
// import ColorModeContext from './Theme/context'
// import toggleColorMode from './Theme/toggleMode'
function App() {
  const [mode, setMode] = useState("dark");
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };
  // const colorMode = useMemo(
  //   () => ({
  //     // The dark mode switch would invoke this method

  //   }),
  //   []
  // );
  // useEffect(()=>{
  //   let user=jwtDecode(localStorage.getItem("token"));
  //   console.log("booom user",user);

  // },[])
  // const theme = createTheme({
  //   palette: {
  //     mode:'dark',
  //     secondary: {
  //       main: "#0D0D20",
  //       light: "#171727",
  //       contrastText: "#ffff",
  //     },
  //   },
  //   components: {
  //     MuiFormHelperText: {
  //       styleOverrides: {
  //         root: {
  //           marginLeft: "3px",
  //           color: "#ff7d56 !important",
  //         },
  //       },
  //     },
  //     MuiMenu: {
  //       styleOverrides: {
  //         paper: {
  //           backgroundColor: "#ffff !important",
  //         },
  //       },
  //     },
  //     MuiMobileStepper: {
  //       styleOverrides: {
  //         root: {
  //           color: "#fff",
  //           paddingTop: 0,
  //           paddingBottom: 0,
  //           background: "#171727",
  //           borderBottomRightRadius: "13px",
  //           borderBottomLeftRadius: "13px",
  //         },
  //       },
  //     },
  //     MuiButton: {
  //       styleOverrides: {
  //         containedPrimary: {
  //           fontWeight: "bold",
  //           letterSpacing: "2px",
  //         },
  //       },
  //     },
  //     MuiTab: {
  //       styleOverrides: {
  //         root: {
  //           color: "#ffff !important",
  //           "&.Mui-selected": {
  //             color: "#1976d2 !important",
  //           },
  //         },
  //       },
  //     },
  //     MuiTabs: {
  //       styleOverrides: {
  //         indicator: {
  //           backgroundColor: "#1976d2",
  //         },
  //       },
  //     },
  //     MuiPaper: {
  //       styleOverrides: {
  //         root: {
  //           backgroundColor: "#0000",
  //         },
  //       },
  //     },
  //   },
  // });
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return (
    // <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <div className="App">
        <Button variant="contained" onClick={toggleColorMode}>
          Mode
        </Button>
        <Router />
      </div>
    </ThemeProvider>
    // </ColorModeContext.Provider>
  );
}

export default App;
