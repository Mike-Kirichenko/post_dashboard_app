import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';

const PostTableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell align='left' padding='checkbox'>
          <Checkbox color='primary' />
        </TableCell>
        <TableCell align='left'>
          <DeleteIcon />
        </TableCell>
        <TableCell>CreatedAt </TableCell>
        <TableCell>UpdatedAt</TableCell>
        <TableCell>Title</TableCell>
        <TableCell>Desc</TableCell>
        <TableCell align='center'>Read full</TableCell>
      </TableRow>
    </TableHead>
  );
};
export default PostTableHeader;
