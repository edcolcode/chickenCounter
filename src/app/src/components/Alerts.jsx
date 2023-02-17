import { Snackbar} from "@mui/material";
import useAlerts from "../utils/hooks/useAlerts";

const Alerts = () => {
    const {
      show,
      autoHideDuration,
      handleAlertClose,
      alertComponent
    } = useAlerts();

    if (!show) {
      return null;
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