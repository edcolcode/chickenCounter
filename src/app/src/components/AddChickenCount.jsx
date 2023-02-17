import useAddChickenCount from '../utils/hooks/useAddChickenCount';

import {
  Box,
  Grid,
  Button,
  TextField,
} from '@mui/material';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';


const AddChickenCount = () => {
  const {
    isLoading,
    register,
    handleSubmit,
    errors,
    onSubmit
  } = useAddChickenCount();

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit(onSubmit)} 
      noValidate
    >
      <DateTimePicker
        disableMaskedInput
        renderInput={
          (props) => <TextField {...props} fullWidth/>
        }
        margin="normal"
        required
        fullWidth
        id="timestamp"
        label="Date-time"
        name="timestamp"
        readOnly
        disabled={isLoading}
        {...register("timestamp", {required: true})}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="amount"
        label="Amount"
        type="number"
        id="amount"
        autoFocus
        defaultValue={1}
        {...register("amount", {required: true})}
        error={errors.amount}
        helperText={errors.amount?.message}
        readOnly={isLoading}
        disabled={isLoading}
      />
      <Grid 
        container
        spacing={1}
        direction="row-reverse"
      >
        <Grid item xs>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            Submit
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            type="reset"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddChickenCount;