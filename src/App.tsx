import React from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query"; // Importa QueryClient y QueryClientProvider
import { router } from "./routes/routes";
import Header from "./components/Header";
import './App.css';


const queryClient = new QueryClient();

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="app">
                <Header />
                <RouterProvider router={router} />
            </div>
        </QueryClientProvider>
    );
};

export default App;
