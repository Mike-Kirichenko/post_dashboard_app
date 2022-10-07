import UserPanel from '../../components/UserPanel';
import PostsList from './PostsList';
import Filter from '../Filter';
import PostPreview from '../PostPreview';
import AddPost from './AddPost';
import DeletePosts from '../DeletePosts';
import ErrorBoundary from '../../components/HOC/ErrorBoundary';
import { errorBoundryMsg } from '../../helpers';

const Posts = () => {
  return (
    <>
      <ErrorBoundary errMsg={errorBoundryMsg('UserPanel')}>
        <UserPanel />
      </ErrorBoundary>
      <Filter />
      <AddPost />
      <ErrorBoundary errMsg={errorBoundryMsg('PostsList')}>
        <PostsList />
        <PostPreview />
        <DeletePosts />
      </ErrorBoundary>
    </>
  );
};

export default Posts;
