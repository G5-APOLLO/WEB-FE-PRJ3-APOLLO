import React from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query"; // Importa QueryClient y QueryClientProvider
import { router } from "./routes/routes";
import Header from "./components/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


const queryClient = new QueryClient();

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="app">
                <Header />
                <RouterProvider router={router} />
                <ToastContainer closeButton={true} position="top-right" />
            </div>
        </QueryClientProvider>
    );
};

export default App;
