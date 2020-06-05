import React from "react";
import ReactDOM from 'react-dom';

import { Yii2DataProvider } from '../src'

import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom"; 

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

export const Table = () => {
  let { ocupacion } = useParams();

return  <Yii2DataProvider
    api={{
      url: 'https://localhost/kcrmapps/ServerBancolombia/web/carga-origen',
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImp0aSI6IjRmMWcyM2ExMmFhIn0.eyJqdGkiOiI0ZjFnMjNhMTJhYSIsImlhdCI6MTU5MTMxOTA3MywiZXhwIjoxNTkxMzYyMjczLCJ1aWQiOiJNZz09Iiwic3ViIjoiMiIsIm5hbWUiOiJEZXliaXRoIFN0ZXZlbiIsImxhc3RfbmFtZSI6IlNpbWlqYWNhIEJlbHRyYW4iLCJlbWFpbCI6ImRzc2ltaWphY2FAZ3J1cG9rb25lY3RhLmNvbSIsIm1hbmFnbWVudElkIjoyNH0.WhRWaKcPTrgfpHcVOZo6Gam3Gp9Cr1YaY_HajDEwdrE'
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
      ocupacion
    }}
    actionsLabel='Acciones'
    advancedFiltersLabel='Mostrar/Ocultar filtros'
    searchLabel='Buscar'
    columnsHeader={columnsHeader}
  />
};

const Routes = () => {
  return <Router>

    <nav>
      <ul>
        <li>
          <Link to="/table/Comerciante">Comerciante</Link>
        </li>
        <li>
          <Link to="/table/otro">otro</Link>
        </li>
      </ul>
    </nav>

    <Switch>
      <Route path="/table/:ocupacion">
        <Table />
      </Route>
    </Switch>
  </Router>
}

ReactDOM.render(
  <Routes />,
  document.getElementById('app')
);

module.hot.accept();
