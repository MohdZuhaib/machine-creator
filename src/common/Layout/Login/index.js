import { Outlet } from "react-router-dom";
import { Grid, Box, Typography } from "@mui/material";
import "./index.css";

const LoginLayout = () => (
  <>
    <Grid container className="authLayout-wrapper">
      <Grid item sm={6} className="static-container">
        <Box className="overlay" />
        <Box
          className="auth-left-top"
          display="flex"
          justifyContent="center"
          flexDirection="column"
          pl={10}
        >
          <Typography
            display="block"
            variant="h3"
            sx={{ letterSpacing: "0.15em" }}
          >
            Welcome to{" "}
          </Typography>
          <Box display="flex">
            {" "}
            <Typography
              component="h1"
              variant="h2"
              sx={{ fontSize: "6rem", letterSpacing: "0.15em" }}
            >
              Cyber
            </Typography>
            <Typography
              component="h1"
              variant="h2"
              sx={{
                fontSize: "6rem",
                letterSpacing: "0.15em",
                marginLeft: "35px",
                fontWeight: "200 !important",
              }}
            >
              Storm
            </Typography>
          </Box>
        </Box>
        <Box className="auth-left-bottom" />
      </Grid>
      <Grid item sm={6} xs={12} className="right">
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  </>
);

export default LoginLayout;
