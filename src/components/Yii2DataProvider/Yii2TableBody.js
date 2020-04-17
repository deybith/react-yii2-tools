import React from 'react';
import PropTypes from 'prop-types';

// @material
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//components
import RowTable from "./Yii2RowTable";


function Yii2TableBody({ items, columnsHeader, pagination = null, showPaginationTop = false, actions = {}, onDelete, className = '', actionsLabel = 'Actions' }) {
  return (
    <div>
      <TableContainer className={className} component={Paper}>
        <Table  size="small" aria-label="a dense table">
          <TableHead>
            {showPaginationTop && <TableRow>{pagination}</TableRow>}
            <TableRow>

              {!!Object.keys(actions).length && <TableCell >{actionsLabel}</TableCell>}

              {columnsHeader.map((rowHeader, idHeader) => {

                  // fields not showed
                  if (!rowHeader.showInTable) {
                    return null;
                  }

                  // show fields
                  return ((rowHeader.isPrimary || rowHeader.number) ? 
                    <TableCell align="right" key={"rowHeader" + idHeader}>{rowHeader.label}</TableCell> :
                    <TableCell key={idHeader}>{rowHeader.label}</TableCell>
                  );
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((rowBody, idBody) => (
              <TableRow key={idBody} {...rowBody}>
                {columnsHeader.map((rowColumn, id) => (
                  <RowTable 
                    key={"rowColumn" + id}
                    {...rowColumn}
                    actions={actions}
                    rowBody={rowBody}
                    onDelete={onDelete}
                  />
                ))}
              </TableRow>
            ))}
            {!showPaginationTop && <TableRow>{pagination}</TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

Yii2TableBody.propTypes = {
  name: PropTypes.string,
  isPrimary: PropTypes.bool,
  actions: PropTypes.object,
  rowBody: PropTypes.object,
  showInTable: PropTypes.bool,
  onEdit: PropTypes.func,
  items: PropTypes.array,
  columnsHeader: PropTypes.array,
  pagination: PropTypes.object,
  showPaginationTop: PropTypes.bool,
  onSearch: PropTypes.func,
  onDelete: PropTypes.func,
  className: PropTypes.string,
  actionsLabel: PropTypes.string,
};

export default Yii2TableBody;