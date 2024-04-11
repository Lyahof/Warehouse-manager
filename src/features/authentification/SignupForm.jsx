import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";

import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isPending } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ email, password, fullName }) {
    signup({ email, password, fullName }, { onSettled: reset });
  }

  return (
    <Form type="regular" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Имя и фамилия" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "Это поле обязательно для заполнения",
          })}
        />
      </FormRow>

      <FormRow label="Электронная почта" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "Это поле обязательно для заполнения",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Пожалуйста, введите корректный адрес электронной почты",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Задайте пароль (min 8 символов)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "Это поле обязательно для заполнения",
            minLength: {
              value: 8,
              message: "Минимальная длина пароля - 8 символов",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Повторите пароль"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "Это поле обязательно для заполнения",
            validate: (value) =>
              value === getValues().password || "Пароли должны совпадать",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type это HTML атрибут! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={reset}
          disabled={isPending}
        >
          Отмена
        </Button>
        <Button disabled={isPending}>
          {!isPending ? "Создать нового пользователя" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
