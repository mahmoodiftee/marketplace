import UserDashboard from "../Dashboard/UserDashoboard/UserDashboard";
import Dashboard from "../Pages/Users/Dashboard/Dashboard";
import Marketplace from "../Pages/Users/Marketplace/Marketplace";
import ProtectedRoute from "../PrivetRoutes/ProtectedRoute";

const UserRoutes = [
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <UserDashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Marketplace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
];

export default UserRoutes;
