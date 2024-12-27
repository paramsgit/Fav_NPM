import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {NextUIProvider} from "@nextui-org/react";

import './App.css'
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Favourite from "./pages/Favourite";
import ErrorPage from "./pages/ErrorPage";
import About from "./pages/About";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/favourite",
          element: <Favourite />,
        },
      ]
      }])
  return (
    <NextUIProvider>
    <RouterProvider router={router} />
    </NextUIProvider>
  )
}

export default App
