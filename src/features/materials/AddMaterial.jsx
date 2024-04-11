import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateMaterialForm from "./CreateMaterialForm";

function AddMaterial() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="create-material">
          <Button>Добавить новую запись</Button>
        </Modal.Open>
        <Modal.Window name="create-material">
          <CreateMaterialForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddMaterial;
