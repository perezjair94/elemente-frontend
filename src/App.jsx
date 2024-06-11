import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./home";
import Messages from "./messages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />,
      <Route path="messages/:room" element={<Messages />} />,
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
