export const url = "http://localhost:9000";

const ApiConfig = {
  auth: {
    login: `${url}/auth/login`,
    signup: `${url}/auth/register`,
    updateProfile: `${url}/user/updateUser`,
  },
  machines: {
    getAllMachines: `${url}/machine/getAllMachines`,
    createMachine: `${url}/machine/create-machine`,
    deleteMachine:`${url}/machine/deleteMachine`
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
