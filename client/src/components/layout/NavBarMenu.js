import React, { useContext } from 'react'
import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../contexts/AuthContext';
import learnLogo from '../../assets/logo.svg';
import logOutIcon from '../../assets/logout.svg';
const NavBarMenu = () => {
    const {authState: {user: {username}} , logoutUser} = useContext(AuthContext);
    const logout = () => {
        logoutUser();
    }
  return (
    <NavBar expand="lg" bg="primary" variant="dark" className='shadow'>
        <NavBar.Brand className='font-weight-bolder text-white'>
            <img src={learnLogo} width='32' height='32' className="mr-2" alt="learnLogo"></img>
            Learn Today
        </NavBar.Brand>
        <NavBar.Toggle aria-controls='basic-navbar-nav' />
        <NavBar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
                <Nav.Link className='font-weight-bolder text-white' to="/dashboard" as={Link}> Dashboard</Nav.Link>
                <Nav.Link className='font-weight-bolder text-white' to="/about" as={Link}> About</Nav.Link>
            </Nav>

            <Nav className='ml-auto'>
                <Nav.Link className='font-weight-bolder text-white' disabled> Welcome {username}</Nav.Link>
                <Button variant='secondary' className='font-weight-bolder text-white' onClick={logout}>
                <img src={logOutIcon} width='32' height='32' className="mr-2" alt="logOutIcon"></img>
                    Logout
                </Button>
            </Nav>
        </NavBar.Collapse>
    </NavBar>
  )
}

export default NavBarMenu