import React from "react";
import ReactDOM from 'react-dom';

import { Yii2DataProvider } from '../src'

import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';

const createColumnsHeader = (name, label, type, showInTable = true, filter = true, rest = {}) => {
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
  createColumnsHeader('aliado', 'aliado', 'text', true),
  createColumnsHeader('base', 'base', 'text', true),
  createColumnsHeader('nombre_cliente', 'nombre_cliente', 'text', true),
  createColumnsHeader('ocupacion', 'ocupacion', 'text', true),
  createColumnsHeader('activo', 'Activo', 'text', false),
  createColumnsHeader('color', 'Estado', 'status', true),
];

export const Table = () => <Yii2DataProvider
  api={{
    url: 'https://localhost/kcrmapps/ServerBancolombia/web/carga-origen',
    headers: {
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImp0aSI6IjRmMWcyM2ExMmFhIn0.eyJqdGkiOiI0ZjFnMjNhMTJhYSIsImlhdCI6MTU4Nzk5Nzk5NiwiZXhwIjoxNTg4MDQxMTk2LCJ1aWQiOiJNZz09Iiwic3ViIjoiMiIsIm5hbWUiOiJEZXliaXRoIFN0ZXZlbiIsImxhc3RfbmFtZSI6IlNpbWlqYWNhIEJlbHRyYW4iLCJlbWFpbCI6ImRzc2ltaWphY2FAZ3J1cG9rb25lY3RhLmNvbSIsIm1hbmFnbWVudElkIjo5MDN9.TNhKxBcSyBq_kUS27iYPoAf9H5ZocRQ6FYVcf8hJTJo'
    }
  }}
  
  filters
  showPaginationTop={false}
  actions={{
    delete: true,
    buttons: [
      { Icon: <EditIcon/>, tooltip: 'Editar'}
    ]
  }}
  initGetParams={{
    ocupacion: 'Comerciante'
  }}
  actionsLabel='Acciones'
  advancedFiltersLabel='Mostrar/Ocultar filtros'
  searchLabel='Buscar'
  columnsHeader={columnsHeader}
/>;

ReactDOM.render(
  <Table />,
  document.getElementById('app')
);

module.hot.accept();
