import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HiTrash } from "react-icons/hi2";
import { FaCalendarMinus, FaCalendarPlus } from "react-icons/fa";

import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import MaterialReceiptForm from "./MaterialReceiptForm";
import MaterialExpenseForm from "./MaterialExpenseForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteMaterial } from "./useDeleteMaterial";

const StyledndigoName = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-600);
`;

const VendorCode = styled.div`
  font-weight: 500;
`;

const Quantity = styled.div`
  font-weight: 600;
  color: var(--color-${(props) => props.type}-700);
`;

function MaterialItemRow({ material }) {
  const navigate = useNavigate();
  const { deleteMaterial, isDeleting } = useDeleteMaterial();

  const { id, materialName, totalQuantity, minVal, vendorCode, materialWidth } =
    material;
  const processedTotalQuantity = totalQuantity === null ? 0 : totalQuantity;

  return (
    <Table.Row>
      <StyledndigoName>{materialName}</StyledndigoName>
      <VendorCode>{materialWidth} мм.</VendorCode>
      <Quantity
        type={
          processedTotalQuantity > 0 && processedTotalQuantity < minVal
            ? "yellow"
            : processedTotalQuantity >= minVal
            ? "green"
            : "red"
        }
      >
        {processedTotalQuantity} м²
      </Quantity>
      <Tag
        type={
          processedTotalQuantity > 0 && processedTotalQuantity < minVal
            ? "yellow"
            : processedTotalQuantity >= minVal
            ? "green"
            : "red"
        }
      >
        {processedTotalQuantity > 0 && processedTotalQuantity < minVal
          ? "заканчивается"
          : processedTotalQuantity >= minVal
          ? "не требуется"
          : "требуется"}
      </Tag>
      <VendorCode>{vendorCode ? vendorCode : "-"}</VendorCode>

      <Modal>
        <Modal.Open opens="update-material-plus">
          <button>Добавить</button>
        </Modal.Open>
        <Modal.Window name="update-material-plus">
          <MaterialReceiptForm
            materialName={materialName}
            totalQuantity={processedTotalQuantity}
            id={id}
            vendorCode={vendorCode}
            materialWidth={materialWidth}
          />
        </Modal.Window>

        <Modal.Open opens="update-material-minus">
          <button disabled={processedTotalQuantity === 0}>Списать</button>
        </Modal.Open>
        <Modal.Window name="update-material-minus">
          <MaterialExpenseForm
            materialName={materialName}
            totalQuantity={processedTotalQuantity}
            id={id}
            vendorCode={vendorCode}
            materialWidth={materialWidth}
          />
        </Modal.Window>
        <Menus.Menu>
          <Menus.Toggle id={id} />

          <Menus.List id={id}>
            <Menus.Button
              icon={<FaCalendarPlus />}
              onClick={() => navigate(`/materials/receipts/${id}`)}
            >
              История получений
            </Menus.Button>

            <Menus.Button
              icon={<FaCalendarMinus />}
              onClick={() => navigate(`/materials/expenses/${id}`)}
            >
              История списаний
            </Menus.Button>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />} disabled={isDeleting}>
                Удалить строку
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={materialName}
              onConfirm={() => deleteMaterial(id)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default MaterialItemRow;
