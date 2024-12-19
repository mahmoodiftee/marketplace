import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './Redux/app/store'
import Adminroutes from './Routes/AdminDashboard'
import UserRoutes from './Routes/UserDashboard'
import Error from './Pages/Error/Error'


// Append the error route at the end of both Admin and User routes
const extendedAdminRoutes = [
  ...Adminroutes,
  { path: "*", element: <Error /> }, 
];

const extendedUserRoutes = [
  ...UserRoutes,
  { path: "*", element: <Error /> }, 
];

// Combine all routes into a single router
const Routes = createBrowserRouter([
  ...extendedAdminRoutes,
  ...extendedUserRoutes,
]);


console.log(Routes)


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={Routes}/>
    </Provider>

  </StrictMode>,
)
