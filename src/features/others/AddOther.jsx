import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateOtherForm from "./CreateOtherForm";

function AddOther() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="create-other">
          <Button>Добавить новую запись</Button>
        </Modal.Open>
        <Modal.Window name="create-other">
          <CreateOtherForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddOther;
