import Router from "./routes";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";

function App() {
  // useEffect(()=>{
  //   let user=jwtDecode(localStorage.getItem("token"));
  //   console.log("booom user",user);

  // },[])
  const theme = createTheme({
    palette: {
      secondary: {
        main: "#0D0D20",
        light: "#171727",
        contrastText: "#ffff",
      },
    },
    components: {
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            marginLeft: "3px",
            color: "#ff7d56 !important",
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: "#ffff !important",
          },
        },
      },
      MuiMobileStepper: {
        styleOverrides: {
          root: {
            color: "#fff",
            paddingTop: 0,
            paddingBottom: 0,
            background: "#171727",
            borderBottomRightRadius: "13px",
            borderBottomLeftRadius: "13px",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          containedPrimary: {
            fontWeight: "bold",
            letterSpacing: "2px",
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            color: "#ffff !important",
            "&.Mui-selected": {
              color: "#1976d2 !important",
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: {
            backgroundColor: "#1976d2",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: "#0000",
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router />
      </div>
    </ThemeProvider>
  );
}

export default App;
