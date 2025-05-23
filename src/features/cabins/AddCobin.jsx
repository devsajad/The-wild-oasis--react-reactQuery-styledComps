import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddCobin() {
  //   const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>

        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>

    // <div>
    //   <Button onClick={() => setShowForm((s) => !s)}>
    //     {showForm ? "Hide add cabin" : "Add new cabin"}
    //   </Button>

    //   {showForm && (
    //     <Modal onClose={() => setShowForm(false)}>
    //       <CreateCabinForm onCloseModal={() => setShowForm(false)} />
    //     </Modal>
    //   )}
    // </div>
  );
}

export default AddCobin;
