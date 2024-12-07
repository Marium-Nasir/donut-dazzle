"use client";
export default function Buttons({ props }) {
  return (
    <div>
      <button onClick={props?.click} className={props?.classname}>
        {props.icon && <span className="icon mr-2">{props.icon}</span>}
        {props.btnText}
      </button>
    </div>
  );
}
