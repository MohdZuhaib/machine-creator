import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Box } from "@mui/material";
import { FlashOn, Delete } from "@mui/icons-material";
import jwtDecode from "jwt-decode";
import axios from "axios";
import ApiConfig from "../../config/ApiConfig";
import Confirmation from "./Confirmation";

// import { motion } from "framer-motion";
import "./index.css";

const Animated = ({ data, fun }) => {
  const [userRole, setUserRole] = useState();
  console.log(userRole);
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const token = jwtDecode(localToken);
    console.log("token ki detail", token);
    console.log("Token", token.role);
    setUserRole(token.role);
  }, []);

  const [openConfirmation, setConfirmation] = useState(false);
  const handleDelete = async (data) => {
    let response = await axios.delete(
      `${ApiConfig.machines.deleteMachine}/${data._id}`
    );

    // console.log("response",response.data)
    fun();
  };

  const handleClickConfirm = () => {
    setConfirmation(true);
  };

  const handleCloseConfirm = () => {
    setConfirmation(false);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="face face1">
          <FlashOn
            sx={{
              position: "absolute",
              top: "-24px",
              left: "43%",
              zIndex: 1,
              color: "#ff9317",
              fontSize: 44,
            }}
          />
          <div class="content">
            <h3>{data.machineName}</h3>
            <h5>{data.createdAt}</h5>
          </div>
        </div>
        <div
          className="face face2"
          // initial={{ y: "-100px" }}
          // animate={{ y: "100px" }}
          // whileHover={{
          //   transition: { type: "spring", delay: 0.5 },
          //   transform: "translateY(100px)",
          // }}
          // transition={{ type: "spring", stiffness: 120 }}
        >
          <div className="content">
            <h6>{data.description}</h6>
            <Box pt={2} display="flex" justifyContent="center">
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
                <Button variant="contained">Start</Button>
              </Link>
              {userRole === "admin" && (
                <Button
                  variant="contained"
                  color="error"
                  sx={{ ml: 2 }}
                  onClick={handleClickConfirm}
                >
                  <Delete /> Delete
                </Button>
              )}
            </Box>
            <Confirmation
              data={data}
              open={openConfirmation}
              handleDelete={handleDelete}
              handleClose={handleCloseConfirm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Animated;
