import { useEffect, useState, useContext, createContext } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FlashOn, Logout, PermIdentity } from "@mui/icons-material";
import axios from "axios";
import jwtDecode from "jwt-decode";
import CustomCard from "../../components/Common/Card";
import CustomDialog from "../../components/Common/Dialog";
import "./index.css";
import ApiConfig, { url } from "../../config/ApiConfig";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
// import ColorModeContext from "../../Theme/context";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.secondary.main,
    minHeight: "100vh",
  },
  avatar: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    backgroundColor: "#ff9317 !important",
    color: "#ffff !important",
  },
}));

const Homepage = (theme) => {
  // const mode = useContext(colorMode);
  // const colorMode = useContext(ColorModeContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [machines, setMachines] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [avatar, setAvatar] = useState("");
  const [initials, setInitials] = useState("");
  const navigate = useNavigate();
  const localToken = localStorage.getItem("token");
  const token = jwtDecode(localToken);
  // console.log("Token", token);

  // dropdown data
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // general data
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const signout = () => {
    localStorage.removeItem('token');
    navigate("/");
  };
  const getCurrentUser = async () => {
    const response = await axios.post(
      `${ApiConfig.user.getCurrentUser}/${token._id}`
    );
    console.log("getcurrentuser", response);
    const profilePicture = response.data.data.avatar;
    const Initials = `${response.data.data.firstName[0]}${response.data.data.lastName[0]}`;
    console.log("initials", initials);
    if (profilePicture) {
      setAvatar(profilePicture);
    } else setInitials(Initials);
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
    getCurrentUser();
    getAllMachines();
  }, [openDialog]);

  return (
    // <ColorModeContext.consumer>
    //   {({ colorMode }) => (
    <>
      {" "}
      <AppBar position="static" color="secondary">
        {/* <Button variant='contained' onClick={colorMode.toggleColorMode}>Mode</Button> */}
        <Toolbar>
          {/* */}

          <Typography variant="h6" component="h6" sx={{ flexGrow: 1 }}>
            Range Storm
          </Typography>
          <div>
            <IconButton
              size="large"
              edge="start"
              color="primary"
              aria-label="menu"
              className={avatar || classes.avatar}
              sx={{ mr: 2 }}
              onClick={handleClick}
            >
              {avatar ? (
                <img
                  src={`${url}${avatar}`}
                  alt="avatar"
                  className={classes.avatar}
                />
              ) : (
                <Typography variant="h6" sx={{ letterSpacing: "0.15em" }}>
                  {initials}
                </Typography>
              )}
            </IconButton>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              color="primary"
              MenuListProps={{
                "aria-labelledby": "basic-button",
                // sx={{ backgroundColor: "#ffff" }}
              }}
            >
              <MenuItem onClick={handleClose}>
                {" "}
                <Link
                  to={{
                    pathname: "/profile",
                  }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <PermIdentity sx={{ marginRight: "5px" }} /> My Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={signout}>
                <Logout sx={{ marginRight: "5px" }} />
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
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
                <FlashOn
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
        <CustomDialog open={openDialog} handleClose={closeDialog} />
      </Box>
    </>
    //   )}
    // </ColorModeContext.consumer>
  );
};

export default Homepage;
