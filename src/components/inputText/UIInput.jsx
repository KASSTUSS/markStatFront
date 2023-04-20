import React from "react";
import classes from './UIInput.module.css';

const UIInput = (props) => {
    return (
        <input className={classes.UIInput} {...props}/>
    );
};

export default UIInput;