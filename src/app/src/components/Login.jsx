import useLogin from '../utils/hooks/useLogin';

import {
  Box,
  Button,
  TextField
} from '@mui/material';

const Login = () => {
  const {
    isLoading,
    errors,
    onSubmit,
    handleSubmit,
    register
  } = useLogin();

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