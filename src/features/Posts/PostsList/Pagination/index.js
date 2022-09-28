import { Pagination as Page, Stack, Box } from '@mui/material';
import './pagination.css';

const Pagination = ({ handleSetPage, page, pagesQty }) => {
  return (
    <Box id='pages-wrapper'>
      <Box id='pages'>
        <Stack spacing={2}>
          <Page
            count={pagesQty}
            page={page}
            color='primary'
            onChange={handleSetPage}
          />
        </Stack>
      </Box>
    </Box>
  );
};
export default Pagination;
