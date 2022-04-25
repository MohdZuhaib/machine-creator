import { Navigate, useRoutes } from "react-router-dom";
import LoginLayout from "./common/Layout/Login";
import Login from "./containers/Auth/Login";
import Signup from "./containers/Auth/Signup";
import DetailView from "./containers/DetailView";
import Profile from "./containers/Profile";
import Homepage from "./containers/Home";

const Router = () => {
  const isAuth = localStorage.getItem("token");
  return useRoutes([
    {
      path: "/",
      element: !isAuth ? <LoginLayout /> : <Navigate to="/dashboard" />,
      children: [
        // { path: 'login', element: <Login /> },

        {
          path: "Signup",
          element: <Signup />,
        },
        {
          path: "",
          element: <Login />,
        },
        // { path: '/', element: <Navigate to="/dashboard" /> },
      ],
    },
    {
      path: "/dashboard",
      element: isAuth?<Homepage />:<Navigate to="/"/>,
    },
    {
      path: "/detail-view",
      element:isAuth? <DetailView />:<Navigate to="/"/>,
    },
    {
      path: "/profile",
      element:isAuth? <Profile />:<Navigate to ="/"/>,
    },
    
  

    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
};

export default Router;
