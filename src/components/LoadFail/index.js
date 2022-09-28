import { Typography } from '@mui/material';
import ErrorSharpIcon from '@mui/icons-material/ErrorSharp';
import Box from '@mui/material/Box';

const LoadFail = ({ msg }) => {
  const loadFailStyle = {
    display: 'flex',
    alignItems: 'center',
    color: 'red',
    justifyContent: 'center',
  };

  return (
    <Box style={loadFailStyle}>
      <ErrorSharpIcon />
      <Typography id='modal-modal-date' variant='h5' component='span'>
        &nbsp;{msg}
      </Typography>
    </Box>
  );
};

export default LoadFail;
