import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
  } from "react-router-dom";
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const {checking, uid} = useSelector(state => state.auth)
    /* console.log(checking) */
    

    useEffect(() => {
        dispatch(startChecking())
    }, [dispatch])

    if(checking){
        return <h5>Espere ... </h5>
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        exact 
                        path="/login" 
                        component={LoginScreen}
                        isAuthenticated={!!uid} /* indica false cuando se le pone a un string */
                    />
                    <PublicRoute 
                        exact 
                        path="/register" 
                        component={RegisterScreen} 
                        isAuthenticated={!!uid}
                    />
                    <PrivateRoute 
                        exact 
                        path="/" 
                        component={CalendarScreen} 
                        isAuthenticated={!!uid}
                    />
                    <Redirect to="/login" />
                </Switch>
            </div>
        </Router>
    )
}
