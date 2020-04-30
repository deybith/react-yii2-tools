# Import

```sh
    import {Yii2DataProvider} from 'react-yii2-tools'
```

# Example

```sh
    import React from "react";


    import {Yii2DataProvider} from 'react-yii2-tools'

    import SearchIcon from '@material-ui/icons/Search';
    import EditIcon from '@material-ui/icons/Edit';

    const createColumnsHeader = (name, label, type, showInTable = true, filter = true, rest) => {
    return {
        name,
        type,
        label,
        filter,
        showInTable,
        ...rest
    }
    }

    const action = (row) => { console.log(row) }

    const columnsHeader = [
    createColumnsHeader('id', 'Id', "primary", false, false),
    createColumnsHeader('username', 'Name', 'text', true),
    ];

    export const Table = () => <Yii2DataProvider
    api={{
        url: 'http://localhost/yii2/basic/web/user',
        headers: {
        //'Authorization': 'Bearer jwtToken'
        }
    }}
    actions={{
        delete: true,
        showWhen: {
        
        },
        buttons: [
        { Icon: <SearchIcon />, onClick: action },
        { Icon: <EditIcon />, onClick: action },
        ]
    }}
    filters
    showPaginationTop
    actionsLabel='Acciones'
    columnsHeader={columnsHeader}
    />;
  
```

# Props

| Name | Type | Description |
|------|------|-------------|
| api  | json  | Data for fetch request, url attribute is required |
| actions  | json  | Active actions, showWhen json, buttons array, delete is boolean |
| filters  | bool | Show advance filters |
| showPaginationTop  | bool | put paginations in top of table |
| pagination  | json  | labelRowsPerPage attribute, label rows per page |
| actionsLabel  | string  | Actions Label for column header |
| searchLabel  | string  | Search Button Label for filters |
| advancedFiltersLabel  | string  | Advanced filters label |
| columnsHeader  | json  | { name, label, number, filter, isPrimary, showInTable, ...rest	} |