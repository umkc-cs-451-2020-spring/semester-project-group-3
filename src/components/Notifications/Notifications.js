import React from "react";
import PropTypes from "prop-types";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

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

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
          >
              {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// This is where the tool bar lives. The rows selected and what not.
const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar
      className={classes.root}
    >
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Notifications
        </Typography>
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

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              rowCount={rows.length}
            />
            <TableBody>
              {rows
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
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

// This is the Defualt Compoent that will export.
function Notifications(props) {

  console.log(props.notifications);

  return EnhancedTable(props.notifications);
}
export default Notifications;
