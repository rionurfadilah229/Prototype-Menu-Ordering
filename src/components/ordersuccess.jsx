import { Modal, Button } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';

function OrderSuccess({ show, onClose }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Body className="text-center py-4">
        <FaCheckCircle className="text-success mb-3" size={50} />
        <h4>Pesanan Anda Segera Datang</h4>
        <p className="text-muted">
        Terima kasih telah mengunjungi Soto Jakarta Bang Madi. Kami senang bisa melayani Anda, semoga puas dan sampai jumpa lagi!
        </p>
        <Button variant="success" onClick={onClose} className="mt-2">
          Pesan Menu Lagi!
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default OrderSuccess;