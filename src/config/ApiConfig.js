const url = "http://localhost:8000";

const ApiConfig = {
  machines: {
    getAllMachines:`${url}/machine/getAllMachines`,
    createMachine: `${url}/machine/create-machine`,
  },
};

export default ApiConfig;
