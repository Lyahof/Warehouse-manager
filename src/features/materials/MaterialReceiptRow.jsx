import { HiTrash } from "react-icons/hi2";

import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { modifyDate } from "../../helpers/modifyDate";
import { useDeleteMaterialReceipt } from "./useDeleteMaterialReceipt";
import { formatCurrency } from "../../utils/DateHelpers";

function MaterialReceiptRow({ material }) {
  console.log(material);
  const {
    id,
    materialId,
    provider,
    orderDate,
    receiptDate,
    itemPrice,
    totalPrice,
    receivedQuantity,
    dateOfPayment,
    billNumber,
    transportCompany,
  } = material;

  const { deleteMaterialReceipt, isPending } = useDeleteMaterialReceipt();

  const modifiedReceiptDate = modifyDate(receiptDate);
  const modifiedDateOfPayment = modifyDate(dateOfPayment);
  const modifiedOrderDate = modifyDate(orderDate);

  return (
    <Modal>
      <Table.Row>
        <div>{provider}</div>
        <div>{receivedQuantity} м²</div>
        <div>{modifiedOrderDate}</div>
        <div>{modifiedDateOfPayment}</div>
        <div>{modifiedReceiptDate}</div>
        <div>{formatCurrency(itemPrice)}</div>
        <div>{formatCurrency(totalPrice)}</div>
        <div>{billNumber}</div>
        <div>{transportCompany}</div>

        <Modal.Open opens="delete-receipt-item">
          <button>
            <HiTrash />
          </button>
        </Modal.Open>
        <Modal.Window name="delete-receipt-item">
          <ConfirmDelete
            resourceName="текущее получение"
            onConfirm={() =>
              deleteMaterialReceipt({ id, materialId, receivedQuantity })
            }
            disabled={isPending}
          />
        </Modal.Window>
      </Table.Row>
    </Modal>
  );
}

export default MaterialReceiptRow;
