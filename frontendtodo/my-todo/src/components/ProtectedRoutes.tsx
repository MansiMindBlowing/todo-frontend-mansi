import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import { RootState } from "../redux/store";
import type { JSX } from "react";
import type { RootState } from "../redux/store";
// import type { RootState } from "@reduxjs/toolkit/query";
// import { Children, type JSX } from "react";



interface ProtectedRouteProps {
    children: JSX.Element;
    // role?: "admin" |"user";
    allowedRoles: string[];
}



const ProtectedRoute = ({children, allowedRoles}:ProtectedRouteProps)=>{
   const {token, user} = useSelector((state: RootState)=> state.auth);

   if(!token){
    return <Navigate to="/login" replace/>;
   }

//    if(role && user?.role !== role){
//     return <Navigate to="/todos" replace/>
//    }

if(!allowedRoles.includes(user?.role || "")){
    return <Navigate to="/unauthorized"/>
}

   return children;
}

export default ProtectedRoute;



