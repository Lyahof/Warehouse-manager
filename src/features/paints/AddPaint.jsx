import Button from "../../ui/Button";
import CreatePaintForm from "./CreatePaintForm";
import Modal from "../../ui/Modal";

function AddPaint() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="create-paint">
          <Button>Добавить новую запись</Button>
        </Modal.Open>
        <Modal.Window name="create-paint">
          <CreatePaintForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddPaint;
