import './App.css'
import AppRoutes from "@/routes.tsx";
import { Toaster } from "sonner";

function App() {

  return (
    <>
        <AppRoutes />
        <Toaster />
    </>
  )
}

export default App
