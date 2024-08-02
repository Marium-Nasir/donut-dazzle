"use client";
import "../../Style/Header.css";

export default function Buttons({ props }) {
  return (
    <div>
      <button onClick={props.click} id="btnId">
        {props.btnText}
      </button>
    </div>
  );
}
