// @ts-nocheck

import { mainShadow } from '~/styles/app-theme/custom-shadows'

const menuList = {
  styleOverrides: {
    root: {
      '& .MuiPaper-root': {
        boxShadow: mainShadow,
      },
      '& .MuiMenu-list': {
        padding: 0,
      },
    },
  },
}

export default menuList
