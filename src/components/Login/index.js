import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { tryLogin } from '../../services/restApi';
import './login.css';
import { Alert, Snackbar } from '@mui/material';

const Login = () => {
  const initialErrorState = { loginErr: '', pswErr: '' };
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState(initialErrorState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/');
  }, [navigate]);

  const actionLogin = async (event) => {
    const loginObject = {};
    const errObj = {};
    event.preventDefault();
    const formData = new FormData(event.target);
    for (const [key, value] of formData.entries()) {
      loginObject[key] = value;
    }
    try {
      if (!loginObject.login) {
        errObj.loginErr = 'Login is empty';
      }

      if (!loginObject.password) {
        errObj.pswErr = 'Password is empty';
      }

      if (!errObj.loginErr && !errObj.pswErr) {
        const loggedIn = await tryLogin(loginObject);
        if (loggedIn) navigate('/');
      } else {
        setErrMsg(errObj);
      }
    } catch (err) {
      const { msg } = err.response.data;
      setErrMsg(msg);
    }
  };

  return (
    <Box id='loginWrapper'>
      <form onSubmit={actionLogin}>
        <TextField
          error={Boolean(errMsg.loginErr)}
          id='login'
          label='Login'
          variant='standard'
          className='loginInput'
          name='login'
          placeholder='Your nickname or email'
          helperText={errMsg.loginErr}
        />
        <TextField
          error={Boolean(errMsg.pswErr)}
          id='password'
          label='Password'
          type='password'
          autoComplete='current-password'
          variant='standard'
          className='loginInput'
          name='password'
          placeholder='********'
          helperText={errMsg.pswErr}
        />
        <Button variant='outlined' type='submit'>
          Login
        </Button>
      </form>
      {errMsg.length && typeof errMsg !== 'object' && (
        <Snackbar open>
          <Alert onClose={() => setErrMsg(initialErrorState)} severity='error'>
            {errMsg}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default Login;
