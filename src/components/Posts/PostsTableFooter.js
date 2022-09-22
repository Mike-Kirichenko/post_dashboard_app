import {
  Pagination,
  Stack,
  TableCell,
  TableFooter,
  TableRow,
} from '@mui/material';

const PostTableFooter = () => {
  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={7}>
          <Stack spacing={2}>
            <Pagination count={10} color='primary' />
          </Stack>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};
export default PostTableFooter;
