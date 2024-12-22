import { Navigate } from "react-router-dom";
import Login from "../Pages/Login/Login";
import SignIn from "../Pages/SingIn/SingIn";
import ProtectedRouteAdmin from "../PrivetRoutes/ProtectedRoute";
import UnAuthorized from "../Pages/Unauthorized/UnAuthorized";
import AdminDashboardd from "../Dashboard/AdminDashboard/AdminDashobard";
import AllUsers from "../Pages/Admin/AllUsers/AllUsers";

const Adminroutes = [
  {
    path: "/",
    element: <Navigate to="/login" replace={true} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/singin",
    element: <SignIn />,
  },
  {
    path: "/unauthorized",
    element: <UnAuthorized />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRouteAdmin requiredRole="admin">
        <AdminDashboardd />
      </ProtectedRouteAdmin>
    ),
    children: [
      {
        index: true,
        element: <AllUsers />,
      }
    ],
  },
];

export default Adminroutes;
