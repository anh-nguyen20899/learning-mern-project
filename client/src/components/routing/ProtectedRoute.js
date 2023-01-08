import React from 'react'
import { useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Spinner from 'react-bootstrap/Spinner';


const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext);
    if (authLoading) {
        return (
            <div className="spiner-container">
                <Spinner animation="border" variant='info'/>
            </div>
        )
    }
    return (
        isAuthenticated ?  
        children : navigate('/login')
    )
}

export default ProtectedRoute