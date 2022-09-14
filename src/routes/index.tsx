import { useRoutes } from "react-router-dom";

// routes
import MainRoutes from "./ProtectedRoutes";
import AuthenticationRoutes from "./PublicRoutes";

// ==============================|| ROUTING RENDER ||============================== //

export default function Routes() {
    return useRoutes([MainRoutes, AuthenticationRoutes]);
}
