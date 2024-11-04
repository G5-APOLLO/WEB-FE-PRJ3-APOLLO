import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes"; 
import Header from "./components/Header";
import './App.css'

function App() {
  return (
    <div className="app">
    <Header />
    <RouterProvider router={router} />
  </div>
  )
}

export default App
