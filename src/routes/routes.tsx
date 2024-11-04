import { createBrowserRouter } from "react-router-dom";
import ClientTable  from "../components/List-clients";
import OpportunitiesTable from "../components/ListOpportunities";
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
      element: <OpportunitiesTable />,
    },
  ],
);