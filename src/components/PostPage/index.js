import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormHelperText, NativeSelect } from '@mui/material';
import UserPanel from '../UserPanel';
import PictureUpload from '../PictureUpload';
import './postPage.css';

const PostPage = () => {
  const initialErrorState = {
    title: '',
    text: '',
    img: '',
    categoryId: '',
  };

  const [errorMsg, setErrMsg] = useState(initialErrorState);

  const handleCollectFormData = (event) => {
    const errObj = {};
    const postDataObject = {};
    event.preventDefault();
    const formData = new FormData(event.target);
    for (const [key, value] of formData.entries()) {
      postDataObject[key] = value;
    }

    if (!postDataObject.title) {
      errObj.title = 'Title is required';
    }

    if (!postDataObject.text) {
      errObj.text = 'Text is required';
    }

    if (!postDataObject.categoryId) {
      errObj.categoryId = 'Category is required';
    }

    if (Object.keys(errObj).length) {
      setErrMsg(errObj);
    } else {
      if (!errorMsg.img) {
        setErrMsg(initialErrorState);
        console.log(postDataObject);
      } else {
        setErrMsg({ ...initialErrorState, img: errorMsg.img });
      }
    }
  };

  const handleAddImgError = (errObj) => {
    setErrMsg((prevErr) => ({ ...prevErr, ...errObj }));
  };

  return (
    <form onSubmit={handleCollectFormData}>
      <UserPanel />
      <Box id='postWrapper'>
        <PictureUpload
          handleAddImgError={handleAddImgError}
          error={errorMsg.img}
        />
        <TextField
          id='Title'
          label='title'
          variant='standard'
          className='loginInput'
          name='title'
          placeholder='Post Title'
          error={Boolean(errorMsg.title)}
          helperText={errorMsg.title}
        />

        <TextField
          name='text'
          placeholder='Post text'
          multiline
          rows={6}
          className='customInput'
          error={Boolean(errorMsg.text)}
          helperText={errorMsg.text}
        />
        <FormControl fullWidth sx={{ marginTop: '98px' }}>
          <NativeSelect placeholder='Choose category' name='categoryId'>
            <option value={null}>{null}</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </NativeSelect>

          <FormHelperText
            sx={{ textTransform: 'uppercase' }}
            error={Boolean(errorMsg.categoryId)}
          >
            {Boolean(errorMsg.categoryId) && errorMsg.categoryId}
          </FormHelperText>
        </FormControl>
        <Button variant='outlined' type='submit'>
          Add
        </Button>
      </Box>
    </form>
  );
};

export default PostPage;
