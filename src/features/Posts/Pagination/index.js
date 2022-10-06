import { useDispatch, useSelector } from 'react-redux';
import { Pagination as Page, Stack, Box } from '@mui/material';
import {
  fetchPosts,
  getPostsQty,
  changeQueryObj,
  getQueryObj,
} from '../postsSlice';
import './pagination.css';

const Pagination = () => {
  const dispatch = useDispatch();
  const postsQty = useSelector(getPostsQty);
  const queryObj = useSelector(getQueryObj);
  const pagesQty = Math.ceil(postsQty / queryObj.limit);

  const handleSetPage = (event, value) => {
    const modifiedQuery = { page: value };
    dispatch(changeQueryObj(modifiedQuery));
    dispatch(fetchPosts({ query: { ...queryObj, ...modifiedQuery } }));
  };
  if (pagesQty === 1) return null;

  return (
    <Box id='pages-wrapper'>
      <Box id='pages'>
        <Stack spacing={2}>
          <Page
            count={pagesQty}
            page={queryObj.page}
            color='primary'
            onChange={handleSetPage}
          />
        </Stack>
      </Box>
    </Box>
  );
};
export default Pagination;
