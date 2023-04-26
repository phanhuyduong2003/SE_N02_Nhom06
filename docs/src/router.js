import { Outlet, createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/Auth/SignIn/SignIn";
import SignUp from "./pages/Auth/SignUp/SignUp";
import Header from "./pages/Auth/Header/Header";
import Footer from "./pages/Auth/Footer/Footer";
import Content from "./pages/Auth/Content/Content";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      {
        path: "/",
        element: (
          <div>
            <Content />
          </div>
        ),
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);
export default router;
