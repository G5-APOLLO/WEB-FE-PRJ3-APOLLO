import { createBrowserRouter } from "react-router-dom";
import Clients  from "../pages/Clients";
import OpportunitiesPage from "../pages/Opportunities";
import TrackingActivities from "../pages/TrackingActivities";
import Graphics from "../pages/Graphics";
export const router = createBrowserRouter(
  [
    {
      path: ``,
      element: <Clients />,
    },
    {
      path: `/clients`,
      element: <Clients />,
    },
    {
      path: `/oporttunities`,
      element: <OpportunitiesPage />,
    },
    {
      path: `/tracking`,
      element: <TrackingActivities />,
    },
    {
      path: `/graphics`,
      element: <Graphics />,
    }
  ],
);