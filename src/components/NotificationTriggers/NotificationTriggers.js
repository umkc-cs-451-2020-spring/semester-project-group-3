import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
// I added all the inports youll need for material UI table.
// Most likely i added to much.
// Do div css styling like below example. 
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid blue;

`
// Defualt functions for sorting. Leave these the same.
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function stableSort(query, searchCol, array, cmp) {
  array = query ? array.filter(x => x[searchCol].includes(query)) : array;
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}
function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}
// put header here
const headCells = [

];
// take data from database and pass into this function that will convert it into an object.
function createData() {
  return {};
}
// Table header lives here
function EnhancedTableHead(props) {

}
// This is where the tool bar lives. The rows selected and what not.
const EnhancedTableToolbar = props => {

}
// Meat of table lives here   The table head will render in this function.
function EnhancedTable(props) {

}

// This is the Defualt Compoent that will export.
function NotificationTriggers(){
  const [triggerList, setTriggerList] = React.useState([ ]);
  const [loading, setLoading] = React.useState(true);

  return (
    <Wrapper>
      Table Compoent Lives here
    </Wrapper>
  )
}
export default NotificationTriggers;
