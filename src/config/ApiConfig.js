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
  },
  user: {
    getCurrentUser: `${url}/user/getCurrentUser`,
  },
};

export default ApiConfig;
