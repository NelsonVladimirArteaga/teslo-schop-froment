import { useAuthStore } from "@/auth/store/AuthStore"
import type { PropsWithChildren } from "react"
import { Navigate } from "react-router";


export const AuthenticatedRouteProtector = ({children}:PropsWithChildren) => {
    const {authStatus} = useAuthStore();

    if(authStatus==='checking') return null;
    if(authStatus==='not-authenticated') return <Navigate to = '/auth/login'/>;
    

  return children
};

export const NotAuthenticatedRouteProtector = ({children}:PropsWithChildren) => {
    const {authStatus} = useAuthStore();

    if(authStatus==='checking') return null;
    if(authStatus==='authenticated') return <Navigate to = '/'/>;
    

  return children
};

export const AdminRouter = ({children}:PropsWithChildren) => {
    const {authStatus, isAdmin} = useAuthStore();

    if(authStatus==='checking') return null;
    if(authStatus==='not-authenticated') return <Navigate to = '/auth/login'/>;
    if(!isAdmin()) return <Navigate to ='/'/>

  return children
}