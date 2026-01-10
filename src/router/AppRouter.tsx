// src/router/AppRouter.tsx
import { createBrowserRouter } from "react-router-dom";
import HubLayout from "../layout/HubLayout";
import Dashboard from "../pages/Dashboard";
import Campaigns from "../pages/Campaigns";
import Results from "../pages/Results";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HubLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "campaigns", element: <Campaigns /> },
      { path: "results", element: <Results /> },
    ],
  },
]);
