import { useGetTokenMutation } from '../store/slices/api/authSliceApi';
import { addAlert } from '../store/slices/alertsSlice';

import {
  Box,
  Button,
  TextField
} from '@mui/material';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import navigation from '../utils/navigation';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unknownError } from '../utils/alerts';

const loginSchema = yup.object({
  username: yup.string().required().default(''),
  password: yup.string().required().default('')
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: {errors}
  } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const [getToken, {isLoading}] = useGetTokenMutation();

  const onSubmit = (data) => {
    getToken(data)
      .then((response) => {
        if (response.error) {
          return;
        }

        resetForm();
        navigate(navigation.root, {replace: true});
      })
      .catch(() => dispatch(addAlert(unknownError)));
  };

  return (
  <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box 
        component="form" 
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          disabled={isLoading}
          {...register("username", {required: true})}
          errors={errors.username?.message}
          helperText={errors.username?.message}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isLoading}
          {...register("password", {required: true})}
          errors={errors.password?.message}
          helperText={errors.password?.message}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isLoading}
        >
          Log In
        </Button>
      </Box>
    </Box>
  )
};

export default Login;