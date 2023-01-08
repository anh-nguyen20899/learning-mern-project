import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../../contexts/AuthContext';
import { AlertMessage } from '../layout/AlertMessage';

const RegisterForm = () => {
  // useContext
  const { registerUser } = useContext(AuthContext);

  // local State
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  // local State set Alert
  const [alert, setAlert] = useState(null);

  // Set field username and password belong to RegisterForm
  const { username, password, confirmPassword } = registerForm;

  // Submit Register Form
  const onChangeRegisterForm = event => {
    setRegisterForm({ ...registerForm, [event.target.name]: event.target.value });
  }
  const register = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setAlert({ type: 'danger', message: 'Confirmed password does not match!!!' });
      setTimeout(() => { setAlert(null)}, 3000);
      return;
    }
    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        setAlert({ type: 'danger', message: registerData.message });
        setTimeout(() => { setAlert(null)}, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Form className='my-4' onSubmit={register}>
        <AlertMessage info={alert}/>
        <Form.Group>
          <Form.Control className="mb-3" type='text' required placeholder='Username' name="username" value={username} onChange={onChangeRegisterForm}/>
        </Form.Group>
        <Form.Group>
          <Form.Control className="mb-3" type='password' required placeholder='Password' name="password" value={password} onChange={onChangeRegisterForm}/>
        </Form.Group>
        <Form.Group>
          <Form.Control className="mb-3" type='password' required placeholder='Confirm Password' name="confirmPassword" value={confirmPassword} onChange={onChangeRegisterForm}/>
        </Form.Group>
        <Button variant='success' type="submit"> Register </Button>
      </Form>
      <p> Already have an account </p>
      <Link to="/login">
        <Button variant='info' className='ml-2' size='sm'>Login here</Button>
      </Link>
    </div>
  )
}

export default RegisterForm