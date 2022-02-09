import Router from "./routes";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
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
