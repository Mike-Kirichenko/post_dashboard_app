import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import PostTableHeader from './PostTableHeader';
import Post from './Post';
import Pagination from './Pagination';
import { getAllPosts, getPostsStatus, fetchPosts } from '../postsSlice';

const postsWrapperStyle = {
  position: 'relative',
  width: '100%',
  marginBottom: '100px',
};

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(getAllPosts);
  const postStatus = useSelector(getPostsStatus);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, posts, dispatch]);

  if (postStatus === 'loading') return 'loading...';
  if (postStatus === 'failed') return 'fail!';

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
      <Pagination />
    </Box>
  );
};

export default PostsList;
