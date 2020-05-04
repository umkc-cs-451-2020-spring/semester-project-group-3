import React from 'react';
import { useDispatch } from 'react-redux';
import { renderDashboard, renderTransaction, renderNotification } from "../../rStore/actions/tabChangeActions.js";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "5px",
    flexGrow: 3,
    backgroundColor: '#006649',
    display: 'flex',
    height: '156px',
    width: '110%'
    
  },
  tabs: {
    color: 'white',
    borderRight: '1px solid #74BD43',
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(newValue === 0) {
      dispatch(renderDashboard());
    } else if(newValue === 1) {
      dispatch(renderTransaction());
    } else if (newValue === 2) {
      dispatch(renderNotification());
    }
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        className={classes.tabs}
        TabIndicatorProps={{
          style: {
            backgroundColor: "#74BD43"
          }}}
      >
        <Tab label="Dashboard" {...a11yProps(0)}/>
        <Tab label="Transactions" {...a11yProps(1)}/>
        <Tab label="Notification Settings" {...a11yProps(2)}/>
      </Tabs>
      <TabPanel value={value} index={0}>
      </TabPanel>
      <TabPanel value={value} index={1}>
      </TabPanel>
      <TabPanel value={value} index={2}>
      </TabPanel>
    </div>
  );
}