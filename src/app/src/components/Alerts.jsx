import { ALERT_TYPES, SUCCESS_ALERT_HIDE_MS, ERROR_ALERT_HIDE_MS } from "../utils/constants";
import { selectAlerts, clearAlert } from "../store/slices/alertsSlice";

import { Snackbar, Alert} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";


const Alerts = () => {
    const [show, setShow] = useState(false);
    const alert = useSelector(selectAlerts);
    const dispatch = useDispatch();

    useEffect(() => {
      if (!alert || alert.length === 0) {
        setShow(false);
        return;  
      }

      setShow(true);
    }, [show, alert]);

    const handleAlertClose = () => {
      dispatch(clearAlert());
    }

    if (!alert) {
        return null;
    }

    const {type, message} = alert;
    let alertComponent = null;
    let autoHideDuration = SUCCESS_ALERT_HIDE_MS;
    switch(type) {
        case ALERT_TYPES.info:
            alertComponent = <Alert severity="info">{message}</Alert>;
            break;
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
    }

    return (
      <Snackbar
        open={true}
        autoHideDuration={autoHideDuration}
        onClose={handleAlertClose}
      >
        {alertComponent}
      </Snackbar>
    );
};

export default Alerts;