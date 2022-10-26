import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, FormHelperText, NativeSelect } from "@mui/material";
import UserPanel from "../../components/UserPanel";
import PictureUpload from "../../components/PictureUpload";
import { loadCategories } from "../../services/graphQLApi";
import "./addPost.css";
import { addNewPost, changeUpdState, getQueryObj } from "../Posts/postsSlice";

const AddPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryObj = useSelector(getQueryObj);

  const initialErrorState = {
    title: "",
    text: "",
    img: "",
    categoryId: "",
  };

  const [categories, setCategories] = useState([]);
  const [errorMsg, setErrMsg] = useState(initialErrorState);

  useEffect(() => {
    loadCategories().then((ctg) => setCategories(ctg));
  }, []);

  const handleCollectFormData = async (event) => {
    const errObj = {};
    const postDataObject = {};
    event.preventDefault();
    const formData = new FormData(event.target);

    for (const [key, value] of formData.entries()) {
      postDataObject[key] = value;
    }

    if (!postDataObject.img) {
      errObj.img = "img is required";
    }

    if (!postDataObject.title) {
      errObj.title = "Title is required";
    }

    if (!postDataObject.text) {
      errObj.text = "Text is required";
    }

    if (!postDataObject.categoryId) {
      errObj.categoryId = "Category is required";
    }

    if (Object.keys(errObj).length) {
      setErrMsg(errObj);
    } else {
      if (!errorMsg.img) {
        setErrMsg(initialErrorState);
        dispatch(addNewPost({ postData: postDataObject, query: queryObj }));
        dispatch(changeUpdState("succeeded"));
        navigate("/");
      } else {
        setErrMsg({ ...initialErrorState, img: errorMsg.img });
      }
    }
  };

  const handleAddImgError = (msg) => {
    setErrMsg((prevErr) => ({ ...prevErr, img: msg }));
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
        <FormControl fullWidth sx={{ marginTop: "98px" }}>
          <NativeSelect placeholder='Choose category' name='categoryId'>
            <option value={null}></option>
            {categories.map((ctg, i) => (
              <option value={ctg.id} key={`ctg-${ctg.id}-${i}`}>
                {ctg.name}
              </option>
            ))}
          </NativeSelect>

          <FormHelperText
            sx={{ textTransform: "uppercase" }}
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

export default AddPost;
