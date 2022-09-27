import MenuBookIcon from '@mui/icons-material/MenuBook';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box, Button, Checkbox, TableCell, TableRow } from '@mui/material';
import { formatDate } from '../../../../helpers';
import './post.css';

const Post = ({ row }) => {
  const noImgUrl = './static-imgs/no-img.png';
  const { createdAt, updatedAt, title, text, category, img } = row;
  const [createdAtDate, createdAtTime] = formatDate(
    new Date(Number(createdAt))
  ).split(' ');
  const [updatedAtDate, updatedAtTime] = formatDate(
    new Date(Number(updatedAt))
  ).split(' ');

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
      <TableCell className='post-title'>{title}</TableCell>
      <TableCell className='post-text'>
        {text.length > 100 ? `${text.substring(0, 50)}...` : text}
      </TableCell>
      <TableCell>{category.name}</TableCell>
      <TableCell>
        <Box className='post-table-thumb-box'>
          <img
            src={img ? img : noImgUrl}
            alt={title}
            className='resp-img thumb'
          />
        </Box>
      </TableCell>
      <TableCell>
        <Button variant='contained' size='small'>
          <MenuBookIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Post;
