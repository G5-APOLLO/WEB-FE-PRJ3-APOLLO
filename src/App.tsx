import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes"; 
import Header from "./components/Header";
import './App.css'

const App: React.FC = () => {
  return (
    <div className="app">
    <Header />
    <RouterProvider router={router} />
  </div>
  )
}

export default App
