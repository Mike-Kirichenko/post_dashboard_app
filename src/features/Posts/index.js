import { TableContainer } from '@mui/material';
import UserPanel from '../../components/UserPanel';
import Paper from '@mui/material/Paper';
import PostsList from './PostsList';
import Filter from '../../components/Filter';
import PostPreview from '../PostPreview';
import AddPost from './AddPost';
import DeletePosts from '../DeletePosts';

const Posts = () => {
  return (
    <>
      <UserPanel />
      <Filter />
      <AddPost />
      <TableContainer component={Paper}>
        <PostsList />
      </TableContainer>
      <PostPreview />
      <DeletePosts />
    </>
  );
};

export default Posts;
