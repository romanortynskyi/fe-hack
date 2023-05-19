import { createTheme } from '@mui/material';

import palette from './app.pallete';
import typography from './app.typography';
import button from './app.button';
import tooltip from './app.tooltip';
import table from './app.table';
import svgIcon from './app.svg-icon';
import checkbox from './app.checkbox';
import textField from './app.text-field';
import menuItem from './app.menu-item';
import menuList from './app.menu-list';

const theme = createTheme({
  palette,
  typography,
  direction: 'rtl',
  components: {
    MuiSvgIcon: svgIcon,
    MuiButton: button,
    MuiCheckbox: checkbox,
    MuiTextField: textField,
    MuiTooltip: tooltip,
    MuiMenuItem: menuItem,
    MuiMenu: menuList,
    MuiTableRow: table,
  },
});

export default theme;
