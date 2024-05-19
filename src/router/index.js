import Layout from "@/pages/Layout";
import Login from "@/pages/Login";

import { createBrowserRouter } from "react-router-dom";
import { AuthRoute } from "@/components/AuthRoute";
import Home from "@/pages/Home";
import Article from "@/pages/Article";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        // path: "home",
        index: true,
        element: <Home />,
      },
      {
        path: "article",
        element: <Article />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
