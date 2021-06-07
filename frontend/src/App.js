/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { incNumber, decNumber } from "./actions/index";

const ImageUploader = (props) => {
  const myState = useSelector((state) => state.changeNumber);
  const dispatch = useDispatch();
  return (
    <div class="main-div">
      <div class="container">
        <h1> Increment/Decrement counter</h1>
        <h4>using React and Redux</h4>
        <div clasS="quantity">
          <button
            class="quantity_minus"
            title="Decrement"
            onClick={() => dispatch(decNumber())}
          >
            <span>-</span>
          </button>
          <input
            name="quantity"
            type="text "
            class="quantity_input"
            value={myState}
          ></input>
          <button class="quantity_plus" title="Increment " onClick={() => dispatch(incNumber())}>
            <span>+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
