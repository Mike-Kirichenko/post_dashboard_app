import { useContext } from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Button, Checkbox, TableCell, TableRow } from '@mui/material';
import ModalContext from '../../context/ModalContext';

const Post = ({ row }) => {
  const { modalSetOpen } = useContext(ModalContext);

  const { createdAt, updatedAt, title, desc } = row;
  return (
    <TableRow>
      <TableCell padding='checkbox'>
        <Checkbox color='primary' />
      </TableCell>
      <TableCell>
        <ModeEditIcon />
      </TableCell>
      <TableCell align='left'>{createdAt}</TableCell>
      <TableCell align='left'>{updatedAt}</TableCell>
      <TableCell align='left'>{title}</TableCell>
      <TableCell align='left'>
        {desc.length > 100 ? `${desc.substring(0, 50)}...` : desc}
      </TableCell>
      <TableCell align='center'>
        <Button
          variant='contained'
          size='small'
          onClick={() => modalSetOpen(true)}
        >
          <MenuBookIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Post;
