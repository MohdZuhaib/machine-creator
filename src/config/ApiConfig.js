export const url = "http://10.1.76.92:8000";

const ApiConfig = {
  auth: {
    login: `${url}/auth/login`,
    signup: `${url}/auth/register`,
    updateProfile: `${url}/user/updateUser`,
  },
  machines: {
    getAllMachines: `${url}/machine/getAllMachines`,
    createMachine: `${url}/machine/create-machine`,
  },
  steps: {
    createSteps: `${url}/steps/createSteps`,
    getSteps: `${url}/steps/getSteps`,
    checkAnswer: `${url}/steps/checkAns`,
  },
  user: {
    getCurrentUser: `${url}/user/getCurrentUser`,
  },
};

export default ApiConfig;
