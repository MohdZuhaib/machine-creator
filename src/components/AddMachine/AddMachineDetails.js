import { useState } from "react";
import { Typography, TextField, Box, Button } from "@mui/material";

export const AddMachineDetails = ({ classes, formik }) => (
  <>
    <Typography variant="h5" className={classes.formMargin}>
      {" "}
      Name
    </Typography>
    <TextField
      variant="outlined"
      size="small"
      fullWidth
      name="name"
      className={classes.input}
      InputProps={{
        classes: {
          notchedOutline: classes.notchedOutline,
          root: classes.root,
        },
      }}
      value={formik.values.name}
      onChange={formik.handleChange}
      error={formik.touched.name && Boolean(formik.errors.name)}
      helperText={formik.touched.name && formik.errors.name}
    />
    <Typography variant="h5" className={classes.formMargin}>
      {" "}
      URL
    </Typography>
    <TextField
      variant="outlined"
      size="small"
      fullWidth
      name="url"
      className={classes.input}
      InputProps={{
        classes: {
          notchedOutline: classes.notchedOutline,
        },
      }}
      value={formik.values.url}
      onChange={formik.handleChange}
      error={formik.touched.url && Boolean(formik.errors.url)}
      helperText={formik.touched.url && formik.errors.url}
    />
    <Typography variant="h5" className={classes.formMargin}>
      {" "}
      Description
    </Typography>
    <TextField
      variant="outlined"
      multiline
      name="description"
      minRows="4"
      fullWidth
      className={classes.input}
      InputProps={{
        classes: {
          notchedOutline: classes.notchedOutline,
        },
      }}
      value={formik.values.description}
      onChange={formik.handleChange}
      error={formik.touched.description && Boolean(formik.errors.description)}
      helperText={formik.touched.description && formik.errors.description}
    />
  </>
);

const fetchStepsField = (e, formik, index) =>
  (formik.values.steps[index] = {
    ...formik.values.steps[index],
    [e.target.name]: e.target.value,
  });

export const AddMachineSteps = ({ classes, formik }) => {
  const [steps, setSteps] = useState([]);

  const deleteStep = () => {
    steps.pop();
    setSteps([...steps]);
  };
  return (
    <>
      <Typography variant="h4">Add steps</Typography>
      {steps.map((step, index) => (
        <Box key={index} py={2}>
          <Typography variant="h5">{step}</Typography>
          <Typography sx={{ marginTop: "10px", marginBottom: "5px" }}>
            Title
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            className={classes.input}
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
            name="title"
            onChange={(e) => fetchStepsField(e, formik, index)}
          />
          <Typography sx={{ marginTop: "10px", marginBottom: "5px" }}>
            Desc
          </Typography>
          <TextField
            variant="outlined"
            multiline
            fullWidth
            minRows={4}
            className={classes.input}
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
            name="description"
            onChange={(e) => fetchStepsField(e, formik, index)}
          />
          {index > 0 && index === steps.length - 1 ? (
            <Button onClick={deleteStep}>remove</Button>
          ) : null}
        </Box>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setSteps([...steps, `Step ${steps.length + 1}`])}
      >
        ADD
      </Button>
    </>
  );
};
