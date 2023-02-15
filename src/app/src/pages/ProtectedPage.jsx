import navigation from '../utils/navigation';
import { selectIsUserAuth } from '../store/slices/authSlice';

import { useNavigate } from "react-router-dom"
import { useEffect } from 'react';
import {useSelector} from "react-redux";

const ProtectedPage = ({children}) => {
	const isLoggedIn = useSelector(selectIsUserAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      // TODO: Dispatch an alert about log in

      navigate(navigation.login, {replace: true});
    }
  }, [isLoggedIn, navigate]);

  return (
    children
  );
};

export default ProtectedPage;