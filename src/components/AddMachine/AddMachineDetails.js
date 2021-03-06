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
  Divider,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
const fetchUrl = (e, formik, index, ext) => {
  if (ext === "ext") {
    formik.values.extLink[index] = {
      ...formik.values.extLink[index],
      [e.target.name]: e.target.value,
    };
  } else if (ext === "url") {
    formik.values.url[index] = {
      ...formik.values.url[index],
      [e.target.name]: e.target.value,
    };
  } else if (ext === "traffic") {
    formik.values.traffic[index] = {
      ...formik.values.traffic[index],
      [e.target.name]: e.target.value,
    };
  }
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
      <Typography variant="body1">A</Typography>
      <TextField
        name="a"
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
      <Typography variant="body1">B</Typography>
      <TextField
        name="b"
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
      <Typography variant="body1">C</Typography>
      <TextField
        name="c"
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
      <Typography variant="body1">D</Typography>
      <TextField
        name="d"
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
  const [extLink, setExt] = useState([]);
  const [traffic, setTraffic] = useState([]);

  function validateMachineName(value) {
    let error;
    if (value === "") {
      error = "Enter Machine Name";
    }
    return error;
  }
  const deleteLinks = (e, params) => {
    if (params) {
      extLink.pop();
      setExt([...extLink]);
    } else {
      links.pop();
      setLinks([...links]);
    }
  };
  return (
    <>
      <Typography variant="h3">Lab</Typography>
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

      {extLink.map((link, index) => (
        <>
          <Typography variant="h5" className={classes.formMargin}>
            External Links {index + 1}
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
            onChange={(e) => fetchUrl(e, formik, index, "ext")}
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
            Url
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            name="url"
            sx={{ color: "#ffff" }}
            onChange={(e) => fetchUrl(e, formik, index, "ext")}
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
          {index > 0 && index === extLink.length - 1 ? (
            <Button onClick={(e) => deleteLinks(e, "ext")}>remove</Button>
          ) : null}
        </>
      ))}

      {traffic.map((traff, index) => (
        <>
          <Typography variant="h5">Traffic Generator</Typography>
          <Divider />
          <Typography variant="h5" className={classes.formMargin}>
            Profile Name
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            name="trafficProfile"
            // validate={validateMachineName}s
            sx={{ color: "#ffff" }}
            onChange={(e) => fetchUrl(e, formik, index, "traffic")}
            className={classes.input}
            InputProps={{
              className: classes.input,
              classes: {
                notchedOutline: classes.notchedOutline,
                root: classes.root,
              },
            }}
            // error={formik.touched.url && Boolean(formik.errors.url)}
            // helperText={formik.touched.url && formik.errors.url}
          />
          <Typography variant="h5" className={classes.formMargin}>
            Description
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            name="description"
            // validate={validateMachineName}s
            sx={{ color: "#ffff" }}
            onChange={(e) => fetchUrl(e, formik, index, "traffic")}
            className={classes.input}
            InputProps={{
              className: classes.input,
              classes: {
                notchedOutline: classes.notchedOutline,
                root: classes.root,
              },
            }}
          />
          <Typography variant="h5" className={classes.formMargin}>
            Ping
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            name="ping"
            sx={{ color: "#ffff" }}
            onChange={(e) => fetchUrl(e, formik, index, "traffic")}
            className={classes.input}
            InputProps={{
              className: classes.input,
              classes: {
                notchedOutline: classes.notchedOutline,
                root: classes.root,
              },
            }}
          />
        </>
      ))}
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setTraffic([...traffic, `Link ${traffic.length + 1}`])}
      >
        <AddCircleOutlineIcon sx={{ marginRight: "5px" }} /> Traffic Generator
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setExt([...extLink, `Link ${extLink.length + 1}`])}
      >
        <AddCircleOutlineIcon sx={{ marginRight: "5px" }} /> External Link
      </Button>

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
            validate={validateMachineName}
            sx={{ color: "#ffff" }}
            onChange={(e) => fetchUrl(e, formik, index, "url")}
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
          {/* {formik.errors.url && formik.touched.url && <div>{formik.errors.url}</div>} */}
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
        ...formik.values.steps[index].options,
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
          {answerType[index] === "mcq" ? (
            <>
              <Mcq
                classes={classes}
                handleOptions={handleOptions}
                index={index}
              />
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
                name="optionsAns"
                onChange={(e) => fetchSteps(e, formik, index)}
              />
            </>
          ) : (
            <>
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
            </>
          )}

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
