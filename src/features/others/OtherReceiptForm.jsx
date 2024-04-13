import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useCreateOtherReceipt } from "./useCreateOtherReceipt";

function OtherReceiptForm({
  otherName,
  totalQuantity,
  id,
  vendorCode,
  onCloseModal,
}) {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const { updateOtherPlus, isPending } = useCreateOtherReceipt(otherName);

  function onSubmit(data) {
    updateOtherPlus(
      {
        otherId: id,
        ...data,
      },
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
          id="otherName"
          value={otherName}
          disabled
          {...register("otherName", { value: otherName })}
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
      <FormRow
        label="Наименование поставщика"
        error={errors?.provider?.message}
      >
        <Input
          type="text"
          id="provider"
          {...register("provider", {
            required: "Это поле обязательно для заполнения",
          })}
        />
      </FormRow>
      <FormRow label="Дата заказа" error={errors?.orderDate?.message}>
        <Input
          type="date"
          id="orderDate"
          {...register("orderDate", {
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
        label="Получено количество"
        error={errors?.receivedQuantity?.message}
      >
        <Input
          type="number"
          id="receivedQuantity"
          {...register("receivedQuantity", {
            required: "Это поле обязательно для заполнения",
          })}
        />
      </FormRow>
      <FormRow label="Дата получения" error={errors?.receiptDate?.message}>
        <Input
          type="date"
          id="receiptDate"
          {...register("receiptDate", {
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
      <FormRow label="Номер счёта" error={errors?.billNumber?.message}>
        <Input
          type="number"
          id="billNumber"
          {...register("billNumber", {
            required: "Это поле обязательно для заполнения",
          })}
        />
      </FormRow>

      <FormRow label="Дата оплаты" error={errors?.dateOfPayment?.message}>
        <Input
          type="date"
          id="dateOfPayment"
          {...register("dateOfPayment", {
            required: "Это поле обязательно для заполнения",
          })}
        />
      </FormRow>

      <FormRow label="Стоимость за единицу" error={errors?.itemPrice?.message}>
        <Input
          type="number"
          id="itemPrice"
          {...register("itemPrice", {
            required: "Это поле обязательно для заполнения",
          })}
        />
      </FormRow>

      <FormRow label="Общая стоимость" error={errors?.totalPrice?.message}>
        <Input
          type="number"
          id="totalPrice"
          {...register("totalPrice", {
            required: "Это поле обязательно для заполнения",
          })}
        />
      </FormRow>

      <FormRow
        label="Транспортная компания"
        error={errors?.transportCompany?.message}
      >
        <Input
          type="text"
          id="transportCompany"
          {...register("transportCompany", {
            required: "Это поле обязательно для заполнения",
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
        <Button disabled={isPending}>Добавить</Button>
      </FormRow>
    </Form>
  );
}

export default OtherReceiptForm;
