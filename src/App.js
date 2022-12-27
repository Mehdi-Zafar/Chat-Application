import Login from "./components/Login"
import Chats from "./components/Chats";
import { createBrowserRouter,RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path:'/',
    element:<Login/>,
  },
  {
    path:'/chats',
    element:<Chats/>,
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
