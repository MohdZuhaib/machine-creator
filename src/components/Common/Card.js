import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  MenuItem,
  CardHeader,
} from "@mui/material";
import { MoreVert, Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import jwtDecode from "jwt-decode";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import ApiConfig from "../../config/ApiConfig";

// const localToken = localStorage.getItem("token");
// const token = jwtDecode(localToken);
// console.log("token ki detail", token);
// const userRole = token.role;
// console.log("Token", token.role);

const useStyles = makeStyles({
  dateCreated: {
    fontWeight: "bold",
    marginBottom: "10px",
    marginTop: "5px",
  },
  createButton: {
    // position: "absolute",
    // bottom: 20,
    // left: 0,
    // width: "100%",
  },
});
const CustomCard = ({ data, fun }) => {
  const [userRole, setUserRole] = useState();
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const token = jwtDecode(localToken);
    console.log("token ki detail", token);
    console.log("Token", token.role);
    setUserRole(token.role);
  }, []);
  const handleDelete = async (data) => {
    let response = await axios.delete(
      `${ApiConfig.machines.deleteMachine}/${data._id}`
    );

    // console.log("response",response.data)
    fun();
  };

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card
      sx={{
        minHeight: 370,
        padding: "13px",
        position: "relative",
        borderRadius: "22px",
        backgroundColor: "#171727",
        color: "#ffff",
      }}
    >
      <CardHeader
        title={data.machineName}
        // subheader={data.createdAt}
        sx={{
          "&css-nrdprl-MuiTypography-root": {
            "&root": {
              color: "#ffff !important",
            },
          },
        }}
        action={
          userRole === "admin" && (
            <Box sx={{ position: "relative" }}>
              <DeleteIcon
                onClick={() => {
                  handleDelete(data);
                }}
              ></DeleteIcon>
            </Box>
          )
        }
        // sx={{ color: "#ffff" }}
      />
      <Typography variant='body1'>
        {data.createdAt}
      </Typography>

      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {/* <Typography variant="h5">{data.machineName}</Typography>
          <MoreVert
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          /> */}
        </Box>

        <Typography variant="body1" sx={{ marginTop: "20px" }}>
          {data.description}
        </Typography>
        <Box
          display="flex"
          className={classes.createButton}
          justifyContent="center"
          alignItems="center"
          mt={2}
        >
          {/* <a href='http://www.google.com' target="_blank">
            <Button variant="outlined">Start</Button>
          </a> */}
          <Link
            to={{
              pathname: "/detail-view",
            }}
            state={{
              url: data.url,
              steps: data.steps,
              id: data._id,
              machineName: data.machineName,
              extLink: data.extLink,
            }}
          >
            <Button variant="outlined">Start</Button>
          </Link>
        </Box>
        {/* <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu> */}
      </CardContent>
    </Card>
  );
};

export default CustomCard;
