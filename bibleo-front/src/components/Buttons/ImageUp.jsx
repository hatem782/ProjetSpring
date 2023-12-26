import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import axios from "axios";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDoneIcon from "@mui/icons-material/CloudDone";

const Input = styled("input")({
  display: "none",
});

export default function ImageUp(props) {
  const { label, onChange } = props;
  const [Image, setImage] = useState({ url: "", progress: 0, done: false });

  const changeImg = (event) => {
    let file = event.target.files[0];
    UploadImg(file, Image, setImage);
  };

  useEffect(() => {
    console.log(Image);
    if (Image.done) {
      let e = { target: { name: label, value: Image.url } };
      onChange(e);
    }
  }, [Image]);

  return (
    <label>
      <Input
        onChange={changeImg}
        accept="image/*"
        id="contained-button-file"
        multiple
        type="file"
      />
      <Button
        fullWidth
        size="large"
        style={{ height: "56px" }}
        sx={{ mb: 1, mt: 1 }}
        variant="contained"
        component="span"
        endIcon={
          Image.progress > 0 ? (
            <CloudUploadIcon />
          ) : Image.done ? (
            <CloudDoneIcon />
          ) : (
            <AddPhotoAlternateIcon />
          )
        }
      >
        {props.children}
        {Image.progress > 0
          ? ` (Uploading : ${Image.progress}%) `
          : Image.done
          ? ` (Done)`
          : ""}
      </Button>
    </label>
  );
}

const { REACT_APP_API_KEY, REACT_APP_API_URL } = process.env;

const UploadImg = (file, Image, SetImage) => {
  // Initial File before upload
  const formData = new FormData();
  formData.append("file", file);
  formData.append("tags", `Articles`);
  formData.append("upload_preset", "images");
  formData.append("api_key", REACT_APP_API_KEY);
  formData.append("timestamp", (Date.now() / 1000) | 0);

  // To get the progress
  const config = {
    onUploadProgress: (progressEvent) => {
      SetImage({
        ...Image,
        progress: Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        ),
      });
    },
  };

  // the axios upload
  return axios
    .post(REACT_APP_API_URL, formData, config, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    })
    .then((response) => {
      console.log(response);
      SetImage({
        ...Image,
        url: response.data.secure_url,
        done: response.statusText === "OK",
      });
    })
    .catch((error) => {
      console.log(error);
      //SetImg({...Img,error:true});
    });
};
