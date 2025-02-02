import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home/Home.tsx";
import Cart from "./pages/Cart/Cart.tsx";
import Error from "./pages/Error/Error.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import FullPizza from "./pages/FullPizza/FullPizza.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/orders", element: <Cart /> },
      { path: "/pizza/:id", element: <FullPizza /> },
      { path: "*", element: <Error></Error> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
