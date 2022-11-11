import { useDispatch, useSelector } from 'react-redux';
import { addPostPreviewData } from '../../PostPreview/postPreviewSlice';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box, Button, Checkbox, TableCell, TableRow } from '@mui/material';
import { formatDate } from '../../../helpers';
import {
  getSelectedPosts,
  addToSelected,
  removeFromSelected,
} from '../../DeletePosts/deletePostsSlice';
import './post.css';

const Post = ({ row }) => {
  const { REACT_APP_SERVER_UPLOAD_BASE, REACT_APP_NO_IMG_URL } = process.env;
  const dispatch = useDispatch();
  const selectedPosts = useSelector(getSelectedPosts);

  const { id, createdAt, title, text, category, img } = row;

  const [createdAtDate, createdAtTime] = formatDate(
    new Date(Number(createdAt))
  ).split(' ');

  const handleSetSelected = () => {
    if (!selectedPosts.includes(id)) dispatch(addToSelected(id));
    else dispatch(removeFromSelected(id));
  };

  return (
    <TableRow>
      <TableCell padding='checkbox'>
        <Checkbox
          color='primary'
          checked={selectedPosts.includes(id)}
          onChange={handleSetSelected}
        />
      </TableCell>
      <TableCell>
        <ModeEditIcon className='interactive-icon' />
      </TableCell>
      <TableCell>
        <Box className='date-time-box'>
          <CalendarMonthIcon />
          &nbsp;{createdAtDate}
          &nbsp;
          <AccessTimeIcon />
          &nbsp;{createdAtTime}
        </Box>
      </TableCell>
      <TableCell className='post-title'>{title}</TableCell>
      <TableCell className='post-text'>
        {text.length > 100 ? `${text.substring(0, 50)}...` : text}
      </TableCell>
      <TableCell>{category.name}</TableCell>
      <TableCell>
        <Box className='post-table-thumb-box'>
          <img
            src={
              img
                ? `${REACT_APP_SERVER_UPLOAD_BASE}/${img}`
                : REACT_APP_NO_IMG_URL
            }
            alt={title}
            className='resp-img thumb'
          />
        </Box>
      </TableCell>
      <TableCell>
        <Button
          variant='contained'
          size='small'
          onClick={() => dispatch(addPostPreviewData(row))}
        >
          <MenuBookIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Post;
