import { useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ModalContext from '../../../context/ModalContext';
import './postPreview.css';

const PostInput = () => {
  const { setPostInput } = useContext(ModalContext);

  return (
    <Modal
      open
      onClose={() => setPostInput({})}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      className
    >
      <Box id='fullPostBox'>
        <Typography id='modal-modal-date' variant='span' component='span'>
          22/02/2022 16:45
        </Typography>
        <Box className='post-img-preview-box'>
          <img
            src='https://www.undp.org/sites/g/files/zskgke326/files/migration/cn/UNDP-CH-Why-Humanity-Must-Save-Nature-To-Save-Itself.jpeg'
            alt='img'
            className='resp-img'
          />
        </Box>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Text in a modal
        </Typography>
        <Typography variant='sub' component='sub'>
          <b>Category:</b> Nature
        </Typography>
        <Typography id='modal-modal-description'>
          is simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum
        </Typography>
      </Box>
    </Modal>
  );
};

export default PostInput;
