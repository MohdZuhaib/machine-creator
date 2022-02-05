import { useState } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Box,
  MobileStepper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  AddMachineDetails,
  AddMachineSteps,
} from "../../components/AddMachine/AddMachineDetails";
import { validationSchema } from "../../components/AddMachine/Schema";
import { createMachine } from "../../utils/helper/createMachine";
import { useFormik } from "formik";
//import CircularProgress from "@mui/material/CircularProgress";

const useStyles = makeStyles({
  dialog: {
    width: "20vw",
    borderRadius: 22,
    backgroundColor: "#171727",
    color: "#ffff !important",
  },
  actions: {
    backgroundColor: "#171727",
  },
  input: {
    marginTop: "5px",
    marginBottom: "15px",
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "rgba(25, 118, 210, 0.5) !important",
    color: "#ffff",
  },
  root: {
    "MuiOutlinedInput-input": {
      color: "#ffff",
    },
  },
  formMargin: {
    marginTop: "11px !important",
    marginBottom: "5px !important",
  },
});

const CustomDailog = ({ open, handleClose }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = (values) => {
    if (values.name === "" || values.url === "" || values.description === "") {
      return;
    } else setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      url: "",
      description: "",
      steps: [{ title: "", description: "" }],
    },
    validationSchema,
    onSubmit: (values) => {
      activeStep === maxSteps - 1
        ? createMachine(values, handleClose, setActiveStep)
        : handleNext(values);
    },
  });

  const handleChange = formik.handleChange;
  const steps = [
    <AddMachineDetails
      handleChange={handleChange}
      classes={classes}
      formik={formik}
    />,
    <AddMachineSteps
      handleChange={handleChange}
      classes={classes}
      formik={formik}
    />,
  ];
  const maxSteps = steps.length;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      // sx={{ backgroundColor: "#171727", color: "#ffff" }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent className={classes.dialog}>
        {/* <Typography variant="h4"> Add a new machine</Typography> */}

        <form onSubmit={formik.handleSubmit}>
          <Box className={classes.contentContainer}>{steps[activeStep]}</Box>
          <MobileStepper
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            sx={{ marginTop: "10px" }}
            nextButton={
              <Button
                size="small"
                variant="contained"
                type="submit"
                // disabled={activeStep === maxSteps - 1}
              >
                {activeStep === maxSteps - 1 ? "ADD" : "NEXT"}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                Back
              </Button>
            }
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDailog;
