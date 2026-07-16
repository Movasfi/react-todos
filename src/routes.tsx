import { createBrowserRouter } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import TodoPage from "./pages/TodoPage";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,  
    children: [
      {
        path: "/", 
        element: <TodoPage />, 
      },
      {
        path: "users", 
        element: <UsersPage />,
      },
    ],
  },
]);

export default router