import Axios from "axios";
import ApiConfig from "../../config/ApiConfig";

export const createMachine = async (values, handleClose, setActiveStep) => {
  console.log("values fetched", values);
  try {
    const response = await Axios.post(ApiConfig.machines.createMachine, {
      machineName: values.name,
      description: values.description,
      url: values.url,
      steps: values.steps,
    });
    console.log("Machine Created", response.data.data);
    setActiveStep(0);
    handleClose();

    // setisLoading(false);
  } catch (error) {
    console.log(error);
  }
};
