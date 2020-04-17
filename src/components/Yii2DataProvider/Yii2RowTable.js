import React from 'react';
import PropTypes from 'prop-types';

//material
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

//custom components
import Yii2TdType from "./Yii2TdType";

// material icons
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';



const useStyles = actions => makeStyles({
    table: {
        minWidth: 650,
    },
    button: {
        display: "inline-block",
        color: "#00acc1",
        fontWeight: 400,
        margin: "0 5px",
    },
    buttonDelete: {
        display: "inline-block",
        fontWeight: 400,
        color: 'red'
    },
    actions: {
        minHeight: "40px",
        width: 49 * actions,
    }
});


const InitActions = {
    buttons: [],
    showWhen: {}
};



const Yii2RowTable = ({ name, className = '', type, actions = InitActions, rowBody = {}, showInTable = true, onDelete }) => {
    const actionsLength = Object.keys(actions).length;
    const classes = useStyles(actions.buttons.length + 1)();
    const buttons = actions.buttons || [];

    const condition = (!actions.showWhen.regExp) ||
        (actions.showWhen.regExp && new RegExp(actions.showWhen.regExp).test(rowBody[actions.showWhen.field]));

    //actions logic
    return <React.Fragment>
        {(!!actionsLength && type === "primary") && <TableCell align="right" component="th" scope="row" className={className}>
            <div className={classes.actions}>
                {condition && <div>
                    {buttons.map((rowButtons, keyButtons) => <IconButton key={keyButtons} className={classes.buttonShow} onClick={() => {
                        if (rowButtons.onClick) rowButtons.onClick(rowBody);
                        else throw new Error('onClick prop action is required in Yii2DataProvider Component!');
                    }
                    } > {rowButtons.Icon} </IconButton>)}
                    {actions.delete && <IconButton className={classes.buttonDelete} onClick={() => {
                        onDelete(rowBody[name]);
                    }
                    } > <DeleteOutlineIcon /> </IconButton>}
                </div>}
            </div>
        </TableCell>}
        {showInTable && <Yii2TdType className={className} type={type} rowBody={rowBody} name={name}/>}
    </React.Fragment>;
};

Yii2RowTable.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    actions: PropTypes.object,
    rowBody: PropTypes.object,
    showInTable: PropTypes.bool,
    onDelete: PropTypes.func,
    className: PropTypes.string,
};

export default Yii2RowTable;