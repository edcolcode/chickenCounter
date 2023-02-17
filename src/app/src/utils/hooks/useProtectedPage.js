import navigation from "../navigation";
import { selectIsUserAuth } from "../../store/slices/authSlice";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function useProtectedPage() {
  const isLoggedIn = useSelector(selectIsUserAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      // TODO: Dispatch an alert about log in

      navigate(navigation.login, {replace: true});
    }
  }, [isLoggedIn, navigate]);
};