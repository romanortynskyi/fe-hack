import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { FC, SyntheticEvent, useState } from 'react';
import Credits from '../credits';
import Deposits from '../deposits';
import Expenses from '../expenses/expenses';
import Incomes from '../incomes';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const HeaderTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{}}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Incomes" {...a11yProps(0)} />
            <Tab label="Expenses" {...a11yProps(1)} />
            <Tab label="Credits" {...a11yProps(2)} />
            <Tab label="Deposits" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Incomes />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Expenses />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Credits />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Deposits />
        </TabPanel>
      </Box>
    </Container>
  );
};

export default HeaderTabs;
