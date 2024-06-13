import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useCreateIndigoExpense } from "./useCreateIndigoExpense";

function IndigoExpenseForm({
  indigoName,
  totalQuantity,
  id,
  vendorCode,
  onCloseModal,
}) {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const { updateIndigoMinus, isPending } = useCreateIndigoExpense(indigoName);

  function onSubmit(data) {
    updateIndigoMinus(
      { indigoId: id, ...data },
      {
        onSuccess: () => {
          onCloseModal?.();
          reset();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Input
          value={totalQuantity}
          hidden
          {...register("totalQuantity", { value: totalQuantity })}
        />
        <Input value={id} hidden {...register("id", { value: id })} />
      </FormRow>

      <FormRow label="Наименование">
        <Input
          type="text"
          id="indigoName"
          value={indigoName}
          disabled
          {...register("indigoName", { value: indigoName })}
        />
      </FormRow>

      <FormRow label="Артикул">
        <Input
          type="text"
          id="vendorCode"
          value={vendorCode}
          disabled
          {...register("vendorCode", { value: vendorCode })}
        />
      </FormRow>

      <FormRow label="Кому отпущено" error={errors?.receiver?.message}>
        <Input
          type="text"
          id="receiver"
          {...register("receiver", {
            required: "Это поле обязательно для заполнения",
            minLength: 2,
          })}
        />
      </FormRow>

      <FormRow label="Кем отпущено" error={errors?.receiver?.message}>
        <Input
          type="text"
          id="distributor"
          {...register("distributor", {
            required: "Это поле обязательно для заполнения",
            minLength: 2,
          })}
        />
      </FormRow>

      <FormRow label="Дата отпуска" error={errors?.shippingDate?.message}>
        <Input
          type="date"
          id="shippingDate"
          {...register("shippingDate", {
            required: "Это поле обязательно для заполнения",
            validate: (value) => {
              return (
                new Date(value) <= new Date() ||
                "Вводимая дата не должна быть позднее текущего дня"
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Отпущенное количество"
        error={errors?.shippedQuantity?.message}
      >
        <Input
          type="number"
          id="shippedQuantity"
          {...register("shippedQuantity", {
            required: "Это поле обязательно для заполнения",
            max: {
              value: totalQuantity,
              message: "Отпускаемое количество не может быть больше доступного",
            },
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isPending}
          onClick={() => onCloseModal?.()}
        >
          Отмена
        </Button>
        <Button disabled={isPending}>Списать</Button>
      </FormRow>
    </Form>
  );
}

export default IndigoExpenseForm;
