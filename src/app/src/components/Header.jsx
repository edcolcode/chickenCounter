import logo from '../chickenCountLogo.png';
import navigation from '../utils/navigation';
import { logOut, selectIsUserAuth } from '../store/slices/authSlice';

import {useState, useEffect} from 'react';
import { 
	AppBar,
  Button,
	Toolbar,
  IconButton,
	Typography,
  useMediaQuery,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import {useNavigate} from 'react-router-dom';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';

const StyledLogoImg = styled.img`
  
  max-height: 40px;
  cursor: pointer;
`;
const StyledTypography = styled(Typography)`
  cursor: pointer;
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const isLoggedIn = useSelector(selectIsUserAuth);
  
  const isXSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    // Reset menu open flag
    if (!isXSmallScreen && isMenuOpen) {
      handleMenuClose();
    }
  }, [isXSmallScreen, isMenuOpen]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(navigation.root);
  };

  const handleAddChickenCounterButtonClick = () => {
    handleMenuClose();
    navigate(navigation.addChickenCount);
  };

  const handleLoginButtonClick = () => {
    handleMenuClose();
    navigate(navigation.login);
  };

  const handleLogoutButtonClick = () => {
    handleMenuClose();
    dispatch(logOut());
  };

  const handleOptionsButtonClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setIsMenuOpen(false);
  };

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
        <MenuItem onClick={handleAddChickenCounterButtonClick}>
          <ControlPointIcon sx={{mr: 1}}/>
          Add Record
        </MenuItem>
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
      <IconButton
        variant='contained'
        color='secondary'
        title='Add record'
        onClick={handleAddChickenCounterButtonClick}
      >
        <ControlPointIcon/>
      </IconButton>
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
        <StyledTypography
            component="h1"
            variant="h5"
            color="inherit"
            noWrap
            sx={{flexGrow: 1, ml: 1}}
            onClick={handleLogoClick}
        >
            Chicken Counter
        </StyledTypography>
        {navMenu}
      </Toolbar>
    </AppBar>
  )
};

export default Header;