import { useState } from "react";
import {
  Typography,
  TextField,
  Grid,
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
const fetchUrl = (e, formik, index) => {
  formik.values.url[index] = {
    ...formik.values.url[index],
    [e.target.name]: e.target.value,
  };
};

const fetchSteps = (e, formik, index) =>
  (formik.values.steps[index] = {
    ...formik.values.steps[index],
    [e.target.name]: e.target.value,
  });

const Mcq = ({ handleOptions, classes, index }) => (
  <Grid container spacing={2}>
    <Grid item md={12}>
      <Typography varuant="h2">Options</Typography>
    </Grid>
    <Grid item xs={12} md={6}>
      <Typography variant="body1">Option 1</Typography>
      <TextField
        name="option1"
        onChange={(event) => handleOptions(index, event)}
        className={classes.input}
        InputProps={{
          className: classes.input,
          classes: {
            notchedOutline: classes.notchedOutline,
            root: classes.root,
          },
        }}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <Typography variant="body1">Option 2</Typography>
      <TextField
        name="option2"
        onChange={(event) => handleOptions(index, event)}
        className={classes.input}
        InputProps={{
          className: classes.input,
          classes: {
            notchedOutline: classes.notchedOutline,
            root: classes.root,
          },
        }}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <Typography variant="body1">Option 3</Typography>
      <TextField
        name="option3"
        onChange={(event) => handleOptions(index, event)}
        className={classes.input}
        InputProps={{
          className: classes.input,
          classes: {
            notchedOutline: classes.notchedOutline,
            root: classes.root,
          },
        }}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <Typography variant="body1">Option 4</Typography>
      <TextField
        name="option4"
        onChange={(event) => handleOptions(index, event)}
        className={classes.input}
        InputProps={{
          className: classes.input,
          classes: {
            notchedOutline: classes.notchedOutline,
            root: classes.root,
          },
        }}
      />
    </Grid>
  </Grid>
);
export const AddMachineDetails = ({ classes, formik }) => {
  const [links, setLinks] = useState([]);

  const deleteLinks = () => {
    links.pop();
    setLinks([...links]);
  };
  return (
    <>
      <Typography variant="h3">Lab </Typography>
      <Typography variant="h5" className={classes.formMargin}>
        {" "}
        Name
      </Typography>
      <TextField
        variant="outlined"
        size="small"
        fullWidth
        name="name"
        InputProps={{
          className: classes.input,
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
          className: classes.input,
          classes: {
            notchedOutline: classes.notchedOutline,
            root: classes.root,
          },
        }}
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />

      {links.map((link, index) => (
        <Box key={index} py={2}>
          <Typography variant="h5" className={classes.formMargin}>
            <strong> {link}</strong>
          </Typography>
          <Typography variant="h5" className={classes.formMargin}>
            Name
          </Typography>

          <TextField
            variant="outlined"
            size="small"
            fullWidth
            name="name"
            sx={{ color: "#ffff" }}
            onChange={(e) => fetchUrl(e, formik, index)}
            className={classes.input}
            InputProps={{
              className: classes.input,
              classes: {
                notchedOutline: classes.notchedOutline,
                root: classes.root,
              },
            }}
            error={formik.touched.url && Boolean(formik.errors.url)}
            helperText={formik.touched.url && formik.errors.url}
          />
          <Typography variant="h5" className={classes.formMargin}>
            URL
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            name="link"
            sx={{ color: "#ffff" }}
            onChange={(e) => fetchUrl(e, formik, index)}
            className={classes.input}
            InputProps={{
              className: classes.input,
              classes: {
                notchedOutline: classes.notchedOutline,
                root: classes.root,
              },
            }}
            error={formik.touched.url && Boolean(formik.errors.url)}
            helperText={formik.touched.url && formik.errors.url}
          />

          {index > 0 && index === links.length - 1 ? (
            <Button onClick={deleteLinks}>remove</Button>
          ) : null}
        </Box>
      ))}
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setLinks([...links, `Machine ${links.length + 1}`])}
      >
        <AddCircleOutlineIcon sx={{ marginRight: "5px" }} /> Machine
      </Button>
    </>
  );
};

export const AddMachineSteps = ({ classes, formik }) => {
  const [steps, setSteps] = useState([]);
  const [answerType, setType] = useState(["sentence"]);

  const handleChange = (event, index) => {
    answerType[index] = event.target.value;
    setType([...answerType]);
  };
  const deleteStep = () => {
    steps.pop();
    setSteps([...steps]);
  };

  const handleOptions = (index, event) => {
    debugger;
    formik.values.steps[index] = {
      ...formik.values.steps[index],
      options: {
        ... formik.values.steps[index].options,
        [event.target.name]: event.target.value,
      },
    };
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
              className: classes.input,
              classes: {
                notchedOutline: classes.notchedOutline,
                root: classes.root,
              },
            }}
            name="title"
            onChange={(e) => fetchSteps(e, formik, index)}
          />
          <Typography sx={{ marginTop: "10px", marginBottom: "5px" }}>
            Description
          </Typography>
          <TextField
            variant="outlined"
            multiline
            fullWidth
            minRows={4}
            className={classes.input}
            InputProps={{
              className: classes.input,
              classes: {
                notchedOutline: classes.notchedOutline,
                root: classes.root,
              },
            }}
            name="description"
            onChange={(e) => fetchSteps(e, formik, index)}
          />
          <Typography sx={{ marginTop: "10px", marginBottom: "5px" }}>
            Question
          </Typography>

          <TextField
            variant="outlined"
            fullWidth
            className={classes.input}
            InputProps={{
              className: classes.input,
              classes: {
                notchedOutline: classes.notchedOutline,
                root: classes.root,
              },
            }}
            name="question"
            onChange={(e) => fetchSteps(e, formik, index)}
          />
          <FormControl>
            <FormLabel
              id="demo-radio-buttons-group-label"
              sx={{ color: "#ffff" }}
            >
              Answer Type
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              row
              defaultValue="sentence"
              name="radio-buttons-group"
              value={answerType[index]}
              onChange={(event) => handleChange(event, index)}
            >
              <FormControlLabel
                value="sentence"
                control={<Radio />}
                label="Sentence"
              />
              <FormControlLabel value="mcq" control={<Radio />} label="MCQ" />
            </RadioGroup>
          </FormControl>
          {answerType[index] === "mcq" && (
            <Mcq
              classes={classes}
              handleOptions={handleOptions}
              index={index}
            />
          )}
          <Typography sx={{ marginTop: "10px", marginBottom: "5px" }}>
            Answer
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            className={classes.input}
            InputProps={{
              className: classes.input,
              classes: {
                notchedOutline: classes.notchedOutline,
                root: classes.root,
              },
            }}
            name="answer"
            onChange={(e) => fetchSteps(e, formik, index)}
          />

          {index > 0 && index === steps.length - 1 ? (
            <Button onClick={deleteStep}>remove</Button>
          ) : null}
        </Box>
      ))}
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setSteps([...steps, `Step ${steps.length + 1}`])}
      >
        Add
      </Button>
    </>
  );
};
