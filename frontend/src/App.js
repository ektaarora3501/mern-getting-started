/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Grid,
} from "@material-ui/core";
import {
  CloudUpload,
  ArrowForwardIos,
  ArrowBackIos,
} from "@material-ui/icons/";

const ImageUploader = (props) => {
  const [imageFiles, setImageFiles] = React.useState([]);
  const [imageFilesURLs, setImageFilesURLs] = React.useState([]);
  const [currentImg, setCurrentImg] = React.useState(0);


  return (
    <div>
      <TextField
        fullWidth={props.fullWidth}
        variant="outlined"
        InputProps={{
          readOnly: true,
          startAdornment: (
            <InputAdornment position="start">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(event) => {
                  setImageFiles(
                    imageFiles.concat(Array.from(event.target.files))
                  );

                  Object.keys(event.target.files).map((key, value) => {
                    setImageFilesURLs((imageFilesURLs) => [
                      ...imageFilesURLs,
                      URL.createObjectURL(event.target.files[key]),
                    ]);
                  });
                }}
              />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <CloudUpload />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {imageFiles.length !== 0 && (
        <React.Fragment>
          <Grid
            container
            spacing={2}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid
              item
              xs={2}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <IconButton
                onClick={() => {
                  currentImg === 0
                    ? setCurrentImg(imageFilesURLs.length - 1)
                    : setCurrentImg(currentImg - 1);
                }}
              >
                <ArrowBackIos />
              </IconButton>
            </Grid>
            <Grid
              item
              xs={8}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={imageFilesURLs[currentImg]}
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <IconButton
                onClick={() => {
                  currentImg === imageFilesURLs.length - 1
                    ? setCurrentImg(0)
                    : setCurrentImg(currentImg + 1);
                }}
              >
                <ArrowForwardIos />
              </IconButton>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </div>
  );
};

export default ImageUploader;
