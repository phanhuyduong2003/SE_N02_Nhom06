import { Outlet, createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/Auth/SignIn/SignIn";
import SignUp from "./pages/Auth/SignUp/SignUp";
import Header from "./pages/Home/Header/Header";
// import Footer from "./pages/Home/Footer/Footer";
import Content from "./pages/Home/Content/Content";
import Profile from "./pages/Profile/Profile";
import About from "./pages/About/About";
import NotFound from "./pages/Not Found/NotFound";
import Reservation from "./pages/Reservation/Reservation";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
        {/* <Footer /> */}
      </>
    ),
    children: [
      {
        path: "/",
        element: <Content />,
      },
      {
        path: '/profile',
        element: <Profile/>
      },
      {
        path: '/reservation',
        element: <Reservation/>
      },
      {
        path: '/about',
        element: <About/>
      }
    ],
  },
  {
    path: "/signin",
    element: <SignIn/>,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: '*',
    element: <NotFound/>
  }
]);
export default router;
