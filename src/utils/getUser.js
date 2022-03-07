import ApiConfig from "../config/ApiConfig";
import axios from "axios";

const token = jwtDecode(localStorage.getItem("token"));

const getUser = async () => {
  const response = await axios.post(
    `${ApiConfig.user.getCurrentUser}/${token._id}`
  );
  console.log("getcurrentuser", response);
  const userData = response;
  console.log("userdata", userData);
  return userData;
};

export default getUser;
