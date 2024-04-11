import { HiTrash } from "react-icons/hi2";

import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { modifyDate } from "../../helpers/modifyDate";
import { useDeleteMaterialExpense } from "./useDeleteMaterialExpense";

function MaterialExpenseRow({ material }) {
  const {
    id,
    materialId,
    materialName,
    vendorCode,
    receiver,
    shippingDate,
    shippedQuantity,
  } = material;

  const modifiedShippingDate = modifyDate(shippingDate);
  const { deleteMaterialExpense, isPending } = useDeleteMaterialExpense();

  return (
    <Modal>
      <Table.Row>
        <p>{materialName}</p>
        <p>{shippedQuantity} шт.</p>
        <p>{modifiedShippingDate} г</p>
        <p>{receiver}</p>
        <p>{vendorCode}</p>

        <Modal.Open opens="delete-expense-item">
          <button>
            <HiTrash />
          </button>
        </Modal.Open>
        <Modal.Window name="delete-expense-item">
          <ConfirmDelete
            resourceName="текущую строку"
            onConfirm={() =>
              deleteMaterialExpense({ id, materialId, shippedQuantity })
            }
            disabled={isPending}
          />
        </Modal.Window>
      </Table.Row>
    </Modal>
  );
}

export default MaterialExpenseRow;
