import React from "react";
// import bars from "./bars.svg";
// import times from "./times.svg";
import classes from "./MenuToggle.module.css";

const MenuToggle = props => {
    //let src;
  const cls = [classes.MenuToggle];
  if (props.isOpen) {
    // src = times;
    cls.push(classes.open);
  } else {
    // src = bars;
  }
  return (
    <i className={cls.join(" ")} onClick={props.onToggle}>
      {/* <img src={src} onClick={props.onToggle} alt="≡" /> */}
      <span></span>
      <span></span>
      <span></span>
    </i>
  );
};

export default MenuToggle;
