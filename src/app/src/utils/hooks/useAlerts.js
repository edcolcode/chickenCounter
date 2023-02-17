import { 
  ALERT_TYPES, 
  SUCCESS_ALERT_HIDE_MS, 
  ERROR_ALERT_HIDE_MS 
} from "../constants";
import { selectAlerts, clearAlert } from "../../store/slices/alertsSlice";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@mui/material";

export default function useAlerts() {
  const [show, setShow] = useState(false);
  const alert = useSelector(selectAlerts);
  const dispatch = useDispatch();

  let alertComponent = null;
  let autoHideDuration = SUCCESS_ALERT_HIDE_MS;

  useEffect(() => {
    if (!alert || alert.length === 0) {
      setShow(false);
      return;  
    }

    setShow(true);
  }, [show, alert]);

  const handleAlertClose = () => {
    dispatch(clearAlert());
  };

  if (alert) {
    const {type, message} = alert;
    switch(type) {
        case ALERT_TYPES.warn:
          alertComponent = <Alert severity="warning">{message}</Alert>;
          break;
        case ALERT_TYPES.success:
          alertComponent = <Alert severity="success">{message}</Alert>;  
          break;
        case ALERT_TYPES.error:
          alertComponent = <Alert severity="error">{message}</Alert>;
          autoHideDuration = ERROR_ALERT_HIDE_MS;
          break;
        default:
          alertComponent = <Alert severity="info">{message}</Alert>;
          break;
    };
  }

  return {
    show,
    autoHideDuration,

    handleAlertClose,

    alertComponent
  };
};