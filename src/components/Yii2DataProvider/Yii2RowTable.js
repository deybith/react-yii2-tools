import React from 'react';
import PropTypes from 'prop-types';

//material
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';

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

const Yii2RowTable = ({ 
        name,
        className = '',
        type,
        actions,
        rowBody = {},
        showInTable = true,
        onDelete
    }) => {
    actions = { ...InitActions, ...actions };
    const buttons = actions.buttons || [];
    const classes = useStyles(buttons.length + (actions.delete ? 1 : 0))(); 

    const condition = (!actions.showWhen.regExp) ||
        (actions.showWhen.regExp && new RegExp(actions.showWhen.regExp).test(rowBody[actions.showWhen.field]));

    //actions logic
    return <React.Fragment>
        {(!!actions && type === "primary") && <TableCell align="right" component="th" scope="row" className={className}>
            <div className={classes.actions}>
                {condition && <div>
                    {buttons.map((rowButtons, keyButtons) => <Tooltip key={keyButtons} title={rowButtons.tooltip} >
                        <IconButton className={classes.buttonShow} onClick={() => {
                            if (rowButtons.onClick) rowButtons.onClick(rowBody);
                            else throw new Error('onClick prop action is required in Yii2DataProvider Component!');
                        }
                        } > {rowButtons.Icon} </IconButton>
                    </Tooltip>)}
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