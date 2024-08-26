import Home from "./Pages/Home/Home";
import Courses from "./Pages/Courses/Courses";
import Users from "./Pages/Users/Users";
import Comments from "./Pages/Comments/Comments";
import Teachers from "./Pages/Teachers/Teachers";
import Discounts from "./Pages/Discounts/Discounts";
import Login from "./Pages/Login/Login";
import EmailLogin from "./Pages/Login/components/EmailLogin";
import PhoneLogin from "./Pages/Login/components/PhoneLogin";
import SignUp from "./Pages/Login/components/SignUp";

const routes = [
  { path: "/", element: <Home /> },
  {
    path: "/courses/:page",
    element: <Courses />,
  },
  { path: "/users/:page", element: <Users /> },
  { path: "/comments/:page", element: <Comments /> },
  { path: "/teachers/:page", element: <Teachers /> },
  { path: "/discounts/:page", element: <Discounts /> },
  {
    path: "/login/*",
    element: <Login />,
    children: [
      { path: "email", element: <EmailLogin /> },
      { path: "phone", element: <PhoneLogin /> },
      { path: "signup", element: <SignUp /> },
    ],
  },
];

export default routes;
