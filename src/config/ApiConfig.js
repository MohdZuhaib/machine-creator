const url = "http://localhost:8000";

const ApiConfig = {
  auth:{
    login:`${url}/auth/login`,
    signup:`${url}/auth/signup`,
    updateProfile:`${url}/user/updateUser`,
  },
  machines: {
    getAllMachines:`${url}/machine/getAllMachines`,
    createMachine: `${url}/machine/create-machine`,
  },

};

export default ApiConfig;
