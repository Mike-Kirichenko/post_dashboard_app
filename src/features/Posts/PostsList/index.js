import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@mui/material/Table';
import { TableContainer } from '@mui/material';
import Paper from '@mui/material/Paper';
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
  getQueryObj,
  getPostsQty,
  getUpdStatus,
} from '../postsSlice';

const postsWrapperStyle = {
  position: 'relative',
  width: '100%',
  marginBottom: '100px',
};

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(getAllPosts);
  const postsQty = useSelector(getPostsQty);
  const postStatus = useSelector(getPostsStatus);
  const updStatus = useSelector(getUpdStatus);
  const queryObj = useSelector(getQueryObj);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts({ query: queryObj }));
    }
  }, [postStatus, queryObj, dispatch]);

  if (postStatus === 'loading' || updStatus === 'loading')
    return <LoadingBar />;
  if (postStatus === 'failed')
    return <LoadFail msg='Oops... Something went wrong!' />;

  if (!postsQty) return <LoadFail msg='No posts yet!' />;

  return (
    <TableContainer component={Paper} sx={postsWrapperStyle}>
      <Table>
        <PostTableHeader />
        <TableBody>
          {posts.map((row, index) => (
            <Post row={row} key={`post-${row.id}-${index}`} />
          ))}
        </TableBody>
      </Table>
      <Pagination />
    </TableContainer>
  );
};

export default PostsList;
