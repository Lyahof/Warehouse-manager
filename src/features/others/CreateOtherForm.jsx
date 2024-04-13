import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { useCreateOther } from "./useCreateOther";

function CreateOtherForm({ onCloseModal }) {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const { createOther, isPending } = useCreateOther();

  function onSubmit(data) {
    createOther(data, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onCloseModal={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Наименование" error={errors?.otherName?.message}>
        <Input
          type="text"
          id="otherName"
          {...register("otherName", {
            required: "Это поле обязательно для заполнения",
          })}
        />
      </FormRow>

      <FormRow label="Артикул" error={errors?.vendorCode?.message}>
        <Input
          type="text"
          id="vendorCode"
          {...register(
            "vendorCode" /* , {
            required: "Это поле обязательно для заполнения",
          } */
          )}
        />
      </FormRow>

      <FormRow label="Количество" error={errors?.quantity?.message}>
        <Input
          type="number"
          id="quantity"
          defaultValue={0}
          disabled
          {...register("totalQuantity")}
        />
      </FormRow>

      <FormRow
        label="Минимально допустимый остаток на складе"
        error={errors?.minVal?.message}
      >
        <Input
          type="number"
          id="minVal"
          {...register("minVal", {
            required: "Это поле обязательно для заполнения",
            min: {
              value: 1,
              message: "Вводимое значение должно быть больше 0",
            },
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isPending}
          onClick={() =>
            onCloseModal?.()
          } /* На случай если компонент будет вызываться не из модалки */
        >
          Отмена
        </Button>
        <Button disabled={isPending}>Добавить в таблицу</Button>
      </FormRow>
    </Form>
  );
}

export default CreateOtherForm;
