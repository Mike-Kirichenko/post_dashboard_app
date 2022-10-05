import { Component } from 'react';
import { Box } from '@mui/system';
import ErrorIcon from '@mui/icons-material/Error';
import { Typography } from '@mui/material';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ textAlign: 'center', maxWidth: '300px', margin: 'auto' }}>
          <ErrorIcon className='error' />
          <Typography variant='b' component='span' className='error'>
            {this.props.errMsg}
          </Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
