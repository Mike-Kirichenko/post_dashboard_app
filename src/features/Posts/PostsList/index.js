import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import PostTableHeader from './PostTableHeader';
import Post from '../Post';
import LoadingBar from '../../../components/LoadingBar';
import LoadFail from '../../../components/LoadFail';
import Pagination from '../Pagination';
import {
  getAllPosts,
  getPostsStatus,
  fetchPosts,
  getActivePage,
  getPostsQty,
} from '../postsSlice';

const postsWrapperStyle = {
  position: 'relative',
  width: '100%',
  marginBottom: '100px',
};

const PostsList = () => {
  const dispatch = useDispatch();
  const limit = 25;
  const posts = useSelector(getAllPosts);
  const postsQty = useSelector(getPostsQty);
  const postStatus = useSelector(getPostsStatus);
  const activePage = useSelector(getActivePage);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts({ page: activePage, limit }));
    }
  }, [postStatus, posts, activePage, dispatch]);

  if (postStatus === 'loading') return <LoadingBar />;
  if (postStatus === 'failed')
    return <LoadFail msg={'Oops... Something went wrong!'} />;

  if (!postsQty) return <LoadFail msg='No posts yet!' />;

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
      <Pagination limit={limit} />
    </Box>
  );
};

export default PostsList;
