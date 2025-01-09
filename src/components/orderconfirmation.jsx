import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';

function OrderConfirmation({ show, onHide, orderDetails, onConfirm }) {
  const [note, setNote] = useState('');
  const total = orderDetails.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const handleConfirm = () => {
    onConfirm(note);
    setNote(''); 
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Konfirmasi Pesanan Anda</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Rincian Pesanan:</h4>
        <ul className="list-unstyled mb-4">
          {orderDetails.map((item, index) => (
            <li key={index} className="mb-2">
              <div className="d-flex justify-content-between">
                <span>
                  {item.name} {item.quantity > 1 ? `(${item.quantity}x)` : ''}
                </span>
                <span>Rp{(item.price * (item.quantity || 1)).toLocaleString()}</span>
              </div>
            </li>
          ))}
        </ul>
        
        <div className="border-top pt-3 mb-3">
          <h5 className="d-flex justify-content-between">
            <span>Total:</span>
            <span>Rp{total.toLocaleString()}</span>
          </h5>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Catatan Pesanan:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Contoh: Kuah Banyakin, tidak pakai daun bawang, dll."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Batal
        </Button>
        <Button variant="success" onClick={handleConfirm}>
          Pesan Sekarang
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OrderConfirmation;