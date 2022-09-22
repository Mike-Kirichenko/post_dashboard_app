import { useState } from 'react';
import { TableContainer } from '@mui/material';
import UserPanel from '../UserPanel';
import Paper from '@mui/material/Paper';
import PostsList from './PostsList';
import PostModal from './PostModal';
import ModalContext from '../../context/ModalContext';
import Filter from '../Filter';

const Posts = () => {
  const [modalOpen, modalSetOpen] = useState(false);
  return (
    <>
      <UserPanel />
      <Filter />
      <ModalContext.Provider value={{ modalOpen, modalSetOpen }}>
        <TableContainer component={Paper}>
          <PostsList />
        </TableContainer>
        {modalOpen && <PostModal />}
      </ModalContext.Provider>
    </>
  );
};

export default Posts;
