// import { useMemo, useState } from "react";
import Router from "./routes";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect } from "react";
import { connect } from "react-redux";
import { startLogin,
  authenticateUser } from "./actions/auth";

import jwtDecode from "jwt-decode";

function App(props) {
  useEffect(()=>{

     const token=localStorage.getItem("token");
    console.log("token",token);
    if(token){
      const user = jwtDecode(token);

      console.log('user', user);
      props.dispatch(authenticateUser(user))

    }
    // else{
    //   console.log("not the token");
    // }


  },[])
  const {auth}=props
  console.log("fulluser",auth.user,auth.isLoggedin);
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
    // </ColorModeContext.Provider>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(App);
