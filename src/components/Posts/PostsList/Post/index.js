import { useContext } from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box, Button, Checkbox, TableCell, TableRow } from '@mui/material';
import ModalContext from '../../../../context/ModalContext';
import './post.css';

const Post = ({ row }) => {
  const { setfullPostModal } = useContext(ModalContext);
  const { createdAt, updatedAt, title, desc } = row;
  const [createdAtDate, createdAtTime] = createdAt.split(' ');
  const [updatedAtDate, updatedAtTime] = updatedAt.split(' ');

  return (
    <TableRow>
      <TableCell padding='checkbox'>
        <Checkbox color='primary' />
      </TableCell>
      <TableCell>
        <ModeEditIcon />
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
      <TableCell>
        <Box className='date-time-box'>
          <CalendarMonthIcon />
          &nbsp;{updatedAtDate}
          &nbsp;
          <AccessTimeIcon />
          &nbsp;{updatedAtTime}
        </Box>
      </TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>
        {desc.length > 100 ? `${desc.substring(0, 50)}...` : desc}
      </TableCell>
      <TableCell>Category</TableCell>
      <TableCell>
        <Box className='post-table-thumb-box'>
          <img
            src='./static-imgs/no-img.png'
            alt='no-img'
            className='resp-img thumb'
          />
        </Box>
      </TableCell>
      <TableCell>
        <Button
          variant='contained'
          size='small'
          onClick={() => setfullPostModal({ id: 1 })}
        >
          <MenuBookIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Post;