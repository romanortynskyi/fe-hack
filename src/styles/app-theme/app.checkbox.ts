// @ts-nocheck

import { checkboxClasses } from '@mui/material/Checkbox'

import palette from './app.pallete'

const checkbox = {
  styleOverrides: {
    root: {
      color: palette.primary[300],
      [`&.${checkboxClasses.checked}`]: {
        color: palette.primary[700],
      },
    },
  },
}

export default checkbox
