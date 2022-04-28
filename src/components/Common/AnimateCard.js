import { Link } from "react-router-dom";
import { Button, Box } from "@mui/material";
import { FlashOn } from "@mui/icons-material";
// import { motion } from "framer-motion";
import "./index.css";

const Animated = ({ data }) => (
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
          <p>{data.description}</p>
          <Box pt={2} textAlign="center">
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
          </Box>
        </div>
      </div>
    </div>
  </div>
);

export default Animated;
