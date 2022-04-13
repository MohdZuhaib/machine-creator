import Axios from "axios";
import ApiConfig from "../../config/ApiConfig";

export const createMachine = async (values, handleClose, setActiveStep) => {
  console.log("values fetched", values);
  try {
    const machineResponse = await Axios.post(ApiConfig.machines.createMachine, {
      machineName: values.name,
      description: values.description,
      url: values.url,
      question: values.question,
      answer: values.answer,
    });
    console.log("Machine Created", machineResponse.data.data);
    const machineId = machineResponse.data.data._id;
    values.steps.map((step) =>
      Axios.post(`${ApiConfig.steps.createSteps}/${machineId}`, {
        title: step.title,
        description: step.description,
        question: step.question,
        answer: step.answer,
        options: step.options,
      })
    );
    // const stepsResponse =
    // );
    // console.log("Steps Created", stepsResponse.data.data);

    setActiveStep(0);
    handleClose();

    // setisLoading(false);
  } catch (error) {
    console.log(error);
  }
};
