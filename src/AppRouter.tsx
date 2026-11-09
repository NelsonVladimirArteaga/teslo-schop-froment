import {  createHashRouter, Navigate } from "react-router";
import { ShopLayout } from "./shop/layouts/ShopLayout";
import { HomePage } from './shop/pages/home/HomePage';
import { ProductPage } from "./shop/pages/product/ProductPage";
import { GenderPage } from "./shop/pages/gender/GenderPage";
import { LoginPage } from "./auth/pages/login/LoginPage";
import { RegisterPage } from './auth/pages/register/RegisterPage';
import { DashBoardPage } from "./adm/pages/dashboard/DashBoardPage";

import { AdmProductsPage } from "./adm/pages/products/AdmProductsPage";
import { lazy } from "react";
import { AdmProductoPage } from "./adm/pages/product/AdmProductoPage";
import { AdminRouter, NotAuthenticatedRouteProtector } from "./components/routers/ProtectedRoites";

const AuthLayout = lazy(()=>import('./auth/layouts/AuthLayout'));
const AdmLayout = lazy (()=> import("./adm/layouts/AdmLayout"))

export const AppRouter = createHashRouter ([{
// export const AppRouter = createBrowserRouter ([{
    //router shop
    path: '/',
    element: <ShopLayout/>,
    children: [{
        index: true,
        element: <HomePage/>
    },
    {
        path:'product/:idSlug',
        element: <ProductPage/>
    },
    {
        path: 'gender/:gender',
        element:<GenderPage/>
    }
]},
    //auth Router
    {
    path:'/auth',
    element:<NotAuthenticatedRouteProtector>
            <AuthLayout/>
            </NotAuthenticatedRouteProtector>
            ,
    children:[
    {
        index:true,
        element:<Navigate to= '/auth/login'/>,
    },
    
    {
        path: 'register',
        element:<RegisterPage/>
    },
    {
        path:'login',
        element:<LoginPage/>,
    }
]
        
    },
    //Router ADM
    {
        path: '/adm',
        element:<AdminRouter>
                <AdmLayout/>,
                </AdminRouter>,
        
        children:[
        {
        index:true,
        element: <DashBoardPage/>,
        },
        {
        path:'product/:id',
        element: <AdmProductoPage/>,
        },
        {
            path:'products',
            element: <AdmProductsPage/>,
        }
        ]
    },
    {
        path: '*',
        element:<Navigate to = '/'/>
    }

])
  
