import React from "react";
import PropTypes from 'prop-types';

// @material-ui components
import InputLabel from "@material-ui/core/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Switch from "@material-ui/core/Switch";
import Checkbox from "@material-ui/core/Checkbox";
import MuiAlert from '@material-ui/lab/Alert';
import withStyles from "@material-ui/core/styles/withStyles";

//icons
import InputAdornment from "@material-ui/core/InputAdornment";
import Check from "@material-ui/icons/Check";

// core components
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Datetime from "react-datetime";

//other components
import Select from 'react-select';
import ErrorMessage from "./ErrorMessage";

// styles
import styles from "../../assets/jss/components/buildFormStyle";

function Alert(props ) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Build extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSimple = (event, row) => {

        let value = event.target.value;
        value = String(value);
        this.parentSetState(event.target.id, value, row.type);
    }

    handleSimpleDatePicker = (name) => (event) => {
        this.parentSetState(name, event.format("DD/MM/YYYY"), 'date');
    }

    handleSimpleSelect = (name) => (value) => {
        this.parentSetState(name, value, 'dropdown');
    }

    handleSimpleCheckRadio = (name, value) => {
        value = value ? "1" : "0";
        this.parentSetState(name, value, 'radio');
    }

    handleToggle = (name, value) => {
        const { state } = this.props;
        let checked = state[name] || [];
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        this.parentSetState(name, newChecked, 'check');
    }

    parentSetState(name, value, type) {
        const { parentSetState } = this.props;
        parentSetState(name, value, type);
    }

    isValidated() {
        return true;
    }


    render() {
        const { classes, fields, state, className } = this.props;

        return (
            <Grid container className={className} spacing={3} >
                {fields.map((row) => {
                    // action from field
                    let action = state[row.name + "Action"];  
                    
                    // const
                    const { nonce } = this.props;
                    
                    let readonly = false;
                    let check = null;
                    let checkOptions = null;
                    let checked = null;
                    let options = null;
                    let value = null;
                    let valueoption = [];

                    if (action === 'hide' || (row.showIsNotEmpty && !state[row.name]) ) {
                        return null;
                    }

                    if (action === "readonly" || row.type == 'readonly') {
                        readonly = true;    
                    }

                    switch (row.type) {
                        case "radio":
                            //Build radio
                            check = !(state[row.name] == 0 || !state[row.name]);
                            return <Grid item key={"_" + row.name} xs={12} sm={12} md={row.fullWidth ? 12 : 6}>
                                <FormControlLabel
                                    className={classes.switch}
                                    control={
                                        <Switch
                                            checked={check}
                                            onChange={ event => readonly || this.handleSimpleCheckRadio(row.name, event.target.checked)}
                                            value="1"
                                            classes={{
                                                switchBase: classes.switchBase,
                                                checked: classes.switchChecked,
                                                thumb: classes.switchIcon,
                                                track: classes.switchBar
                                            }}
                                        />
                                    }
                                    classes={{
                                        label: classes.label
                                    }}
                                    label={row.label}
                                />
                                <ErrorMessage
                                    errorMessage={state[ row.name + "ErrorMessage" ]}
                                    className={classes.dangerText}
                                />
                            </Grid>;
                        //end Build
                        case "check":
                            //Build radio
                            checkOptions = state[row.name + "List"] || row.options;
                            checked =  state[row.name] || [];
                            return <Grid item key={"_" + row.name} xs={12} sm={12} md={row.fullWidth ? 12 : 6}>
                                <InputLabel
                                    htmlFor="simple-select"
                                    className={classes.checkLabel}
                                >
                                    {row.label}
                                    <strong className={classes.dangerText}>{!row.required || " *"}</strong>
                                </InputLabel>
                                {checkOptions.map((rowOptions) =>
                                    <FormControlLabel key={row.name + rowOptions.value}
                                        className={classes.labelBlock}
                                        control={
                                            <Checkbox
                                                tabIndex={-1}
                                                onClick={() => readonly || this.handleToggle(row.name, rowOptions.value)}
                                                checkedIcon={<Check className={classes.checkedIcon} />}
                                                checked={checked.includes(rowOptions.value)}
                                                icon={<Check className={classes.uncheckedIcon} />}
                                                classes={{
                                                    checked: classes.checked,
                                                    root: classes.checkRoot
                                                }}
                                            />
                                        }
                                        classes={{
                                            label: classes.label,
                                            root: classes.labelRoot
                                        }}
                                        label={rowOptions.label}
                                    />
                                )
                                }
                                <ErrorMessage
                                    errorMessage={state[ row.name + "ErrorMessage" ]}
                                    className={classes.dangerText}
                                />
                            </Grid>;
                        //end Build
                        case "alert":
                            //Build radio
                            return <Grid 
                                        item
                                        key={"_" + row.name}
                                        xs={12}
                                        sm={12}
                                        md={row.fullWidth ? 12 : 6}
                                        className={classes.mt}
                                    >
                                <Alert severity={row.color}>{state[row.name + "Message"] || row.message}</Alert>
                            </Grid>;
                        //end Build
                        case "dropdown":
                            // Build dropdownlist
                            options = state[row.name+"List"] || row.options;
                            if (state[row.name] && typeof state[row.name] === 'object') {
                                valueoption = options.filter((option) => option.value == (state[row.name].value));
                            } else if (state[row.name]) {
                                valueoption = options.filter((option) => option.value == (state[row.name]));
                            }

                            if ( options.length == 0 ) {
                                return null;
                            }

                            return <Grid item key={"_"+row.name} xs={12} sm={12} md={row.fullWidth ? 12 : 6}>
                                <InputLabel
                                    htmlFor="simple-select"
                                    className={classes.selectLabel}
                                >
                                    {row.label}
                                    <strong className={classes.dangerText}>{!row.required || " *"}</strong>
                                </InputLabel>
                                <Select
                                    value={valueoption}
                                    nonce={nonce}
                                    options={options}
                                    placeholder="...Seleccione uno"
                                    onChange={(event) => readonly || this.handleSimpleSelect(row.name)(event)}
                                />
                                <ErrorMessage
                                    errorMessage={state[ row.name + "ErrorMessage" ]}
                                    className={classes.dangerText}
                                />
                            </Grid>;
                        //end Build
                        case "datepicker":
                            // Build dropdownlist
                            return <Grid item key={"_" + row.name} xs={12} sm={12} md={row.fullWidth ? 12 : 6}>
                                <InputLabel
                                    htmlFor="simple-select"
                                    className={classes.selectLabel}
                                >
                                    {row.label}
                                    <strong className={classes.dangerText}>{!row.required || " *"}</strong>
                                </InputLabel>
                                <FormControl fullWidth>
                                    {(
                                        row.icon ? <InputAdornment
                                            position="end"
                                            className={classes.inputAdornment}
                                        >
                                            <row.icon className={classes.inputAdornmentIcon} />
                                        </InputAdornment> : null
                                    )}
                                    <Datetime
                                        value={state[row.name] || ""}
                                        inputProps={{readOnly:true}}
                                        timeFormat={row.timeFormat}
                                        dateFormat={row.dateFormat}
                                        onChange={ event => readonly || this.handleSimpleDatePicker(row.name)(event)}
                                    />
                                </FormControl>
                                <ErrorMessage
                                    errorMessage={state[ row.name + "ErrorMessage" ]}
                                    className={classes.dangerText}
                                />
                            </Grid>;
                        //end Build
                        case "separator":
                            return <Grid item key={"_" + row.name} xs={12} sm={12} md={12}>
                                    <h4><row.icon /> {row.label}</h4>
                                    </Grid>;
                        case "text":
                        case "number":
                        case "email":
                        case "miles":
                        case "decimal":
                        default:
                            // Build field text
                            value = state[row.name] || '';
                            value = typeof value === 'object' ? value.label : value;
                            
                            return <Grid item key={"_" + row.name} xs={12} sm={12} md={row.fullWidth ? 12 : 6}>
                                <TextField
                                    id={row.name}
                                    label={row.label}
                                    value={value}
                                    onChange={(event) => readonly || this.handleSimple(event, row)}
                                    fullWidth
                                />
                                <ErrorMessage
                                    errorMessage={state[row.name + "ErrorMessage"]}
                                    className={classes.dangerText}
                                />
                            </Grid>;
                        }
                    })
                }
            </Grid>
        );
    }

}

Build.propTypes = {
    state: PropTypes.object,
    parentSetState: PropTypes.func,
    classes: PropTypes.object,
    fields: PropTypes.array,
    stateTab: PropTypes.object,
    className: PropTypes.string,
    nonce: PropTypes.string,
};

export default withStyles(styles)(Build);