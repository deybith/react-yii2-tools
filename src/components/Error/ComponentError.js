import React from 'react';
import PropTypes from 'prop-types';

// material
import { Alert, AlertTitle } from '@material-ui/lab';

function ComponentError({error}) {
    return <Alert severity="error">
            <AlertTitle>The component cannot loaded!!</AlertTitle>
            Error {error}
        </Alert>;
}

ComponentError.propTypes = {
    error: PropTypes.string,
};

export default ComponentError;