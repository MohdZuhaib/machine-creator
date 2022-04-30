import { useEffect, useState, useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
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
import { Logout, PermIdentity } from "@mui/icons-material";
import axios from "axios";
import jwtDecode from "jwt-decode";
// import Particles from "react-tsparticles";
// import { Engine } from "tsparticles-engine";
// import { loadFull } from "tsparticles";
// import {loadFull} from "tsparticles";
import logo from "../../assets/logo.svg";
// import CustomCard from "../../components/Common/Card";
import CustomDialog from "../../components/Common/Dialog";
import Animated from "../../components/Common/AnimateCard";
import "./index.css";
import ApiConfig, { url } from "../../config/ApiConfig";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
// import ColorModeContext from "../../Theme/context";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    // backgroundColor: theme.palette.secondary.main,
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
  const particlesInit = async (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };
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
  const userRole = token.role;
  console.log("Token", token);

  // dropdown data
  const [anchorEl, setAnchorEl] = useState(null);
  const [fake, setFake] = useState(false);
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

  const closeDialog = (event, reason) => {
    console.log(event);
    if (reason && reason == "backdropClick") return;
    setOpenDialog(false);
  };

  const signout = () => {
    localStorage.removeItem("token");
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

  // const particlesInit = async (main) => {
  //   console.log(main);

  //   // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  //   // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
  //   // starting from v2 you can add only the features you need reducing the bundle size
  //   await loadFull(main);
  // };

  // const particlesLoaded = (container) => {
  //   console.log(container);
  // };
  // this customizes the component tsParticles installation
  // const particlesInit = async (main) => {
  //   console.log("main", main);

  //   // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  //   // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
  //   // starting from v2 you can add only the features you need reducing the bundle size
  //   await loadFull("jikjh");
  // };

  // const particlesLoaded = (container) => {
  //   console.log(container);
  // };

  const options = {
    /* custom options */
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 600,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0.5,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
        image: {
          src: "img/github.svg",
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 0.2,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 20,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#FF00CC",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 3,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 5,
          opacity: 8,
          speed: 1,
        },
        repulse: {
          distance: 200,
          duration: 0.8,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
    // particles: {
    //   color: {
    //     value: "#000000"
    //   },
    //   line_linked: {
    //     color: {
    //       value: "#000000"
    //     }
    //   },
    //   number: {
    //     value: 50
    //   },
    //   size: {
    //     value: 3
    //   }
    // }
  };

  return (
    // <ColorModeContext.consumer>
    //   {({ colorMode }) => (
    <>
      {" "}
      <AppBar position="static" color="secondary">
        {/* <Button variant='contained' onClick={colorMode.toggleColorMode}>Mode</Button> */}
        <Toolbar>
          {/* */}

          {/* <Typography variant="h6" component="h6" sx={{ flexGrow: 1 }}>
            Range Storm
          </Typography> */}
          <Box sx={{ flexGrow: 1 }}>
            <img src={logo} alt="logo" />
          </Box>

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
      <Box sx={{position:"relative"}}>
      <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "black",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "FF7700",
          },
          links: {
            color: "7FB5FF",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }}
    />
      
      <Box p={8} className={classes.container} sx={{ height:"inherit",width:"inherit",position:"absolute",top:"0",background:"transparent"}}>
        <Box textAlign="center" mb={4}>
          {" "}
          <Typography variant="h3" sx={{ color: "#ffff" }}>
            Range Storm
          </Typography>
          <Typography variant="h5" sx={{ color: "#f3f3f3", marginTop: "10px" }}>
            Welcome to Cyber Range platform
          </Typography>
        </Box>
        {userRole === "admin" && (
          <Button
            variant="contained"
            style={{ marginBottom: "20px" }}
            onClick={handleClickOpen}
          >
            Create Lab
          </Button>
        )}

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
              <>
                {/* <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={machine._id}
                  // sx={{
                  //   position: "relative",
                  // }}
                >
               
                  <CustomCard data={machine} fun={getAllMachines} />
                </Grid> */}
                <Grid item xs={12} sm={6} md={4} lg={3} key={machine._id}>
                  <Animated data={machine} fun={getAllMachines} />
                </Grid>
              </>
            ))
          )}
        </Grid>
        {/* <Particles options={options} /> */}
        
        <CustomDialog open={openDialog} handleClose={closeDialog} />
      </Box>
      </Box>
    </>
    //   )}
    // </ColorModeContext.consumer>
  );
};

export default Homepage;
