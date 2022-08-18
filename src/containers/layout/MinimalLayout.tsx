// import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export const MinimalLayout = () => {
  //Unautharized layout
  return (
    <div>
      <Outlet />
    </div>
  );
};
