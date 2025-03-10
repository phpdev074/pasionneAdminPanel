import * as React from 'react';
import PropTypes from 'prop-types';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';

import FacilityCommercial from '../facilityCommercial/view/facilities-view';
import FacilityResidential from '../facilityResidential/view/facilities-view';

function FacilityTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

FacilityTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function FacilityTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Facility Commercial" {...a11yProps(0)} />
          <Tab label="Facility Residenital" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <FacilityTabPanel value={value} index={0}>
        <FacilityCommercial/>
      </FacilityTabPanel>
      <FacilityTabPanel value={value} index={1}>
        <FacilityResidential />
      </FacilityTabPanel>
    </Box>
  );
}
