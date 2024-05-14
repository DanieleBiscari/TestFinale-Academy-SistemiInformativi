import { RouterProvider } from "react-router-dom"
import { router } from "./routes/router"
import { AuthContextProvider } from "./contexts/AuthContext/AuthContextProvider"

function App() {


  return (
    <AuthContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthContextProvider>
  )
}

export default App
