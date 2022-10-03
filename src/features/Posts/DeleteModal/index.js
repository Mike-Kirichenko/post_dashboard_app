import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getRemoveQty, setRemoveQty } from "../postsSlice";

export default function DeleteModal() {
  const dispatch = useDispatch();
  const removeQty = useSelector(getRemoveQty);

  return (
    <Dialog
      open={Boolean(removeQty)}
      onClose={() => dispatch(setRemoveQty(0))}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Deleting posts</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete these {removeQty} selected posts?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(setRemoveQty(0))}>No</Button>
        <Button onClick={() => dispatch(setRemoveQty(0))} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
