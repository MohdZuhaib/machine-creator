import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";

import axios from "axios";
import ApiConfig from "../../config/ApiConfig";

const Confirmation = ({ open, handleClose, data, handleDelete }) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <Box sx={{ backgroundColor: "#0D0D20", color: "#fff" }}>
          <DialogContent>
            <DialogContentText sx={{ color: "#fff" }}>
              Are you sure you want to delete this machine?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleDelete(data)}
              color="error"
              variant="contained"
            >
              Yes
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default Confirmation;
