import { logOut, selectIsUserAuth } from "../../store/slices/authSlice";
import navigation from "../navigation";

import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function useHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsUserAuth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  
  const isXSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    // Reset menu open flag
    if (!isXSmallScreen && isMenuOpen) {
      handleMenuClose();
    }
  }, [isXSmallScreen, isMenuOpen]);

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

  return {
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
  };
};