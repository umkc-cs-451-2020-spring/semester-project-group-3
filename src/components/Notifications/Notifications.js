import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import { useSelector, useDispatch } from "react-redux";
import fetchNotifications from "./notificationAction.js";

// I added all the inports youll need for material UI table.
// Most likely i added to much.
// Do div css styling like below example.
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid blue;
`;
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

const SearchArea = styled.div`
  text-align: "center";
  position: relative;
  float: right;
  min-width: 425px;
`;

const StyledTextField = withStyles((theme) => ({
  root: {
    width: "300px",
  },
}))(TextField);
const StyledSelect = withStyles((theme) => ({
  root: {
    height: "30px",
    verticalAlign: "middle",
    textAlign: "center",
    marginTop: "5%",
  },
}))(Select);
const StyledTableCell = withStyles((theme) => ({
  body: {
    color: "blue",
  },
}))(TableCell);

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    minHeight: "70px",
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    height: "100%",
    fontSize: "32px",
    flex: "1 1 100%",
  },
}));

function stableSort(query, searchCol, array, cmp) {
  array = query ? array.filter((x) => x[searchCol].includes(query)) : array;
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}
// put header here
const headCells = [
  { id: "pDate", numeric: true, disablePadding: true, label: "Date" },
  { id: "type", numeric: true, disablePadding: false, label: "Type" },
  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Description",
  },
];
// take data from database and pass into this function that will convert it into an object.
function createData(pDate, type, description) {
  return { pDate, type, description };
}
function createRows(notifications) {
  var tempRows = [];
  if (notifications) {
    for (var i = 0; i < notifications.length; i++) {
      // todo add formating to date data.
      tempRows.push(
        createData(
          notifications[i].processingDate,
          notifications[i].type,
          notifications[i].description
        )
      );
    }
  }
  return tempRows;
}

// Table header lives here
function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all Notifications" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// This is where the tool bar lives. The rows selected and what not.
const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, handleChange, searchCol, query, handleQuery } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Transactions
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon /> // TODO add onclick for deleting things
          </IconButton>
        </Tooltip>
      ) : null}
      <SearchArea>
        <StyledSelect
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={searchCol}
          onChange={handleChange}
        >
          <MenuItem value={"description"}>Description</MenuItem>
          <MenuItem value={"pDate"}>Date</MenuItem>
          <MenuItem value={"type"}>Type</MenuItem>
        </StyledSelect>
        <StyledTextField
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={query}
          onChange={handleQuery}
          size="small"
        />
        <FormHelperText id="component-helper-text">
          {" "}
          Select a colum to Search then type
        </FormHelperText>
      </SearchArea>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "10px",
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

// Meat of table lives here   The table head will render in this function.
function EnhancedTable(notifications) {
  const classes = useStyles();
  const [rows, setRows] = React.useState(createRows(notifications));
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("pDate");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.transId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, transId) => {
    const selectedIndex = selected.indexOf(transId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, transId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (transId) => selected.indexOf(transId) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  // search functionality lives below this
  const [query, setQuery] = React.useState("");
  const [searchCol, setSearchCol] = React.useState("description");

  const inputLabel = React.useRef(null);
  const handleQuery = (event) => {
    setQuery(event.target.value);
  };
  const handleChange = (event) => {
    setSearchCol(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleChange={handleChange}
          searchCol={searchCol}
          query={query}
          handleQuery={handleQuery}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(query, searchCol, rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.transId);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.transId)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.transId}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <StyledTableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="right"
                      >
                        {row.transId}
                      </StyledTableCell>
                      <TableCell align="right">{row.pDate}</TableCell>
                      <StyledTableCell align="right">
                        {"$" + row.amount + (row.amount % 1 === 0 ? ".00" : "")}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.chargeType}
                      </StyledTableCell>
                      <TableCell align="right">
                        {row.balance + (row.balance % 1 === 0 ? ".00" : "")}
                      </TableCell>
                      <TableCell align="right">{row.description}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}

// This is the Defualt Compoent that will export.
function Notifications() {
  const [notificationList, setNotificationList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const acctID = useSelector((state) => state.loginReducer.accountID);

  const dispatch = useDispatch();

  async function getNotifications(acctID) {
    await dispatch(fetchNotifications(acctID));
  }
  // this is called after the component is rendered.
  React.useEffect(() => {
    getNotifications(acctID);
  }, []);

  const notif_error = useSelector((state) =>
    console.log(state.notificationsReducer.notif_error)
  );
  const notif_loading = useSelector(
    (state) => state.notificationsReducer.notif_loading
  );
  const notifications = useSelector(
    (state) => state.notificationsReducer.notif_items
  );

  if (notif_loading) {
    return <div>Loading...</div>;
  }
  if (notif_error) {
    return <div>Error! {notif_error}</div>;
  }

  return EnhancedTable(notifications);
}
export default Notifications;
