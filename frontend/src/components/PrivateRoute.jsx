/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ isAllowed, children }) => {
  if (!isAllowed) {
    return <Navigate to="/unauthorized" />;
  }
  return children;
};

export default PrivateRoute;
