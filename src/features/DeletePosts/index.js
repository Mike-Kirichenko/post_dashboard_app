import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getQty, setQty, reset } from './deletePostsSlice';
import { getSelectedPosts } from '../DeletePosts/deletePostsSlice';
import {
  deleteByIds,
  fetchPosts,
  getActivePage,
  getPostsQty,
  getUpdStatus,
  setActivePage,
} from '../Posts/postsSlice';

const DeletePosts = () => {
  let limit = 25;
  const dispatch = useDispatch();
  const qty = useSelector(getQty);
  const postsQty = useSelector(getPostsQty);
  const totalPages = Math.ceil(postsQty / limit);
  const updStatus = useSelector(getUpdStatus);
  const selectedPostIds = useSelector(getSelectedPosts);
  const activePage = useSelector(getActivePage);

  const handleDeletePosts = () => {
    dispatch(deleteByIds({ postIds: selectedPostIds }));
  };

  useEffect(() => {
    if (updStatus === 'succeeded') {
      dispatch(setQty(0));
      dispatch(reset());
      dispatch(fetchPosts({ page: activePage, limit }));
      if (activePage > totalPages) {
        dispatch(setActivePage(activePage - 1));
        dispatch(fetchPosts({ page: activePage - 1, limit }));
      }
    }
  }, [updStatus, activePage, totalPages, limit, dispatch]);

  return (
    <Dialog
      open={Boolean(qty)}
      onClose={() => dispatch(setQty(0))}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>Deleting posts</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Are you sure you want to delete these {qty} selected posts?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(setQty(0))}>No</Button>
        <Button onClick={handleDeletePosts} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePosts;
