import Homepage from "./containers/Home";
import DetailView from "./containers/Detail-view";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: { color: "#ffff" },
        },
      },
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

    palette: {
      secondary: {
        main: "#0D0D20",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/detail-view" element={<DetailView />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
