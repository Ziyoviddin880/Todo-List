import { useRoutes } from "react-router-dom";
import HomePage from "./homePage/HomePage";
import NotFoundPage from "./notFoundPage/NotFoundPage";

const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },

    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
  return routes;
};

export default Router;
