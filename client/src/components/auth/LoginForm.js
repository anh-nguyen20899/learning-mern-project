import React from 'react'
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {useState, useContext} from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import {AlertMessage} from '../layout/AlertMessage';
const LoginForm = () => {
  // Context
  const {loginUser} = useContext(AuthContext);

  // Local state
  const [alert, setAlert] = useState(null);

  // Local State
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  const {username, password} = loginForm;
  // [event.target.name] computed property
  const onChangeLoginForm = event => setLoginForm({...loginForm, [event.target.name]: event.target.value });

  // submit form
  const login = async (event) => {
    event.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      console.log(loginData);
      if(loginData.success) {
        // navigate('/dashboard');
      } else {
        setAlert({type: 'danger', message: loginData.message});
        setTimeout(()=> {setAlert(null)}, 3000);
      }
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <div>
      <Form className='my-4' onSubmit={login}>
        <AlertMessage info={alert}/>
        <Form.Group>
            <Form.Control className="mb-3" type='text' required placeholder='Username' name="username" value={username} onChange={onChangeLoginForm}/>       
        </Form.Group>
        <Form.Group>
            <Form.Control className="mb-3" type='password' required placeholder='Password' name="password" value={password} onChange={onChangeLoginForm}/>
        </Form.Group>
        <Button variant='success' type="submit"> Login </Button>
      </Form>
      <p> Don't have account yet </p>
      <Link to="/register">
        <Button variant='info' className='ml-2' size='sm'>Register here</Button>
      </Link>
    </div>
  )
}

export default LoginForm