import { unknownError } from '../alerts';
import navigation from '../navigation';
import { addAlert } from "../../store/slices/alertsSlice";
import { useGetTokenMutation } from "../../store/slices/api/authSliceApi";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


const loginSchema = yup.object({
  username: yup.string().required().default(''),
  password: yup.string().required().default('')
});

export default function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

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

  return {
    isLoading,
    errors,

    onSubmit,
    handleSubmit,
    register
  };
};