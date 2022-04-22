import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  dateCreated: {
    fontWeight: "bold",
    marginBottom: "10px",
    marginTop: "5px",
  },
  createButton: {
    position: "absolute",
    bottom: 20,
    left: 0,
    width: "100%",
  },
});

const CustomCard = ({ data }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
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
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5">{data.machineName}</Typography>
          <MoreVertIcon
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
        </Box>

        <Typography variant="body2" className={classes.dateCreated}>
          {data.createdAt}
        </Typography>
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
            }}
          >
            <Button variant="outlined">Start</Button>
          </Link>
        </Box>
        <Menu
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
        </Menu>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
