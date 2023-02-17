import logo from '../chickenCountLogo.png';
import { useHeader } from '../utils/hooks/useHeader';

import { 
	AppBar,
  Button,
	Toolbar,
  IconButton,
	Typography,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import styled from '@emotion/styled';
import { Box } from '@mui/system';

const StyledLogoImg = styled.img`
  max-height: 40px;
  cursor: pointer;
`;

const Header = () => {
  const {
    isMenuOpen,
    isLoggedIn,
    menuAnchorEl,
    isXSmallScreen,
    handleMenuClose,
    handleLogoClick,
    handleLoginButtonClick,
    handleLogoutButtonClick,
    handleOptionsButtonClick,
    handleAddChickenCounterButtonClick
  } = useHeader();

  const navMenu = isXSmallScreen
  ? 
    <nav>
      <Button
        variant='contained'
        color='secondary'
        onClick={handleOptionsButtonClick}
        aria-controls="header-options-menu"
        aria-haspopup="true"
      >
        Options
      </Button>
      <Menu
        open={isMenuOpen}
        anchorEl={menuAnchorEl}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'header-options-button'
        }}
      >
        {isLoggedIn && 
          <MenuItem onClick={handleAddChickenCounterButtonClick}>
            <ControlPointIcon sx={{mr: 1}}/>
            Add Record
          </MenuItem>
        }
        <Divider />
        {!isLoggedIn && 
          <MenuItem onClick={handleLoginButtonClick}>
            Login
          </MenuItem>
        }
        {isLoggedIn && 
          <MenuItem onClick={handleLogoutButtonClick}>
            Logout
          </MenuItem>
        }
      </Menu>
    </nav>
  :
    <nav>
      {isLoggedIn && 
        <IconButton
          variant='contained'
          color='secondary'
          title='Add record'
          onClick={handleAddChickenCounterButtonClick}
        >
          <ControlPointIcon/>
        </IconButton>
      }
      {!isLoggedIn && 
        <Button
          variant='contained'
          color='secondary'
          sx={{ml: 1}}
          onClick={handleLoginButtonClick}
        >
          Login
        </Button>
      }
      {isLoggedIn && 
        <Button
          variant='contained'
          color='secondary'
          sx={{ml: 1}}
          onClick={handleLogoutButtonClick}
        >
          Logout
        </Button>
      }
    </nav>;

  return (
    <AppBar position="relative">
      <Toolbar>
        <StyledLogoImg
          src={logo}
          alt="Chicken Count"
          onClick={handleLogoClick}
        />
        <Box
          sx={{
            flexGrow: 1, 
            ml: 1
          }}
        >
          <Typography
            component="span"
            variant="h5"
            color="inherit"
            noWrap
            sx={{
              cursor: 'pointer'
            }}
            onClick={handleLogoClick}
          >
            Chicken Counter
          </Typography>
        </Box>
        {navMenu}
      </Toolbar>
    </AppBar>
  )
};

export default Header;