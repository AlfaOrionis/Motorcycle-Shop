import { Modal, Button } from "react-bootstrap";
import { deleteProduct } from "../../store/actions/product.actions";
import { useDispatch } from "react-redux";
const RemoveProduct = (props) => {
  const dispatch = useDispatch();

  return (
    <Modal
      size="md"
      centered
      onHide={props.onClearProdToRemove}
      show={props.onProdToRemove}
    >
      <Modal.Header style={{ fontWeight: "bold" }} closeButton>
        Usunięcie produktu
      </Modal.Header>
      <Modal.Body>Napewno chcesz usunąć ten produkt?</Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onClearProdToRemove} variant="secondary">
          Anuluj
        </Button>
        <Button
          onClick={() => dispatch(deleteProduct(props.onProdToRemove))}
          variant="primary"
        >
          Usuń
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveProduct;
