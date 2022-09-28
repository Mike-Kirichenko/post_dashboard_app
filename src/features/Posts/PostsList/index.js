import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import PostTableHeader from './PostTableHeader';
import Post from './Post';
import LoadingBar from '../../../components/LoadingBar';
import LoadFail from '../../../components/LoadFail';
import Pagination from './Pagination';
import {
  getAllPosts,
  getPostsStatus,
  getPostsQty,
  fetchPosts,
} from '../postsSlice';

const postsWrapperStyle = {
  position: 'relative',
  width: '100%',
  marginBottom: '100px',
};

const PostsList = () => {
  const limit = 10;
  const dispatch = useDispatch();
  const posts = useSelector(getAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const postsQty = useSelector(getPostsQty);

  const [page, setPage] = useState(1);

  const handleSetPage = (event, value) => {
    setPage(value);
    dispatch(fetchPosts({ page: value, limit }));
  };

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts({ page, limit }));
    }
  }, [postStatus, posts, page, dispatch]);

  if (postStatus === 'loading') return <LoadingBar />;
  if (postStatus === 'failed')
    return <LoadFail msg={'Oops... Something went wrong!'} />;

  return (
    <Box sx={postsWrapperStyle}>
      <Table>
        <PostTableHeader />
        <TableBody>
          {posts.map((row, index) => (
            <Post row={row} key={`post-${row.id}-${index}`} />
          ))}
        </TableBody>
      </Table>
      <Pagination
        page={page}
        handleSetPage={handleSetPage}
        pagesQty={Math.ceil(postsQty / limit)}
      />
    </Box>
  );
};

export default PostsList;
