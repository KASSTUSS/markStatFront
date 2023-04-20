import React from "react";
import classes from './UIButton.module.css';

const UIButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.UIBut}>
            {children}
        </button>
    );
};

export default UIButton;