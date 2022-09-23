import { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ModalContext from "../../../context/ModalContext";
import "./fullPostModal.css";

const PostModal = () => {
  const { setfullPostModal } = useContext(ModalContext);

  return (
    <Modal
      open
      onClose={() => setfullPostModal({})}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box id="fullPostBox">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  );
};

export default PostModal;
