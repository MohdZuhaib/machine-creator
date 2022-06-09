import { useState, useEffect, useMemo } from "react";
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
  SwipeableDrawer,
  Dialog,
  DialogContent,
  Link,
  Card,
  CardContent,
  DialogActions,
} from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import * as React from "react";
import { makeStyles, useTheme } from "@mui/styles";
import { FiberManualRecord } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  OpenInNew,
  Menu,
} from "@mui/icons-material";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiConfig from "../../config/ApiConfig";
import congratulations from "../../assets/congratulations.jpeg";

const useStyles = makeStyles({
  container: {
    backgroundColor: "#0D0D20",
    minHeight: "100vh",
    position: "relative",
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
  fullScreen: {
    left: 0,
    right: 0,
    top: 0,
    position: "absolute",
    height: "100%",
    paddingTop: "0 !important",
  },
  stepsHandleContainer: {
    height: "5%",
    p: 0,
  },
});
const LeftPanel = ({
  steps,
  activeStep,
  classes,
  checkAnswer,
  storeAnswer,
  maxSteps,
  handleNext,
  validated,
  theme,
  handleBack,
  renderLabel,
}) => (
  <>
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
    <Box className={classes.contentContainer} sx={{ position: "relative" }}>
      <Typography variant="body1">{steps[activeStep]?.description}</Typography>
      <Box>
        <Typography variant="h4">Question</Typography>
        <Typography variant="body1">{steps[activeStep]?.question}</Typography>
      </Box>

      {steps[activeStep]?.options.length ? (
        <FormControl component="fieldset">
          <FormGroup>
            {steps[activeStep]?.options?.map((option) => (
              <>{renderLabel(option)}</>
            ))}
          </FormGroup>
        </FormControl>
      ) : (
        <TextField
          variant="filled"
          sx={{
            backgroundColor: "#939393",
            borderRadius: "4px",
            mt: 1,
          }}
          onChange={storeAnswer}
        />
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => checkAnswer(steps[activeStep]?._id)}
        sx={{
          position: "absolute",
          bottom: "5px",
          right: "25px",
        }}
      >
        Validate
      </Button>
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
          disabled={activeStep === maxSteps - 1 || !validated}
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
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
    />
  </>
);
const DetailView = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
  const url = location?.state?.url;
  const extLink = location?.state?.extLink;
  const machineName = location?.state?.machineName;
  const traffic = location?.state?.traffic;
  console.log("location", location);
  // const steps = location.state.steps;
  const machineId = location?.state?.id;

  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [options, setOptions] = useState([]);
  const [Mcq, setMcq] = useState(false);
  console.log("url", url);
  // For MUI Tabs
  const [checked, setChecked] = useState(true);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };
  const [tabValue, setTabValue] = useState(1);

  const closeCongrats = () => {
    setCongrats(false);
  };
  // let steps = [];
  const getSteps = async () => {
    const stepsResponse = await Axios.get(
      `${ApiConfig.steps.getSteps}/${machineId}`
    );
    setSteps(stepsResponse.data.data);
    // debugger;
    stepsResponse.data.data[activeStep]?.options.length
      ? setMcq(true)
      : setMcq(false);
    // steps = stepsResponse.data.data;
    console.log("Steps Fetched", stepsResponse.data.data);
  };
  // const steps = ["name"];
  const [oneAnswer, setOne] = useState();
  const [validated, setValidated] = useState();
  // const [isFull, setFull] = useState(false);
  const [hide, setHide] = useState(false);
  const [trafficView, setTraffic] = useState();
  const [drawerOpen, setDrawer] = useState(false);
  const [congrats, setCongrats] = useState(false);
  const [start, setStart] = useState(false);
  // const handleFull = () => {
  //   isFull && setHide(false);
  //   setFull(!isFull);
  // };
  const storeAnswer = (e) => {
    setOne(e.target.value);
  };
  const openDrawer = () => {
    setDrawer(true);
  };
  const closeDrawer = () => {
    setDrawer(false);
  };
  const handleTabChange = (event, newValue) => {
    setTraffic(false);
    setTabValue(newValue);
  };
  const maxSteps = steps.length;
  const checkAnswer = async (id) => {
    // options
    console.log("options", options);
    options.sort();
    let data = "";
    Mcq ? (data = options.toString()) : (data = oneAnswer);

    console.log("Data to send", options);

    try {
      const checkAnswer = await Axios.post(
        `${ApiConfig.steps.checkAnswer}/${id}`,
        {
          isMcq: Mcq,
          answer: data,
        }
      );
      console.log("Answer checked", checkAnswer);
      if (checkAnswer.data.success) {
        setValidated(true);
        toast.success(checkAnswer.data.message);
        activeStep === maxSteps - 1 && setCongrats(true);
      } else {
        toast.error(checkAnswer.data.message);
      }
    } catch (err) {
      console.log("api error", err.response);
      toast.error(err.response.data.message);
    }
  };
  const handleNext = () => {
    console.log("Options", options);
    setValidated(false);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    steps[activeStep + 1]?.options.length ? setMcq(true) : setMcq(false);
  };

  const handleBack = () => {
    steps[activeStep - 1]?.options.length ? setMcq(true) : setMcq(false);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleOptionChange = (event) => {
    // setOptions({ ...options,options.push [event.target.name]: event.target.checked });
    if (!options.includes(event.target.name)) {
      setOptions((prevOptions) => [...prevOptions, event.target.name]);
    } else {
      const reNumberIndex = options.indexOf(event.target.name);
      options.splice(reNumberIndex, 1);
      setOptions(options);
    }

    console.log("options", options);
  };
  useEffect(async () => {
    getSteps();
    console.log("Effect  called");
  }, [Mcq, drawerOpen, trafficView]);

  // const handleHover = (e) => {
  //   if (isFull) {
  //     if (e.pageY < 10) {
  //       setHide(false);
  //       // setTimeout(setHide(true),3000)
  //     }
  //   }

  //   // ssetHide(true);
  //   // setTimeout(setHide(true), 300);
  // };

  const onLeave = () => {
    setHide(true);
  };
  const toggleTraffic = (event, action, index) => {
    console.log("Index", index);
    action === "start"
      ? setStart({ ...start, [event.target.name]: true })
      : setStart({ ...start, [event.target.name]: false });
  };

  const showTraffic = () => {
    setTraffic(true);
  };
  const hideTraffic = () => {
    setTraffic(false);
  };
  const renderLabel = (obj) => {
    for (var key in obj) {
      return (
        <FormControlLabel
          control={
            <Checkbox
              // checked={options[options.indexOf(key)]}
              onChange={handleOptionChange}
              name={key}
            />
          }
          label={obj[key]}
        />
      );
    }
  };

  // const RenderFrame = useMemo(
  //   (link, dummy) => {
  //     console.log(dummy, "Static");
  //     return (
  //       <iframe
  //         // width: 100vw;
  //         // position: absolute;
  //         // left: 0;
  //         // top: 0;
  //         // height: 100vh;
  //         deny
  //         src={link}
  //         title="Virtual lab"
  //         width="100%"
  //         height="100%"
  //       ></iframe>
  //     );
  //   },

  //   []
  // );
  console.log("activeUrl", url[tabValue - 1]);
  return (
    // <h2>Detrail view</h2>
    <Box className={classes.container}>
      <Box p={2} pl={3}>
        {" "}
        <Typography variant="h3" color="white">
          {machineName}
        </Typography>
      </Box>
      <Box mt={7} mx={3}>
        <Grid container className={classes.descriptionContainer} spacing={4}>
          <Grid item xs={0} md={4} className={classes.contents}>
            <LeftPanel
              steps={steps}
              activeStep={activeStep}
              classes={classes}
              renderLabel={renderLabel}
              checkAnswer={checkAnswer}
              storeAnswer={storeAnswer}
              maxSteps={maxSteps}
              handleNext={handleNext}
              validated={validated}
              theme={theme}
              handleBack={handleBack}
            />
          </Grid>
          <Grid
            item
            xs={12}
            // md={isFull ? 12 : 8}
            md={8}
            className={classes.contents}
            // className={isFull ? classes.fullScreen : classes.contents}
            sx={{ backgroundColor: "secondary.main" }}
            // onMouseEnter={isFull && handleHover}
            // sx={
            //   isFull
            //     ? {
            //         left: 0,
            //         right: 0,
            //         top: 0,
            //         position: "absolute",
            //         height: "100%",
            //         width: "100vw",
            //         paddingTop: 0,
            //       }
            //     : {
            //         height: "57vh",
            //       }
            // }
          >
            <TabContext value={tabValue}>
              <Box
                // sx={{ borderBottom: 1, borderColor: "divider" }}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={hide && { display: "none" }}
                // onMouseLeave={isFull && onLeave}
              >
                <Box display="flex" alignItems="center">
                  {/* {traffic.length > 0 &&
                    traffic.map((obj) => (
                      <>
                        <Typography variant="h1" color="#fff">
                          {obj.trafficProfile}
                        </Typography>
                      </>
                    ))} */}
                  {/* <Button onClick={openDrawer}>{isFull && <Menu />}</Button> */}
                  <TabList
                    onChange={handleTabChange}
                    onClick={hideTraffic}
                    aria-label="lab API tabs example"
                    textColor="primary.light"
                    indicatorColor="#ffff"
                  >
                    {url.length !== 0 ? (
                      url.map((obj, index) => (
                        <Tab key={index} label={obj.name} value={index + 1} />
                      ))
                    ) : (
                      <Typography variant="h1">Nothing to show</Typography>
                    )}
                  </TabList>
                  {extLink?.map((link) => (
                    <Link
                      href={link.url}
                      target="_blank"
                      sx={{ textDecoration: "none" }}
                    >
                      <Button>{link.name}</Button>
                    </Link>
                  ))}
                  {traffic?.length > 0 && (
                    <>
                      <Button color="primary" onClick={showTraffic}>
                        Traffic
                      </Button>
                    </>
                  )}
                </Box>

                <Box textAlign="end">
                  <Link href={url[tabValue - 1].link} target="_blank">
                    {/* <Button onClick={handleFull}> */}
                    <OpenInNew />
                  </Link>
                  {/* </Button> */}
                </Box>
              </Box>

              {url.length !== 0 ? (
                url?.map((obj, index) => (
                  <>
                    {/* <TabPanel
                    key={index}
                    value={index + 1}
                    sx={{ height: "91%" }}
                  >
                    {/* {/* {tabValue===index?} */}
                    {trafficView ? (
                      traffic.length > 0 && (
                        <Card
                          sx={{
                            // display: "flex",
                            alignItems: "center",
                            height: "95%",
                            pl: 2,
                            mt: 2,
                            bgcolor: "#171727",
                            color: "#fff",
                            borderTopRightRadius: "13px",
                            borderTopLeftRadius: "13px",
                          }}
                        >
                          <CardContent>
                            <Grid container spacing={2}>
                              {traffic.map((obj, index) => (
                                <Grid item xs={12} md={6}>
                                  <Card
                                    sx={{ bgcolor: "#ebedee", height: "170px" }}
                                  >
                                    <CardContent sx={{ height: "100%" }}>
                                      <Box
                                        display="flex"
                                        justifyContent="space-between"
                                      >
                                        <Typography variant="h5">
                                          {obj.trafficProfile}
                                        </Typography>
                                        <FiberManualRecord
                                          fontSize="12px"
                                          color={
                                            start.index ? "success" : "error"
                                          }
                                        />
                                      </Box>

                                      <Typography
                                        variant="body1"
                                        sx={{ height: "43%" }}
                                      >
                                        {obj.description}
                                      </Typography>
                                      <Box
                                        display="flex"
                                        justifyContent="space-between"
                                      >
                                        <Button
                                          onClick={(event) =>
                                            toggleTraffic(event, "start", index)
                                          }
                                          variant="contained"
                                          name={index}
                                        >
                                          Start
                                        </Button>
                                        <Button
                                          variant="contained"
                                          color="error"
                                          name={index}
                                          onClick={(event) =>
                                            toggleTraffic(event, "stop", index)
                                          }
                                        >
                                          Stop
                                        </Button>
                                      </Box>
                                    </CardContent>
                                  </Card>
                                </Grid>
                              ))}
                            </Grid>
                          </CardContent>
                        </Card>
                      )
                    ) : (
                      <iframe
                        // width: 100vw;
                        // position: absolute;
                        // left: 0;
                        // top: 0;
                        // height: 100vh;
                        deny
                        src={obj.link}
                        title="Virtual lab"
                        style={{ display: tabValue === index + 1 || "none" }}
                        width="100%"
                        height="100%"
                      ></iframe>
                    )}

                    {/* </TabPanel> */}
                  </>
                ))
              ) : (
                <Typography variant="h1">Nothing to show</Typography>
              )}
            </TabContext>
          </Grid>
        </Grid>

        <SwipeableDrawer
          anchor="left"
          open={drawerOpen}
          onClose={closeDrawer}
          onOpen={openDrawer}
          PaperProps={{
            sx: { width: 500 },
          }}
        >
          <LeftPanel
            steps={steps}
            activeStep={activeStep}
            classes={classes}
            renderLabel={renderLabel}
            checkAnswer={checkAnswer}
            storeAnswer={storeAnswer}
            maxSteps={maxSteps}
            handleNext={handleNext}
            validated={validated}
            theme={theme}
            handleBack={handleBack}
          />
        </SwipeableDrawer>
      </Box>

      <ToastContainer />
      <Dialog open={congrats}>
        <DialogContent onClose={closeCongrats} sx={{ p: 0 }}>
          <Box>
            {" "}
            <img
              src={congratulations}
              alt="congrats"
              width="100%"
              height="100%"
            />
          </Box>

          <Box textAlign="end" sx={{ backgroundColor: "secondary.main" }} p={1}>
            {" "}
            <Button onClick={closeCongrats} variant="contained">
              Ok
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DetailView;
