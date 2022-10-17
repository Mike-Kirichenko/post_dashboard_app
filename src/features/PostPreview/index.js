import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getPostPreview, resetPreview } from './postPreviewSlice';
import { formatDate } from '../../helpers';
import './postPreview.css';

const PostPreview = () => {
  const dispatch = useDispatch();
  const previewData = useSelector(getPostPreview);

  const { REACT_APP_SERVER_UPLOAD_BASE, REACT_APP_NO_IMG_URL } = process.env;

  if (!previewData || !Object.keys(previewData).length) return null;

  const { createdAt, title, text, category, img } = previewData;

  const [createdAtDate, createdAtTime] = formatDate(
    new Date(Number(createdAt))
  ).split(' ');

  return (
    <Modal
      open
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      onClose={() => dispatch(resetPreview())}
    >
      <Box id='fullPostBox'>
        <Typography id='modal-modal-date' variant='span' component='span'>
          {createdAtDate} {createdAtTime}
        </Typography>
        <Box className='post-img-preview-box'>
          <img
            src={
              img
                ? `${REACT_APP_SERVER_UPLOAD_BASE}/${img}`
                : REACT_APP_NO_IMG_URL
            }
            alt={title}
            className='resp-img'
          />
        </Box>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          {title}
        </Typography>
        <Typography variant='sub' component='sub'>
          <b>Category:</b> {category.name}
        </Typography>
        <Typography id='modal-modal-description'>{text}</Typography>
      </Box>
    </Modal>
  );
};

export default PostPreview;
