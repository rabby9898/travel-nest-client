import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Sign Up/SignUp";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import RoomDetails from "../Pages/RoomDetails/RoomDetails";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import { getSingleRooms } from "../Api/Rooms";
import DashboardLayout from "../Layout/DashboardLayout";
import MyListing from "../Pages/Dashboard/Host/MyListing";
import AddRoom from "../Pages/Dashboard/Host/AddRoom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/roomDetails/:id",
        element: (
          <PrivateRoutes>
            <RoomDetails></RoomDetails>
          </PrivateRoutes>
        ),
        loader: ({ params }) => getSingleRooms(params.id),
      },
    ],
  },
  {
    path: "login",
    element: <Login></Login>,
  },
  {
    path: "signup",
    element: <SignUp></SignUp>,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "add-room",
        element: (
          <PrivateRoutes>
            <AddRoom></AddRoom>
          </PrivateRoutes>
        ),
      },
      {
        path: "my-listing",
        element: (
          <PrivateRoutes>
            <MyListing></MyListing>
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
export default router;
