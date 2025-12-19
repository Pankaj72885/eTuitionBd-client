import App from "@/App";
import HomePage from "@/pages/home/HomePage";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
    ],
  },
]);

export default router;
