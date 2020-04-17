import typographyStyle from "./typographyStyle";
const BuildFormStyle = {
    ...typographyStyle,
    upArrowCardCategory: {
        width: 14,
        height: 14
    },
    underChartIcons: {
        width: "17px",
        height: "17px"
    },
    price: {
        color: "inherit",
        "& h4": {
            marginBottom: "0px",
            marginTop: "0px"
        }
    },
    selectLabel: {
        fontSize: "12px",
        color: "#757373 !important",
        top: "8px",
        margin: "10px 0 5px 0"
    },
    cardBody: {
        padding: "0.9375rem 20px",
        position: "relative"
    },
    checkLabel: {
        color: "#757373",
        cursor: "pointer",
        display: "inline-flex",
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "1.428571429",
        paddingTop: "39px",
        marginRight: "0",
    },
    labelBlock: {
        display: "block !important"
    },
    inputAdornment: {
        justifyContent: "flex-end",
        position: "relative"
    },
    inputAdornmentIconSuccess: {
        color: "#28a745 !important"
    },
    inputAdornmentIconError: {
        color: "#dc3545 !important"
    },
    delete: {
        position: "absolute",
        top: "-25px",
        right: "40px",
        cursor: "pointer",
    },
    mt: {
        marginTop: "10px",
    },
    mt4: {
        marginTop: "40px",
    }
};

export default BuildFormStyle;