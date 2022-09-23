import { Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';
import './addPost.css';

const AddPost = () => (
  <Box id='addPost'>
    <Typography variant='span' component='span'>
      Add new post
    </Typography>
    <AddIcon color='primary' id='addButton' />
  </Box>
);
export default AddPost;
