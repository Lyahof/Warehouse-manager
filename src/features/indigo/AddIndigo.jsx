import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateIndigoForm from "./CreateIndigoForm";

function AddIndigo() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="create-paint">
          <Button>Добавить новую запись</Button>
        </Modal.Open>
        <Modal.Window name="create-paint">
          <CreateIndigoForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddIndigo;
