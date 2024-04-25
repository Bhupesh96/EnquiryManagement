import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
const PrivateRoutes = () => {
    const auth = useAuth();
  return (
      auth.user ? <Outlet/> : <Navigate to='/'/>
    )
  };

  export default PrivateRoutes;

