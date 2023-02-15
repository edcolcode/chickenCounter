import { useAddChickenCountMutation } from '../store/slices/api/chickenCounterSliceApi';
import { addAlert } from '../store/slices/alertsSlice';
import { recordAddedSuccessfully } from '../utils/alerts';
import { useDispatch } from 'react-redux';

import {
  Box,
  Grid,
  Button,
  TextField,
} from '@mui/material';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import { DateTime } from 'luxon';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


const chickenCounterSchema = yup.object({
  timestamp: yup.date().required().default(() => DateTime.now()),
  amount: yup.number().required().positive().integer().default(1)
}).required();

const AddChickenCount = () => {
  const dispatch = useDispatch();
  const [
    addChickenCount, {isLoading, reset}
  ] = useAddChickenCountMutation();
  const {
    register, 
    handleSubmit, 
    reset: resetForm, 
    formState: { errors }
  } = useForm({
    resolver: yupResolver(chickenCounterSchema)
  });

  const onSubmit = (data) => {
    addChickenCount(data).then((response) => {
      if (response.error) {
        return;
      }

      reset();
      resetForm();
      dispatch(addAlert(recordAddedSuccessfully));
    });
  };

  const handleDateTimeChange = () => {};

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
        onChange={handleDateTimeChange}
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