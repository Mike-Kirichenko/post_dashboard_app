import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './login.css';

const Login = () => {
  const tryLogin = (event) => {
    event.preventDefault();
  };

  return (
    <Box id='loginWrapper'>
      <form onSubmit={tryLogin}>
        <TextField
          // error={true}
          id='login'
          label='Login'
          variant='standard'
          className='loginInput'
          placeholder='Your nickname or email'
          // helperText='Incorrect entry.'
        />
        <TextField
          // error={true}
          id='password'
          label='Password'
          type='password'
          autoComplete='current-password'
          variant='standard'
          className='loginInput'
          placeholder='********'
          // helperText='Incorrect entry.'
        />
        <Button variant='outlined' type='submit'>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
