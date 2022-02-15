import { useEffect, useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import jwtDecode from "jwt-decode";
import CustomCard from "../../components/Common/Card";
import CustomDialog from "../../components/Common/Dialog";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import "./index.css";
import ApiConfig from "../../config/ApiConfig";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.secondary.main,
    minHeight: "100vh",
  },
}));

const Homepage = (theme) => {
  const [open, setOpen] = useState(false);
  const [machines, setMachines] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const localToken = localStorage.getItem("token");
  const token = jwtDecode(localToken);
  console.log("Token", token);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getAllMachines = async () => {
    try {
      const response = await Axios.get(ApiConfig.machines.getAllMachines);
      console.log("Machines fetched new", response.data);
      setMachines(response.data.data);
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllMachines();
  }, [open]);

  return (
    <Box p={8} className={classes.container}>
      <Box textAlign="center" mb={4}>
        {" "}
        <Typography variant="h3" sx={{ color: "#ffff" }}>
          Cyber Storm
        </Typography>
        <Typography variant="h5" sx={{ color: "#f3f3f3", marginTop: "10px" }}>
          Link and visit the virtual machines on a click of a button!
        </Typography>
      </Box>
      <Button
        variant="contained"
        style={{ marginBottom: "20px" }}
        onClick={handleClickOpen}
      >
        Add
      </Button>
      <Link
        to={{
          pathname: "/profile",
        }}
        state={{ token: token }}
      >
        {" "}
        <Button variant="contained" style={{ marginBottom: "20px" }}>
          PROFILE
        </Button>
      </Link>

      <Grid container spacing={4}>
        {isLoading ? (
          <CircularProgress
            sx={{
              color: "#ffff",
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
            fontSize="large"
          />
        ) : machines.length < 1 ? (
          <Grid item sm={12} md={4} xl={3}>
            {" "}
            <Typography variant="h4" sx={{ color: "#ffff" }}>
              No Data found!
            </Typography>
          </Grid>
        ) : (
          machines.map((machine) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={machine._id}
              sx={{
                position: "relative",
              }}
            >
              <FlashOnIcon
                sx={{
                  position: "absolute",
                  top: "6px",
                  left: "47%",
                  zIndex: 1,
                  color: "#ff9317",
                  fontSize: 44,
                }}
              />
              <CustomCard data={machine} />
            </Grid>
          ))
        )}
      </Grid>
      <CustomDialog open={open} handleClose={handleClose} />
    </Box>
  );
};

export default Homepage;
