import { useState } from 'react';
import { TableContainer } from '@mui/material';
import UserPanel from '../UserPanel';
import Paper from '@mui/material/Paper';
import PostsList from './PostsList';
import PostModal from './FullPostModal';
import ModalContext from '../../context/ModalContext';
import Filter from '../Filter';
import AddPost from './AddPost';

const Posts = () => {
  const [fullPostModal, setfullPostModal] = useState({});
  return (
    <>
      <UserPanel />
      <Filter />
      <AddPost />
      <ModalContext.Provider value={{ fullPostModal, setfullPostModal }}>
        <TableContainer component={Paper}>
          <PostsList />
        </TableContainer>
        {Object.keys(fullPostModal).length > 0 && <PostModal />}
      </ModalContext.Provider>
    </>
  );
};

export default Posts;
