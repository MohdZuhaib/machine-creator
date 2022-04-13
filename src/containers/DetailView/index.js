import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  Tab,
  MobileStepper,
  Checkbox,
  TextField,
  FormControl,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import * as React from "react";
import { makeStyles, useTheme } from "@mui/styles";
import { useLocation } from "react-router-dom";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Axios from "axios";
import ApiConfig from "../../config/ApiConfig";

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
  contents: {
    height: "70vh",
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
  console.log("url", url);
  // const steps = location.state.steps;
  const machineId = location.state.id;

  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [options, setOptions] = useState([]);
  console.log("Stepss", steps);
  // For MUI Tabs
  const [checked, setChecked] = useState(true);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };
  const [tabValue, setTabValue] = useState(1);
  const handleTabChange = (event, newValue) => {
    console.log("tab event", event);
    console.log("tab value", newValue);
    setTabValue(newValue);
  };

  // let steps = [];
  const getSteps = async () => {
    const stepsResponse = await Axios.get(
      `${ApiConfig.steps.getSteps}/${machineId}`
    );
    setSteps(stepsResponse.data.data);
    // steps = stepsResponse.data.data;
    console.log("Steps Fetched", stepsResponse.data.data);
  };
  // const steps = ["name"];
  const maxSteps = steps.length;

  const handleNext = () => {
    console.log("Options", options);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleOptionChange = (event) => {
    // setOptions({ ...options,options.push [event.target.name]: event.target.checked });
    setOptions((prevOptions) => [...prevOptions, event.target.name]);
  };
  useEffect(() => {
   
    getSteps();
  }, []);
  return (
    // <h2>Detrail view</h2>
    <Box className={classes.container}>
      <Box p={2} pl={3}>
        {" "}
        <Typography variant="h3" color="white">
          Threat debugging
        </Typography>
      </Box>

      <Box mt={7} mx={3}>
        <Grid container className={classes.descriptionContainer} spacing={4}>
          <Grid item xs={0} md={4} className={classes.contents}>
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
              <Typography variant="h5">{steps[activeStep]?.title}</Typography>
            </Paper>
            <Box className={classes.contentContainer}>
              <Typography variant="body1">
                {steps[activeStep]?.description}
              </Typography>
              <Typography variant="body1">
                {steps[activeStep]?.question}
              </Typography>
              {steps[activeStep]?.options.length ? (
                <FormControl component="fieldset">
                  <FormGroup>
                    {["option1", "option2", "option3", "option4"].map(
                      (item) => (
                        <>
                          {/* <Checkbox
                      checked={checked}
                      onChange={handleCheck}
                      inputProps={{ "aria-label": "controlled" }}
                      // label={steps[activeStep]?.options[0][`option${item + 1}`]}
                      label="step1"
                    />
                    {steps[activeStep]?.options[0][`option${item + 1}`]} */}

                          <FormControlLabel
                            control={
                              <Checkbox
                                // checked={chocolate}
                                onChange={handleOptionChange}
                                // name={`${item}`}
                                name={steps[activeStep]?.options[0][item]}
                              />
                            }
                            label={steps[activeStep]?.options[0][item]}
                            // label={
                            //   steps[activeStep]?.options[0][
                            //     `option${index + 1}`
                            //   ]
                            // }
                          />
                        </>
                      )
                    )}
                  </FormGroup>
                </FormControl>
              ) : (
                <TextField />
              )}
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
          <Grid item xs={12} md={8} className={classes.contents}>
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleTabChange}
                  aria-label="lab API tabs example"
                  textColor="primary"
                  indicatorColor="#ffff"
                >
                  {url.map((obj, index) => (
                    <Tab key={index} label={obj.name} value={index + 1} />
                  ))}
                </TabList>
              </Box>
              {url.map((obj, index) => (
                <TabPanel key={index} value={index + 1} sx={{ height: "91%" }}>
                  <iframe
                    src={obj.link}
                    title="Virtual lab"
                    width="100%"
                    height="100%"
                  ></iframe>
                </TabPanel>
              ))}
            </TabContext>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DetailView;
