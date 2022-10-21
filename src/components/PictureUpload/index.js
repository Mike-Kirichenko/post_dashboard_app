import React, { useState } from "react";
import Button from "@mui/material/Button";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { Box } from "@mui/material";
import LoadFail from "../LoadFail";
import "./pictureUpload.css";

const PictureUpload = ({ handleAddImgError, error }) => {
  const [picture, setPicture] = useState(null);

  const handlePictureSelect = ({ target }) => {
    const pictureWhiteList = ["image/jpeg", "image/png"];
    const [pictureData] = target.files;
    if (pictureWhiteList.includes(pictureData.type)) {
      const pictureObj = URL.createObjectURL(pictureData);
      console.log("pictureObj", pictureObj);
      setPicture(pictureObj);
      handleAddImgError("");
    } else {
      setPicture(null);
      handleAddImgError("Invalid file type");
    }
  };

  return (
    <Box id='pictureUploadWrapper'>
      <Button variant='contained' component='label' className='uploadButton'>
        <InsertPhotoIcon className='insertPhotoIcon' />
        <input type='file' hidden onChange={handlePictureSelect} name='img' />
      </Button>
      {!error && picture && (
        <Box className='pictureUploadPreviewWrapper'>
          <img src={picture} className='resp-img' alt='post_picture' />
        </Box>
      )}
      {error && <LoadFail msg={error} />}
    </Box>
  );
};

export default PictureUpload;
