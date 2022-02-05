import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  MobileStepper,
} from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import { useLocation } from "react-router-dom";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

const useStyles = makeStyles({
  container: {
    backgroundColor: "#0D0D20",
    minHeight: "100vh",
  },

  descriptionContainer: {
    minHeight: "80vh",
  },
  titleContainer: {
    height: "5%",
  },
  contentContainer: {
    height: "90%",
    paddingLeft: 16,
    paddingRight: 10,
    paddingBottom: 10,
    backgroundColor: "#171727",
    color: "#fff",
  },
  stepsHandleContainer: {
    height: "5%",
    p: 0,
  },
});
const DetailView = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
  const url = location.state.url;
  const steps = location.state.steps;

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box className={classes.container}>
      <Box p={2} pl={3}>
        {" "}
        <Typography variant="h3" color="white">
          Threat debugging
        </Typography>
      </Box>

      <Box mt={7} mx={3}>
        <Grid container className={classes.descriptionContainer} spacing={4}>
          <Grid item xs={0} md={4}>
            <Paper
              square
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                height: 50,
                pl: 2,
                bgcolor: "#171727",
                color: "#fff",
                borderTopRightRadius: "13px",
                borderTopLeftRadius: "13px",
              }}
            >
              <Typography variant="h5">{steps[activeStep].title}</Typography>
            </Paper>
            <Box className={classes.contentContainer}>
              {steps[activeStep].description}
            </Box>
            <MobileStepper
              variant="text"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </Grid>
          <Grid item xs={12} md={8} className={classes.lab}>
            <iframe
              src={url}
              title="Virtual lab"
              width="100%"
              height="100%"
            ></iframe>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DetailView;
