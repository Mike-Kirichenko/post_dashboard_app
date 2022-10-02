import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getDeleteModal, setDeleteModal } from "../postsSlice";

export default function DeleteModal() {
  const dispatch = useDispatch();
  const deleteModal = useSelector(getDeleteModal);

  return (
    <Dialog
      open={Boolean(deleteModal)}
      onClose={() => dispatch(setDeleteModal(0))}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Deleting posts</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete these {deleteModal} selected posts?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(setDeleteModal(0))}>No</Button>
        <Button onClick={() => dispatch(setDeleteModal(0))} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
