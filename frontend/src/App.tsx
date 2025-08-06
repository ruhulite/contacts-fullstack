import './App.css'
import {RouterProvider} from "react-router-dom";
import { routes } from "./routes.tsx";
import {SessionProvider} from "./context/SessionContext.tsx";

function App() {

  return (
      <div className="bg-slate-800 h-screen">
          <div className="flex justify-center items-center h-screen">
              <SessionProvider>
                  <RouterProvider router={routes} />
              </SessionProvider>

          </div>
      </div>
  )
}

export default App
