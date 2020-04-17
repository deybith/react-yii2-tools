import React from 'react';
import PropTypes from 'prop-types';

//material
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';


const useStyles = color => makeStyles({
    stateColor: {
        "width": "14px",
        "float": "left",
        "marginTop": "3px",
        "borderRadius": "50 %",
        "backgroundColor": color,
    }
});


const Yii2TdType = ({ className, type, rowBody, name }) => {
    
    const classes = useStyles(rowBody.color)();
    let content = null;

    if (type === "status" && rowBody.color) {
        content = <div className={classes.stateColor} />;
    } else {
        content = rowBody[name];
    }
    
    //actions logic
    return <TableCell className={className}>{content}</TableCell>;
};

Yii2TdType.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    rowBody: PropTypes.object,
};

export default Yii2TdType;