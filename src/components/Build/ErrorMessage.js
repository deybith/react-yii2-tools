import React from "react";
import PropTypes from 'prop-types';


const ErrorMessage = (props) => {
    if (props.errorMessage === undefined)
        return null;

    return <div className={props.className}> {props.errorMessage} </div>;
};

ErrorMessage.propTypes = {
    errorMessage: PropTypes.string,
    className: PropTypes.string
};

export default ErrorMessage;