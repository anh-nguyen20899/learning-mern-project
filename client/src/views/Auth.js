import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { AuthContext } from '../contexts/AuthContext';
const Auth = ({authRoute}) => {
    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext);
    const navigate = useNavigate();
    let body 
    if(authLoading) {
        body = (
            <div className="d-flex justify-content-center mt-2">
                <Spinner variant='info' animation='border'/>
            </div>
        )
    } else if (!authLoading && isAuthenticated) return navigate('/dashboard');
            else {
                body = (
                    <>
                    {authRoute === 'login' && <LoginForm/>}
                    {authRoute === 'register' && <RegisterForm/>}
                    </>
                )
            }
    return (
    <div className="landing">
        <div className="dark-overlay">
            <div className="landing-inner">
                <h1>Learn Today</h1>
                {body}
            </div>
        </div>
    </div>
  )
}

export default Auth