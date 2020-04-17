import React from "react";
import ReactDOM from 'react-dom';

import { Yii2DataProvider } from '../src'

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

ReactDOM.render(
  <Table />,
  document.getElementById('app')
);

module.hot.accept();
