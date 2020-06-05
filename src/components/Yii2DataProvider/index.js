import React, { useState, useEffect } from 'react';

// material
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import SwapVertIcon from '@material-ui/icons/SwapVert';

// customcomponents
import Loading from '../Loading/Loading';
import ComponentError from '../Error/ComponentError';
import BuildForm from '../Build/Form';
import Yii2TableBody from './Yii2TableBody';
import Yii2TablePaginationActions from './Yii2TablePaginationActions';

// service
import usePostYii2DataProviderService from '../../services/Yii2DataProviderService';

const useStyles = makeStyles(theme => ({
    root: {
        padding: "10px",
    },
    mt10:{
        marginTop: "100px"
    },
    mt5:{
        marginTop: "50px"
    },
    button: {
        marginTop: "50px"
    },
}));

const Yii2DataProvider = ({ 
        api,
        columnsHeader,
        pagination,
        searchLabel = 'Search',
        filters = false,
        advancedFiltersLabel = 'Toggle advanced filters',
        initGetParams = {},
        ...rest
    } ) => {
    
    //hooks
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [stateForm, setStateForm] = useState(initGetParams);
    const [showFilters, setShowFilters] = useState(false);

    const classes = useStyles();
    
    const { service, publishYii2DataProvider, Yii2DataProviderDeleteService } = usePostYii2DataProviderService();


    // load
    useEffect(() => {
        setStateForm(initGetParams);
        handdleSearch(initGetParams);
    }, [initGetParams]);

    function handleChangePage(event, newPage) {
        setPage(newPage);
        publishYii2DataProvider(api, columnsHeader,{page: newPage, rowsPerPage});
    }
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        publishYii2DataProvider(api, columnsHeader,{ page: 0, rowsPerPage: parseInt(event.target.value, 10) });
    };

    //delete
    const handleDelete = (id) => {
        handdleSearch();
    };

    //handle set state form
    const handleStateForm = (name, value) => {
        setStateForm({
            ...stateForm,
            [name]: value
        });    
    };

    const handdleSearch = (initGetParams = {}) => {
        publishYii2DataProvider(api, columnsHeader, { page, rowsPerPage, filters: { ...stateForm, ...initGetParams} });
    };
    
    if (service.status==='loading') {
        return <Loading open={true} />;
    } else if (service.status === 'loaded') {
        const { items, _meta } = service.payload;
        const fields = columnsHeader.filter((row) => row.filter == true);
        return (
            <div className={classes.root}>

                {filters &&
                    <div>
                        <Button
                            variant="outlined"
                            component="button"
                            onClick={() => {
                                setShowFilters(!showFilters);
                            }}
                            startIcon={<SwapVertIcon />}
                        >
                            {advancedFiltersLabel}
                        </Button>
                        {showFilters &&
                            <div>
                                <BuildForm
                                    fields={fields}
                                    parentSetState={handleStateForm}
                                    state={stateForm}
                                />
                                <Button
                                    className={classes.mt5}
                                    variant="contained"
                                    color="primary"
                                    startIcon={<SearchIcon />}
                                    onClick={handdleSearch}
                                >
                                    {searchLabel}
                                </Button>
                            </div>
                        }
                    </div>
                }

                <Yii2TableBody className={classes.mt5}
                    {...rest}
                    items={items}
                    columnsHeader={columnsHeader}
                    onDelete={((id) => Yii2DataProviderDeleteService(api, id, handleDelete))}
                    pagination={
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 100, 200]}
                            colSpan={columnsHeader.length}
                            count={_meta.totalCount}
                            rowsPerPage={rowsPerPage}
                            className={classes.pagination}
                            page={page}
                            {...pagination}
                            SelectProps={{
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={Yii2TablePaginationActions}
                        />
                    }
                />
            </div>
        );
    }

    return <ComponentError error={service.error} />;
};

export default Yii2DataProvider;