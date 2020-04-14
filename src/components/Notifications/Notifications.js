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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";

// I added all the inports youll need for material UI table.
// Most likely i added to much.
// Do div css styling like below example.
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid blue;
`;

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

// put header here
const headCells = [
  {
    id: "processingDate",
    numeric: true,
    disablePadding: true,
    label: "Date",
  },
  { id: "type", numeric: true, disablePadding: false, label: "Type" },
  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Description",
  },
];
// take data from database and pass into this function that will convert it into an object.
function createData(processingDate, type, description) {
  return { processingDate, type, description };
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
  const { classes, order, orderBy, numSelected } = props;

  return (
    <TableHead>
      <TableRow>
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
          Notifications
        </Typography>
      )}
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
  const [orderBy, setOrderBy] = React.useState("processingDate");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              rowCount={rows.length}
            />
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.processingDate}>
                      <TableCell align="right">{row.processingDate}</TableCell>
                      <StyledTableCell align="right">
                        {row.type}
                      </StyledTableCell>
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
          rowsPerPageOptions={[3, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

// This is the Defualt Compoent that will export.
function Notifications(props) {
  const [notificationList, setNotificationList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  console.log(props.notifications);

  return EnhancedTable(props.notifications);
}
export default Notifications;
