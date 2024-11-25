import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ClientTable from "../components/ListClients";
import { useGetClients } from "../hooks/useGetClients";

jest.mock("../hooks/useGetClients");
const mockUseGetClients = useGetClients as jest.Mock;

describe("ClientTable Component", () => {
  beforeEach(() => {
    mockUseGetClients.mockReturnValue({
      data: [
        {
          id: 1,
          nit: "123456",
          name: "Cliente 1",
          address: "Dirección 1",
          city: "Ciudad 1",
          country: "País 1",
          phone: "123456789",
          email: "cliente1@example.com",
          active: true,
        },
        {
          id: 2,
          nit: "654321",
          name: "Cliente 2",
          address: "Dirección 2",
          city: "Ciudad 2",
          country: "País 2",
          phone: "987654321",
          email: "cliente2@example.com",
          active: false,
        },
      ],
      isError: false,
      isLoading: false,
    });
  });

  describe("Static elements rendering", () => {
    test("renders the New Client button", () => {
      render(
        <MemoryRouter>
          <ClientTable />
        </MemoryRouter>
      );

      const addClientButton = screen.getByText(/New Client/i);
      expect(addClientButton).toBeInTheDocument();
    });
  });

  describe("DataGrid functionality", () => {
    test("renders clients in the DataGrid", () => {
      render(
        <MemoryRouter>
          <ClientTable />
        </MemoryRouter>
      );

      const firstClient = screen.getByText("Cliente 1");
      const secondClient = screen.getByText("Cliente 2");

      expect(firstClient).toBeInTheDocument();
      expect(secondClient).toBeInTheDocument();
    });

    test("toggles the active status of a client", () => {
      render(
        <MemoryRouter>
          <ClientTable />
        </MemoryRouter>
      );

      const toggleButton = screen.getByText(/Desactivate/i);
      expect(toggleButton).toBeInTheDocument();

      fireEvent.click(toggleButton);

      expect(toggleButton).toHaveTextContent(/Activate/i);
    });
  });

  describe("Navigation links", () => {
    test("renders the update client button with correct styles when active", () => {
      render(
        <MemoryRouter>
          <ClientTable />
        </MemoryRouter>
      );

      const updateButtons = screen.getAllByRole("button", { name: /Update/i });

      expect(updateButtons).toHaveLength(2);
      expect(updateButtons[0]).not.toBeDisabled();
    });

    test("update button is disabled for inactive clients", () => {
      render(
        <MemoryRouter>
          <ClientTable />
        </MemoryRouter>
      );

      const inactiveUpdateButton = screen.getByText(/Update/i, { selector: 'button[disabled]' });

      expect(inactiveUpdateButton).toBeDisabled();
    });
  });
});
