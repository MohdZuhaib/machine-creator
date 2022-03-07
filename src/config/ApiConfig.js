<<<<<<< HEAD
const url = "http://10.1.76.92:8000";
=======
export const url = "http://localhost:8000";
>>>>>>> 024de9ffb9b231cf9f69a0995c7e71ef441553c7

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
