import { addAlert } from "../../store/slices/alertsSlice";
import { useAddChickenCountMutation } from "../../store/slices/api/chickenCounterSliceApi";
import { recordAddedSuccessfully } from "../alerts";

import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { DateTime } from "luxon";

const chickenCounterSchema = yup.object({
  timestamp: yup.date().required().default(() => DateTime.now()),
  amount: yup.number().required().positive().integer().default(1)
}).required();

export default function useAddChickenCount() {
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

  return {
    isLoading,

    register,
    handleSubmit,
    reset,
    errors,

    onSubmit
  };
};