import { Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import './addPost.css';

const AddPost = () => (
  <Box id='addPost'>
    <Typography variant='span' component='span'>
      Add new post
    </Typography>
    <Link to='post/add'>
      <AddIcon color='primary' id='addButton' className='interactive-icon' />
    </Link>
  </Box>
);
export default AddPost;
