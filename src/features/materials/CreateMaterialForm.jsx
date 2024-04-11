import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { useCreateMaterial } from "./useCreateMaterial";

function CreateMaterialForm({ onCloseModal }) {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const { createNewMaterial, isPending } = useCreateMaterial();

  function onSubmit(data) {
    createNewMaterial(data, {
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
      <FormRow label="Наименование" error={errors?.materialName?.message}>
        <Input
          type="text"
          id="materialName"
          {...register("materialName", {
            required: "Это поле обязательно для заполнения",
          })}
        />
      </FormRow>

      <FormRow label="Ширина пореза" error={errors?.materialWidth?.message}>
        <Input
          type="text"
          id="materialWidth"
          {...register("materialWidth", {
            required: "Это поле обязательно для заполнения",
          })}
        />
      </FormRow>

      <FormRow label="Артикул" error={errors?.vendorCode?.message}>
        <Input
          type="text"
          id="vendorCode"
          {...register("vendorCode", {
            required: "Это поле обязательно для заполнения",
          })}
        />
      </FormRow>

      <FormRow label="Количество" error={errors?.totalQuantity?.message}>
        <Input
          type="number"
          id="totalQuantity"
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

export default CreateMaterialForm;
