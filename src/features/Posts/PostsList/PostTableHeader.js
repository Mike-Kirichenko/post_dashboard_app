import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';

const PostTableHeader = () => {
  const headings = [
    'CreatedAt',
    'UpdatedAt',
    'Title',
    'Desc',
    'Category',
    'Img',
    'Preview',
  ];

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox color='primary' />
        </TableCell>
        <TableCell>
          <DeleteIcon />
        </TableCell>
        {headings.map((headingText, index) => (
          <TableCell key={`${headingText}-${index}`}>{headingText} </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
export default PostTableHeader;
