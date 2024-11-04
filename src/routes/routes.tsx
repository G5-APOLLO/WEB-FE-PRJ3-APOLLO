import { createBrowserRouter } from "react-router-dom";
import ClientTable  from "../components/List-clients";
import OpportunitiesPage from "../pages/Opportunities";
export const router = createBrowserRouter(
  [
    {
      path: ``,
      element: <ClientTable />,
    },
    {
      path: `/clientes`,
      element: <ClientTable />,
    },
    {
      path: `/oportunidades`,
      element: <OpportunitiesPage />,
    },
  ],
);