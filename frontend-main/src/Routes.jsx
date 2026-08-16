import React, { useEffect } from "react";
import {useNavigate, useRoutes} from 'react-router-dom'

// Pages List
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Landing from "./components/landing/Landing";
import CreateRepo from "./components/create/CreateRepo";
import RepoDetails from "./components/repo/RepoDetails";

// Auth Context
import { useAuth } from "./authContext";

const ProjectRoutes = ()=>{
    const {currentUser, setCurrentUser} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        const userIdFromStorage = localStorage.getItem("userId");

        if(userIdFromStorage && !currentUser){
            setCurrentUser(userIdFromStorage);
        }

        const path = window.location.pathname;
        // If user not logged and trying to access app routes, redirect to auth
        if(!userIdFromStorage && (path.startsWith('/app') || path === '/profile')){
            navigate('/auth');
        }

        // If user is logged and on auth pages, move to app
        if(userIdFromStorage && (path === '/auth' || path === '/signup')){
            navigate('/app');
        }
    }, [currentUser, navigate, setCurrentUser]);

    let element = useRoutes([
        {
            path:"/",
            element:<Landing/>
        },
        {
            path:"/app",
            element:<Dashboard/>
        },
        {
            path:"/repo/:id",
            element:<RepoDetails/>
        },
        {
            path:"/create",
            element:<CreateRepo/>
        },
        {
            path:"/auth",
            element:<Login/>
        },
        {
            path:"/signup",
            element:<Signup/>
        },
        {
            path:"/profile",
            element:<Profile/>
        }
    ]);

    return element;
}

export default ProjectRoutes;