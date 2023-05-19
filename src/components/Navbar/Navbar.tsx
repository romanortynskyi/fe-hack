import { FC, useState } from 'react';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import Routes from '~/types/enums/routes';
import UserEntity from '~/types/interfaces/user-entity';

interface NavbarProps {
  user: UserEntity | null;
  onLogout: (callback: () => void) => void;
}

const Navbar: FC<NavbarProps> = (props) => {
  const { onLogout, user } = props;

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{ background: '#1c1c1c' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button
            component={Link}
            to={Routes.Main}
            sx={{
              textDecoration: 'none',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: 'transparent',
              },
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <AdbIcon />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: 'flex',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                flex: '1',
              }}
            >
              GGW.
            </Typography>
          </Button>

          <Box
            sx={{
              flexGrow: 0,
              marginLeft: 'auto',
            }}
          >
            {user ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={`${user?.firstName} ${user?.lastName}`}
                      src={user?.imgSrc}
                    >
                      {!user?.imgSrc && user?.firstName[0]}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  PaperProps={{
                    sx: {
                      minWidth: 200,
                    },
                  }}
                  MenuListProps={{
                    sx: {
                      '& .MuiMenuItem-root': {
                        fontSize: '18px',
                        minHeight: '48px',
                      },
                    },
                  }}
                >
                  <Link to={Routes.Profile} style={{ textDecoration: 'none' }}>
                    <MenuItem>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={() => onLogout(handleCloseUserMenu)}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : null}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
