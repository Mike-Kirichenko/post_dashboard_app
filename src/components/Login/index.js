import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { loginWrapperStyle, loginInputStyle, loginButtonStyle } from './styles';

const Login = () => {
  const tryLogin = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={loginWrapperStyle}>
      <form onSubmit={tryLogin}>
        <TextField
          // error={true}
          id='standard-basic'
          label='Login'
          variant='standard'
          sx={loginInputStyle}
          placeholder='Your nickname or email'
          // helperText='Incorrect entry.'
        />
        <TextField
          // error={true}
          id='standard-password-input'
          label='Password'
          type='password'
          autoComplete='current-password'
          variant='standard'
          sx={loginInputStyle}
          placeholder='********'
          // helperText='Incorrect entry.'
        />
        <Button variant='contained' sx={loginButtonStyle} type='submit'>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
